import axios from "axios";

export const updateStar = async (isStarred: boolean, boardId: string, projectId: string | undefined) => {
    const data = {
        isStarred: !isStarred,
        projectId: projectId,
        boardId: boardId
    }
    // console.log(data);
    try {
        const star = await axios.put("http://localhost:8888/api/board/updatestar", data)
        return star.data
    } catch (err) {
        console.error(err)
    }

}