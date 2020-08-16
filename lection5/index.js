const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

const URL = 'http://localhost:9545'

const init = async() => {    
    
    const web3 = new Web3(URL)     
    
    try{        
                           
        web3.eth.net.getId()                      
        .then(id => {            
            // Get Network obj out of MyContract.json by id
            deployedNetwork  = MyContract.networks[id]
            
        })        
        .then(() => {
            // Create Contract-Object with ABI of MyContract.json and address of the Network
            console.log(deployedNetwork)
            contract = new web3.eth.Contract(
                MyContract.abi, deployedNetwork.address
            )

            // Get Addresses for preparation of transaction
            return addresses = web3.eth.getAccounts()                               
        })
        .then((addresses) => {
        // // Send out Function call to set state of data in Smart Contract to 1337
 
        return contract.methods.setData(1337).send({
                from: addresses[0]                                
             }).once('receipt', (receipt) => { console.log(receipt) })  
        })        
        .then(() => {
            return contract.methods.getData().call()            
        })                        
        .then(data => {
            console.log(data)
            console.log('addresses[0]: ', addresses[0])
            console.log('DONE\n\n')                
        })
       
    }catch (err) {
        console.error(err)
    }
}

init()