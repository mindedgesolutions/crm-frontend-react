import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  planAttributes: [],
  plans: [],
  planAttributesAll: [],
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
    setPlanAttributesAll: (state, action) => {
      state.planAttributesAll = action.payload;
    },
  },
});

export const { setPlanAttributes, setPlans, setPlanAttributesAll } =
  plansSlice.actions;
export default plansSlice.reducer;
