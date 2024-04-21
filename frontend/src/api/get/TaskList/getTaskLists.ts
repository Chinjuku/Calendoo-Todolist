import axios from "axios";

export const showTaskLists = async (boardId: string | undefined) => {
    try {
        if (boardId) {
            const response = await axios.get(`http://localhost:8888/api/tasklist/show/${boardId}`);
            const data = response.data
            // console.log(data);
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