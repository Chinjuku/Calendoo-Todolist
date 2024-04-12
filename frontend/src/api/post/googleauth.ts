// import axios from "axios";
// import { toast } from "@/components/ui/use-toast";
// const showUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:8888/api/google-auth/getuser', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//     }
// }
// export const handleGoogleLogin = async (credentialResponse: unknown) => {
//     try {
//       console.log(credentialResponse);
//       const response = await axios.post("http://localhost:8888/api/google-auth/google-login", credentialResponse);
//       if (response.status == 200) {
//         toast({
//           variant: "success",
//           title: "Login with Google Successfully!..",
//         });
//         localStorage.setItem("token", response.data.token);
//         showUser()
//       } else {
//         toast({
//             variant: "destructive",
//             title: "Login Google Failure!",
//           });
//       }
//     } catch (error) {
//       console.error("Error during Google Login:", error);
//       localStorage.removeItem("token");
//       toast({
//         variant: "destructive",
//         title: "An error occurred. Please try again.",
//       });
//     }
// };