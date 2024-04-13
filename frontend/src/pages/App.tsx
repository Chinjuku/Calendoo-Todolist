'use client';
import Navbar from "../components/Home/Navbar"
import Home from "../components/Home/Home"
import About from "../components/Home/About"
import Contact from "../components/Home/Contact"
import { Element } from 'react-scroll';
import { Toaster } from "@/components/ui/toaster";
import { UserContextProvider } from "@/contexts/api-get/UserContext";


function App() {
    // userData?.id
    // userData?.username
    // userData?.email
    // const showUser = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     const response = await axios.post("http://localhost:8888/api/google-auth/refresh", {
    //       headers: {
    //           Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     if(response.status == 403) {
    //       console.log("User not autorized")
    //     }
    //     console.log(response);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  return (
    <>
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
        </div>
      </UserContextProvider>
    </>
  )
}

export default App
