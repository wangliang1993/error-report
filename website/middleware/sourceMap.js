const fs = require("fs");
const path = require("path");
let sourceMap = require("source-map");
let sourceMapFilePath = path.join(__dirname, "./main.bundle.js.map");
let sourceFileMap = {};
let fixPath = filePath => {
  return filePath.replace(/\.[\.\/]+/, "");
};
module.exports = async (ctx, next) => {
  if (ctx.path === "sourcemap") {
    // 读取source-map文件
    let sourceMapContent = fs.readFileSync(sourceMapFilePath, "utf-8");
    let fileObj = JSON.parse(sourceMapContent);
    let { sources } = fileObj;
    sources.forEach(item => {
      sourceFileMap[fixPath(item)] = item;
    });
    let line = 554;
    let column = 17;
    const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
    let result = consumer.originalPositionFor({ line, column });
    let originSource = sourceFileMap[result.source];
    let sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)];
    let sourceContentArr = sourceContent.split("\n");
    ctx.body = { sourceContentArr, sourcesContent, originSource, result };
  }
  return next();
};
