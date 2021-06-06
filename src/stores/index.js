import { configureStore } from "@reduxjs/toolkit"
import ratesReducer from "./slice/rates"

export default configureStore({
  reducer: {
    rates: ratesReducer,
  },
})
