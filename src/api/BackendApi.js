import axios from 'axios'

const backendUrl = 'http://84.201.128.37:3227/'

class BackedApi {
    saveUserData(userData) {
        return axios.post(backendUrl + 'setUserData', userData)
            .then(data => data.data)
    }
}

const backendApi = new BackedApi()

export default backendApi
