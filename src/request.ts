import axios from 'axios'

const request = axios.create({
    baseURL: 'http://51.136.52.85:8080/',
})

export {
    request,
}