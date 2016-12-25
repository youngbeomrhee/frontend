/**
 * Created by yblee on 2016-12-22.
 */
onmessage = function(e) {
  console.log('#2 Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('#2 Posting message back to main script');
  postMessage(workerResult);
}

console.log('#2 worker_002 has loaded');


