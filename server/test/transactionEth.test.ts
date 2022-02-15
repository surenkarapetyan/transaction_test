// eslint-disable-next-line @typescript-eslint/no-var-requires
const Accounts = require('web3-eth-accounts');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chai = require('chai');
const assert = chai.assert;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
const web3 = new Web3();

const tests = [
  {
    address: '0x09368CE836c374084df2699B4910c7897E915308',
    privateKey:
      'a065fa40cde31d394b304774d1bc4d41a84883edad4b92e3670b7302114a618e',
    data: 'Some data',
    // signature done with personal_sign
    signature:
      '0xcfc0ce7b18fc4d3c5024698a83003e9a50ba486d31e5bc2f5453d96171af2fa22fd59680b05297d6cf01e6a1e6abf453b29f77e6bce8a0a251500d2608db64401c',
  },
];

describe('eth', function () {
  describe('accounts', function () {
    tests.forEach(function (test, i) {
      it('sign data using a string', function () {
        const ethAccounts = new Accounts();

        const data = ethAccounts.sign(test.data, test.privateKey);

        assert.equal(data.signature, test.signature);
      });

      it('sign data using a utf8 encoded hex string', function () {
        const ethAccounts = new Accounts();

        let data = web3.utils.isHexStrict(test.data)
          ? test.data
          : web3.utils.utf8ToHex(test.data);
        data = ethAccounts.sign(data, test.privateKey);

        assert.equal(data.signature, test.signature);
      });

      it('recover signature using a string', function () {
        const ethAccounts = new Accounts();

        const address = ethAccounts.recover(test.data, test.signature);

        assert.equal(address, test.address);
      });

      it('recover signature using a string and preFixed', function () {
        const ethAccounts = new Accounts();

        const address = ethAccounts.recover(
          ethAccounts.hashMessage(test.data),
          test.signature,
          true,
        );
        assert.equal(address, test.address);
      });
    });
  });
});
