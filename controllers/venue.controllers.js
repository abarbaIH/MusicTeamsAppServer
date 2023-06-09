const Venue = require('./../models/Venue.model')
const User = require('./../models/User.model')

const getAllVenues = (req, res, next) => {

    Venue
        .find()
        .populate('eventsList')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const newVenue = (req, res, next) => {

    const { name, address, phone, openingHours, venueImg, features, capacity, description, latitud, longitud } = req.body
    const { _id: manager } = req.payload
    const location = {
        type: address,
        coordinates: [latitud, longitud]
    }

    Venue
        .create({ name, address, phone, openingHours, venueImg, features, capacity, description, manager, location })
        .then(venue => {
            const venue_id = venue._id
            return Promise.all([
                User.findByIdAndUpdate(manager, { $addToSet: { venuesCreated: venue_id } }),
            ])
        })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const venueDetails = (req, res, next) => {

    const { venue_id } = req.params

    Venue
        .findById(venue_id)
        .populate('manager')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const venueEdit = (req, res, next) => {

    const { name, address, phone, openingHours, venueImg, features, capacity, description } = req.body
    const { venue_id } = req.params

    Venue
        .findByIdAndUpdate(venue_id, { name, address, phone, openingHours, venueImg, features, capacity, description }, { new: true })
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

const checkAvailability = (req, res, next) => {

    const { venue_id, requested_date } = req.params

    Venue
        .findById(venue_id)
        .populate('eventsList')
        .then(({ eventsList }) => {
            const isUnavailable = eventsList.some(elm => {
                const dateObj = new Date(requested_date)
                const dateObj2 = new Date(elm.eventDate)
                return dateObj2.getTime() == dateObj.getTime()
            })
            res.json(isUnavailable)
        })
        .catch(err => next(err))
}

const getFilterVenuesByName = (req, res, next) => {
    const name = req.query


    Venue
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllVenues,
    newVenue,
    venueDetails,
    venueEdit,
    venueDelete,
    checkAvailability,
    getFilterVenuesByName
}