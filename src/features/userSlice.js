import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminUsers: [],
  companyUsers: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAdminUsers: (state, action) => {
      state.adminUsers = action.payload;
    },
    unsetAdminUsers: (state) => {
      state.adminUsers = [];
    },
    setCompanyUsers: (state, action) => {
      state.companyUsers = action.payload;
    },
    unsetCompanyUsers: (state) => {
      state.companyUsers = [];
    },
  },
});

export const {
  setAdminUsers,
  unsetAdminUsers,
  setCompanyUsers,
  unsetCompanyUsers,
} = userSlice.actions;
export default userSlice.reducer;
