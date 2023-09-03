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
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Confirm from 'src/components/Confirm';
import { JobSeeker } from 'src/interfaces/jobseeker.interface';
import { deleteJobSeeker, listJobSeeker } from 'src/services/jobSeeker.service';

export interface Props {
  editClick: (jobSeeker: JobSeeker) => void;
  renderValue: number;
}

const JobSeekersTable = (props: Props) => {
  const { editClick, renderValue } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>();
  const [currentJobSeeker, setCurrentJobSeeker] = useState<JobSeeker>();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  //Menu States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    jobSeeker: JobSeeker
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentJobSeeker(jobSeeker);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    if (currentJobSeeker) editClick(currentJobSeeker);
    handleClose();
  };

  const onClose = () => {
    setIsDeleteConfirmOpen(false);
  };

  useEffect(() => {
    list();
  }, [renderValue]);

  const list = async () => {
    listJobSeeker().then(
      (response: any) => {
        console.log('response', response);

        setJobSeekers(response);
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
    deleteJobSeeker(currentJobSeeker?.id).then(
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
                  <TableCell>Highest Qualification</TableCell>
                  <TableCell>Current Job</TableCell>
                  <TableCell>Job Experience</TableCell>
                  <TableCell>Interested Countries</TableCell>
                  <TableCell>Interested Jobs</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobSeekers?.map((jobSeeker: JobSeeker) => {
                  return (
                    <TableRow key={jobSeeker?.id}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.firstName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.contactNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.highestQualification}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.job}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.jobExperience} years
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.interestedCountries}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.interestedJobs}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {jobSeeker?.isActive}
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
                            onClick={(event) => handleClick(event, jobSeeker)}
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

export default JobSeekersTable;
