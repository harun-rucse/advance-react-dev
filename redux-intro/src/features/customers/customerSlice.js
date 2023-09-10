import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: { fullName, nationalID },
        };
      },
      reducer(state, action) {
        const { fullName, nationalID } = action.payload;
        state.fullName = fullName;
        state.nationalID = nationalID;
        state.createdAt = new Date().toISOString();
      },
    },
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateCustomer } = customerSlice.actions;

export default customerSlice.reducer;
