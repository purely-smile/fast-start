const { spawn } = require("child_process");
const dataConfig = require("./data-config");
const selectConfig = require("./select-config");

module.exports = function npmStart() {
  const data = dataConfig.getConfig();
  selectConfig("启动").then(({name}) => {
    const { path, cli } = data[name];
    console.log(name);
    console.log("开始运行项目", path, cli);
    const start = spawn(`cd ${path} && si && ${cli}`, {
      shell: true
    });
    start.stdout.on("data", function(data) {
      console.log(data.toString());
    });

    start.stderr.on("data", function(data) {
      console.log("stderr: " + data.toString());
    });

    start.on("exit", function(code) {
      console.log("child process exited with code " + code.toString());
    });
  },(err)=>console.log(err));
};
