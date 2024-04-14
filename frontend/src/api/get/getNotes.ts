import axios from "axios";
import { UserData } from "../../composables/apidata.types";

export const showUser = async (): Promise<UserData | undefined> => {
    try {
      const response = await axios.get('http://localhost:8888/api/note/show');
      const data = response.data.user
      const username = data.username
      const email = data.email
      const id = data.id
      const profile = data.profile
      return { username, email, id, profile };
    } catch (err) {
      console.error(err);
    }
}