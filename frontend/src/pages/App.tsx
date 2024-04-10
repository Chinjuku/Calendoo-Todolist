'use client';
import Navbar from "../components/Home/Navbar"
import Home from "../components/Home/Home"
import About from "../components/Home/About"
import Contact from "../components/Home/Contact"
import { Element } from 'react-scroll';
import { Toaster } from "@/components/ui/toaster";
import axios from 'axios'
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/user");
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(); 
  }, []);
  return (
    <div className='bg-primary1 h-full w-full'>
      <Toaster />
      <Navbar />
      <Element name="home">
        <Home />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="contacts">
        <Contact />
      </Element>
    </div>
  )
}

export default App
