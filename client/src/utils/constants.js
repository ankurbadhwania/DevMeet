// const BASE_URL = "http://localhost:3000"
// export default BASE_URL

const BASE_URL = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL : "http://localhost:3000"; 
export default BASE_URL