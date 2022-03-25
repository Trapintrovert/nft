// eslint-disable-next-line no-undef
const Color = artifacts.require("Color");

module.exports = function(deployer) {
  deployer.deploy(Color);
};
