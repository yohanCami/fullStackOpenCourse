import axios from "axios";

const baseUrl = "https://notesexpress.onrender.com/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);

  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };

  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  console.log(newObject);

  return request.then((response) => response.data);
};

// export default {
//   getAll: getAll,
//   create: create,
//   update: update,
// };

export default { getAll, create, update };
