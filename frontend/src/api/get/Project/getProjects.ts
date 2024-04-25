import axios from "axios";

export const showProjects = async (userId: string | undefined) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:8888/api/project/show/${userId}`);
            const data = response.data
            // console.log(data);
            if(response.status === 201) {
              return data
            } else {
              return []
            }
        }
    } catch (err) {
      console.error(err);
    }
}