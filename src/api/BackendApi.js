import axios from 'axios'
import userIdHolder from '../data/UserId';

const backendUrl = 'http://84.201.128.37:3227/'

class BackedApi {
    saveUserData(userData) {
        return axios.post(backendUrl + 'setUserData', { ...userData, userId: userIdHolder.provide() })
            .then(data => data.data)
    }

    search(query) {
        return axios.post(backendUrl + 'search', { search_str: query, userIdHolder: userIdHolder.provide() })
            .then(data => data.data)
    }
}

const backendApi = new BackedApi()

export default backendApi
