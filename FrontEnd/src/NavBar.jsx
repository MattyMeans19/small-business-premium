import React from "react";
import { NavLink } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from "react-router";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function NavBar(props){
    let currentCart = sessionStorage.getItem('cart');
    let cartArray = currentCart ? JSON.parse(currentCart): [];

    return(
        <div className={[`grow flex flex-wrap justify-evenly content-end ${props.text}`]}>
            <p><NavLink to="/"><HomeIcon />Home</NavLink></p>
            <p><NavLink to="/products"><InventoryIcon />Products</NavLink></p>
            <p><NavLink to="/about"><DescriptionIcon />About</NavLink></p>
            <p><NavLink to="/contact"><MailIcon />Contact</NavLink></p>
            <div className="flex flex-nowrap gap-2 text-2xl place-self-center bg-cyan-300 px-5 rounded-full">
                <Link to="/cart"><ShoppingCartIcon /> <span>{cartArray.length}</span></Link> 
            </div>
        </div>
    )
}

export default NavBar;