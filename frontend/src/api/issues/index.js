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