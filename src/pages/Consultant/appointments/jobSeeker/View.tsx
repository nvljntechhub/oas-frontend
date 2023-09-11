import { ArrowBackIosTwoTone } from '@mui/icons-material';
import { Container, Grid, Breadcrumbs, Typography, Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

type Props = {};

const View = (props: Props) => {
  return (
    <>
      <Container sx={{ pt: 1 }}>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Grid container justifyContent="flex-start" sx={{ mt: 1.5 }}>
              <Grid item>
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                  //   href={`/course-management/view-course/${enrollmentCycle?.course.id}`}
                >
                  <ArrowBackIosTwoTone sx={{ mr: 0.5 }} fontSize="medium" />
                </Link>
              </Grid>
              <Grid item>
                <div role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      fontSize="medium"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="/course-management/course"
                    >
                      Course
                    </Link>
                    <Link
                      underline="hover"
                      fontSize="medium"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      //   href={`/course-management/view-course/${enrollmentCycle?.course.id}`}
                    >
                      enrollmentCycle?.course.name
                    </Link>
                    <Typography
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="text.primary"
                    >
                      enrollmentCycle?.name
                    </Typography>
                  </Breadcrumbs>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mb={2}>
            <Typography variant="h2">CYCLE 01</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default View;
