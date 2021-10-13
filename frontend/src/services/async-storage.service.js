// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socketService'




const query = (entityType) => {
    let entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}


const get = async (entityType, entityId) => {
    const entities = await query(entityType)
    return entities.find(entity => entity._id === entityId)
}
async function post(entityType, newEntity) {
    newEntity._id = _makeId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}
// const postMany = (entityType, newEntities) => {
//     return query(entityType)
//         .then(entities => {
//             newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
//             entities.push(...newEntities)
//             _save(entityType, entities)
//             return newEntities
//         })
// }



const put = async (entityType, updatedEntity) => {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

const remove = async (entityType, entityId) => {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
}


const _save = (entityType, entities) => {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

const _makeId = (length = 5) => {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}


