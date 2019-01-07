import Web3 from 'web3'
import {address, ABI} from './constants/gameContract'
import {tokenAddress, tokenABI} from './constants/tokenContract'
import {chipAddress, chipABI} from './constants/chipContract'

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

  console.log("Token Contract Address")
  console.log(tokenContractInstance.address)
  resolve(tokenContractInstance)
})

let getChip = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let chipContract = web3.eth.contract(chipABI)
  let chipContractInstance = chipContract.at(chipAddress)

  console.log("Chip Contract Address")
  console.log(chipContractInstance.address)
  resolve(chipContractInstance)
})

export { getContract, getToken, getChip }
