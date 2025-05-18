import React from "react";
import Banner from "./Banner";
import TextBox from "./TextBox";
import Footer from "./Footer";

function About(){
    return(
        <div className="flex flex-col max-w-[100%] min-h-screen">
            <Banner />
            <div className="grow grid grid-cols-6 grid-rows-8 gap-10">
                <TextBox 
                  content="It will function just like your main page."
                  grid= "col-start-1 col-span-3 row-start-1 row-span-2"
                  text= "text-l lg:text-5xl tracking-widest"
                />
                <TextBox 
                  content="Presenting however many sections you may need."
                  grid= "col-start-3 col-span-3 row-start-3 row-span-2"
                  text= "text-l lg:text-5xl tracking-widest"
                />
                <TextBox 
                  content="Letting your customers know all about your company and its values!."
                  grid= "col-start-4 col-span-3 row-start-5 row-span-3"
                  text= "text-l lg:text-5xl tracking-widest"
                />
            </div>
        <Footer />
        </div>
    )
}

export default About;