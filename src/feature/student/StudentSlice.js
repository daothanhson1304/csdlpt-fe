import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as studentServices from './StudentService';
import { toast } from 'react-toastify';

const initialState = {
  students: [],
};
export const getAllStudent = createAsyncThunk(
  'student/getAllStudent',
  async (_, thunkAPI) => {
    try {
      const response = await studentServices.getAllStudent();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const addStudent = createAsyncThunk(
  'student/addStudent',
  async (student, thunkAPI) => {
    const response = await studentServices.postStudent(student);
    return response.data;
  }
);
export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id, thunkAPI) => {
    const response = await studentServices.deleteStudent(id);
    return response.data;
  }
);
export const studentSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStudent.fulfilled, (state, action) => {
      state.students = action.payload.data;
    });
    builder
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students = [...action.payload];
      })
      .addCase(addStudent.rejected, (state, action) => {});
    builder
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = [...action.payload];
      })
      .addCase(deleteStudent.rejected, (state, action) => {});
  },
});

export default studentSlice.reducer;
