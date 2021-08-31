const express = require("express")
const router = express.Router()

const {createUser, authUser, gameSave, getUser} = require('../controllers/users')

router.post('/', createUser)
router.post('/auth', authUser)
router.post('/:id/game', gameSave)
router.get('/:id', getUser)

module.exports = router
