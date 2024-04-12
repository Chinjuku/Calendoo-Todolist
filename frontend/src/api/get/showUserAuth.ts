import axios from "axios";
import { UserData } from "../../composables/apidata.types";

export const showUser = async (): Promise<UserData | undefined> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8888/api/google-auth/getuser', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.user
      const username = data.username
      const email = data.email
      const id = data.id
      return { username, email, id };
    } catch (err) {
      console.error(err);
    }
}