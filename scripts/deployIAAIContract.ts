import { address, toNano } from '@ton/core';
import { IAAIContract } from '../wrappers/IAAIContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const targetWallet = address("0QAxYWsZtDghIYUXVA460CeLr5cwKiRLfDbei4YENLVwK1_W");
    const aIContract = provider.open(await IAAIContract.fromInit(targetWallet));

    await aIContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(aIContract.address);

    // run methods on `aIContract`
}
