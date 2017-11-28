const fs = require("fs");
const path = require("path");
const { HOME } = process.env;
const configPath = path.resolve(HOME, ".fast-start-config.json");

module.exports = {
  getConfig() {
    if(!fs.existsSync(configPath)){
      this.setConfig({});
      return {};
    }else{
      return JSON.parse(fs.readFileSync(configPath));
    }
  },
  setConfig(data) {
    fs.writeFileSync(configPath,JSON.stringify(data));
    console.log(`配置文件已更新:${configPath}`);
  }
};