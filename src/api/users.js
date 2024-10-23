import axios from "axios";
import { API_URL } from "./config";
const API = axios.create({
  baseURL: "http://localhost:8070" + "/admin",
 // withCredentials: true
});

export const getAllUsers = ()=>API.get(`/getusers`)
export const deleteUserById = (userId) => API.delete(`/deleteuser/${userId}`)
export const updateUserById = (userId, data) => API.put(`/updateuserrole/${userId}`, data)