const debug = require('debug')('test');

// *Callback
// const sum = (a, b, callback) => {
//   setTimeout(() => {
//     callback('No error', a + b);
//   }, 2000);
// };
// sum(5, 15, (error, result) => {
//   debug(error);
//   debug(result);
// });

//* Promise
const sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      debug('After 5 seconds');
      //   resolve(a + b);
      reject(new Error('Error aayo'));
    }, 5000);
  });
};

// sum(20, 25)
//   .then((result) => {
//     debug(result);
//   })
//   .catch((err) => {
//     debug(err);
//   });

// * Async await

const getResult = async () => {
  try {
    const result = await sum(45, 100);
    debug(result);
  } catch (error) {
    debug(error.message);
  }
};

getResult();
