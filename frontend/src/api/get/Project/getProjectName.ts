import axios from "axios";

export const showProjectName = async (projectId: string | undefined) => {
    try {
        if (projectId) {
            const response = await axios.get(`http://localhost:8888/api/project/showprojectname/${projectId}`);
            const data = response.data
            console.log(data);
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