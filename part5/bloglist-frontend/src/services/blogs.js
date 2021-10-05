import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
let config = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
}

const getAll = () => {
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
};

const create = async (newObj) => {
  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
};

const update = async (id, newObj) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObj, config);
  return request.data;
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
};

const blogService = { getAll, create, update, setToken, remove };

export default blogService;