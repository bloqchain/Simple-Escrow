
const { balance, ether, expectEvent, shouldFail } = require('openzeppelin-test-helpers');

function testingOutEscrow (primary, [payee1, payee2]) {
  const amount = ether('2');

  describe('10 tests for simple escrow dapp', function () {

    describe('6 tests testing out aspects of deposits', function () {

      it('#1 - Only account specified as primary can deposit', async function () {
        await shouldFail.reverting(this.escrow.deposit(payee1, { from: payee2 }));
      });

      it('#2 - Accepts empty deposit', async function () {
        await this.escrow.deposit(payee1, { from: primary, value: 0 });
      });

      it('#3 - Accepts single deposit', async function () {
        await this.escrow.deposit(payee1, { from: primary, value: amount });

        (await balance.current(this.escrow.address)).should.be.bignumber.equal(amount);

        (await this.escrow.depositsOf(payee1)).should.be.bignumber.equal(amount);
      });

      it('#4 - Accepts multiple deposits to one account', async function () {
        await this.escrow.deposit(payee1, { from: primary, value: amount });
        await this.escrow.deposit(payee1, { from: primary, value: amount.muln(2) });

        (await balance.current(this.escrow.address)).should.be.bignumber.equal(amount.muln(3));

        (await this.escrow.depositsOf(payee1)).should.be.bignumber.equal(amount.muln(3));
      });

      it('#5 - Tracks deposits to multiple accounts', async function () {
        await this.escrow.deposit(payee1, { from: primary, value: amount });
        await this.escrow.deposit(payee2, { from: primary, value: amount.muln(2) });

        (await balance.current(this.escrow.address)).should.be.bignumber.equal(amount.muln(3));

        (await this.escrow.depositsOf(payee1)).should.be.bignumber.equal(amount);

        (await this.escrow.depositsOf(payee2)).should.be.bignumber.equal(amount.muln(2));
      });

      it('#6 - Emits event signaling deposit', async function () {
        const { logs } = await this.escrow.deposit(payee1, { from: primary, value: amount });
        expectEvent.inLogs(logs, 'DepEvent', {
          payeeAddr: payee1,
          weiAmount: amount,
        });
      });
    });

    describe('4 tests testing out aspects of withdrawals', async function () {
      
      it('#1 - Only account specified as primary can withdraw', async function () {
        await shouldFail.reverting(this.escrow.withdraw(payee1, { from: payee1 }));
      });

      it('#2 - Executes empty withdrawal', async function () {
        await this.escrow.withdraw(payee1, { from: primary });
      });

      it('#3 - Executes withdrawal payments', async function () {
        (await balance.difference(payee1, async () => {
          await this.escrow.deposit(payee1, { from: primary, value: amount });
          await this.escrow.withdraw(payee1, { from: primary });
        })).should.be.bignumber.equal(amount);

        (await balance.current(this.escrow.address)).should.be.bignumber.equal('0');
        (await this.escrow.depositsOf(payee1)).should.be.bignumber.equal('0');
      });

      it('#4 - Emits event signaling withdrawal', async function () {
        await this.escrow.deposit(payee1, { from: primary, value: amount });
        const { logs } = await this.escrow.withdraw(payee1, { from: primary });
        expectEvent.inLogs(logs, 'WdEvent', {
          payeeAddr: payee1,
          weiAmount: amount,
        });
      });
    });
  });
}

module.exports = {
  testingOutEscrow,
};
