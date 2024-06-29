import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JetonWallet } from '../wrappers/JetonWallet';
import '@ton/test-utils';

describe('JetonWallet', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jetonWallet: SandboxContract<JetonWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jetonWallet = blockchain.openContract(await JetonWallet.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jetonWallet.send(
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
            to: jetonWallet.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jetonWallet are ready to use
    });
});
