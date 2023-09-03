import { Button, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ConsultantTable from './ConsultantTable';
import { AddCircleTwoTone } from '@mui/icons-material';
import { actions, colorCodes } from 'src/utils/properties';
import { useState } from 'react';
import AddEditConsultant from './AddEditConsultant';
import { Consultant } from 'src/interfaces/consultant.interface';

type Props = {};

const ConsultantManagement = (props: Props) => {
  const [isAddEditOpen, setisAddEditOpen] = useState(false);
  const [consultant, setConsultant] = useState<Consultant>();
  const [renderValue, setRenderValue] = useState(0);
  const [action, setAction] = useState('');

  const addConsultant = () => {
    setAction(actions.ADD);
    setisAddEditOpen(true);
  };

  const editConsultant = (consultant: Consultant) => {
    setConsultant(consultant);
    setAction(actions.Edit);
    setisAddEditOpen(true);
  };

  const handleClose = () => {
    setisAddEditOpen(false);
    setRenderValue(renderValue + 1);
  };

  return (
    <>
      <Helmet>
        <title>Consultants</title>
      </Helmet>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} mb={4}>
          <Typography variant="h3">Consultants</Typography>
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
            onClick={addConsultant}
          >
            Add Consultant
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ConsultantTable
            editClick={(consultant) => editConsultant(consultant)}
            renderValue={renderValue}
          />
        </Grid>
      </Grid>
      {isAddEditOpen && (
        <AddEditConsultant
          onClose={handleClose}
          action={action}
          open={isAddEditOpen}
          consultant={consultant}
          renderValue={renderValue}
        />
      )}
    </>
  );
};

export default ConsultantManagement;
