class UserIdHolder {
    constructor() {
        this.userId = this.generateRandomUserId(10)
    }

    generateRandomUserId(length) {
        var result = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    provide() {
        return this.userId
    }
}

const userIdHolder = new UserIdHolder()

export default userIdHolder
