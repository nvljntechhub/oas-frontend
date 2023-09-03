import { useState, useEffect } from 'react';
import {
  Modal,
  Grid,
  Box,
  Alert,
  Stack,
  Button,
  InputLabel,
  Autocomplete,
  TextField
} from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
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
  regularExpressions,
  routesURLs
} from 'src/utils/properties';
import ModalHeader from 'src/components/ModalHeader';
import {
  createConsultant,
  listConsultant,
  updateConsultant
} from 'src/services/consultant.service';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { JobSeeker } from 'src/interfaces/jobseeker.interface';
import {
  createJobSeeker,
  listJobSeeker,
  updateJobSeeker
} from 'src/services/jobSeeker.service';
import {
  Appointment,
  AppointmentDetails
} from 'src/interfaces/appointment.interface';
import {
  createAppointment,
  listAppointment,
  updateAppointment
} from 'src/services/appointment.service';
import { getTimeFormat } from 'src/utils/function.util';
import TextError from 'src/components/InputControls/TextError';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '47%',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  padding: 3
};

export interface Props {
  action: string;
  open: boolean;
  onClose: () => void;
  appointmentDetails?: AppointmentDetails;
  renderValue: number;
}

export default function AddEditJobSeeker(props: Props) {
  const { onClose, open, action, appointmentDetails, renderValue } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useState('');
  const [isReadyToLoad, setIsReadyToLoad] = useState(false);
  const [consultantOptions, setConsultantOptions] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState<{
    label: string;
    key: number;
  }>();
  const [jobSeekerOptions, setJobSeekerOptions] = useState([]);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<{
    label: string;
    key: number;
  }>();
  const [initialValues, setInitialValues] = useState({
    consultantId: '',
    jobSeekerId: '',
    date: null,
    time: null
  });

  const handleClose = () => {
    onClose();
    setErrorMsg('');
  };

  useEffect(() => {
    getConsultantDropdown();
    getJobSeekerDropdown();
    if (action === actions.Edit) {
      setSelectedConsultant({
        label:
          appointmentDetails.consultant.firstName +
          ' ' +
          appointmentDetails.consultant.lastName,
        key: appointmentDetails.consultant.id
      });
      setSelectedJobSeeker({
        label:
          appointmentDetails.jobSeeker.firstName +
          ' ' +
          appointmentDetails.jobSeeker.lastName,
        key: appointmentDetails.jobSeeker.id
      });
      setInitialValues({
        consultantId:
          appointmentDetails.consultant.firstName +
          ' ' +
          appointmentDetails.consultant.lastName,
        jobSeekerId:
          appointmentDetails.jobSeeker.firstName +
          ' ' +
          appointmentDetails.jobSeeker.lastName,
        date: getTimeFormat(
          appointmentDetails.appointment.appointmentTime,
          'date'
        ),
        time: getTimeFormat(
          appointmentDetails.appointment.appointmentTime,
          'time'
        )
      });
      setIsReadyToLoad(true);
    } else if (action === actions.ADD) {
      setInitialValues(resetFields);
      setIsReadyToLoad(true);
    }
  }, [appointmentDetails, action]);

  const getConsultantDropdown = () => {
    listConsultant().then(
      (response: any) => {
        const consultantItemsInstant = [];
        consultantItemsInstant.push({
          label: 'Not Selected',
          key: ''
        });
        response?.map((item) => {
          consultantItemsInstant.push({
            label: item?.firstName + ' ' + item?.lastName,
            key: item?.id
          });
        });
        setSelectedConsultant(consultantItemsInstant[0]);
        setConsultantOptions(consultantItemsInstant);
      },
      (error) => {}
    );
  };

  const getJobSeekerDropdown = () => {
    listJobSeeker().then(
      (response: any) => {
        const jobSeekerItemsInstant = [];
        jobSeekerItemsInstant.push({
          label: 'Not Selected',
          key: ''
        });
        response?.map((item) => {
          jobSeekerItemsInstant.push({
            label: item?.firstName + ' ' + item?.lastName,
            key: item?.id
          });
        });
        setSelectedJobSeeker(jobSeekerItemsInstant[0]);
        setJobSeekerOptions(jobSeekerItemsInstant);
      },
      (error) => {}
    );
  };

  const resetFields = () => {
    return {
      consultantId: '',
      jobSeekerId: '',
      date: null,
      time: null
    };
  };

  const validationSchema = Yup.object({
    consultantId: Yup.string().required('Consultant ' + help.VALUE_REQUIRED),
    jobSeekerId: Yup.string().required('Job Seeker ' + help.VALUE_REQUIRED),
    date: Yup.date().required('Appointment Date ' + help.VALUE_REQUIRED),
    time: Yup.string().required('Appointment Time ' + help.VALUE_REQUIRED)
  });

  const onSubmit = (values) => {
    console.log('1');

    let response;
    if (action === actions.ADD) {
      const input = {
        consultantId: values.consultantId,
        jobSeekerId: values.jobSeekerId,
        appointmentTime: values.date + 'T' + values.time
      };
      response = createAppointment(input);
    } else if (action === actions.Edit) {
      const updateValues = {
        id: values.consultantId
      };
      response = updateAppointment(
        updateValues,
        appointmentDetails?.appointment.id
      );
    }
    response?.then(
      (response: any) => {
        onClose();
        setErrorMsg('');
        enqueueSnackbar(response.Status, { variant: 'success' });
      },
      (error: any) => {
        console.log('error', error);
        enqueueSnackbar(response.status, { variant: 'success' });
        if (error.response.data) {
          localStorage.clear();
        }
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
            module="Appointment"
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
                    <Autocomplete
                      disablePortal
                      disableClearable
                      options={consultantOptions}
                      value={selectedConsultant}
                      isOptionEqualToValue={(option, value) =>
                        option.key === value.key
                      }
                      onChange={(event, value) => {
                        formik.setFieldValue('consultantId', value.key);
                        setSelectedConsultant(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Consultant" />
                      )}
                    />
                    <ErrorMessage name={'consultantId'} component={TextError} />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      options={jobSeekerOptions}
                      value={selectedJobSeeker}
                      isOptionEqualToValue={(option, value) =>
                        option.key === value.key
                      }
                      onChange={(event, value) => {
                        formik.setFieldValue('jobSeekerId', value.key);
                        setSelectedJobSeeker(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Job Seeker" />
                      )}
                    />
                    <ErrorMessage name={'jobSeekerId'} component={TextError} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormikControl
                      control="input"
                      type="date"
                      label="Appointment Date"
                      name="date"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormikControl
                      control="input"
                      type="time"
                      label="Appointment Time"
                      name="time"
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
