import CarAPI from './CarApi'

const config = {
    protocol: 'http',
    host: '192.168.1.114',
    port: 5000
}

const API = new CarAPI(config)

export default API
