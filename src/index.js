import MyWorker from './worker.js';

import './index.scss';

const browserRunJsBtn = document.querySelector('#browser-run-js');
const workerRunJsBtn = document.querySelector('#worker-run-js');
const doStuffBtn = document.querySelector('#do-stuff');
let jsStuff = document.querySelector('#js-stuff');
let jsStuffText = '';

// Worker
function registerWorker() {
  const worker = new MyWorker();

  worker.onmessage = (e) => {
    console.log(e.data)
    const { data } = e;
    if (data.state === 'done') {
      console.log('terminate the worker')
      worker.terminate();
    }
  }

  // start a long running computation
  worker.postMessage('start');
}

function longRunningProcess() {
  const bigValue = 100000;
  let computedValue = 0;
  for (let i = 0;i < bigValue;i++) {
    console.log(computedValue += Math.random())
  }
}

browserRunJsBtn.addEventListener('click', () => {
  console.log('browserRunJsBtn');
  longRunningProcess();
});

workerRunJsBtn.addEventListener('click', () => {
  console.log('workerRunJsBtn');
  registerWorker();
});

doStuffBtn.addEventListener('click', () => {
  console.log('doStuffBtn');
  jsStuffText += '" JavaScript Stuff "';
  jsStuff.innerHTML = jsStuffText;
});
