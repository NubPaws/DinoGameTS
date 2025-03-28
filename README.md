# Dino Game TS

Table of Contents
- [Motivation](#motivation)
- [Playing the Game](#playing-the-game)
- [Setup](#setup)
	- [Prerequisites](#prerequisites)


## Motivation
This is a recreation of Google's Dino Game, the one that you can play when you don't have an internet connection. This game was made using TypeScript and Node.js.

## Playing the Game
You can run the game going to the [GitHub page](https://nubpaws.github.io/DinoGameTS/).<br/>
The GitHub page runs on a second branch that was made purposely for the the pages service.

If you are interested in downloading the code, compiling the TypeScript and running it yourself you can follow the setup tutorial.

## Setup
### Prerequisites
You'll need:
* Node.js
  * `apt-get install nodejs`
* TypeScript
  * `node i -g typescript`
* (Optional) Python3 to run an http server on your machine:
  * `sudo apt-get install python3`

To download the code you can clone the Git repo using:
```git
git clone https://github.com/NubPaws/DinoGameTS.git
```

Then you can compile the code using the `tsc` command. This will generate the code in the `public/` folder.

To run the website on your computer you'll need to have a server running. In this project you can run a simple http server using the `./run_server.sh` script that just runs the python3 `http.server` module. It'll run the server on the `localhost:8080` address.<br/>
Go to `localhost:8080/public` and you'll be refered to the game where you can play it just like you can on the browser.
