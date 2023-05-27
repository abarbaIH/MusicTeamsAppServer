const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Por favor, indica una dirección de correo electrónico'],
      trim: true,
      lowercase: true,
      validate: {
        validator: value => value.includes("@"),
        message: 'Por favor, indica un email correcto'
      }
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Tu clave no es suficientemente segura, debe tener más de 3 carácteres']
    },

    firstName: {
      type: String,
      trim: true,
      required: [true, 'Por favor, indica tu nombre'],
      set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, 'Por favor, indica tu apellido'],
      set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },

    role: {
      type: String,
      enum: ['Manager', 'Musician', 'Admin'],
      default: 'Musician'
    },

    profileImg: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png',
    },

    aboutMe: {
      type: String,
      maxlength: [500, 'Has superado el máximo de caracteres (500)'],
    },

    instruments: {
      type: String,
      required: [true, 'Por favor, selecciona el instrumento que vas a practicar'],
      enum: ['Guitarra', 'Bajo', 'Violín', 'Piano', 'Batería', 'Saxofón', 'Trompeta', 'Percusión']
    },

    level: {
      type: Number,
      require: [true, 'Por favor, selecciona tu nivel de experiencia'],
      enum: [1, 2, 3, 4, 5]
    },

    eventsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],

    eventsAssisted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],

    venuesCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Venue'
      }
    ],

    venueFavorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Venue'
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    // CAMPOS PARA ESCALABILIDAD
    userDiary: {
      type: Schema.Types.ObjectId,
      ref: 'Calendar'
    },

    opinions: [
    ],

    rating: {
      type: Number
    },

    valuation: [
    ]
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User