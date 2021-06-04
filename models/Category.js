const mongoose = require('mongoose')

const { Schema } = mongoose

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: 'Cannot enter a Category without name',
    },

    products: [
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

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
