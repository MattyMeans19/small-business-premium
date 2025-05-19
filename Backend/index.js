import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000 || process.env.PORT;

const saltRounds = 10;

let user = "";
let userRole = "";

app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
    user:"postgres",
    host: "localhost",
    database: "smallbusiness",
    password: "Hyl!anWarri0r",
    port: 5432,
  });

  db.connect();


  //GET inventory
  app.get("/inventory", async (req,res) =>{
        try{
          let currentInventory = await db.query("SELECT * FROM liveinventory ORDER BY id ASC");
          res.json(currentInventory.rows)
        } catch (err){
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
          }
            
        });

  app.get("/user", async (req,res) => {
    let userData = {currentUser: user, currentRole: userRole};
    res.json(userData)
  });

  app.get("/orders", async (req, res) => {
          try{
          let currentOrders = await db.query("SELECT * FROM orders ORDER BY id ASC");
          res.json(currentOrders.rows)
        } catch (err){
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
          }
  });

  app.post("/getOrders", async (req, res) => {
    let sku = req.body.sku;
          try{
          let currentOrders = await db.query("SELECT * FROM liveinventory WHERE sku = $1", [sku]);
          res.json(currentOrders.rows)
        } catch (err){
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
          }
  });

  app.get("/adminList", async (req,res) =>{
    try{
      let userList = await db.query("SELECT * FROM users ORDER BY firstname ASC");
      res.json(userList.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching data');
        return;
      }
  });

  app.get("/userList", async (req,res) =>{
    try{
      let userList = await db.query("SELECT * FROM users WHERE username = $1", [user.toUpperCase()]);
      res.json(userList.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching data');
        return;
      }
  });

  app.get("/message", async (req,res) =>{
    try{
      let message = await db.query("SELECT dailymessage FROM messages");
      res.json(message.rows[0].dailymessage);
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching data');
        return;
      }
  });

  app.get("/brands", async (req,res) =>{
    try{
      let currentInventory = await db.query("SELECT * FROM brands ORDER BY id ASC");
      res.json(currentInventory.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching data');
        return;
      }
        
    });

    app.get("/types", async (req,res) =>{
      try{
        let currentInventory = await db.query("SELECT * FROM producttypes ORDER BY id ASC");
        res.json(currentInventory.rows)
      } catch (err){
          console.error(err);
          res.status(500).send('Error fetching data');
          return;
        }
          
      });

    app.post("/checkStock", async (req,res) => {
      let sku = req.body.sku;
      try{
        let currentstock = await db.query("SELECT stock FROM liveinventory WHERE sku =$1", [sku]) ;
        res.json(currentstock.rows);
      } catch (err){
          console.error(err);
          res.status(500).send('Error fetching data');
          return;
        }     
    });

  app.post("/filter", async (req,res) => {
    let searchType = req.body.type;
    let sortType = req.body.sort;
    let brand = req.body.brand;

    try{
      if(searchType !=="" && brand !== ""){
        let filter = await db.query(`SELECT * FROM liveinventory WHERE type =$1 AND brand =$2 ORDER BY ${sortType}`, [searchType, brand]);
        res.json(filter.rows)
      } else if(searchType !== "" && brand == ""){
        let filter = await db.query(`SELECT * FROM liveinventory WHERE type =$1 ORDER BY ${sortType}`, [searchType]);
        res.json(filter.rows)
      } else if(searchType == "" && brand !== ""){
        let filter = await db.query(`SELECT * FROM liveinventory WHERE brand =$1 ORDER BY ${sortType}`, [brand]);
        res.json(filter.rows)
      }

    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching data');
        return;
      }
  })

  app.post("/sort", async (req,res) => {
    let sortType = req.body.sort;
    try{
      let filter = await db.query(`SELECT * FROM liveinventory ORDER BY ${sortType}`);
      res.json(filter.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching data');
        return;
      }
  })

  app.post("/login", async (req,res) =>{
    user = req.body.user;
    let password = req.body.password;
    try{
      let result = await db.query("SELECT * FROM users WHERE username = $1", [user.toUpperCase()]);
      const storedPassword = result.rows[0].password;
        if(user!="" && password === storedPassword){
          userRole = result.rows[0].role;
          res.json(result.rows)
        } else{
          res.json("Incorrect Username or Password!")
        }
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }
  });

  app.post("/logout", async (req, res) => {
    user = "";
    res.json(user);
  });

  app.post("/editItem", async (req,res) => {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let info = req.body.info;
    let image = req.body.image;
    let type = req.body.type;
    let stock = req.body.stock;
    let sku = req.body.sku;
    let brand = req.body.brand

    try{
      let result = await db.query(
        "UPDATE liveinventory SET name = $1, price = $2, info = $3, image = $4, type = $5, sku = $7, stock = $8, brand = $9 WHERE id = $6;", [name, price, info, image, type, id, sku, stock, brand]);
        res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }
  });

  app.post("/search", async (req,res) => {
    let name = req.body.name;
    try{
      let result = await db.query(`SELECT * FROM liveinventory WHERE Upper(name) LIKE '%${name}%' OR Lower(name) LIKE '%${name}%' OR sku LIKE '%${name}%'`);
        res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }
  });
  

  app.post("/additem", async (req, res) => {
    let name = req.body.name;
    let info = req.body.info;
    let price = req.body.price;
    let image = req.body.image;
    let type = req.body.type;
    let brand = req.body.brand;
    let sku = req.body.sku;
    let stock = req.body.stock;

    try{
        const result = await db.query('INSERT INTO liveinventory (name, info, price, type, image, brand, sku, stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [name, info, price, type, image, brand, sku, stock]);
        res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }

  })

  app.post("/newBrand", async (req, res) => {
    let brand = req.body.brand;

    try{
        const result = await db.query('INSERT INTO brands (brandname) VALUES ($1);', [brand]);
        res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }

  })

  app.post("/newType", async (req, res) => {
    let type = req.body.type;

    try{
        const result = await db.query('INSERT INTO producttypes (typecategory) VALUES ($1);', [type]);
        res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }

  })

  app.post("/removeItem", async (req, res) => {
    let id = req.body.id;
    try{
        const result = await db.query('DELETE FROM liveinventory WHERE id=$1', [id]);
        res.json(result.rows)
    } catch (err){
      console.error(err);
      res.status(500).send('Error fetching data');
      return;
    }

  })

  app.post("/updatemessage", async (req,res) => {
    let newMessage = req.body.message;
    try{
      await db.query('UPDATE messages SET dailymessage = $1', [newMessage]);
      res.json(newMessage);
    } catch (err){
      console.error(err);
      res.status(500).send('Error saving data');
      return;
    }
  });

  app.post("/saveEdit", async (req,res) => {
    let id = req.body.id;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let uname = req.body.uname;
    let password = req.body.password;
    let role = req.body.role;

    try{
      const result = await db.query('UPDATE users SET username = $1, firstname = $2, lastname = $3, password = $4, role = $5 WHERE id= $6;', [uname, fname, lname, password, role, id]);
      res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error saving data');
      return;
    }
  });

  app.post("/deleteUser", async (req,res) => {
    let id = req.body.id;

    try{
      const result = await db.query('DELETE FROM users WHERE id=$1', [id]);
      res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error deleting data');
      return;
    }
  });

  app.post("/addUser", async (req,res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let uname = req.body.uname.toUpperCase();
    let password = req.body.password;
    let role = req.body.role;

    try{
      const result = await db.query('INSERT INTO users (username, firstname, lastname, password, role) VALUES ($1, $2, $3, $4, $5)', [uname, fname, lname, password, role]);
      res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error adding data');
      return;
    }
  });

    app.post("/newOrder", async (req,res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let tel = req.body.tel;
    let order = req.body.order;
    let status = req.body.status;

    try{
      const result = await db.query('INSERT INTO orders (fname, lname, tel, itemarray, status) VALUES ($1, $2, $3, $4, $5)', [fname, lname, tel, order, status]);
      res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error adding data');
      return;
    }
  });

  app.patch("/editstock", async (req,res) => {
    let sku = req.body.sku;
    let amount = req.body.amount;

    try{
      const result = await db.query('UPDATE liveinventory SET stock = stock - $1 WHERE sku = $2', [amount, sku]);
      res.json(result.rows);
    } catch (err){
      console.error(err);
      res.status(500).send('Error adding data');
      return;
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });