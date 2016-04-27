var fs = require('fs');
var request = require('request');


module.exports = {
    pwd: function(done) {
        var output = process.cwd();
        done(output);
    },
    date: function(done) {
        var output = (new Date()).toString();
        done(output);
    },
    ls: function(done) {
        var output = "";
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
                output += file.toString() + "\n";
            })
            done(output);
        })

    },

    //   find: function(done, array) {
    //       //console.log("Array ", array[0]);
    //       var output = "";
    //       var readDirectories = [];
    // //var curr = "";

    //       function list(dir) {
    //           //console.log("Directory ", dir);
    //           fs.readdir(dir, function(err, files) {
    //               if (err) throw err;
    //               files.forEach(function(file) {
    //                   console.log(file.toString());
    //                   readDirectories.push(file.toString());
    //                   //var parent =  array[0] + "/" + curr; 

    //                   while (readDirectories.length > 0) {
    //                      //We'll need to keep adding the path of the parent directory for as long as we are recursing
    //                       //curr = parent + "/" + readDirectories.pop();
    //                       var curr = array[0] + "/" + readDirectories.pop();
    //                       if(!curr.match(/[\.\s]/g))
    //                       {
    //                           list(curr);
    //                       }
    //                       //}
    //                   }
    //               });
    //               //console.log("The queue 2", readDirectories);
    //           });
    //       }
    //       list(array[0]);
    //       //console.log("The queue 1", readDirectories);

    //       done(output);

    //   },


    echo: function(done, array) {
        var output = array.join(" ");
        done(output);
    },
    cat: function(done, array, stdin) {
        var output = "";
        // console.log("Here's our cat array ", array);
        // console.log("Here's our cat stdin ", stdin);
        if (stdin !== undefined) {
            // console.log("we shouldn't be here.");
            output = stdin.toString();
            done(output);
        } else {
            // console.log("Let's read that file, meow.");
            fs.readFile(array[0], function(err, data) {
                if (err) throw err;
                output = data;
                done(output);
            });
        }
        //done(output);

    },

    head: function(done, array, stdin) {
        var output = "";
        //console.log("Here's our head input ", stdin);
        if (stdin !== undefined) {
            var lines = stdin.toString().split('\n');
            for (var i = 0; i < 5; i++) {
                output += lines[i] + '\n';
            }
            done(output);
        } else {
            fs.readFile(array[0], function(err, data) {

                if (err) {
                    throw err;
                }
                output = "";
                var lines = data.toString().split('\n');
                for (var i = 0; i < 5; i++) {
                    output += lines[i] + '\n';
                }
                done(output);
            });
        }

    },

    tail: function(done, array, stdin) {
        var output = ""
        if (stdin !== undefined) {
            var lines = stdin.toString().split('\n');
            for (var i = lines.length - 5; i < lines.length; i++) {
                output += lines[i] + '\n';
            }
            done(output);
        } else {
            fs.readFile(array[0], function(err, data) {

                if (err) {
                    throw err;
                }

                var lines = data.toString().split('\n');
                for (var i = lines.length - 5; i < lines.length; i++) {
                    output += lines[i] + '\n';
                }
                done(output);

            });
        }
    },

    sort: function(done, array, stdin) {
        var output = "";
        if (stdin !== undefined) {
            var lines = stdin.toString().split('\n').sort();
            for (var i = 0; i < lines.length; i++) {
                output += lines[i] + '\n';
            }
            done(output);
        } else {

            fs.readFile(array[0], function(err, data) {

                if (err) {
                    throw err;
                }

                var lines = data.toString().split('\n').sort();
                for (var i = 0; i < lines.length; i++) {
                    output += lines[i] + '\n';
                }
                done(output);

            });
        }
    },

    wc: function(done, array, stdin) {
        var output = "";
        if (stdin !== undefined) {
            var lines = stdin.toString().split('\n');
            output = "Input has " + lines.length + " lines.";
            done(output);
        } else {

            fs.readFile(array[0], function(err, data) {

                if (err) {
                    throw err;
                }

                var lines = data.toString().split('\n');

                output = array[0] + " has " + lines.length + " lines.";
                done(output);

            });
        }
    },
    //console.log(array[0]);
    uniq: function(done, array, stdin) {
        var output = "";
        if (stdin !== undefined) {
            var lines = stdin.toString().split('\n').sort();
            var linesToPrint = [];
            for (var i = 1; i <= lines.length; i++) {
                if (lines[i] != lines[i - 1]) {
                    linesToPrint.push(lines[i - 1]);
                }
            }
            output = linesToPrint.join('\n');
            done(output);
        } 
        else {

            fs.readFile(array[0], function(err, data) {

                if (err) {
                    throw err;
                }

                var lines = data.toString().split('\n').sort();
                var linesToPrint = [];
                for (var i = 1; i <= lines.length; i++) {
                    if (lines[i] != lines[i - 1]) {
                        linesToPrint.push(lines[i - 1]);
                    }
                }

                output = linesToPrint.join('\n');
                done(output);

            });
        }
    },

    curl: function(done, array) {
        request(array[0], function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var output = body; // Show the HTML for the Google homepage.
            } else {
                throw error;
            }
            done(output);
        });

    }



};
