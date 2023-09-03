import {
  DeleteTwoTone,
  EditTwoTone,
  MoreVertTwoTone
} from '@mui/icons-material';
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  TablePagination,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Confirm from 'src/components/Confirm';
import { Consultant } from 'src/interfaces/consultant.interface';
import {
  deleteConsultant,
  listConsultant
} from 'src/services/consultant.service';

export interface Props {
  editClick: (consultant: Consultant) => void;
  renderValue: number;
}

const ConsultantTable = (props: Props) => {
  const { editClick, renderValue } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [consultants, setConsultants] = useState<Consultant[]>();
  const [currentConsultant, setCurrentConsultant] = useState<Consultant>();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  //Menu States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    consultant: Consultant
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentConsultant(consultant);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    if (currentConsultant) editClick(currentConsultant);
    handleClose();
  };

  const onClose = () => {
    setIsDeleteConfirmOpen(false);
  };

  useEffect(() => {
    list();
  }, [renderValue]);

  const list = async () => {
    listConsultant().then(
      (response: any) => {
        console.log('response', response);

        setConsultants(response);
        // setcount(response.total);
      },
      (error) => {
        // const errmsg = errorHandler(error);
        // if (error.response.data) {
        //   enqueueSnackbar(errorMessages.SESSION_EXPIRED, {
        //     variant: 'info'
        //   });
        //   localStorage.clear();
        //   navigate(routeURL.LOGIN);
        // } else if (error.data) {
        //   enqueueSnackbar(errmsg, {
        //     variant: 'error'
        //   });
        // }
      }
    );
  };

  const handleDelete = async () => {
    deleteConsultant(currentConsultant?.id).then(
      (response: any) => {
        setIsDeleteConfirmOpen(false);
        list();
        // setPage(pagination.OFFSET);
        // setLimit(pagination.PAGE_LIMIT);
        enqueueSnackbar(response.Status, { variant: 'success' });
      },
      (error) => {
        console.log('error', error);
      }
    );
  };

  return (
    <>
      <>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Morning Availability</TableCell>
                  <TableCell>Evening Availability</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Educational Qualifications</TableCell>
                  <TableCell>Specialized Countries</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consultants?.map((consultant: any) => {
                  return (
                    <TableRow key={consultant?.id}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.firstName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.contactNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.morningAvailabilityStartTime +
                            ' - ' +
                            consultant?.morningAvailabilityEndTime}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.eveningAvailabilityStartTime +
                            ' - ' +
                            consultant?.eveningAvailabilityEndTime}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.experience} years
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.educationalQualification}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {consultant?.specializedCountries}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, consultant)}
                          >
                            <MoreVertTwoTone />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              'aria-labelledby': 'long-button'
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={() => handleUpdate()}>
                              <EditTwoTone fontSize="small" />
                              <Typography
                                variant="body1"
                                sx={{
                                  textAlign: 'left',
                                  ml: 1
                                }}
                              >
                                Update
                              </Typography>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setIsDeleteConfirmOpen(true);
                                handleClose();
                              }}
                            >
                              <DeleteTwoTone />
                              <Typography
                                variant="body1"
                                sx={{
                                  textAlign: 'left',
                                  ml: 1
                                }}
                              >
                                Delete
                              </Typography>
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            {/* <TablePagination
              component="div"
              count={count}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={pageOptions}
            /> */}
          </Box>
          <Confirm
            open={isDeleteConfirmOpen}
            onClose={onClose}
            type="Delete"
            onSubmit={handleDelete}
          />
        </Card>
      </>
    </>
  );
};

export default ConsultantTable;
