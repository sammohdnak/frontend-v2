import { Address } from "@balancer-labs/sdk";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers, Signer,BigNumber } from "ethers";

const permit2abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "AllowanceExpired",
      type: "error",
    },
    {
      inputs: [],
      name: "ExcessiveInvalidation",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "maxAmount",
          type: "uint256",
        },
      ],
      name: "InvalidAmount",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidContractSignature",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidNonce",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidSignature",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidSignatureLength",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidSigner",
      type: "error",
    },
    {
      inputs: [],
      name: "LengthMismatch",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "signatureDeadline",
          type: "uint256",
        },
      ],
      name: "SignatureExpired",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "Lockdown",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "newNonce",
          type: "uint48",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "oldNonce",
          type: "uint48",
        },
      ],
      name: "NonceInvalidation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "nonce",
          type: "uint48",
        },
      ],
      name: "Permit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "word",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "mask",
          type: "uint256",
        },
      ],
      name: "UnorderedNonceInvalidation",
      type: "event",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
        {
          internalType: "uint48",
          name: "nonce",
          type: "uint48",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint48",
          name: "newNonce",
          type: "uint48",
        },
      ],
      name: "invalidateNonces",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "wordPos",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "mask",
          type: "uint256",
        },
      ],
      name: "invalidateUnorderedNonces",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
          name: "approvals",
          type: "tuple[]",
        },
      ],
      name: "lockdown",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "nonceBitmap",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint160",
                  name: "amount",
                  type: "uint160",
                },
                {
                  internalType: "uint48",
                  name: "expiration",
                  type: "uint48",
                },
                {
                  internalType: "uint48",
                  name: "nonce",
                  type: "uint48",
                },
              ],
              internalType: "struct IAllowanceTransfer.PermitDetails[]",
              name: "details",
              type: "tuple[]",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "sigDeadline",
              type: "uint256",
            },
          ],
          internalType: "struct IAllowanceTransfer.PermitBatch",
          name: "permitBatch",
          type: "tuple",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint160",
                  name: "amount",
                  type: "uint160",
                },
                {
                  internalType: "uint48",
                  name: "expiration",
                  type: "uint48",
                },
                {
                  internalType: "uint48",
                  name: "nonce",
                  type: "uint48",
                },
              ],
              internalType: "struct IAllowanceTransfer.PermitDetails",
              name: "details",
              type: "tuple",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "sigDeadline",
              type: "uint256",
            },
          ],
          internalType: "struct IAllowanceTransfer.PermitSingle",
          name: "permitSingle",
          type: "tuple",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions",
              name: "permitted",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.PermitTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails",
          name: "transferDetails",
          type: "tuple",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "permitTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions[]",
              name: "permitted",
              type: "tuple[]",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "permitTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions",
              name: "permitted",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.PermitTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails",
          name: "transferDetails",
          type: "tuple",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "witness",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "witnessTypeString",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "permitWitnessTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions[]",
              name: "permitted",
              type: "tuple[]",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "witness",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "witnessTypeString",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "permitWitnessTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint160",
              name: "amount",
              type: "uint160",
            },
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
          ],
          internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const

export const permit2Signature = async (
    signer: JsonRpcSigner,
    userAddress:Address,
  routerAddress:Address,
  permit2Address:Address,
    tokens: string[],
  amounts:string[]
) => {
    
  try {
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    
      const nonces= await getNoncesForPermit2(signer,userAddress,permit2Address,routerAddress,tokens)
      const domain = {
          name: "Permit2",
          //TODO Chhange to mainnet later
        chainId: "11155111",
        verifyingContract: permit2Address,
      };
  
      
    
      const types = {
        PermitBatch: [
          { name: "details", type: "PermitDetails[]" },
          { name: "spender", type: "address" },
          { name: "sigDeadline", type: "uint256" },
        ],
        PermitDetails: [
          { name: "token", type: "address" },
          { name: "amount", type: "uint160" },
          { name: "expiration", type: "uint48" },
          { name: "nonce", type: "uint48" },
        ],
      };
    
      const value = {
        
          details: tokens.map((token, i) => ({
            token: token,
            amount: amounts[i],
            expiration: deadline.toString(),
            nonce: nonces[i].toString(),
          })),
        spender: routerAddress,
        sigDeadline: deadline,
      };
  
    
    const signature = await signer._signTypedData(domain, types, value);
    

    return {signature,value}
  } catch (error: any) {
    console.log('Signature Error : ',error)
    throw new Error(error.message)
  }

  
      
    
}


async function getNoncesForPermit2(
    signer:Signer,userAddress:Address,permit2Address:Address, routerAddress:Address, tokens:string[]
  ): Promise<number[]> {
    const permit2Contract = new ethers.Contract(
        permit2Address,
        permit2abi,
        signer
      );
  
    const nonces = await Promise.all(
        tokens.map(async token => {
        const [, , nonce] = await permit2Contract.allowance(
        userAddress,
          token as Address,
          routerAddress,
        )
        return nonce
      })
    )
  
    return nonces
  }

