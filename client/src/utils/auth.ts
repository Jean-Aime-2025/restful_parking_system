import {jwtDecode} from "jwt-decode";
import { getCookie } from "./cookie";
import type { NavigateFunction } from "react-router-dom";

type TokenPayload = {
  role: string;
};

export const redirectBasedOnRole = (navigate: NavigateFunction) => {

  const token = getCookie('auth_token');
  if (!token || token.split('.').length !== 3) {
    console.warn('No valid token found');
    navigate('/login');
    return;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    if (decoded.role?.toLowerCase() == 'admin') {
      navigate('/admin');
    } else if (decoded.role?.toLowerCase() == 'user') {
      navigate('/user');
    } else {
      navigate('/login');
    }
  } catch (err) {
    console.error('Token decode error:', err);
    navigate('/login');
  }
};
