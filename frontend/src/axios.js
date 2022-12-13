import axios from "axios";

// used in production
// const api = axios.create({
//   baseURL: "https://life-booster.herokuapp.com/",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Headers": "*",
//     "Access-Control-Allow-Credentials": true,
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// });

// used in development
const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export default api;
