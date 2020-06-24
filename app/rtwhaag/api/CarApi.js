class CarAPI {
    constructor(config) {
        this.url = `${config.protocol}://${config.host}:${config.port}`
        console.log(this.url)
        
    }

    async steer(target) {
        try {
            const res = await fetch(`${this.url}/steer/${target}`)
            console.log(await res.text())
        } catch {
            console.log(`server unreachable ${this.url}`)
        }
        
    }

    async accelerate() {
        try {
            const res = await fetch(`${this.url}/accelerate`)
            console.log(await res.text())
        } catch {
            console.log(`server unreachable ${this.url}`)
        }
        
    }

    async break() {
        try {
            const res = await fetch(`${this.url}/break`)
            console.log(await res.text())
        } catch {
            console.log(`server unreachable ${this.url}`)
        }
    }

    async toggleSS() {
        try {
            const res = await fetch(`${this.url}/toggle_lights`)
            console.log(await res.text())
        } catch {
            console.log(`server unreachable ${this.url}`)
        }
    }
}

export default CarAPI