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
  consultant?: Consultant;
  renderValue: number;
}

export default function AddEditConsultant(props: Props) {
  const { onClose, open, action, consultant, renderValue } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useState('');
  const [isReadyToLoad, setIsReadyToLoad] = useState(false);
  const [isAwait, setIsAwait] = useState(false);
  const [initialValues, setInitialValues] = useState<Consultant>({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleClose = () => {
    onClose();
    setErrorMsg('');
  };

  useEffect(() => {
    if (action === actions.Edit) {
      console.log('action', action);
      console.log('consultant', consultant);
      setInitialValues({
        firstName: 'hiidslk;',
        lastName: consultant.lastName,
        email: consultant.email,
        contactNumber: consultant.contactNumber,
        postalAddress: consultant.postalAddress,
        morningAvailabilityStartTime: consultant.morningAvailabilityStartTime,
        morningAvailabilityEndTime: consultant.morningAvailabilityEndTime,
        eveningAvailabilityStartTime: consultant.eveningAvailabilityStartTime,
        eveningAvailabilityEndTime: consultant.eveningAvailabilityEndTime,
        experience: consultant.experience,
        educationalQualification: consultant.educationalQualification,
        specializedCountries: consultant.specializedCountries
      });
      setIsReadyToLoad(true);
    } else if (action === actions.ADD) {
      setInitialValues(resetFields);
      setIsReadyToLoad(true);
    }
  }, [consultant, action]);

  const resetFields = () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      postalAddress: '',
      morningAvailabilityStartTime: null,
      morningAvailabilityEndTime: null,
      eveningAvailabilityStartTime: null,
      eveningAvailabilityEndTime: null,
      experience: 0,
      educationalQualification: '',
      specializedCountries: ''
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
    )
  });

  const onSubmit = (values: Consultant) => {
    let response;
    if (action === actions.ADD) {
      const input = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contactNumber: values.contactNumber,
        postalAddress: values.postalAddress,
        morningAvailabilityStartTime: values.morningAvailabilityStartTime,
        morningAvailabilityEndTime: values.morningAvailabilityEndTime,
        eveningAvailabilityStartTime: values.eveningAvailabilityStartTime,
        eveningAvailabilityEndTime: values.eveningAvailabilityEndTime,
        experience: values.experience,
        educationalQualification: values.educationalQualification,
        specializedCountries: values.specializedCountries
      };
      response = createConsultant(input);
    } else if (action === actions.Edit) {
      const updateValues = {
        ...values
        // id: consultant?.id
      };
      response = updateConsultant(updateValues, consultant?.id);
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
            module="Consultant"
            handleClose={handleClose}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form id="AddEditConsultant">
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
                  <Grid item xs={9}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Educational Qualifications"
                      name="educationalQualification"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Specialized Countries"
                      name="specializedCountries"
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
