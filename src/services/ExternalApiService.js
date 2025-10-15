import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.EXTERNAL_API_BASE || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export async function getExamplePosts() {
  const { data } = await api.get("/posts");
  return data;
}
