import React, {useEffect, useState} from "react"
import Banner from "./Banner"
import TextBox from "./TextBox"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "./constants"

function App() {
  const [dailymessage, changeDailyMessage]= useState("")

      useEffect(() => {
        fetchDailyMessage();
      }, []);

      const fetchDailyMessage = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/message`);
            changeDailyMessage(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }
  return(
    <div className="flex flex-col max-w-[100%] min-h-screen max-h-full">
      <Banner />
      <div className=" grid grid-cols-6 grid-rows-auto gap-10 mb-10 grow">
        <TextBox 
          content="It can contain as many of these Text Boxes or images as you need!"
          grid= "col-start-1 col-span-3 row-start-1"
          text= "text-l lg:text-5xl tracking-widest"
        />
        <TextBox 
          content="With a variety on info about you products and services!"
          grid= "row-start-1 col-start-4 col-span-3"
          text= "text-l lg:text-4xl"
        />
        <TextBox 
          content="The layout of these boxes and images can be customized as needed!"
          grid= "row-start-2 col-start-2 col-span-4"
          text= "text-l lg:text-2xl text-center"
        />
        <TextBox 
          content="Text size and color can be custom too!"
          grid= "row-start-3 col-start-3 col-span-2 place-content-center"
          text= "text-sm text-center text-red-800 lg:text-base"
        />
        <TextBox 
          content={dailymessage}
          grid= "row-start-4 col-start-2 col-span-4 place-content-center"
          text= "text-l lg:text-5xl tracking-widest"
        />
      </div>
      <Footer />
    </div>
  )
}

export default App
