import axios from "axios";

export const queryDate = async (userId: string | undefined, getdate: string) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:8888/api/note/showdatenote/${userId}/${getdate}`);
            // console.log(getdate);
            const result = response.data
            console.log(result);
            if(response.status === 200) {
              return result
            } else {
              return []
            }
            
        }
    } catch (err) {
      console.error(err);
    }
}