const { assert } = require('chai');

// eslint-disable-next-line no-undef
const Color = artifacts.require('./Color.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should();

// eslint-disable-next-line no-undef
contract('Color', (accounts) => {
    let contract;

    // eslint-disable-next-line no-undef
    before(async () => {
        contract = await Color.deployed();

    })
    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, "")
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
           const name = await contract.name()
           assert.equal(name, 'Color')
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
         })
    })

    describe('minting', async() => {
    
        it('Create a new token', async () => {
           const result = await contract.mint('#ECO58E');
        //    const totalSupply = await contract.totalSupply();
            // successfully
            // assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')

            // FAILURE : Cannot mint the same color twice
            await contract.mint('ECO58E').should.be.rejected;
        })
    })

    describe('indexing', async () => {
        
        it('lists colors', async () => {
            // Mint 3 more token
            await contract.mint("#5386E4")
            await contract.mint("#FFFFFF")
            await contract.mint("#000000")

            const totalSupply = await contract.totalSupply()

            let color;
            let result  = []

            for (var i = 1; i <= totalSupply; i++){
                color = await contract.colors(i - 1)
                result.push(color)
            }

            let expected = ['#ECO58E', '#5386E4', '#FFFFFF', "#000000"];
            assert.equal(result.join(','), expected.join(','))
        })
    })
})