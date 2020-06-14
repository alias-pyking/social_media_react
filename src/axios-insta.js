import axios from 'axios';

const instance = axios.create({
    baseURL:'http://instaclone.pythonanywhere.com/api/',
});
export default instance