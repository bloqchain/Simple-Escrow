
Title:  Simple Escrow Dapp

Author: Caro

Date:   March 2019

Email:  bloqchain@gmail.com

Github: bloqchain

Certification:  Consensys-Certified Solidity Developer (please contact me for blockchain-validated certificate)

File:   README.md


==================================================================
	
 Simple Escrow Dapp

==================================================================


## Intro ##

An escrow is an agreement to transfer funds in exchange for a good or service -- an ideal use case for smart contracts. Funds can be held in escrow until a service or good is provided, which can be 'validated' or 'approved' by independent third party.


## Environment ##

This dapp was built leveraging the minimal Truffle scaffolding generated with 'truffle init' command to lay out baseline folders / files.  Desktop app Ganache (from Truffle) is used as operating blockchain.  OpenZeppelin safeguards are used as needed to minimize vulnerabilities and attack surfaces, such as 'SafeMath.'


## Deployment ##

Quick guideline to fire up this dapp:

  * git clone this repository into fresh directory
  * cd into this new directory	
  * npm install -g truffle 	(if Truffle not already installed)
  * npm install --save-dev openzeppelin-test-helpers
    - Note:  These are snippets of JavaScript code for Ethereum smart contract 
      development written by OpenZeppelin.  These are specially suited for Truffle 5 
      (using web3 1.0). 
  * truffle compile --all
  * truffle migrate --reset
    - Note: Before migration, be sure truffle-config.js (if MacOS) 
      or truffle.js is showing right port for either Ganache desktop 
      app (7545) or Ganache-cli at 8545 or 9545
  * truffle test
    - Note:  Ten tests have been written in Javascript and all pass.  Please ensure
      ample funds in blockchain accounts before executing tests.  In Ganache, this can 
      be done by restarting the desktop app.


## Local Blockchain Configuration ##

This dapp uses the full-fledged Truffle local blockchain or Truffle Ganache as the local blockchain.  Please see the website:  truffleframework.com/ganache

As such, the configuration is http://127.0.0.1:7545 for network and port settings, as reflected in the truffle-config.js file.

Please ensure ample funds in blockchain accounts to execute tests.  With Ganache, this can be done by restarting the Ganache desktop app.



