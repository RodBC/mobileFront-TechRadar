import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333',
});
//exp://6r-wyr.anonymous.uberzada.exp.direct:80
export default api;