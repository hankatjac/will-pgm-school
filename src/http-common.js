import axios from "axios";

export default axios.create({
  
  baseURL: "http://localhost:8800/api/",
  // baseURL: "https://odd-puce-turtle-tutu.cyclic.app/api/",
  headers: {
    "Content-type": "application/json"
  }
});
