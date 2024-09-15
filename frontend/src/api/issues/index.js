import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const getIssues = async () => {
    const response = await instance.get('/issues/');
    let arr = response && response.data ? response.data.data : []
    return arr
}


export const createIssue = async (issue) => {
    const response = await instance.post('/issues/', issue);
    let obj = response && response.data ? response.data.data : {}
    return obj
}

export const updateIssue = async ({ id, title, description }) => {
    try {
        const response = await instance.post(`/issues/${id}/`, { title, description });
        let obj = response && response.data ? response.data.data : null
        return obj
    } catch (error) {
        console.error(error);
    }
}

export const deleteIssue = async (id) => {
    try {
        await instance.delete(`/issues/${id}/`);
        return true
    } catch (error) {
        console.error(error);
    }
}