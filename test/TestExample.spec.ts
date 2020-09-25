import assert from 'assert';

describe('Test suite specification', () => {
    it('Successful test', () => {
        assert.strictEqual(1, 1, 'Message when fail')
    });
    it('Failed test', () => {
        assert.strictEqual(1, 0, 'Message when fail')
    });
})