import axios from 'axios';
import { API_BASE_URL, ACCESS_BASE_URL } from './SamplePageConstants';

export const DASH_BOARD_URL = `${API_BASE_URL}/api/cmt/get-all`;
export const SAVE_URL = `${API_BASE_URL}/api/cmt/save`;
export const UPDATE_URL = `${API_BASE_URL}/api/cmt/update-config/`;
export const VERSION_URL = `${API_BASE_URL}/api/cmt/get-config`;
export const ACCESS_URL = `${ACCESS_BASE_URL}/api/auth/request-access`;


export const getConfigVersion = async (appId) => {
  const data = await axios.get(`${VERSION_URL}?appId=${appId}`);
  return data;
};

export const saveConfig = async (data) => {
  return await axios.post(SAVE_URL, data);
};

export const updateConfig = async (data, idToken) => {
  return await axios.post(UPDATE_URL, data, {
    headers: {
      idtoken: idToken,
    },
  });
};
