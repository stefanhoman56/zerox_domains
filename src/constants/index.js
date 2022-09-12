// import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Web 3 Modal Demo", // Required
            // infuraId: process.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
            infuraId: "ddef606e612846de9e71a2174cea02fb"
        }
    },
    // walletconnect: {
    //     package: WalletConnect, // required
    //     options: {
    //         infuraId: process.env.INFURA_KEY // required
    //     }
    // }
};

export const ContractAddress = "0x465683c5557D0018BC6279562Aea1362A4916485";

export const DomainSuffix = ".0x";

export const RinkebyChainID = 4;

export const MainnetChainID = 1;