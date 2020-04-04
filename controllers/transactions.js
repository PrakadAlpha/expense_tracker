const Transaction = require('../model/Transaction')

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({success: true, count: transactions.length, data: transactions});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: 'Internal Server Error'})
  }
}

exports.addTransaction = async (req, res, next) => {
  const {text, amount} = req.body
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({success: true, data: transaction});
  } catch (err) {
    if(err.name == 'ValidationError'){
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({error: messages});
    }else{
      console.log(err.message);
      return res.status(500).json({error: 'Internal Server Error'})
    }
  }

}

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = Transaction.findById(req.params.id);
    if(!transaction){
      return res.status(404).json({success:false, error: 'No transaction found'})
    }

    await transaction.remove();

    return res.status(200).json({success:true, data: {}})
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Internal Server Error'}) 
  }
}