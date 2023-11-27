import EXEC from "child_process";
export const commandLine = function (command, callback) {
  var child_process = EXEC.exec(command, function (err, stdout, stderr) {
    if (err && err.length > 1) {
      console.log("failed to find playback or record devices");
      callback(error("InternalError", "No input or output devices found", 500));
      return;
    } else {
      if (stdout) {
        callback(null, stdout); //returns cmd line output
      }
      if (stderr) {
        callback(new Error("STDERR"), stderr);
      }
    }
  });
  return child_process;
};
