#!/usr/bin/env node

// https://github.com/paulmillr/chokidar
var chokidar = require('chokidar');
var path     = require('path');
var exec     = require('child_process').exec;
var fs       = require('fs');

if (process.argv.length < 3) {
  console.log('Usage: autorun FILENAME');
  process.exit(1);
}

var watcher = chokidar.watch(null, {
  ignored: /[\/\\]\./,
  persistent: true
});

var processFile = function(path){
  console.log('> processing', path);

  fs.readFile(path, function (err, data) {
    if (err) throw err;
    var match = data.toString().match(/autorun: (.*)\n/);
    if(match){
      var cmd = match[1].replace(/\$FILEPATH/, path);
      console.log("$ " + cmd);
      exec(cmd, function (error, stdout, stderr) {
        // output is in stdout
        // console.log("$ ruby =>", error, stdout, stderr);
        // console.log(error, stdout, stderr);

        process.stdout.write(stdout);
        process.stderr.write(stderr);

        // console.log(stdout);
        // console.error(stderr + "<- that was the error");
      });
    }
  });
}

watcher.on('add', processFile).on('change', processFile);

// add files from argv
for(var i=2; i<process.argv.length; i++){
  var filepath = path.normalize(path.join(process.cwd(), process.argv[i]));
  console.log("> watching", filepath);
  watcher.add(filepath);
}
