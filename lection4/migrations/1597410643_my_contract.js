var MyContract = artifacts.require('./MyContract.sol')

module.exports = function(deployer) {
  deployer.deploy(MyContract, "This is my message")
}
