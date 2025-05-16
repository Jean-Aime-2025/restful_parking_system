import api from "@/lib/api";

interface RegisterPayload {
  names: string;
  email: string;
  telephone: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const register = (data: RegisterPayload) => api.post("/user/create", data);

export const login = (data: LoginPayload) => api.post("/auth/login", data);
