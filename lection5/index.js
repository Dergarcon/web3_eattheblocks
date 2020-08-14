const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

const URL = 'http://localhost:9545'

const init = async() => {    
    try{
        console.log('starting...')
        const web3 = new Web3(URL)
        console.log('URL: ', URL)        
        web3.eth.net.getId().then(id => {
            console.log('id: ', id)

            const deployedNetwork  = MyContract.networks[id]
            console.log('address: ', deployedNetwork.address)
            const contract = new web3.eth.Contract(
                MyContract.abi, deployedNetwork.address
            )
            contract.methods.getData().call().then(result => {
                console.log('result: ', result)
                console.log('DONE.\n\n')        
            })            
        })                        

    }catch (err) {
        console.error(err)
    }
}

init()