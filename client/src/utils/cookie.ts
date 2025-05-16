import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, hours: number) => {
  Cookies.set(name, value, { expires: hours / 24, path: '/' }); 
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name, { path: '/' });
};

export const logout = () => {
  deleteCookie('auth_token');
  window.location.href = '/login';
};
