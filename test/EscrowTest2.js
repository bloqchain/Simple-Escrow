
require('openzeppelin-test-helpers');
const { testingOutEscrow } = require('./EscrowTest1');

const Escrow = artifacts.require('Escrow');

contract('Escrow', function ([_, primary, ...otherAccounts]) {
  beforeEach(async function () {
    this.escrow = await Escrow.new({ from: primary });
  });

  testingOutEscrow(primary, otherAccounts);
});