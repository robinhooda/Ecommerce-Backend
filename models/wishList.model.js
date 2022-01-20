const mongoose = require('mongoose')

const { Schema } = mongoose

const wishListSchema = new Schema(
  {
    _id: {
      type: String,
    },
    wishlistItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const WishList = mongoose.model('WishList', wishListSchema)
module.exports = WishList
