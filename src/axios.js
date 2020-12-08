import axios from 'axios'

const http=axios.create({
    baseURL:"http://localhost:8011"
})

export default http