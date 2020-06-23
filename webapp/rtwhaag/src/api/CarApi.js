import bent from 'bent'

const get = bent('string')

class CarAPI {
    constructor(config) {
        this.url = `${config.protocol}://${config.host}:${config.port}`
    }

    async steer(target) {
        
        const res = await get(`${this.url}/steer/${target}`)
        console.log(res)
    }

    async accelerate() {
        const res = await get(`${this.url}/accelerate`)
        console.log(res)
    }

    async break() {
        const res = await get(`${this.url}/break`)
        console.log(res)
    }
}

export default CarAPI