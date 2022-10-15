import type { InferSchemaType, Model, ValidatorProps } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true
    },
    givenName: {
      type: String,
      required: true,
      trim: true
    },
    familyName: {
      type: String,
      required: false,
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
export const User: Model<IUser, {}, {}, {}, typeof schema> = models['User'] ?? model('User', schema)

export default User
