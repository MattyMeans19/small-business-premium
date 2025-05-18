import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import About from './About.jsx';
import Contact from './Contact.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';
import BusinessPortal from './BusinessPortal.jsx';
import Inventory from './Inventory.jsx';
import DailyMessage from './DailyMessage.jsx';
import Admin from './AdminTools.jsx';
import Dashboard from './Dashboard.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/business-portal">
        <Route index element={<BusinessPortal />}/>
          <Route path="orders" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="dailymessage" element={<DailyMessage />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
