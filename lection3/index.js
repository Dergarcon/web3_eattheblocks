const Web3 = require('web3')
const URL = 'http://localhost:8545'

const customProvider = {
    sendAsync: (payload, cb) => {
        console.log('you called')
        console.log(payload)
        cb(undefined, 100)
    }
}
//const provider = Web3.providers.HttpProvider(URL)

const web3 = new Web3(customProvider)

web3.eth.getBlockNumber()
    .then(() => console.log('done!'))