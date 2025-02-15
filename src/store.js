import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "@/features/commonSlice";
import currentUserReducer from "@/features/currentUserSlice";
import plansReducer from "@/features/plansSlice";
import userReducer from "@/features/userSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    currentUser: currentUserReducer,
    plans: plansReducer,
    users: userReducer,
  },
});
export default store;
