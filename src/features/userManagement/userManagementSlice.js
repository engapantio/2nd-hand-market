import { createSlice } from '@reduxjs/toolkit';

export const initialDraft = {
  client: '',
  archived: 'no',
  active: 'no',
  bringClientNumber: '',
  salutation: '',
  name: '',
  firstName: '',
  email: '',
  phone: '',
  mobile: '',
  street: '',
  number: '',
  zipCode: '',
  city: '',
  country: '',
  paypalAccount: '',
  contractSigned: '',
  notes: '',
  shipping: 'yes',
  salesQuote: '% 0',
  yearOfBirth: '',
};

const initialState = {
  draft: initialDraft,
  isDirty: false,
  isSubmitting: false,
  lastSubmittedUser: null,
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setDraftField(state, action) {
      const { key, value } = action.payload;
      state.draft[key] = value;
      state.isDirty = true;
    },
    setDraft(state, action) {
      state.draft = { ...state.draft, ...action.payload };
      state.isDirty = true;
    },
    resetDraft(state) {
      state.draft = initialDraft;
      state.isDirty = false;
      state.isSubmitting = false;
    },
    submitStart(state) {
      state.isSubmitting = true;
    },
    submitSuccess(state, action) {
      state.isSubmitting = false;
      state.lastSubmittedUser = action.payload;
      state.draft = initialDraft;
      state.isDirty = false;
    },
    submitFailure(state) {
      state.isSubmitting = false;
    },
  },
});

export const { setDraftField, setDraft, resetDraft, submitStart, submitSuccess, submitFailure } =
  userManagementSlice.actions;

export default userManagementSlice.reducer;
