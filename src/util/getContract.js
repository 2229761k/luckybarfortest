import Web3 from 'web3'
import {address, ABI} from './constants/gameContract'
import {tokenAddress, tokenABI} from './constants/tokenContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let gameContract = web3.eth.contract(ABI)
  let gameContractInstance = gameContract.at(address)

  console.log("Game Contract Address")
  console.log(gameContractInstance.address)
  resolve(gameContractInstance)
})

let getToken = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let tokenContract = web3.eth.contract(tokenABI)
  let tokenContractInstance = tokenContract.at(tokenAddress)
  
  console.log("token Contract Address")
  console.log(tokenContractInstance.address)
  resolve(tokenContractInstance)
})

export { getContract, getToken }
