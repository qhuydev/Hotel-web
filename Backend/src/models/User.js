import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    // New: isAdmin replaces isPremium
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Keep isPremium for backward compatibility with old DB records
    isPremium: {
      type: Boolean,
      default: undefined,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // If legacy `isPremium` exists and `isAdmin` is undefined, map it
        if ((ret.isAdmin === undefined || ret.isAdmin === null) && typeof ret.isPremium !== 'undefined') {
          ret.isAdmin = !!ret.isPremium
        }
        // Remove legacy field from serialized output
        delete ret.isPremium
        return ret
      }
    }
  }
)

export default mongoose.model('User', userSchema)
