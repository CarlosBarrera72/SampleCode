import { API_HOST_PREFIX } from '../services/serviceHelpers';
import axios from 'axios';

const addProfile = (payload) => {
    const config = {
        method: 'POST',
        url: `${API_HOST_PREFIX}/api/userProfiles`,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const updateProfile = (payload) => {
    const config = {
        method: 'PUT',
        url: `${API_HOST_PREFIX}/api/userProfiles/${payload.id}`,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getProfiles = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${API_HOST_PREFIX}/api/userProfiles/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const searchProfile = (pageIndex, pageSize, query) => {
    const config = {
        method: 'GET',
        url: `${API_HOST_PREFIX}/api/userProfiles/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getCurrentProfile = () => {
    const config = {
        method: 'GET',
        url: `${API_HOST_PREFIX}/api/userProfiles/current`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const userProfileServices = {
    addProfile,
    getProfiles,
    updateProfile,
    getCurrentProfile,
    searchProfile,
};

export default userProfileServices;
