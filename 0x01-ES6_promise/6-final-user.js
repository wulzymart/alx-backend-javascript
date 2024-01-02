import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  return Promise.allSettled([signUpUser(firstName, lastName), uploadPhoto(fileName)])
    .then((res) => {
      const result = res.map((item) => (item.status === 'fulfilled'
        ? { status: item.status, value: item.value }
        : { status: item.status, value: `${item.reason}` }));
      return result;
    });
}
