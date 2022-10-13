import type { InferSchemaType, ValidatorProps } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) => isEmail(v),
        message: (props: ValidatorProps) => `${props.value} is not a valid email address.`
      },
      set: (v: string) => normalizeEmail(v),
      unique: true,
      uniqueCaseInsensitive: true
    },
    password: {
      type: String,
      required: true
    },
    lastLogin: {
      type: Date,
      required: false
    },
    // JWT used for email verification
    verificationToken: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      required: false,
      default: false
    },
    // JWT used for password resets
    resetToken: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

// find+update queries need { runValidators: true, context: 'query' } for this to work on update
schema.plugin(uniqueValidator)

export type IUser = InferSchemaType<typeof schema>

// This `??` makes sure models are never defined twice
export const User = models['User'] ?? model('User', schema)

export default User
