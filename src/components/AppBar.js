import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent } from '../feature/student/StudentSlice';
import { FormProvider, useForm } from 'react-hook-form';

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      '& .MuiTextField-root': {
        marginTop: '10px',
      },
    },
    flex: {
      '& .MuiDialogContentText-root': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  })
);

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const onSubmit = (data) => {
    dispatch(addStudent(data));
    handleClose();
  };

  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Spring Boot React App
          </Typography>
          {auth && (
            <div>
              <Button
                variant='contained'
                onClick={handleClickOpen}
                startIcon={<AddIcon />}
                color='error'
              >
                Add Student
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogTitle id='alert-dialog-title'>
                    {'Add New Student'}
                  </DialogTitle>
                  <DialogContent className={classes.flex}>
                    <DialogContentText id='alert-dialog-description'>
                      <Grid className={classes.grid}>
                        <Grid item>
                          <TextField
                            {...register('name')}
                            required
                            label='Name'
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            {...register('age')}
                            required
                            label='Age'
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            {...register('address')}
                            required
                            label='Address'
                          />
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={onSubmit}
                      type='submit'
                    >
                      Save
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
