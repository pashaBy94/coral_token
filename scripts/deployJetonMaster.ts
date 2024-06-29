import { toNano } from '@ton/core';
import { JetonMaster } from '../wrappers/JetonMaster';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jetonMaster = provider.open(await JetonMaster.fromInit());

    await jetonMaster.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jetonMaster.address);

    // run methods on `jetonMaster`
}
