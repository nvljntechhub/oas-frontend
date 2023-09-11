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
import { SignIn, consultantSignUp } from 'src/services/auth.service';
import Cookies from 'universal-cookie';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  padding: '20px'
};

type Props = {};

const ConsultantSignUp = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const cookies = new Cookies();
  const [initialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
    postalAddress: '',
    morningAvailabilityStartTime: null,
    morningAvailabilityEndTime: null,
    eveningAvailabilityStartTime: null,
    eveningAvailabilityEndTime: null,
    experience: 0,
    educationalQualification: '',
    specializedCountries: ''
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name ' + help.VALUE_REQUIRED),
    lastName: Yup.string().required('Last Name ' + help.VALUE_REQUIRED),
    email: Yup.string()
      .email(help.INVALID_EMAIL_ADDRESS)
      .matches(regularExpressions.EMAIL_REGEX, help.INVALID_EMAIL_ADDRESS)
      .required('Email ' + help.VALUE_REQUIRED),
    contactNumber: Yup.string()
      .matches(regularExpressions.PHONE_REGEX, help.INVALID_CONTACT_NUMBER)
      .required('Contact ' + help.VALUE_REQUIRED),
    postalAddress: Yup.string().required(
      'Postal Address ' + help.VALUE_REQUIRED
    ),
    password: Yup.string().required('Password ' + help.VALUE_REQUIRED),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], help.PASSWORD_MISMATCH)
      .required('Confirm password ' + help.VALUE_REQUIRED)
  });

  const onSubmit = (values: Object) => {
    console.log('values', values);
    const { ...rest } = values;
    const input = {
      ...rest,
      role: userRoles.CONSULTANT
    };
    consultantSignUp(input).then(
      (response: any) => {
        enqueueSnackbar(response.Status, { variant: 'success' });
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
        <title>Consultant - SignUp</title>
      </Helmet>
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h2" color={colorCodes.MIDNIGHT}>
                  The JOBS
                </Typography>
              </Grid>
              <Grid item mt={3}>
                <Typography variant="h5">Consultant - SignUp</Typography>
              </Grid>
            </Grid>
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
                    rowSpacing={2}
                    columnSpacing={1}
                    justifyContent="center"
                  >
                    <Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
                      <Stack sx={{ width: '100%' }}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="First Name"
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Last Name"
                        name="lastName"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Email"
                        name="email"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Contact Number"
                        name="contactNumber"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Postal Address"
                        name="postalAddress"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel className="input-label">
                        Morning Availability
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel className="input-label">
                        Evening Availability
                      </InputLabel>
                    </Grid>
                    <Grid item xs={3}>
                      <FormikControl
                        control="input"
                        type="time"
                        label="Start Time"
                        name="morningAvailabilityStartTime"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikControl
                        control="input"
                        type="time"
                        label="End Time"
                        name="morningAvailabilityEndTime"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikControl
                        control="input"
                        type="time"
                        label="Start Time"
                        name="eveningAvailabilityStartTime"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikControl
                        control="input"
                        type="time"
                        label="End Time"
                        name="eveningAvailabilityEndTime"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikControl
                        control="input"
                        type="number"
                        label="Experience in years"
                        name="experience"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Educational Qualifications"
                        name="educationalQualification"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Specialized Countries"
                        name="specializedCountries"
                        multiline={true}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                      <InputLabel
                        sx={{
                          //   fontFamily: theme.typography.fontFamily,
                          //   fontSize: theme.typography.h4,
                          mb: '8px'
                        }}
                      >
                        Confirm Password
                      </InputLabel>
                      <FormikControl
                        control="input"
                        type="password"
                        name="confirmPassword"
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
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      Already have an account?{' '}
                      <Link href="/consultant-signin">Sign In</Link> Here
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

export default ConsultantSignUp;
