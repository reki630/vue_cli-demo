const program = require("commander");

const {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addStoreAction,
} = require("./actions");

const createCommand = () => {
  program
    .command("create <project name> [others...]")
    .description("clone a repository into a folder")
    .action(createProjectAction);
  program
    .command("addcpn <component name>")
    .description("add a new Vue component")
    .action((name) => {
      addComponentAction(name, program.dest || "src/components");
    });
  program
    .command("addpage <page name>")
    .description("add a new page with vue page and router config")
    .action((page) => {
      addPageAction(page, program.dest || "src/pages");
    });
  program
    .command("addstore <store name>")
    .description("add a new store with vue store.js file and types.js file")
    .action((store) => {
      addStoreAction(store, program.dest || "src/store");
    });
};

module.exports = createCommand;
