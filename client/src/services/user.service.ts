import api from "@/lib/api";

export const getUser = () => {
  return api.get('/user/me');
};