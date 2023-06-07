export const basicAuthHeader = `basic ${btoa(
  `${JSON.parse(localStorage.getItem("user"))?.email}:${
    JSON.parse(localStorage.getItem("user"))?.password
  }`
)}`;
