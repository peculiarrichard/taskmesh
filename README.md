### TaskMesh - A To-Do List Decentralized App


Installation & Set Up 

1. First step is to add metamask plugin to your supported browser (chrome).

There may be problems with installing certain packages if they are not well-maintained. If you encounter any issues during the installation process, you can check some developer communities for help or reach out to me.

2. This Dapp was deployed to the Goerli testnet. Keep this in mind and have some GoerliETH in your metamask wallet.

3. This project was built with the React-Truffle Unbox. You can find out more about it here: [React truffle box](https://trufflesuite.com/boxes/react/)
4. Next step is to download the repository. You can clone directly from github with the command: git clone {repo link}
In your terminal, cd taskmesh

5. there are two folders in this project folder: "truffle" and "client". Let's start with truffle. cd into "truffle" and install node dependencies with 

```
npm install
```
All packages should install correctly. create a .env file and add the seed phrase from your metamask account as Mnemonic; create a project on infura and copy your project ID as Project_ID in your .env file. Add these details to your truffle-config.js file
6. In your terminal, make sure you are in the project truffle directory and run the command 
```
truffle compile.
```
You should see something like 
Compiled successfully using:
  -solc version

7. We are going to use the GUI method to set up lacal blockchain with Truffle Ganache 
> If you don't have Ganache installed, visit https://trufflesuite.com/ganache/ to download
> After installation, create a workspace and add the truffle-config.js file of this project under "add project"
> When the workspace is open, the local ganache blockchain network should be active on the specified port and network ID.
Run this command:
```
truffle migrate
```
8. Deploy to the Goerli Testnet by running the command:
```
truffle migrate --network goerli
```

If you're deploying it for the second time or more, use the --reset flag to avoid JSON errors: `truffle migrate --network goerli --reset`.

9. cd into "client" from the root folder and Run `npm install` to install all dependencies and then `npm run start` to start the frontend application on `localhost:8080`

10. You should now be able to interact with the DApplication. 

11. Change the contractAddress value to the contract address generated after you deploy to the goerli testnet. You can find this in your App.jsx file

## How it was made
TaskMesh makes use of the following softwares:
* Deployed smart contracts on the `Goerli` Mumbai test network.
* `Truffle & MetaMask` for testing
* `Solidity ` for smart contract.
* Develop, deploy, and run tests the application with `Ganache` (local blockchain)
* `React Js` to create components for single-page applications.

## Developer

- [Peculiar Richard](https://github.com/peculiarrichard)


## Info on React Truffle Box

# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
