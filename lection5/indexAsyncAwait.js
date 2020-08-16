const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

const URL = 'http://localhost:9545'

const init = async() => {        

    try{                        

        // Create Web3 object with URL parameter (i.e. local Ganash Blockchain)
        const web3 = new Web3(URL)   
        
        // Get ID of the network
        id = await web3.eth.net.getId()  
        
        // Get Networks object of MyContract 
        const deployedNetwork  = await MyContract.networks[id]  
        
        // Create Contracts object with ABI of MyContract and the Networkadress of MyContract
        const contract = new web3.eth.Contract(
            MyContract.abi, deployedNetwork.address            
        )        

        // Get addresses to prepare transaction
        const addresses = await web3.eth.getAccounts()
         
        // Create and send out Transaction -> changing data state of smart contract to 100
        const receipt = await contract.methods.setData(100).send({
            from: addresses[0]                
        })
        console.log('receipt: ', receipt)

        // Get state of Data - should be 100
        const data = await contract.methods.getData().call()
        console.log('data: ', data)
           
        console.log('done.\n\n')                        
    }catch (err) {
        console.error(err)
    }
}

init()