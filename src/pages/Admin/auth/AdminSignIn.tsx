import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  colorCodes,
  help,
  regularExpressions,
  routesURLs,
  userRoles
} from 'src/utils/properties';
import FormikControl from 'src/components/InputControls/FormikControl';
import { SignIn } from 'src/services/auth.service';
import Cookies from 'universal-cookie';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  padding: '20px'
};

type Props = {};

const AdminSignIn = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const cookies = new Cookies();
  const [initialValues] = useState({
    email: '',
    password: ''
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(help.INVALID_EMAIL_ADDRESS)
      .matches(regularExpressions.EMAIL_REGEX, help.INVALID_EMAIL_ADDRESS)
      .required('Email ' + help.VALUE_REQUIRED),
    password: Yup.string().required('Password ' + help.VALUE_REQUIRED)
  });

  const onSubmit = (values: Object) => {
    console.log('values', values);
    const { ...rest } = values;
    const input = {
      ...rest,
      role: userRoles.ADMIN
    };
    SignIn(input).then(
      (response: any) => {
        cookies.set('token', response.data.token, { path: '/' });
        localStorage.setItem(
          'loggedInAdmin',
          JSON.stringify({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email
          })
        );
        navigate(routesURLs.ADMIN_MANAGEMENT + routesURLs.CONSULTANT);
      },
      (error: any) => {
        setErrorMsg(error.response.data.Error);
        console.log('error', error.response.data.Error);
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Admin - SignIn</title>
      </Helmet>
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h2" color={colorCodes.MIDNIGHT}>
              The JOBS
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Admin - Sign In</Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form id="PasswordVerification">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={1}
                    justifyContent="center"
                  >
                    <Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
                      <Stack sx={{ width: '100%' }}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel
                        sx={{
                          //   fontFamily: theme.typography.fontFamily,
                          //   fontSize: theme.typography.h4,
                          mb: '8px'
                        }}
                      >
                        Email
                      </InputLabel>
                      <FormikControl
                        control="input"
                        type="text"
                        name="email"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel
                        sx={{
                          //   fontFamily: theme.typography.fontFamily,
                          //   fontSize: theme.typography.h4,
                          mb: '8px'
                        }}
                      >
                        Password
                      </InputLabel>
                      <FormikControl
                        control="input"
                        type="password"
                        name="password"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          borderRadius: '8px'
                          //   backgroundColor: theme.colors.alpha.orange[100],
                        }}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminSignIn;
