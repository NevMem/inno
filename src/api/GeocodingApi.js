import axios from 'axios'

const API_KEY = 'AIzaSyCXVILzctXz8Piwa_EASrbmCvHmQTUSy_4'

class GeocodingApi {
    getPositionByAddress(address) {
        return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + API_KEY)
            .then(data => data.data)
    }
}

const geocodingApi = new GeocodingApi()

export default geocodingApi
