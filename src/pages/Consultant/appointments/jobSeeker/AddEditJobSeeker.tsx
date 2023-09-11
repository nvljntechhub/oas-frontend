import { useState, useEffect } from 'react';
import {
  Modal,
  Grid,
  Box,
  Alert,
  Stack,
  Button,
  InputLabel
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from 'src/components/InputControls/FormikControl';
import { useSnackbar } from 'notistack';
import 'src/css/style.css';
import { Consultant } from 'src/interfaces/consultant.interface';
import { useNavigate } from 'react-router';
import {
  actions,
  colorCodes,
  help,
  regularExpressions
} from 'src/utils/properties';
import ModalHeader from 'src/components/ModalHeader';
import {
  createConsultant,
  updateConsultant
} from 'src/services/consultant.service';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { JobSeeker } from 'src/interfaces/jobseeker.interface';
import {
  createJobSeeker,
  updateJobSeeker
} from 'src/services/jobSeeker.service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50%',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  padding: 3
};

export interface Props {
  action: string;
  open: boolean;
  onClose: () => void;
  jobSeeker?: JobSeeker;
  renderValue: number;
}

export default function AddEditJobSeeker(props: Props) {
  const { onClose, open, action, jobSeeker, renderValue } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useState('');
  const [isReadyToLoad, setIsReadyToLoad] = useState(false);
  const [isAwait, setIsAwait] = useState(false);
  const [initialValues, setInitialValues] = useState<JobSeeker>({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    postalAddress: '',
    highestQualification: '',
    job: '',
    jobExperience: 0,
    interestedCountries: '',
    interestedJobs: '',
    isActive: null
  });

  const handleClose = () => {
    onClose();
    setErrorMsg('');
  };

  useEffect(() => {
    if (action === actions.Edit) {
      setInitialValues({
        firstName: jobSeeker.firstName,
        lastName: jobSeeker.lastName,
        email: jobSeeker.email,
        contactNumber: jobSeeker.contactNumber,
        postalAddress: jobSeeker.postalAddress,
        highestQualification: jobSeeker.highestQualification,
        job: jobSeeker.job,
        jobExperience: jobSeeker.jobExperience,
        interestedCountries: jobSeeker.interestedCountries,
        interestedJobs: jobSeeker.interestedJobs,
        isActive: jobSeeker.isActive
      });
      setIsReadyToLoad(true);
    } else if (action === actions.ADD) {
      setInitialValues(resetFields);
      setIsReadyToLoad(true);
    }
  }, [jobSeeker, action]);

  const resetFields = () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      postalAddress: '',
      highestQualification: '',
      job: '',
      jobExperience: 0,
      interestedCountries: '',
      interestedJobs: '',
      isActive: null
    };
  };

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
    highestQualification: Yup.string().required(
      'Highest Qualification ' + help.VALUE_REQUIRED
    )
  });

  const onSubmit = (values: JobSeeker) => {
    let response;
    if (action === actions.ADD) {
      const input = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contactNumber: values.contactNumber,
        postalAddress: values.postalAddress,
        highestQualification: values.highestQualification,
        job: values.job,
        jobExperience: values.jobExperience,
        interestedCountries: values.interestedCountries,
        interestedJobs: values.interestedJobs,
        isActive: values.isActive
      };
      response = createJobSeeker(input);
    } else if (action === actions.Edit) {
      const updateValues = {
        ...values
        // id: consultant?.id
      };
      response = updateJobSeeker(updateValues, jobSeeker?.id);
    }
    response?.then(
      (response: any) => {
        onClose();
        setErrorMsg('');
        enqueueSnackbar(response.Status, { variant: 'success' });
      },
      (error: any) => {
        console.log('error', error);
        // enqueueSnackbar(response.status, { variant: 'success' });
        // // if (error.response.data) {
        // //   localStorage.clear();
        // //   navigate(routeURL.LOGIN);
        // // }
        setErrorMsg(error.data.Error);
      }
    );
  };

  return isReadyToLoad ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ p: 2 }}>
          <ModalHeader
            action={action === actions.Edit ? action : actions.ADD}
            module="Job Seeker"
            handleClose={handleClose}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
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
                  <Grid item xs={4}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Highest Qualification"
                      name="highestQualification"
                      multiline={true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Job"
                      name="job"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormikControl
                      control="input"
                      type="number"
                      label="Job Experience in years"
                      name="jobExperience"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Interested Countries"
                      name="interestedCountries"
                      multiline={true}
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Interested Jobs"
                      name="interestedJobs"
                      multiline={true}
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  columnSpacing={1}
                  justifyContent="right"
                  sx={{ pt: 2 }}
                >
                  <Button
                    sx={{
                      mt: { xs: 2, md: 0 },
                      height: 50,
                      width: '182px',
                      borderRadius: '4px',
                      background: colorCodes.MIDNIGHT,
                      color: colorCodes.WHITE,
                      '&:hover': { background: colorCodes.TUFTS_BLUE }
                    }}
                    variant="contained"
                    disableRipple
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  ) : (
    <SuspenseLoader />
  );
}
