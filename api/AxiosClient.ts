import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://10.0.231.57:5000",
})