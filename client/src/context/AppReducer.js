export default (state, action ) => {
  switch (action.type) {
    case 'GET_TRANS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'TRANS_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'DELETE_TRAN':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRAN':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions] 
      }
    default:
      return state;
  }
}