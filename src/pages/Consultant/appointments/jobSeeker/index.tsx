import { Button, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ConsultantTable from './JobSeekerTable';
import { AddCircleTwoTone } from '@mui/icons-material';
import { actions, colorCodes } from 'src/utils/properties';
import { useState } from 'react';
import AddEditConsultant from './AddEditJobSeeker';
import { Consultant } from 'src/interfaces/consultant.interface';
import { JobSeeker } from 'src/interfaces/jobseeker.interface';
import JobSeekersTable from './JobSeekerTable';
import AddEditJobSeeker from './AddEditJobSeeker';

type Props = {};

const JobSeekerManagement = (props: Props) => {
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [jobSeeker, setJobSeeker] = useState<JobSeeker>();
  const [renderValue, setRenderValue] = useState(0);
  const [action, setAction] = useState('');

  const addJobSeeker = () => {
    setAction(actions.ADD);
    setIsAddEditOpen(true);
  };

  const editJobSeeker = (jobSeeker: JobSeeker) => {
    setJobSeeker(jobSeeker);
    setAction(actions.Edit);
    setIsAddEditOpen(true);
  };

  const handleClose = () => {
    setIsAddEditOpen(false);
    setRenderValue(renderValue + 1);
  };

  return (
    <>
      <Helmet>
        <title>Job Seekers</title>
      </Helmet>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} mb={4}>
          <Typography variant="h3">Job Seekers</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button
            sx={{
              mt: { xs: 2, md: 0 },
              mb: 4,
              height: 50,
              borderRadius: '4px',
              background: colorCodes.MIDNIGHT,
              color: colorCodes.WHITE,
              '&:hover': { background: colorCodes.TUFTS_BLUE }
            }}
            variant="contained"
            disableRipple
            startIcon={<AddCircleTwoTone />}
            onClick={addJobSeeker}
          >
            Add Job seeker
          </Button>
        </Grid>
        <Grid item xs={12}>
          <JobSeekersTable
            editClick={(jobSeeker) => editJobSeeker(jobSeeker)}
            renderValue={renderValue}
          />
        </Grid>
      </Grid>
      {isAddEditOpen && (
        <AddEditJobSeeker
          onClose={handleClose}
          action={action}
          open={isAddEditOpen}
          jobSeeker={jobSeeker}
          renderValue={renderValue}
        />
      )}
    </>
  );
};

export default JobSeekerManagement;
