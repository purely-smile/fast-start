const { spawn } = require("child_process");
const inquirer = require("inquirer");
const getPort = require("get-port");
const { kill } = require("cross-port-killer");
const co = require("co");
const dataConfig = require("./data-config");
const selectConfig = require("./select-config");

module.exports = function npmStart() {
  const data = dataConfig.getConfig();
  const prompt = inquirer.createPromptModule();
  co(function*() {
    try {
      const { name } = yield selectConfig("启动");
      const { path, cli, port } = data[name];
      const newProt = yield getPort({ port });
      console.log('newProt',newProt);
      if (newProt != port) {
        const { isNeedKill } = yield prompt({
          name: "isNeedKill",
          message: `该端口：${port}已被占用,是否解除占用`,
          type: "confirm"
        });
        if (isNeedKill) {
          yield kill(port);
          console.log(`端口${port}已解除占用`);
        } else {
          return console.log("已终止启动");
        }
      }
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
    } catch (error) {
      console.log(error);
    }
  });
};
