const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const compile = async (template, data) => {
  const templatePosition = `../templates/${template}.ejs`;
  const templatePath = path.resolve(__dirname, templatePosition);
  let result;
  await ejs
    .renderFile(templatePath, { data }, {})
    .then((data) => {
      result = data;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  return result;
};

const createPathSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createPathSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createPathSync,
};
