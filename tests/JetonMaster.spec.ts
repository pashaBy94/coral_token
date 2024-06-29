import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JetonMaster } from '../wrappers/JetonMaster';
import '@ton/test-utils';

describe('JetonMaster', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jetonMaster: SandboxContract<JetonMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jetonMaster = blockchain.openContract(await JetonMaster.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jetonMaster.send(
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
            to: jetonMaster.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jetonMaster are ready to use
    });
});
