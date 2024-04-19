'use client';
import Navbar from "../components/Home/Navbar"
import Home from "../components/Home/Home"
import About from "../components/Home/About"
import Contact from "../components/Home/Contact"
import { Element } from 'react-scroll';
import { Toaster } from "@/components/ui/toaster";
import { UserContextProvider } from "@/contexts/api-get/UserContext";
import { AuthProvider } from "@/middleware/useAuth";
import { CookieConsents } from "@/components/Home/CookieConsent";

function App() {
  return (
    <>
      <AuthProvider>
        <UserContextProvider>
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
            <CookieConsents />
          </div>
        </UserContextProvider>
      </AuthProvider>
    </>
  )
}

export default App
