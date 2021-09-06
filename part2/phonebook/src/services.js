import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createPerson = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((res) => res.data);
};

const deletePerson = (obj) => {
  const request = axios.delete(`${baseUrl}/${obj.id}`);
  return request
    .then(() => true)
    .catch((err) => {
      return false;
    });
};

const updatePerson = (obj) => {
  const request = axios.put(`${baseUrl}/${obj.id}`, obj);
  return request.then((res) => res.data);
};

const personService = {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};

export default personService;
