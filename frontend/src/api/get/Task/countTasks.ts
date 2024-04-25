import axios from "axios";

export const countTasks = async (projectId : string) => {
    try {
        if (projectId) {
            const res = await axios.get(`http://localhost:8888/api/task/counttask/${projectId}`)
            const data = res.data._count
            if(res.status === 200) {
                return data
            } else {
                return 0
            }
        }   
    } catch (err) {
        console.error(err)
    }
}