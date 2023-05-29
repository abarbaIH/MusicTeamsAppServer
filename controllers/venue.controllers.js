const Venue = require('./../models/Venue.model')

const getAllVenues = (req, res, next) => {

    Venue
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

const newVenue = (req, res, next) => {

    const { name, address, phone, openingHours, venueImg, features, capacity, description, venueSchedule, manager } = req.body

    Venue
        .create({ name, address, phone, openingHours, venueImg, features, capacity, description, venueSchedule, manager })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const venueDetails = (req, res, next) => {

    const { venue_id } = req.params

    Venue
        .findById(venue_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const venueEdit = (req, res, next) => {

    const { name, address, phone, openingHours, venueImg, features, capacity, description } = req.body
    const { venue_id } = req.params

    Venue
        .findByIdAndUpdate(venue_id, { name, address, phone, openingHours, venueImg, features, capacity, description })
        .then(response => res.json(response))
        .catch(err => next(err))
}
const venueDelete = (req, res, next) => {

    const { venue_id } = req.params

    Venue
        .findByIdAndDelete(venue_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllVenues,
    newVenue,
    venueDetails,
    venueEdit,
    venueDelete
}