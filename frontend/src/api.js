import axios from "axios";


const API_BASE = "http://localhost:5000";  // Correct

export const getRecommendations = async (category) => {
  const res = await axios.get(`${API_BASE}/recommend`, {
    params: { category }
  });
  return res.data;
};
