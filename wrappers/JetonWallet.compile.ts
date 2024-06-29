import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/jeton_wallet.tact',
    options: {
        debug: true,
    },
};
