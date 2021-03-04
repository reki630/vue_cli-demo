const { promisify } = require("util");
const open = require("open");
const download = promisify(require("download-git-repo"));
const path = require("path");

const { vueRepo } = require("../config/repo-configs");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, createPathSync } = require("../utils/utils");

const createProjectAction = async (project) => {
  //clone项目
  await download(vueRepo, project, { clone: true });
  //yarn add
  const command = process.platform == "win32" ? "yarn.cmd" : "yarn";
  await commandSpawn(command, ["add"], { cwd: `./${project}` });
  //yarn run serve
  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
  //打开浏览器
  open("http://localhost:8080");
};

const addComponentAction = (componentName, dest) => {
  const result = compile("vue_component", {
    name: componentName,
    lowerName: componentName.toLowerCase(),
  });
  const targetPath = path.resolve(dest, `${componentName}.vue`);
  writeToFile(targetPath, result);
};

const addPageAction = async (pageName, dest) => {
  let data = {
    name: pageName,
    lowerName: pageName.toLowerCase(),
  };
  const routerResult = await compile("vue_router", data);
  const pageResult = await compile("vue_component", data);
  const targetDest = path.resolve(dest, pageName);
  if (createPathSync(targetDest)) {
    const routerPath = path.resolve(targetDest, "router.js");
    const pagePath = path.resolve(targetDest, `${pageName}.vue`);
    writeToFile(pagePath, pageResult);
    writeToFile(routerPath, routerResult);
  }
};

const addStoreAction = async (storeName, dest) => {
  const storeResult = await compile("vue_store", {});
  const typesResult = await compile("vue_types", {});
  const targetDest = path.resolve(dest, storeName);

  if (createPathSync(targetDest)) {
    const storePath = path.resolve(targetDest, `${storeName}.js`);
    const typesPath = path.resolve(targetDest, "types.js");
    writeToFile(storePath, storeResult);
    writeToFile(typesPath, typesResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addStoreAction,
};
