import CarAPI from './CarApi'

const config = {
    protocol: 'http',
    host: '192.168.43.23',
    port: 5000
}

const API = new CarAPI(config)

export default API
