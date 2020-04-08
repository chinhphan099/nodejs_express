function add(a, b) {
  if(typeof a !== 'string' || typeof b !== 'string') {
    throw new Error('Wrong type'); // set message cho trường hợp có thể xảy ra lỗi.
  }
  return a + b;
}
try {
  var result = add('a', 1);
  console.log(result);
}
catch(error) {
  console.log(error.message);
}


// Promise
function reject() {
  return new Promise((resolve, reject) => {
    reject(new Error('Promise error'));
  });
}
reject().catch((error) => {
  console.log(error.message);
});
