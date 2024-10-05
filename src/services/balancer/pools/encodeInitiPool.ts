import { Address } from "@balancer-labs/sdk";
import { Interface } from "@ethersproject/abi"

export const encodeInitiPool =  (poolId:Address,tokenAddresses:String[],amountsIn:string[]) => {
    // const routerInterface = new Interface("function initialize(address pool,IERC20[] memory tokens,uint256[] memory exactAmountsIn, uint256 minBptAmountOut,bool wethIsEth,bytes memory userData) external payable returns (uint256 bptAmountOut)",
    // )

    const routerInterface = new Interface([
        "function initialize(address pool, address[] memory tokens, uint256[] memory exactAmountsIn, uint256 minBptAmountOut, bool wethIsEth, bytes memory userData) external payable returns (uint256 bptAmountOut)"
      ]);

    const encodedCall = routerInterface.encodeFunctionData(
        "initialize",
        [
            poolId,
            tokenAddresses,
            amountsIn,
            0, // minBptAmountOut, set to 0 for simplicity
            false, // wethIsEth
            "0x" // userData, empty for default initialization
        ]
    );

    console.log('encodedCall',encodedCall)
    
    return encodedCall
}