import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:8800/api/",
  baseURL: "https://charming-fox-cuff-links.cyclic.app/api",
  withCredentials: true,
});

export default newRequest;
