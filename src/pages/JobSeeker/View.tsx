import { ChangeEvent, useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Container,
  Card,
  useTheme,
  Paper,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { pagination } from 'src/utils/properties';
import { ArrowBackIosTwoTone, EditTwoTone } from '@mui/icons-material';
import { getJobSeekerId } from 'src/services/jobSeeker.service';
import { JobSeeker } from 'src/interfaces/jobseeker.interface';
import { LoggedInUser } from 'src/interfaces/loggedInUser.interface';

export interface Props {}

export default function View(props: Props) {
  const {} = props;
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [jobSeeker, setJobSeeker] = useState<JobSeeker>();
  const [totalGroupFee, setTotalGroupFee] = useState();
  const [groupName, setgroupName] = useState('');
  const [renderValue, setRenderValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState<number>(pagination.OFFSET);
  const [limit, setLimit] = useState<number>(pagination.PAGE_LIMIT);
  const [count, setcount] = useState(0);
  const [isCreateUpdateOpen, setIsCreateUpdateOpen] = useState(false);
  const [isEnrollmentCycleOpen, setIsEnrollmentCycleOpen] = useState(false);
  const [action, setAction] = useState('');
  const params = useParams();
  const theme = useTheme();
  const [loggedInUser] = useState<LoggedInUser>(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );

  useEffect(() => {
    // getTotalGroupFee();
    // if (searchTerm) {
    //   getFilteredGroupMembers('', pagination.SEARCH_LIMIT);
    // }
    // getGroupMembers(pagination.OFFSET, pagination.PAGE_LIMIT);
  }, [renderValue]);

  const onClose = () => {
    setIsPayOpen(false);
  };

  const onClickPay = () => {
    setIsPayOpen(true);
    setRenderValue(2);
  };

  // const handleAddClick = () => {
  //   setIsEnrollmentCycleOpen(true);
  //   setAction('Create');
  //   setCourse(course);
  // };

  // const handleEditClick = (enrollmentCycle: EnrollmentCycle) => {
  //   setEnrollmentCycle(enrollmentCycle);
  //   setAction('Update');
  //   setIsEnrollmentCycleOpen(true);
  // };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handlePopupClose = () => {
    setIsCreateUpdateOpen(false);
    setIsEnrollmentCycleOpen(false);
    setRenderValue(renderValue + 1);
  };

  return (
    <>
      <Container sx={{ pt: 1 }}>
        <Grid container justifyContent="space-between">
          <Grid item mt={2}>
            <Typography variant="h2">
              {(
                loggedInUser?.firstName +
                ' ' +
                loggedInUser?.lastName
              ).toLocaleUpperCase()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Card sx={{ mt: 2, p: 2 }}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Grid container columnSpacing={2} justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#303030',
                      pr: 2,
                      pl: 2,
                      pt: 0.5,
                      pb: 0.5,
                      borderRadius: 0.5,
                      minWidth: '120px'
                    }}
                    color="white"
                    variant="h4"
                  >
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={2} textAlign="right" alignContent="flex-end">
                  <Button
                    sx={{
                      color: '#ffffff',
                      background: '#2196F3',
                      '&:hover': {
                        background: '#1E88E5',
                        color: '#ffffff',
                        boxShadow: '0px 2px 4px -1px #00000033'
                      },
                      mt: { xs: 2, md: 0 }
                    }}
                    startIcon={<EditTwoTone fontSize="small" id={'create'} />}
                    onClick={() => {
                      setIsCreateUpdateOpen(true);
                      setAction('Update');
                    }}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    color="#656565"
                    fontWeight="400"
                    variant="h4"
                    noWrap={false}
                  >
                    course?.description
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
