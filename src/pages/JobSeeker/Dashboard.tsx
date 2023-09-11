import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { LoggedInUser } from 'src/interfaces/loggedInUser.interface';
import person from 'src/assets/images/person.jpg';
import View from './View';

type Props = {};

const Dashboard = (props: Props) => {
  const [loggedInUser] = useState<LoggedInUser>(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: '40%' }}>
            <CardMedia
              sx={{ height: 240 }}
              image={person}
              title={loggedInUser.firstName + ' ' + loggedInUser.lastName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {loggedInUser.firstName + ' ' + loggedInUser.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {loggedInUser.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <View />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
