import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  isDeleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date, default: null },
  sub: { type: String },
  email: { type: String },
  password: { type: String },
  name: { type: String },
  role: { type: String },
  preferences: { type: Map, of: String },
  resetPasswordToken: { type: String },
  resetPasswordTokenSentAt: { type: Date, default: null },
  passwordUpdatedAt: { type: Date, default: null },
  emailValidatedAt: { type: Date, default: null },
  emailValidationCode: { type: String },
  cellPhoneNumberValidatedAt: { type: Date, default: null },
  gender: { type: String },
  obs: { type: String }
}, {
  timestamps: true
})

const userModel = model('User', userSchema)

export default userModel
