const path = require("path");
const fs = require("fs");
const co = require("co");
const inquirer = require("inquirer");
const dataConfig = require("./data-config");

const prompt = inquirer.createPromptModule();
/**
 *
 * @param {String} projPath 项目路径
 * @param {String} cli 脚本命令
 */
module.exports = function() {
  co(function*() {
    const { projName } = yield prompt({
      name: "projName",
      message: `请输入项目名称`,
      type: "input"
    });
    const { projPath } = yield prompt({
      name: "projPath",
      message: `请输入项目路径`,
      type: "input"
    });
    const { cli } = yield prompt({
      name: "cli",
      message: `请输入脚本命令`,
      type: "input"
    });
    if (!projPath || !cli || !projName) {
      return console.log("请输入项目路径和脚本命令");
    }
    const cwd = process.cwd();
    const absolutePath = path.resolve(cwd, projPath);
    const pkgPath = path.resolve(absolutePath, "package.json");
    if (!fs.existsSync(pkgPath)) {
      return console.log(`该目录中:${pkgPath}未找到package.json文件`);
    }
    const data = dataConfig.getConfig();
    data[projName] = {
      path: absolutePath,
      cli
    };
    dataConfig.setConfig(data);
  });
};
