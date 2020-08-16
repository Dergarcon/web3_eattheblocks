const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

const URL = 'http://localhost:9545'

const init = async() => {    

    let contract = new Web3()

    try{        
        
        const web3 = new Web3(URL)        
        web3.eth.net.getId()              
        .then(id => {            
            // Get Network obj out of MyContract.json by id
            const deployedNetwork  = MyContract.networks[id]
            
            // Create Contract-Object with ABI of MyContract.json and address of the Network
            contract = new web3.eth.Contract(
                MyContract.abi, deployedNetwork.address
            )
            
            // Get Addresses for preparation of transaction
            const addresses = web3.eth.getAccounts()

            // Send out Function call to set state of data in Smart Contract to 100
            contract.methods.setData(100).send({
                    from: addresses[0]                
                })
            
            contract.methods.getData().call()
            .then(res => {
                console.log(res)
                console.log('DONE\n\n')
            })
        })
    }catch (err) {
        console.error(err)
    }
}

init()