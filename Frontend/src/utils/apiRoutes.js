export const BASE_URL = process.env.API_URI || 'https://genie-ai0-api.vercel.app';

export const LOGIN = `${BASE_URL}/api/login`;
export const SIGNUP = `${BASE_URL}/api/signup`;

export default BASE_URL;

