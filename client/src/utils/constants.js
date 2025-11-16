// const BASE_URL = "http://localhost:3000"
// export default BASE_URL

// const BASE_URL = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL : "http://localhost:3000"; 
// export default BASE_URL

// const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api"; 
// export default BASE_URL
 
let BASE_URL = ""
if (window.location.hostname === "localhost") {
  BASE_URL = "http://localhost:3000";
} else {
  BASE_URL = "https://devmeet-rn7r.onrender.com"; 
}

export default BASE_URL;
