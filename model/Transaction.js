const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({

  text: {
    type:String,
    trim:true,
    required:[true,"Please add some text"]
  },
  amount: {
    type: Number,
    required: [true, "Please add a +ve or -ve number"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Transaction', transactionSchema);