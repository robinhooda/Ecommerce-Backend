const mongoose = require('mongoose')
const { Schema } = mongoose

require('mongoose-type-url')

const productSchema = new Schema(
  {
    modelNo: {
      type: String,
      required:
        'Cannot enter a product without model number, please enter model number of the product',
      unique: true,
    },

    name: {
      type: String,
      required:
        'Cannot enter a product without name, please enter product name',
    },

    price: {
      type: Number,
      required:
        'Cannot enter a product without price, please enter price of the product',
    },

    discount: {
      type: Number,
      required:
        'Cannot enter a product without discount, please enter discount of the product',
    },

    url: {
      type: mongoose.SchemaTypes.Url,
      required:
        'Cannot enter a product without URL, please enter URL of the product',
    },

    tags: [{ type: String }],

    fastDelivery: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
