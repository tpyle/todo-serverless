import Axios from 'axios';

const localInstance = Axios.create({ withCredentials: true });

localInstance.interceptors.request.use(config => {
    config.url = `${process.env.REACT_APP_API_ROOT || ""}/v1${config.url}`;
    return config;
});

export const getItems = async () => {
    let res = await localInstance({ method: 'GET', url: `/item` });
    return res.data;
};
  
export const getItem = async (id) => {
    let res = await localInstance({ method: 'GET', url: `/item/${id}` })
    return res.data;
};

export const delItem = async (id) => {
    let res = await localInstance({ method: 'DELETE', url: `/item/${id}` });
    return res.data;
};

export const createItem = async (title, description) => {
    let res = await localInstance({ method: 'POST', url: `/item`, data: { title, description } });
    return res.data;
};

export const updateItem = async (id, { title, description, status }) => {
    let res = await localInstance({ method: 'PUT', url: `/item/${id}`, data: { description, status, title } });
    return res.data;
};
