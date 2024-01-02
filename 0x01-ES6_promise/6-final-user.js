import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  return Promise.allSettled([signUpUser(fileName, lastName), uploadPhoto(fileName)])
    .then((res) => {
      const result = [];
      res.forEach((item) => (item.status === 'fulfilled'
        ? result.push({ status: item.status, value: item.value })
        : result.push({ status: item.status, value: `${item.reason}` })));
      return result;
    });
}
