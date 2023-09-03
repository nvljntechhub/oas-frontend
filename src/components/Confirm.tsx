import { Modal, Typography, Grid, Box, Button } from '@mui/material';
import 'src/css/style.css';
import { status } from 'src/utils/properties';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 3
};

export interface SimpleDialogProps {
  type: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function Confirm(props: SimpleDialogProps) {
  const { onClose, open, type, onSubmit } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          textAlign="center"
          sx={{ fontSize: 22, fontWeight: '500' }}
        >
          Are you sure want to {type}?
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          justifyContent="space-around"
        >
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color={type === status.ACTIVATE ? 'success' : 'error'}
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              {type}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
