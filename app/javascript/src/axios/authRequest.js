import axios from 'axios';

const authRequest = axios.create({
	baseURL: 'api/v1',
});


authRequest.interceptors.request.use((request)=> {
	request.headers.common['Authorization'] =  `${localStorage.Authorization}`;
}, (error)=> {
		return Promise.reject(error)
})

export default authRequest;
