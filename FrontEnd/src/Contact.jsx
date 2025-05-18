import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";

function Contact(){

    return(
        <div  className="flex flex-col min-w-screen max-w-[100%] min-h-screen">
            <Banner />
            <div className="text-l lg:text-5xl flex flex-col m-[2%] px-10 grow border-double border-5 bg-gray-300">
                <h1 className="justify-self-start mb-[10%] text-center">You could have a brief message encouraging customers/clients to contact you at the provided links!</h1>
                <p className="place-self-center mb-[2%]">Call @: <a href="tel:+1555-555-5555" className="text-blue-400">+1555-555-5555</a></p>
                <p className="place-self-center mb-[2%]">or</p>
                <p className="place-self-center mb-[2%]">Email @: <a href="mailto:email@yourbusinessemail.com" className="text-blue-400">email@yourbusinessemail.com</a></p>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;