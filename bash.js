//console.log(process); 


var commandObj = require('./commands');

process.stdout.write('prompt > ');


// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var cmdArray = cmd.split(" ");
  var options = cmdArray.slice(1);

  commandObj[cmdArray[0]](done, options);
  //process.stdout.write('\nprompt > ');
});

var done = function(output) {
  // show the output
  process.stdout.write(output);
  // show the prompt
  process.stdout.write('\nprompt > ');
}