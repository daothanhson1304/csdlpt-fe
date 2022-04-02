import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../feature/student/StudentSlice';
export const store = configureStore({
  reducer: { students: studentReducer },
});
