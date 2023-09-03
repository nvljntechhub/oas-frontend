import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { colorCodes } from 'src/utils/properties';

type Props = {
  action: string;
  module: string;
  handleClose: () => void;
};

const ModalHeader = (props: Props) => {
  const { action, module, handleClose } = props;

  return (
    <Box
      sx={{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        background: colorCodes.GAINSBORO
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <IconButton disableRipple sx={{ cursor: 'default' }}>
            <Typography fontSize="26px" sx={{ color: colorCodes.BLACK }}>
              {action} {module}
            </Typography>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseTwoToneIcon
              sx={{
                color: colorCodes.TUFTS_BLUE,
                background: colorCodes.MIDNIGHT,
                borderRadius: 0.3
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModalHeader;
