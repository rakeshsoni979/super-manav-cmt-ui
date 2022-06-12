import axios from 'axios';
import { API_BASE_URL } from './SamplePageConstants';

export const DASH_BOARD_URL = `${API_BASE_URL}/api/cmt/get-all`;
export const SAVE_URL = `${API_BASE_URL}/api/cmt/save`;
export const UPDATE_URL = `${API_BASE_URL}/api/cmt/update-config/`;

export const getConfig = async (region) => {
  const data = await axios.get(`${DASH_BOARD_URL}?region=${region}`);
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

// {
//   "_id": "62a4f72977979a833c3dfe87",
//   "lastUpdatedBy":"ngupta",
//   "applicationName":"pop",
//       "env":"ftr",
//    "currentConfig": {
//       "0":{
//          "port":"80",
//           "credentialsFile":"I am raw json data stored in a file"
//       },
//       "1": {
//           "anotherPort":"8000080"
//       },
//       "2": {
//           "port":"8080"
//       },
//        "3":{
//           "postUrl":"https://jsonplaceholder.typicode.com/posts",
//           "port": "90"
//       }
//   }
// }
