// const BASE_URL = "http://localhost:3000"
// export default BASE_URL

const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api"; 
export default BASE_URL