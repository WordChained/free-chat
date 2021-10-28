const authService = require('./auth-service')
const logger = require('../../services/logger-service')

const login = async (req, res) => {
    //with a get request. just as a test for heroku!:
    // const { userName, password } = req.query
    //with a normal post request:
    const { userName, password } = req.body
    try {
        const user = await authService.login(userName, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

const signup = async (req, res) => {
    try {
        const { userName, password, fullName, imgUrl, likedRooms, birthday, email, sex, createdAt } = req.body
        // Never log passwords
        // logger.debug(fullName + ', ' + userName + ', ' + password)

        const account = await authService.signup(userName, password, fullName, imgUrl, likedRooms, birthday, email, sex, createdAt)
        logger.debug(`auth-route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(userName, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy()
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}