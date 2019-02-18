import MyWorker from './worker.js';

import './index.scss';

const browserRunJsBtn = document.querySelector('#browser-run-js');
const workerRunJsBtn = document.querySelector('#worker-run-js');
const doStuffBtn = document.querySelector('#do-stuff');
const clearDoStuff = document.querySelector('#clear-do-stuff');
const jsComputation = document.querySelector('#js-computation');
const jsStuff = document.querySelector('#js-stuff');
let jsStuffText = '';

// Worker
function registerWorker() {
  const worker = new MyWorker();

  worker.onmessage = (e) => {
    console.log(e.data)
    const { data } = e;
    if (data.state === 'done') {
      console.log('terminate the worker')
      workerRunJsBtn.classList.add('paused');
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
  browserRunJsBtn.classList.add('paused');
}

browserRunJsBtn.addEventListener('click', () => {
  console.log('browserRunJsBtn');
  browserRunJsBtn.classList.remove('paused');
  longRunningProcess();
});

workerRunJsBtn.addEventListener('click', () => {
  console.log('workerRunJsBtn');
  workerRunJsBtn.classList.remove('paused');
  registerWorker();
});

doStuffBtn.addEventListener('click', () => {
  console.log('doStuffBtn');
  jsStuffText += ' "JavaScript Stuff" ';
  jsStuff.innerHTML = jsStuffText;
});

clearDoStuff.addEventListener('click', () => {
  console.log('doStuffBtn');
  jsStuff.innerHTML = '';
});
