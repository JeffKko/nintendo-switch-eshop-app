import { createSlice } from '@reduxjs/toolkit'

export const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    base: 'TWD',
    rates: {},
  },
  reducers: {
    setRates(state, action) {
      console.log(action)
      state.rates = {...action.payload}
    },
  },
})

export const selectRates = (state) => state.rates
export const { setRates } = ratesSlice.actions
export default ratesSlice.reducer
