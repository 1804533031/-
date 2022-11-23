import axios from 'axios'

const http = axios.create({
  baseURL: 'http://43.143.140.144:81',
  timeout: 7000
})

// const http = axios.create({
//   baseURL: 'http://10.42.60.197:81',
//   timeout: 7000
// })

// const http = axios.create({
//   baseURL: 'http://10.19.16.32:81',
//   timeout: 10000
// })

export default http
