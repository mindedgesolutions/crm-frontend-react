import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  planAttributes: [],
  plans: [],
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlanAttributes: (state, action) => {
      state.planAttributes = action.payload;
    },
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
  },
});

export const { setPlanAttributes, setPlans } = plansSlice.actions;
export default plansSlice.reducer;
