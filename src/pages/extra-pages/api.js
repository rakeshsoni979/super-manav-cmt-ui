import axios from 'axios';
import { API_BASE_URL, ACCESS_BASE_URL } from './SamplePageConstants';
import { Auth } from 'aws-amplify';

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

export const makeAuthApi = async ({ api, data, method }) => {
  const session = await Auth.currentSession();
  let response;
  if (method === 'POST') {
    response = await axios.post(`${ACCESS_BASE_URL}/api/${api}`, data, {
      headers: {
        idtoken: session.getIdToken().getJwtToken(),
      },
    });
  } else {
    response = await axios.get(`${ACCESS_BASE_URL}/api/${api}`, {
      headers: {
        idtoken: session.getIdToken().getJwtToken(),
      },
    });
  }
  return response;
};

export const updateConfig = async (data, idToken) => {
  return await axios.post(UPDATE_URL, data, {
    headers: {
      idtoken: idToken,
    },
  });
};
