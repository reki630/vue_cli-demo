#!/usr/bin/env node

const program=require("commander")

const helpOption=require('./lib/core/help')
const createCommand=require('./lib/core/create')

program.version(require('./package').version)
helpOption()
createCommand()
program.parse(process.argv)