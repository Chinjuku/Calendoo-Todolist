import axios from "axios";

export const showDate = async (userId: string | undefined) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:8888/api/note/showdate/${userId}`);
            const data = response.data
            if(response.status === 200) {
              return data
            } else {
              return []
            }
        }
    } catch (err) {
      console.error(err);
    }
}
