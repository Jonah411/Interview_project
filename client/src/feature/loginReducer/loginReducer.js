import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const interviewadmin = createSlice({
  name: "interviewadmin",
  initialState,
  reducers: {
    authloginDetails: (state, { payload }) => {
      state.user = payload;
    },
    logoutDetails: (state, { payload }) => {
      state.user = null;
    },
  },
});

export const { authloginDetails, logoutDetails } = interviewadmin.actions;
export const getLoginDetailsUser = (state) => state?.interviewadmin?.user;

export default interviewadmin.reducer;
