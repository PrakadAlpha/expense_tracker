import React, {createContext, useReducer} from 'react';
import AppReducer  from './AppReducer'
import axios from 'axios';

const initialState = {
  transactions: [],
  error: false,
  loading: true
}

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({children}) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);


  async function getTransactions(){
    try {
      const res = await axios.get('api/v1/transactions/');

    dispatch({
      type: 'GET_TRANS',
      payload: res.data.data
    })  
    } catch (err) {
      dispatch({
        type: 'TRANS_ERROR',
        payload: err.response.data.error
      })  
    }
  }

  //Actions:

  async function deleteTransaction(_id){

    try {
      await axios.delete(`api/v1/transactions/${_id}`);
      dispatch({
        type: 'DELETE_TRAN',
        payload: _id
      })
    } catch (err) {
      dispatch({
        type: 'TRANS_ERROR',
        payload: err.response.data.error
      })  
    }

  }

  async function addTransaction(transaction){
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/v1/transactions',transaction,config);
        dispatch({
          type: 'ADD_TRAN',
          payload: res.data.data
        })
    } catch (err) {
      dispatch({
        type: 'TRANS_ERROR',
        payload: err.response.data.error
      })  
    }
    
    
  }

  return (<GlobalContext.Provider value = {{transactions: state.transactions, deleteTransaction, addTransaction, getTransactions, error: state.error, loading:state.loading}}> 
    {children}
  </GlobalContext.Provider>)

}

export default GlobalProvider;