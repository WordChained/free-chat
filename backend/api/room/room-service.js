const dbService = require('../../services/db-service')
const ObjectId = require('mongodb').ObjectId
// const asyncLocalStorage = require('../../services/als-service')
const logger = require('../../services/logger-service')



const query = async (filterBy = '{}') => {
    // console.log('FILTER BY', filterBy)
    const criteria = _buildCriteria(JSON.parse(filterBy))
    console.log('criteria:', criteria);
    try {
        const collection = await dbService.getCollection('room')
        var filteredRooms = await collection.find(criteria).toArray()
        var rooms = await collection.find().toArray()
        //Getting the tags when we can get all the rooms
        // if (!Object.keys(criteria).length) {
        //     tags = _getUniqeTags(rooms);
        // }
        return { rooms, filteredRooms };
    } catch (err) {
        logger.error('cannot find rooms', err)
        console.log('Error on room service =>', err)
        throw err
    }
}

const getById = async (roomId) => {
    console.log('roomId:', roomId);
    try {
        const collection = await dbService.getCollection('room')
        const room = await collection.findOne({ '_id': ObjectId(roomId) })
        console.log('room:', room);
        return room
    } catch (err) {
        logger.error(`while finding room ${roomId}`, err)
        console.log('Error on room service =>', err)
        throw err
    }
}

const remove = async (roomId) => {
    try {
        const collection = await dbService.getCollection('room')
        await collection.deleteOne({ '_id': ObjectId(roomId) })
    } catch (err) {
        logger.error(`cannot remove room ${roomId}`, err)
        console.log('Error on room service =>', err)
        throw err
    }
}

const add = async (room) => {
    try {
        const roomToAdd = {
            topic: room.topic,
            name: room.name,
            description: room.description,
            type: room.type,
            owner: room.owner,
            createdAt: Date.now(),
            imgUrl: room.imgUrl || '',
            tags: room.tags || [],
            likedByUsers: room.likedByUsers,
            restrictions: room.restrictions,
            limit: room.limit
        }
        const collection = await dbService.getCollection('room')
        await collection.insertOne(roomToAdd)
        return roomToAdd;
    } catch (err) {
        // logger.error('cannot add room', err)
        console.log('Error on room service =>', err)
        throw err
    }
}

const update = async (room) => {
    try {
        // peek only updatable fields!
        const roomToSave = {
            _id: ObjectId(room._id),
            topic: room.topic,
            name: room.name,
            description: room.description,
            owner: room.owner,
            // createdAt: room.createdAt,
            imgUrl: room.imgUrl || '',
            tags: room.tags,
            msgs: room.msgs || [],
            likedByUsers: room.likedByUsers,
            restrictions: room.restrictions,
            limit: room.limit

        }
        const collection = await dbService.getCollection('room')
        await collection.updateOne({ '_id': roomToSave._id }, { $set: roomToSave })
        return roomToSave;
    } catch (err) {
        // logger.error(`cannot update room ${room._id}`, err)
        console.log('Error on room service =>', err)
        throw err
    }

}


async function getMsgs(roomId) {
    try {
        const room = await getById(roomId);
        const msgs = room.msgs || [];
        return msgs;
    } catch (err) {
        console.log('Cant get messages', err);
    }
}

async function addMsg(roomId, msg) {
    try {
        const collection = await dbService.getCollection('room')
        await collection.updateOne({ '_id': ObjectId(roomId) }, { $push: { 'msgs': msg } })
        return await collection.findOne(ObjectId(roomId));
    } catch (err) {
        // logger.error(`cannot add message ${song.id}`, err)
        console.log('Error on room service =>', err)
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.topic) {
        const nameCriteria = { $regex: filterBy.topic, $options: 'i' }
        criteria.name = nameCriteria;

    }
    if (filterBy.tag && filterBy.tag !== 'All') {
        const tagCriteria = filterBy.tag;
        criteria.tags = tagCriteria
    }
    return criteria
}

// function _getUniqeTags(rooms) {
//     tags = rooms.reduce(
//         (acc, room) => {
//             acc.push(...room.tags);
//             return acc;
//         }, []
//     );
//     return Array.from(new Set(tags));
// }

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    getMsgs,
    addMsg
}