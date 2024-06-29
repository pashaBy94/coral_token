import { toNano } from '@ton/core';
import { JetonWallet } from '../wrappers/JetonWallet';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jetonWallet = provider.open(await JetonWallet.fromInit());

    await jetonWallet.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jetonWallet.address);

    // run methods on `jetonWallet`
}
