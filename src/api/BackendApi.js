import axios from 'axios'
import userIdHolder from '../data/UserId';

const backendUrl = 'http://84.201.128.37:3227/'

class BackedApi {
    saveUserData(userData) {
        return axios.post(backendUrl + 'setUserData', { ...userData, uid: userIdHolder.provide() })
            .then(data => data.data)
    }

    search(query) {
        return axios.post(backendUrl + 'search', { search_str: query, uid: userIdHolder.provide() })
            .then(data => data.data)
    }

    addBook(book) {
        return axios.post(backendUrl + 'add-book', { book: book, uid: userIdHolder.provide() })
            .then(data => data.data)
    }

    recommend() {
        return axios.post(backendUrl + 'recommend', { uid: userIdHolder.provide() })
            .then(data => data.data)
    }
}

const backendApi = new BackedApi()

export default backendApi
