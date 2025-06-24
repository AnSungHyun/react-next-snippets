// utils/tokenManager.ts
import Cookies from 'js-cookie';

export const TokenManager = {
  setAccessToken: (token: string) => {
    Cookies.set('accessToken', token, {
      expires: 7,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  },

  getAccessToken: () => {
    return Cookies.get('accessToken');
  },

  removeAccessToken: () => {
    Cookies.remove('accessToken', { path: '/' });
  }
};