import EXEC from 'child_process';
const commandLine = function(command, callback) {
    var child_process = EXEC.exec(command, function (err, stdout, stderr) {
  
      if (err && err.length > 1) {
              console.log("failed to find playback or record devices");
              callback(error("InternalError", "No input or output devices found", 500));
              return;
          }else{
              if(stdout){
                      callback(null,stdout); //returns cmd line output 
              }
              if(stderr){
                  callback(new Error("STDERR"),stderr);
              }
  
      }  
    });
    return child_process;
  };

  var cmd_output = '';

var cp = commandLine('npm root --global',function(err,data){
    console.log("Callback called");
    if(err){
        console.log(err);
    }
    cmd_output = Buffer.from(data).toString('utf8');
})

cp.on('close',function(){
    //cmd_output is already populated above. If you want just console.log here or leave it
    console.log(cmd_output);
})