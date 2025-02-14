import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "@/features/commonSlice";
import currentUserReducer from "@/features/currentUserSlice";
import plansReducer from "@/features/plansSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    currentUser: currentUserReducer,
    plans: plansReducer,
  },
});
export default store;
