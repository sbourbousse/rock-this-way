const express = require("express")
const router = express.Router()

const {createUser, authUser} = require('../controllers/users')

router.post('/', createUser)
router.post('/auth', authUser)

module.exports = router
