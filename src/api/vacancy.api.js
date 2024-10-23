import axios from "axios";
import { API_URL } from "./config";
const API = axios.create({
  baseURL:  API_URL + "/vacancy",
 // withCredentials: true
});
export const newVacancy = (vacancy) => API.post("/postVacancy", vacancy);
export const getAllVacancies = () => API.get(`/getAllVacancies`);
export const getAllApplicantsOfVacancy = (vacancyId) => API.get(`/${vacancyId}/allApplicants`);
export const deleteVacancyByID = (vacancyId) => API.delete(`/deleteVacancy/${vacancyId}`)
export const applyToVacancy = (vacancy) => API.post(`/${vacancy.jobId}/apply`, vacancy);
export const getAllApplicants= () => API.get("/allApplicants");
export const getApplicantById= (applicantId) => API.get(`/applicant/${applicantId}`);
export const deleteApplicantById= (applicantId) => API.delete(`/applicant/${applicantId}`);
