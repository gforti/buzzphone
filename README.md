# Buzzphone
Host a simple buzzer web app server from your phone. Players will visit the IP address displayed by the host.
Players will tap on the buzzer.  The first to tap will highlight green.
The host can reset the buzzer for all players.

## Hosting on your Phone

In order to run the node.js app on your phone, you will need a terminal app that supports the following
- Node.js
- NPM (Node package manager)
- GIT

### Android 

Visit https://termux.com/  for details about the app.

Download and install the app on your phone.

### IPhone
Not sure what support there is for this.

#### Quick tips:

- Vist https://wiki.termux.com/wiki/Touch_Keyboard for keyboard instructions
- Press `Volume Up+Q` to enable the extra keys view on your native phone keyboard
- in the command line use the following command and press enter to exit.

```sh
$ exit
```

Delete Folder
```sh
$ rm -rf [folder-name]
```

If you need permissions use
```sh
$ sudo rm -rf [folder-name]
```

| Short Command | Use |
| ------ | ------ |
| -f | Ignore non-existent files, never prompt |
| -r | Remove directories and their contents recursively |
| -v | Explain what is being done |

#### Run the following commands

Check for updates
```sh
$ apt update && apt upgrade
```

This will help install extra commands

```sh
$ apt install coreutils
```

Install Node.js which also comes with NPM
```sh
$ apt install nodejs
```

Install GIT
```sh
$ apt install git
```

## Terminal Setup

```sh
$ git clone https://github.com/gforti/buzzphone.git
```

Optional - to check all directories/folders
```sh
$ ls
```

Move into folder `buzzphone`
```sh
$ cd buzzphone
```

## Installation

```sh
$ npm install
```

## Start

```sh
$ npm start
```

## Stop the App
```sh
$ ctrl + c
```

## Running the App

 Note that everyone must be on the same network/WiFi. `Chrome` is the recommend web browser.

> `Buzzer Players` will run on `http://localhost:3000/` 

> `Host` will run on `http://localhost:3000/host`

`localhost` for the `Buzzer Players` should be replaced with the IP address that is shown on the `host` web page

## ScreenShots

![alt text](https://github.com/gforti/buzzphone/blob/master/preview/host.png "Host Screen")

Host Screen

![alt text](https://github.com/gforti/buzzphone/blob/master/preview/player-ready.png "Player Ready")

Player Ready
