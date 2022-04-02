import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent, getAllStudent } from '../feature/student/StudentSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export const TableComponent = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);
  const students = useSelector((state) => state.students.students);
  const handleDeleteStudent = (id) => {
    console.log('ID', id);
    dispatch(deleteStudent(id));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Age</TableCell>
            <TableCell align='right'>Address</TableCell>
            <TableCell align='right'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {student.name}
              </TableCell>
              <TableCell align='right'>{student.age}</TableCell>
              <TableCell align='right'>{student.address}</TableCell>
              <TableCell align='right'>
                <IconButton
                  onClick={() => {
                    handleDeleteStudent(student.id);
                  }}
                  aria-label='delete'
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
