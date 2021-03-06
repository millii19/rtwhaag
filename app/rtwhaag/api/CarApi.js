class CarAPI {
    constructor(config) {
        this.url = `${config.protocol}://${config.host}:${config.port}`
    }

    async reachable() {
        try {
            const res = await fetch(`${this.url}/`)
            const text = await res.text()
            return true
        } catch {
            console.log(`server unreachable ${this.url}`)
            return false
        }
        
    }

    async steer(target) {
        try {
            const res = await fetch(`${this.url}/steer/${target}`)
            console.log(await res.text())
        } catch {
            //console.log(`server unreachable ${this.url}`)
        }
        
    }

    async accelerate(target) {
        try {
            const res = await fetch(`${this.url}/accelerate/${target}`)
            console.log(await res.text())
        } catch {
            //console.log(`server unreachable ${this.url}`)
        }
        
    }

    async break() {
        try {
            const res = await fetch(`${this.url}/break`)
            console.log(await res.text())
        } catch {
            //console.log(`server unreachable ${this.url}`)
        }
    }

    async shutdown() {
        console.log(this.url)
        try {
            const res = await fetch(`${this.url}/shutdown`)
            console.log(await res.text())
        } catch {
            //console.log(`server unreachable ${this.url}`)
        }
    }

    async toggleSS() {
        try {
            const res = await fetch(`${this.url}/toggle_lights`)
            console.log(await res.text())
        } catch {
            //console.log(`server unreachable ${this.url}`)
        }
    }
}

export default CarAPI