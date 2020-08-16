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
        console.log('deployedNetwork: ', deployedNetwork)
        // Create Contracts object with ABI of MyContract and the Networkadress of MyContract
        const contract = new web3.eth.Contract(
            MyContract.abi, deployedNetwork.address            
        )        

        // Get addresses to prepare transactions
        const addresses = await web3.eth.getAccounts()
         
        // Create and send Transaction to sendEther Function of the SC
        await contract.methods.sendEther().send({
            from: addresses[0],
            value: '100000000'
        })        
        // outputs the last function which was called
        console.log(await contract.methods.functionCalled().call())
        
        // Create and send Transaction to Fallback Function of the SC
        await web3.eth.sendTransaction({
            from: addresses[0],
            to: contract.options.address,
            value: '100000000'
        })        
        // Outputs the last function which was called
        console.log(await contract.methods.functionCalled().call())

        // Create transaction to send eth from one address to another
        await web3.eth.sendTransaction({
            from: addresses[0],
            to: addresses[1],
            value: '10123102'
        })

        console.log('done.\n\n')                        
    }catch (err) {
        console.error(err)
    }
}

init()