import mongoose from 'mongoose'
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.methods.generateAuthToken = function()
{
    const priavteKey = process.env.JWT_PRIVATE_KEYJ;
    const token = jwt.sign({
        id: this._id,
        name: this.name,
        picture: this.picture
    }, priavteKey)
};

export const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String }
    // NOTE if you want to make properties from the account public put them here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
