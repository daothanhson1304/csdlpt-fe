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
import { useDispatch } from 'react-redux';
import { addStudent } from '../feature/student/StudentSlice';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

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
const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.number().required(),
    address: yup.string().required(),
  })
  .required();
const defaultValues = {
  name: '',
  address: '',
  age: 0,
};
export default function MenuAppBar() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    methods.reset();
    setFile('');
  };
  const onSubmit = (data) => {
    dispatch(addStudent({ ...data, image: file }));
    handleClose();
  };
  const handleChange = (event) => {
    let url = URL.createObjectURL(event.target.files[0]);
    setFile(url);
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
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <DialogTitle id='alert-dialog-title'>
                      {'Add New Student'}
                    </DialogTitle>
                    <DialogContent className={classes.flex}>
                      <DialogContentText id='alert-dialog-description'>
                        <Grid className={classes.grid}>
                          <Grid item>
                            <TextField
                              {...methods.register('name')}
                              label='Name'
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              {...methods.register('age')}
                              label='Age'
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              {...methods.register('address')}
                              label='Address'
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              label='Image'
                              type='file'
                              onChange={handleChange}
                            />
                          </Grid>

                          {file.length > 0 && (
                            <Grid>
                              <Card className={classes.paperRoot}>
                                <CardActionArea>
                                  <CardMedia
                                    component='img'
                                    alt='Contemplative Reptile'
                                    height='140'
                                    image={file}
                                    title='Contemplative Reptile'
                                  />
                                </CardActionArea>
                              </Card>
                            </Grid>
                          )}
                        </Grid>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button color='primary' variant='contained' type='submit'>
                        Save
                      </Button>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </form>
                </FormProvider>
              </Dialog>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
