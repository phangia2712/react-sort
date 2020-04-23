import axios from 'axios'

export default class fetchAxios {
    static getData () {
        return axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .catch(this.showError)
    }
    static showError (err) {
        console.log(err)
    }
}