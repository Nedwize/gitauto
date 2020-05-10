#!/usr/bin/env node

const program = require('commander');
const { createRepo, deleteRepo } = require('./index');

program
	.version('1.0.0')
	.description('Automate creating Git Repos')

program
	.command('create <name>')
	.alias('c')
	.description('Create a github repository.')
	.option('-o, --only', 'Only Repository')
	.action(function (name, cmdObj) {
		createRepo(name, cmdObj.only);
	})

program
	.command('delete <name>')
	.alias('d')
	.description('Delete a github repository.')
	.option('-o, --only', 'Only Repository')
	.action(function (name, cmdObj) {
		deleteRepo(name, cmdObj.only);
	})

program.parse(process.argv);