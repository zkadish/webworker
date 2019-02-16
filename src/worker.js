console.log('web worker');

self.onmessage = (e) => {
  console.log('onmessage:', e.data);
  // blocking code
  if (e.data === 'start') {
    const bigValue = 10000;
    let computedValue = 0;
    for (let i = 0;i < bigValue;i++) {
      console.log(computedValue += Math.random())
    }
    
    self.postMessage({
      state: 'done',
      value: computedValue,
    });
    self.postMessage('done');
  }
}

// self.addEventListener('message', function(e) {
//   console.log('message event:', e.data);
//   const message = e.data + 'to myself';
//   self.postMessage(message);
//   self.close();
// });
