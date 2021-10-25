const logger = require('../../services/logger-service')
const roomService = require('../room/room-service')
const socketService = require('../../services/socket-service(old)')


const getRooms = async (req, res) => {
    try {
        const { filterBy } = req.query;
        // console.log('filterBy', filterBy);
        const data = await roomService.query(filterBy)
        res.send(data)
    } catch (err) {
        logger.error('Cannot get rooms', err)
        // console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to get rooms' })
    }
}

const getRoom = async (req, res) => {
    try {
        const room = await roomService.getById(req.params.id)
        res.send(room)
    } catch (err) {
        logger.error('Failed to get room', err)
        console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to get room' })
    }
}

const deleteRoom = async (req, res) => {
    try {
        await roomService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete room', err)
        console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to delete room' })
    }
}


const addRoom = async (req, res) => {
    try {
        const room = req.body
        savedRoom = await roomService.add(room)
        // socketService.broadcast({ type: 'room-added', data: savedRoom })
        res.send(savedRoom)

    } catch (err) {
        logger.error('Failed to add room', err)
        console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to add room' })
    }
}




const updateRoom = async (req, res) => {
    try {
        const room = req.body
        const savedRoom = await roomService.update(room)
        // socketService.emitTo({ type: 'room updated1', data: savedRoom, label: room._id });
        res.send(savedRoom)
    } catch (err) {
        logger.error('Failed to update room', err)
        console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to update room' })
    }
}


const getMsgs = async (req, res) => {
    try {
        const unfilteredMsgs = await roomService.getMsgs(req.params.id);
        const msgs = [...new Set(unfilteredMsgs)]
        res.send(msgs)
    } catch (err) {
        logger.error('Cannot get messages', err)
        console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to get messages' })
    }
}

const addMsg = async (req, res) => {
    try {
        const newMsg = req.body;
        const savedRoom = await roomService.addMsg(req.params.id, newMsg);
        res.send(savedRoom);

    } catch (err) {
        logger.error('Failed to add a message to this room', err)
        console.log('Error on room controller =>', err)
        res.status(500).send({ err: 'Failed to add a message to this room' })
    }
}

module.exports = {
    getRooms,
    getRoom,
    deleteRoom,
    addRoom,
    updateRoom,
    getMsgs,
    addMsg
}