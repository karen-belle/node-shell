//console.log(process); 


var commandObj = require('./commands');

process.stdout.write('prompt > ');

var cmdList = [];
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
    var cmd = data.toString().trim(); // remove the newline
    var cmdArray = cmd.split(" ");
    cmdList = cmd.split(/\s*\|\s*/g).slice(1);

    var newArray = cmdArray.slice(1);

    //console.log(options);

    commandObj[cmdArray[0]](done, newArray);
    //process.stdout.write('\nprompt > ');
});

var done = function(output) {
	   
	process.stdout.write( output);
    if(cmdList.length)
    {
    	commandObj[cmdList.pop()](done, null, output);
    }
    process.stdout.write('\nprompt > ');
}
