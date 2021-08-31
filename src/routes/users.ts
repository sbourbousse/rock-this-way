const express = require("express")
const router = express.Router()

const {createUser, authUser, gameSave, getUser, scoreBoard} = require('../controllers/users')

router.post('/', createUser)
router.post('/auth', authUser)
router.post('/:id/game', gameSave)
router.get('/scores', scoreBoard)
router.get('/:id', getUser)

module.exports = router
