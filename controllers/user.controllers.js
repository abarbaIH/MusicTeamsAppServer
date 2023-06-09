const User = require('./../models/User.model')


const getAllUsers = (req, res, next) => {

    User
        .find()
        // TODO: PROYECTAR
        .then(response => res.json(response))
        .catch(err => next(err))
}


const newUser = (req, res, next) => {

    const { email, password, firstName, lastName, avatar, aboutMe, instrument, level, userDiary } = req.body

    User
        .create({ email, password, firstName, lastName, avatar, aboutMe, instrument, level, userDiary })
        .then(response => res.json(response))
        .catch(err => next(err))

}

const userDetails = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate("friends")
        .populate("venueFavorites")
        .populate("eventsAssisted")
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userEdit = (req, res, next) => {

    const { email, role, firstName, lastName, avatar, aboutMe, instrument, level, venueFavorites, friends } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, role, firstName, lastName, avatar, aboutMe, instrument, level, venueFavorites, friends }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userDelete = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

const userAddVenue = (req, res, next) => {
    const { venue_id } = req.params
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { venueFavorites: venue_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userDeleteVenue = (req, res, next) => {
    const { venue_id } = req.params
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { venueFavorites: venue_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userAddFriend = (req, res, next) => {
    const { user_id } = req.params
    const { friend_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { friends: friend_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userDeleteFriend = (req, res, next) => {
    const { user_id } = req.params
    const { friend_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { friends: friend_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userAssitEvent = (req, res, next) => {
    const { user_id } = req.params
    const { event_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { eventsAssisted: event_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const userChangeRole = (req, res, next) => {
    const { user_id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(user_id, { role }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    getAllUsers,
    newUser,
    userDetails,
    userEdit,
    userDelete,
    userAddVenue,
    userDeleteVenue,
    userAddFriend,
    userDeleteFriend,
    userAssitEvent,
    userChangeRole
}