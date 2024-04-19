import axios from "axios";

export const showFirstBoard = async (projectId: string | undefined) => {
    try {
        if (projectId) {
            const response = await axios.get(`http://localhost:8888/api/board/showfirst/${projectId}`);
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
