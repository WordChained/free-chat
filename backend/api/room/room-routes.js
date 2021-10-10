const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addRoom, updateRoom, getRooms, getRoom, deleteRoom, getMsgs, addMsg } = require('./room-controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getRooms)
router.get('/:id/', getRoom)
router.post('/', addRoom)
router.put('/', updateRoom)
router.get('/chat/:id', getMsgs)
router.post('/chat/:id', addMsg)
router.delete('/:id', deleteRoom)

module.exports = router