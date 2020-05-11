
const result = require('dotenv').config({path: './.env'});
const cp = require('child_process');
const chalk = require('chalk');
const rimraf = require('rimraf');


if (result.error) {
  throw result.error
}


var commands = {
	init: 'git init',
	remote: '',
	add: 'git add .',
	commit: `git commit -m "Initial Commit"`,
	push: `git push -u origin master`
};

const fs = require('fs');
const path = require('path');

const { Octokit } = require('@octokit/rest');

const client = new Octokit({
	auth: process.env.TOKEN
});

function createRepo(name, flag){
	

	client.repos.createForAuthenticatedUser({
	name: name
	}).then(d=>{
		console.log(chalk`{magenta Step 1: }{blueBright Created a remote repository: }{greenBright ${d.data.clone_url}}`);
		if(!flag){
			commands.remote = `git remote add origin ${d.data.clone_url}`;
			createDirectory(name);
		}
	}).catch(err=>{
		console.log(chalk`{redBright ${err}\n} {yellowBright Try getting a new Personal Access Token}`);
	});
}

function deleteRepo(name, flag){
	client.repos.delete({
	owner: process.env.USER,
	repo: name
	}).then(data=>{
		console.log(chalk`{redBright Deleted remote repository}`);
		// deleteDirectory(name);
		var projectPath = path.join(process.env.FOLDER, name);
		if(!flag){
			rimraf(projectPath, function () { console.log(chalk`{greenBright Successfully deleted Project} {redBright ${name}}`); });
		}
	}).catch(err=>{
		console.log(chalk`{redBright ${err}}`);
	})
}



function createDirectory(projectName){

	var projectPath = path.join(process.env.FOLDER, projectName);
	fs.mkdir(projectPath, (err)=>{
		if(err){
			console.log(chalk`{redBright ${err}}`);			
		} else {
			console.log(chalk`{magenta Step 2:} {blueBright Project created at path:} {greenBright ${projectPath}}`);
			fs.writeFileSync(`${projectPath}/README.md`);
			console.log(chalk`{magenta Step 3:} {blueBright Initialized with a} {yellowBright README.md}`)
			gitInit(projectPath);
		}
	});
	
}



function gitInit(projectPath){
	cp.exec(commands.init, {cwd: `${projectPath}`}, (error, stdout, stderr)=>{
		if(error){
			console.log(chalk`{redBright ${error}}`);
		} else if(stderr){
			console.log(chalk`{redBright ${stderr}}`);
		} else {
			console.log(chalk`{magenta Step 4:} {greenBright ${stdout}}`);
			addRemoteRepo(projectPath);
		}
	})
}

function addRemoteRepo(projectPath){
	cp.exec(commands.remote, {cwd: `${projectPath}`}, (error, stdout, stderr)=>{
		if(error){
			console.log(chalk`{redBright ${error}}`);
		} else if(stderr){
			console.log(chalk`{redBright ${stderr}}`);
		} else{
			console.log(chalk`{magenta Step 5:} {blueBright Added Remote repository.}`);
			gitAdd(projectPath);
		}
	})
}

function gitAdd(projectPath){
	cp.exec(commands.add, {cwd: `${projectPath}`}, (error, stdout, stderr)=>{
		if(error){
			console.log(chalk`{redBright ${error}}`);
		} else if(stderr){
			console.log(chalk`{redBright ${stderr}}`);
		} else{
			console.log(chalk`{magenta Step 6:} {blueBright Performed git add .}`);
			gitCommit(projectPath);
		}
	})
}

function gitCommit(projectPath){
	cp.exec(commands.commit, {cwd: `${projectPath}`}, (error, stdout, stderr)=>{
		if(error){
			console.log(chalk`{redBright ${error}}`);
		} else if(stderr){
			console.log(chalk`{redBright ${stderr}}`);
		} else{
			console.log(chalk`{magenta Step 7:} {greenBright ${stdout}}`);
			console.log(chalk`{magenta Step 8:} {blueBright Pushing to remote repository.}`)
			gitPush(projectPath);
		}
	})
}

function gitPush(projectPath){
	var childPush = cp.exec(commands.push, {cwd: `${projectPath}`});

		childPush.stdout.on('data', function(data) {
		    console.log(data);
		    console.log(chalk`{cyanBright Done execution. You can now start working on the project}\n{yellowBright Happy Coding!}`); 
		});
}


module.exports = {
	createRepo,
	deleteRepo
}

