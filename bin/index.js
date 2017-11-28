#!/usr/bin/env node
const meow = require("meow");
const addConfig = require("./add-config");
const npmStart = require('./npm-start');
const cli = meow(
  `
  参数
    -a --add 添加目录
    -d --delete 删除
    -l --list 配置列表
`,
  {
    alias: {
      a: "add",
      l: "list",
      d: "delete"
    }
  }
);

const { add, list, d } = cli.flags;

if(add === true){
  addConfig()
}else{
  npmStart();
}