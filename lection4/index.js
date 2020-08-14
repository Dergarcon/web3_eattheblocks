const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

const URL = 'http://localhost:8545'

const init = async() => {    
    const web3 = new Web3(URL)

    const id = await web3.eth.net.getId()
    const deployedNetwork  = MyContract.networks[id]
    const contract = new Web3.eth.Contract(
        MyContract.abi, deployedNetwork.address
    )
}

init()