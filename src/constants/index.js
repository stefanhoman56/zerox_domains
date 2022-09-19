// import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Web 3 Modal Demo", // Required
            // infuraId: process.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
            infuraId: "ae25115749c84bb78103aa7272ba6aab"
        }
    },
    // walletconnect: {
    //     package: WalletConnect, // required
    //     options: {
    //         infuraId: process.env.INFURA_KEY // required
    //     }
    // }
};

// export const ContractAddress = "0x465683c5557D0018BC6279562Aea1362A4916485";
export const ContractAddress = "0x682d3db55f0136a429507D47BC59a82B55A59e24";

export const DomainSuffix = ".0x";

export const RinkebyChainID = 4;

export const MainnetChainID = 1;