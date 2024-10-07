import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { address, toNano } from '@ton/core';
import { IAAIContract } from '../wrappers/IAAIContract';
import '@ton/test-utils';
import exp from 'constants';

describe('IAAIContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let aIContract: SandboxContract<IAAIContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        aIContract = blockchain.openContract(await IAAIContract.fromInit(address('EQAxYWsZtDghIYUXVA460CeLr5cwKiRLfDbei4YENLVwK7mZ')));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await aIContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: aIContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and aIContract are ready to use
    });

    it('should receive message with payload', async () => {
        const launcher = await blockchain.treasury('launcher');

        const result = await aIContract.send(
            launcher.getSender(),
            {
                value: toNano('2.5'),
            },
            "super_mega_comment"
        );

        expect(result.transactions).toHaveTransaction({
            from: launcher.address,
            to: aIContract.address,
            success: true,
            value: toNano('2.5'),
        });

        console.log(aIContract.getBalance());
    });
});
