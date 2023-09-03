import moment from 'moment';
import { Cookies } from 'react-cookie';
import { LoggedInUser } from 'src/interfaces/loggedInUser.interface';

export function isLoggedIn() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const loggedInUser: LoggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser')
  );
  if (token) {
    return {
      status: true,
      role: loggedInUser.role
    };
  } else {
    return {
      status: false,
      role: ''
    };
  }
}

export function getTimeFormat(dateValue: Date, formatType: string) {
  var now = moment();

  if (formatType === 'datetime') {
    return moment(dateValue).format('YYYY-MM-DD HH:MM');
  } else if (formatType === 'date') {
    return moment(dateValue).format('YYYY-MM-DD');
  } else if (formatType === 'time') {
    return moment(dateValue).format('HH:MM');
  } else if (formatType === 'currentDateTime') {
    return moment(now).format('YYYY-MM-DD hh:mm:ss');
  } else if (formatType === 'currentDate') {
    return moment(now).format('YYYY-MM-DD');
  } else if (formatType === 'currentTime') {
    return moment(now).format('hh:mm:ss');
  }
}
