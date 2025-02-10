import { configureStore, current } from "@reduxjs/toolkit";
import commonReducer from "@/features/commonSlice";
import currentUserReducer from "@/features/currentUserSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    currentUser: currentUserReducer,
  },
});
export default store;
