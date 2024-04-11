import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
// import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Authentication = () => {
    // const [email, setEmail] = useState("")
    // const [name, setName] = useState("")
    // const login = useGoogleLogin({
    //     onSuccess: async (response) => {
    //         try {
    //             const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${response.access_token}`,
    //                 },
    //             }
    //             );
    //             console.log(res);
    //             setEmail(res.data.email);
    //             setName(res.data.name)
    //             // const submitForm = res.data.submit
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //   });
    const login = useGoogleLogin({
        onSuccess: credentialResponse => console.log(credentialResponse)
    });
  return (
    <div>
        <Toaster />
        <button onClick={() => login()} className='bg-primary1 rounded-lg '>Sign in with Google 🚀</button>
        {/* <p>{email}</p>
        <p>{name}</p> */}
        <GoogleLogin 
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                axios.post("http://localhost:8888/google-auth", credentialResponse)
                toast({
                    variant: "success",
                    title: "Login with Google Successfully!..",
                });
                // window.location.href = "/"
            }}
            onError={() => {
            console.log("Login Failed");
            }}
            useOneTap
        />
        <button onClick={() => googleLogout()}>Logout</button>
    </div>
    
  )
}

export default Authentication