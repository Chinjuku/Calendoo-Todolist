'use client';
import Navbar from "../components/Home/Navbar"
import Home from "../components/Home/Home"
import About from "../components/Home/About"
import Contact from "../components/Home/Contact"
import { Element } from 'react-scroll';
import { Toaster } from "@/components/ui/toaster";

function App() {
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
