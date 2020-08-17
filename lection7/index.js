const Web3 = require('web3')
const MyContract = require('./build/contracts/MyContract.json')

// const URL = 'http://localhost:9545'
const URL = 'ws://localhost:9545'

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

        // Get addresses to prepare transactions
        const addresses = await web3.eth.getAccounts()
        
        // call emitEvent function of Smart Contract by addresses[0] to fire MyEvent with value 'het'
        await contract.methods.emitEvent('het').send({
            from: addresses[0]            
        })      
            
        // simple timeout via Promise
        await new Promise(resolve => setTimeout(() =>
        resolve(), 2000))

        // call emitEvent function of Smart Contract by addresses[0] to fire MyEvent with value 'heyo'
        await contract.methods.emitEvent('heyo').send({
            from: addresses[0]            
        })               

        // Read whole blockchain and show MyEvents
        const results = await contract.getPastEvents(
            'MyEvent', {
                fromBlock: 0,
                // filter:{
                //     value:['heyo', 'het'], // or pass single value
                // }
            }
        )
        
        console.log('results', results)

        
        console.log('done.\n\n')                        
    }catch (err) {
        console.error(err)
    }
}

init()