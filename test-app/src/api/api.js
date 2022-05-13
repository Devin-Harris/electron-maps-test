const BASE_URL = (location.hostname === "localhost") ? "http://localhost:3001" : process.env.PROD_BACKEND_BASEURL
export default BASE_URL