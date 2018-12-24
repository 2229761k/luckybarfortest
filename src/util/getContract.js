import Web3 from 'web3'
import {address, ABI} from './constants/t2tContract'
import {tokenAddress, tokenABI} from './constants/tokenContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let t2tContract = web3.eth.contract(ABI)
  let t2tContractInstance = t2tContract.at(address)

  console.log("t2tContract Address")
  console.log(t2tContractInstance.address)
  resolve(t2tContractInstance)
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
