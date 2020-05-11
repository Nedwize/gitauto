# gitauto [![@latest](https://img.shields.io/badge/git-automate-blue)](https://github.com/NakshatraCodes)

> A command line tool to automate GitHub project creation locally as well as remotely.

[![@latest](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/NakshatraCodes)
[![@latest](https://img.shields.io/badge/license-MIT-blue)](https://github.com/NakshatraCodes)

## Getting Started

 - To get started with using **gitauto**, you will need a *Personal Access Token* from GitHub. This token can be used to authenticate everytime you give commands. 
(Make sure to check Write Repo and Read Repo while creating the TOKEN)

 - Learn about getting a *Personal Access Token* from GitHub, [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

 - You can specify a project directory where you want all your GitHub Projects to go. 

 - Create a *.env* file in the *C:/Users/USER/AppData/Roaming/npm/node_modules/gitauto-cli/* directory with the following parameters. 

```
TOKEN=****************************************
USER=YourUsername
FOLDER=C:/Users/<Username>/Documents/MyProjects/
```

### Prerequisites

This tool requires npm and Node.js to be installed in your system.
Run the following commands:
```sh
npm --version
node --version
```
If you get no errors, you're probably good to go.

### Installing

Install using npm:
```sh
npm install gitauto-cli -g
```
*Note: Don't forget to use the -g flag to install it globally in your system.*


## Usage

**gitauto** offers two commands *create* and *delete*

### create

```sh
gitauto create myNewRepo
```
 - It creates a remote repository *myNewRepo* in your GitHub account.
 - Creates a new project with the same name in the directory specified in the *.env* file in your local system.
 - Initializes Git init with a README.md file.
 - Commits these changes with message *"Initial Commit"*.
 - Adds remote origin to the local repository.
 - Pushes all the changes to the remote repository.  

### create with flag(-o)

```sh
gitauto create myNewRepo -o
```
 - The **-o** or **--only** flag specifies that ONLY a remote repository is to be created.  
 - Creates a remote repository *myNewRepo* in your GitHub account and displays the URL.
 - *No file changes are made to the system.*

### delete

```sh
gitauto delete myNewRepo
```
 - It deletes remote repository with the name *myNewRepo* from your GitHub account.
 - Looks for project with the same name in the directory specified in the *.env* file in your local system and deletes it.
 - *Used for deleting repos existing both on local system as well as remotely.*

### delete with flag(-o)

```sh
gitauto delete myNewRepo -o
```
 - The **-o** or **--only** flag specifies that ONLY the remote repository is to be deleted.  
 - *No file changes are made to the system.*

## Author

* **Nakshatra Saxena** - [GitHub](https://github.com/NakshatraCodes)


## Built With

* [Octokit](https://www.npmjs.com/package/@octokit/rest) - GitHub REST API client for JavaScript
* [Commander](https://www.npmjs.com/package/commander) - The complete solution for node.js command-line programs
* [Chalk](https://www.npmjs.com/package/chalk) - Terminal string styling done right

## LICENSE

[MIT](LICENSE)


