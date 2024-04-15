import axios from "axios";

export const countAllNotes = async (userId: string | undefined) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:8888/api/note/show/countallnote/${userId}`);
            const data = response.data._count
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

export const countToday = async (userId: string | undefined) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:8888/api/note/show/counttoday/${userId}`);
            const data = response.data._count
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

export const countList = async (userId: string | undefined, listId: string) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:8888/api/note/show/countlist/${userId}/${listId}`);
            const data = response.data._count
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