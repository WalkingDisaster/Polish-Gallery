# Polish-Gallery
This Github project contains two node.js projects:

 * **polish-gallery-app**: An express.js project providing the API back-end.
 * **polish-gallery-ui**: An Angular 2 project containing the user interface.

# Getting Started
 1. If you haven't already, install [Node.js](https://nodejs.org/en/download/)
 2. The app uses the local DocumentDB emulator.
  * If you're on Windows, get it [here](https://aka.ms/documentdb-emulator)
  * If you're not on Windows, you'll have to use the cloud version of DocumentDB for development
 
## polish-gallery-app
This runs on Express.js. From the folder, do the following:

 1. `npm install`
 2. `npm run`
 
That's it.

## polish-gallery-ui
This uses Angular 2 and Angular CLI

 1. `npm install angular-cli -g` if you're on a Mac or Linux, make sure you `sudo` or it won't work.
 2. `npm install` also needs `sudo` if you're on Mac or Linux
 3. `ng serve`
