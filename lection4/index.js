const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

const URL = 'http://localhost:9545'

const init = async() => {    
    try{
        console.log('starting...')
        const web3 = new Web3(URL)
        console.log('URL: ', URL)
        const id = await web3.eth.net.getId()
        console.log('id: ', id)        
        const deployedNetwork  = MyContract.networks[id]
        console.log('address\n', deployedNetwork.address)
        const contract = new web3.eth.Contract(
            MyContract.abi, deployedNetwork.address
        )

        const result = await contract.methods.getData().call()
        console.log('result: ', result)
        console.log('DONE.')

    }catch (err) {
        console.error(err)
    }
}

init()