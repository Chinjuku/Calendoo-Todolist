import axios from "axios";
import { UserData } from "../../composables/apidata.types";

export const showUser = async (): Promise<UserData | undefined> => {
    try {
      const gettoken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8888/api/google-auth/getuser', {
        headers: {
            Authorization: `Bearer ${gettoken}`,
        },
      });
      const data = response.data.user
      const username = data.username
      const email = data.email
      const id = data.id
      const token = data.token
      return { username, email, id, token };
    } catch (err) {
      console.error(err);
    }
}