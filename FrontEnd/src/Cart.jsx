import React, {useState, useEffect} from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import cart, {removeFromCart, clearCart} from "./Cart";
import CartItem from "./CartItem";
import Reserve from "./Reserve";
import axios from "axios";

function Cart(){
    let currentCart = sessionStorage.getItem('cart');
    let cartArray = currentCart ? JSON.parse(currentCart): [];
    let tax = 0.0835;
    const [showCart, changeShowCart] = useState(false);
    const [Subtotal, changeSub] = useState(0);
    const [active, changeActive] = useState(false);

     useEffect(() => {
         setSubtotal();
         if(cartArray.length > 0){
            changeShowCart(true);
         }
     }, []);

    const setSubtotal = () =>{
        let sub = 0;
        for(let i = 0; i < cartArray.length; i++){
        sub += (cartArray[i].price * cartArray[i].amount);
        }
        changeSub(sub);
    }

        const fetchInventory = async () => {
            console.log(cartArray);
            let inStock = 0;
            let stockConflict = false;
            for(let i = 0; i <cartArray.length; i++){

                try{
                    const response = await axios.post('http://localhost:3000/checkStock', {sku: cartArray[i].sku});
                    inStock = response.data[0].stock;
                    if(inStock < cartArray[i].amount){
                        stockConflict = true;
                    }
                } catch (error){
                    console.error('Error fetching inventory:', error);
                }
            }
            if(stockConflict == true){
                alert("Inventory Conflicts with current stock");
                window.location.reload();
            } else{
                onReserveClicked();
                }
    }

    function onReserveClicked(){
        changeActive(!active);
    }

    function RemoveFromCart(i){
        removeFromCart(i);
        window.location.reload();
    }

    function changeSubTotal(price){
        changeSub(Subtotal + price);
    }

    const onReserved = async (fname, lname, tel) => {
        let orderObject = [];
        for(let i = 0; i <cartArray.length; i++){
            let newObject = {
                sku: cartArray[i].sku,
                amount: cartArray[i].amount
            }
            orderObject.push(newObject);
        try{
            let order = orderObject;
            await axios.patch('http://localhost:3000/editstock', {sku: order[i].sku, amount: order[i].amount});
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
        }
        console.log(orderObject);
        createOrder(fname, lname, tel, orderObject);
    }

    const createOrder = async(fname, lname, tel, orderObject) => {
        try{
            let order = JSON.stringify(orderObject);
            await axios.post('http://localhost:3000/newOrder', {fname: fname, lname: lname, tel: tel, order: order, status: "pending"});
            clearCart();
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }


    
    
    return(
        <div className="flex flex-col max-w-[100%] min-h-screen max-h-full">
            <Banner />
            <h1 className="text-7xl text-center my-10 border-b-10 border-double rounded-b-3xl">Cart</h1>
            <Reserve 
                total={(Subtotal + (Subtotal * tax)).toFixed(2)}
                active={active}
                onClose={onReserveClicked}
                onSubmit={onReserved}
            />
            <div className="self-center flex justify-center max-w-[50%]">
                <span className="border-1 size-[32px] rounded-2xl bg-green-400"></span>
                <span className="mr-5">No Conflict</span>
                <span className="border-1 size-[32px] rounded-2xl bg-red-500 ml-5"></span>
                <span>Conflict</span>
            </div>
            <div className="grow border-10 border-gray-500 bg-white rounded-3xl m-5">
                {showCart ?
                <div className="flex flex-col">
                    <div className="px-10 md:grid grid-cols-5 gap-auto text-3xl hidden md:visible">
                        <span className=" border-b-5 text-center">Item</span>
                        <span className=" border-b-5 text-center">SKU</span>
                        <span className=" border-b-5 text-center"># in Cart</span>
                        <span className=" border-b-5 text-center">Price</span>
                        <span className=" border-b-5 text-center">SubTotal</span>
                    </div>                
                    {cartArray.map((item, index) => (
                    <CartItem 
                        name={item.name}
                        sku={item.sku}
                        amount={item.amount}
                        price={item.price}
                        key={index}
                        id={index}
                        onDelete={RemoveFromCart}
                        onChangeAmount={changeSubTotal}

                    />
                        ))}
                    <div className="flex flex-wrap w-[30%] place-self-center mt-5">
                        <span className="text-start text-2xl basis-1/2">Subtotal:</span>
                        <span className="text-center text-4xl basis-1/2">${Subtotal.toFixed(2)}</span>
                        <span className="border-b-2 text-start text-2xl basis-1/2">Tax: </span>
                        <span className="border-b-2 text-center text-4xl basis-1/2">+${(Subtotal * tax).toFixed(2)}</span>
                        <span className="text-start text-2xl basis-1/2">Total: </span>
                        <span className="text-center text-4xl basis-1/2">${(Subtotal + (Subtotal * tax)).toFixed(2)}</span>
                    </div>
                    <div className="place-self-center">
                        <button className="border-5 p-5 text-5xl rounded-3xl bg-blue-300 hover:bg-blue-500 active:bg-blue-700 my-5 " onClick={() =>(fetchInventory())}>Reserve</button>
                    </div>
                </div>:
                    <h1 className="text-center mt-[10%] text-5xl">There is nothing in your cart. Visit the products page to add items to your cart!</h1>
                    }

            </div>

            <Footer />
        </div>
        
    )
}

export default Cart;