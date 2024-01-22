import { ethers } from "ethers";
import { Contract } from "ethers";
import {bigNumber_to_number,number_to_bigNumber,getCurrentDecimal,numberToBigNumber} from './initialSmartMain'
import { decimals } from "../config/provider";
import getDatesFromToday from '../utils/getDatesFromToday'
import getDateInterval from '../utils/getDateInterval'

export const mainContractAddress = '0xceB7eDf2AF9Ac364240226BAA2CE9c277CE972Ed'
const usdContractAddress = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'
export const addressNft = '0x70EB7db470063c9f90c103C4526c3f91b82Bf535';

const abi_nft = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Claimers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pool",
				"type": "uint256"
			}
		],
		"name": "addBlockedTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "blockProvider",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "blocked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pool",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getBlockedNow",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getStacked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pool",
				"type": "uint256"
			}
		],
		"name": "removeBlockedTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pool",
				"type": "uint256"
			}
		],
		"name": "removeBlockedTokens_return",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "returned_pools",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "setBlockProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stacked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenN",
				"type": "uint256"
			}
		],
		"name": "stakeToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

//////////////////////////////////Контракт основной
const getMainSmart = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const address_pool= mainContractAddress;
	const abi_pool = [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_new_fee",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_creator",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_crt_fee",
					"type": "uint256"
				}
			],
			"name": "add_collection",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_creator",
					"type": "address"
				}
			],
			"name": "change_creator",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_new_fee",
					"type": "uint256"
				}
			],
			"name": "change_creator_fee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_new_fee",
					"type": "uint256"
				}
			],
			"name": "change_fee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_endTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_token_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_token_address",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				}
			],
			"name": "createItem",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_endTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_token_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_token_address",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_adrby",
					"type": "address"
				}
			],
			"name": "createItem_for_sm",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_endTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_token_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_token_address",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_adrby",
					"type": "address"
				}
			],
			"name": "createItem_for_sm_usd",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_endTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_token_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_token_address",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				}
			],
			"name": "createItem_usd",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				}
			],
			"name": "delete_collection",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_itemId",
					"type": "uint256"
				}
			],
			"name": "purchaseItem",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_item_id",
					"type": "uint256"
				}
			],
			"name": "ItemCreated",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_itemId",
					"type": "uint256"
				}
			],
			"name": "purchaseItem_usd",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_item_id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				}
			],
			"name": "Sold",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				}
			],
			"name": "calculate_creator_Fee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				}
			],
			"name": "calculateFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_coll",
					"type": "address"
				}
			],
			"name": "calculateTotalPrice",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "Collections",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "Creator",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "CreatorFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "fee_price",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "get_all_Available_items",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "item_id",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "endTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "token_id",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "token_address",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "price",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "Available",
							"type": "bool"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "buyer",
							"type": "address"
						}
					],
					"internalType": "struct MShop.Item[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "get_all_Available_items_usd",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "item_id",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "endTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "token_id",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "token_address",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "price",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "Available",
							"type": "bool"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "buyer",
							"type": "address"
						}
					],
					"internalType": "struct MShop.Item[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_itemId",
					"type": "uint256"
				}
			],
			"name": "get_item_by_id",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_itemId",
					"type": "uint256"
				}
			],
			"name": "get_item_by_id_usd",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "item_id",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "item_id_usd",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "Items",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "item_id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "endTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "token_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "token_address",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "Available",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "seller",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "buyer",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "Items_usd",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "item_id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "endTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "token_id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "token_address",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "Available",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "seller",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "buyer",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nft_count",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address payable",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "Royalty",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "token",
			"outputs": [
				{
					"internalType": "contract IERC20",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "token_nft",
			"outputs": [
				{
					"internalType": "contract IERC721",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "total_volume_eth",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "total_volume_usd",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
    const contract_pool = new Contract(address_pool, abi_pool, provider); 
    const daiContractWithSigner_pool = contract_pool.connect(signer);

    return {daiContractWithSigner_pool,contract_pool}
}

////////////////////// Контракт $
const getUsdContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address_usd = usdContractAddress;
	const signer = provider.getSigner()
	const abi_usd = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
    const contract_usd=new Contract(address_usd, abi_usd , provider); 
    const daiContractWithSigner_usd = contract_usd.connect(signer);

    return {contract_usd,daiContractWithSigner_usd}
}

// Апрув управления средствами $ для основного смартконтракта(sum(int) - кол-во $)
export async function approveUsd(sum) {
	const {currentDecimals,currentNumber} = getCurrentDecimal(sum)

	let sum_last= numberToBigNumber(currentNumber,currentDecimals)
	
    try {
		const {daiContractWithSigner_usd} = getUsdContract()
        const ok_ok = await daiContractWithSigner_usd.approve(mainContractAddress,sum_last);

		return {success:true}
      } catch (err) {
        console.info('err in approve', err.message);

		return {success:false}
    }
}

/////////////////////////// Функции основного смарта
/////////////////////////////////Добавить коллекцию в смартконтракт (
    // adr(address) - адрес коллекции, 
    // fee(int) - % новой роялти(задаётся в виде 1 decimal пример 25 = 2.5% комиссии))  
export async function addCollectionToSmart(adr,fee,creator,creator_fee) {  
  try {
        const feeBigInt = number_to_bigNumber(fee,1)
		const creatorFeeBigInt = number_to_bigNumber(creator_fee,1)

        const {daiContractWithSigner_pool} = getMainSmart()

        await daiContractWithSigner_pool.add_collection(adr,feeBigInt,creator,creatorFeeBigInt);

        return {success:true}
    } catch (err) {
        console.info('err in transaction', err.message);

        return {success:false,err:err.message}
  }
}

/////////////////////////////////Изменение роялти в коллекции(adr(address) - адрес коллекции, fee(int) - % новой роялти(задаётся в виде 1 decimal пример 25 = 2.5% комиссии))  
export async function changeFee(adr,fee) {  
  try {
      const feeBigInt = number_to_bigNumber(fee,1)

      const {daiContractWithSigner_pool} = getMainSmart()

      await daiContractWithSigner_pool.change_fee(adr,feeBigInt);

      return {success:true}
    } catch (err) {
      console.info('err in transaction', err.message);

      return {success:false,err:err.message}
  }
}

/////////////////////////////////Удалить коллекцию (adr(address) - адрес коллекции)   
export async function deleteCollectionFromSmart(adr) {  
  try {
        const {daiContractWithSigner_pool} = getMainSmart()

        await daiContractWithSigner_pool.delete_collection(adr);
        
        return {success:true}
    } catch (err) {
        console.info('err in transaction', err.message);

        return {success:false,err:err.message}
  }
}

///////////////////////////////// Создать ордер на продажу для определённого адреса
// endTime(int) - юникс время конца возможности покупки
// token_id(int) - ID NFT токена
// token_address(str) - адрес NFT коллекции
// price(bigNumber) - цена установленная продавцом
// adrby(str) - адрес покупателя
export async function createItemForSm(endTime,token_id,token_address,price,adrby) {  
  try {
		const {daiContractWithSigner_pool} = getMainSmart()

    	const res = await daiContractWithSigner_pool.createItem_for_sm(endTime,token_id,token_address,price,adrby);	
		   
		return {success:true}
    } catch (err) {
		console.log(err)
		return {success:false}
  	}
}

///////////////////////////////// Создать ордер на продажу
// endTime(int) - юникс время конца возможности покупки
// token_id(int) - ID NFT токена
// token_address(str) - адрес NFT коллекции
// price(bigNumber) - цена установленная продавцом
export async function createOrder(endTime,token_id,token_address,price) {  
  try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		const {daiContractWithSigner_pool} = getMainSmart()
	 
    	const response = await daiContractWithSigner_pool.createItem(endTime,token_id,token_address,price);
		
		return {success:true,response}
    } catch (err) {
    	console.info('err in transaction', err.message);

		return {success:false}
  	}
}

//// response (int - ID NFT, str - адрес коллекции,int - цена, str - адрес продавца )
export async function getItemById(item_id) {  
 try {
	const {daiContractWithSigner_pool} = getMainSmart()

  	const response =  await daiContractWithSigner_pool.get_item_by_id(item_id);

  	return (response,'200')
 }
 catch (err) {
	console.info('err', err.message);

	return (0,err.message)
 }
}

///////////////////////////////// Купить NFT
// item_id(int) - ID ордера на продажу
export async function purchaseItem(item_id,price) {  
  try {
		const {daiContractWithSigner_pool} = getMainSmart()
		const {currentDecimals,currentNumber} = getCurrentDecimal(price)
		const priceValue = ethers.utils.parseUnits(String(currentNumber), currentDecimals)
		console.log(bigNumber_to_number(priceValue,decimals))
    	await daiContractWithSigner_pool.purchaseItem(item_id,{ value: priceValue });

		return {success:true}
    } catch (err) {
    	console.info('err in transaction', err.message);

		return {success:false}
  }
}


/////////// Получить массив всех ордеров
//// response (массив ордеров)
export async function getAllAvailableItems() {  
 try {
	const {daiContractWithSigner_pool} = getMainSmart()

	const allOrders = await daiContractWithSigner_pool.get_all_Available_items();

	return {success:true,allOrders}
 }
 catch (err) {
	console.info('err', err.message);

	return {success:false,allOrders:[]}
 }
}

export async function getOrderByNftId(nftId,address) {
	try{
		const {allOrders} = await getAllAvailableItems()

		const currentOrder = {}

		for (let i = 0; i < allOrders.length; i++) {
			const order = allOrders[i];
			const orderNftId = Number(bigNumber_to_number(order.token_id,0))

			if(orderNftId === Number(nftId) && order.token_address === address){
				currentOrder.orderId = Number(bigNumber_to_number(order.item_id,0))
				currentOrder.orderPrice = Number(bigNumber_to_number(order.price,decimals))
				currentOrder.timeEnd = Number(bigNumber_to_number(order.endTime,0))
				currentOrder.orderSeller = order.seller
				currentOrder.orderAddress = order.token_address
				currentOrder.available = order.Available
				currentOrder.buyer = order.buyer
			}
		}
		

		return {success:true,currentOrder}
	}catch(error){
		console.log(error)

		return {success:false}
	}
}

//////////////// Всё то-же самое только для $ 
///////////////////////////////// Создать ордер на продажу для определённого адреса
// endTime(int) - юникс время конца возможности покупки
// token_id(int) - ID NFT токена
// token_address(str) - адрес NFT коллекции
// price(bigNumber) - цена установленная продавцом
// adrby(str) - адрес покупателя
export async function createItemForSmUsd(endTime,token_id,token_address,price,adrby) {  
  try {
		const {daiContractWithSigner_pool} = getMainSmart()

      	const res = await daiContractWithSigner_pool.createItem_for_sm_usd(endTime,token_id,token_address,price,adrby);

		return {success:true}
    } catch (err) {
	    console.info('err in transaction', err.message);
		return {success:false}
  }
}

///////////////////////////////// Создать ордер на продажу
// endTime(int) - юникс время конца возможности покупки
// token_id(int) - ID NFT токена
// token_address(str) - адрес NFT коллекции
// price(bigNumber) - цена установленная продавцом
export async function createOrderUsd(endTime,token_id,token_address,price) {  
  try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		const {daiContractWithSigner_pool} = getMainSmart()

    	const response = await daiContractWithSigner_pool.createItem_usd(endTime,token_id,token_address,price);

		return {success:true,response}
    } catch (err) {
    	console.info('err in transaction', err.message);	

		return {success:false}
  }
}

//// response (int - ID NFT, str - адрес коллекции,int - цена, str - адрес продавца )
async function get_item_by_id_usd(item_id) {  
 try {
  response =  await daiContractWithSigner_pool.get_item_by_id_usd(item_id);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

///////////////////////////////// Купить NFT
// item_id(int) - ID ордера на продажу
export async function purchaseItemUsd(item_id) {  
  try {
		const {daiContractWithSigner_pool} = getMainSmart()

    	await daiContractWithSigner_pool.purchaseItem_usd(item_id);

		return {success:true}
    } catch (err) {
    	console.info('err in transaction', err.message);

    	return {success:false}
  }
}

/////////// Получить массив всех ордеров
//// response (массив ордеров)
export async function getAllAvailableItemsUsd() {  
 try {
	const {daiContractWithSigner_pool} = getMainSmart()

	const allOrders =  await daiContractWithSigner_pool.get_all_Available_items_usd();

	return {success:true,allOrders}
 }
 catch (err) {
	console.info('err', err.message);	

	return {success:false,allOrders:[]}
 }
}

export async function getOrderUsdByNftId(nftId,address) {
	try{
		const {allOrders} = await getAllAvailableItemsUsd()

		const currentOrder = {}

		for (let i = 0; i < allOrders.length; i++) {
			const order = allOrders[i];
			const orderNftId = Number(bigNumber_to_number(order.token_id,0))
			
			currentOrder.orderId = Number(bigNumber_to_number(order.item_id,0))
			currentOrder.orderPrice = Number(bigNumber_to_number(order.price,decimals))
			if(orderNftId === Number(nftId) && order.token_address === address){
				currentOrder.timeEnd = Number(bigNumber_to_number(order.endTime,0))
				currentOrder.orderSeller = order.seller
				currentOrder.orderAddress = order.token_address
				currentOrder.available = order.Available
				currentOrder.buyer = order.buyer
			}
		}


		return {success:true,currentOrder}
	}catch(error){
		console.log(error)

		return {success:false}
	}
}

// Получить кол-во NFT у юзера (user(str) - адрес пользователя) достаёт длинну массива NFT у юзера
export async function getNFTBalance(address_nft,user) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract_nft_nn=new Contract(address_nft, abi_nft, provider); 
    const daiContractWithSigner_nft_nn = contract_nft_nn.connect(signer);	
	
    try {
        const sum = await contract_nft_nn.balanceOf(user);

		const nftsValue = sum ? Number(bigNumber_to_number(sum,0)) : 0

		return {success:true,nfts:nftsValue}
      } catch (err) {
        console.info('err in approve', err.message);

		return {success:false,nfts:0}
    }
}

// Получить ID NFT по индексу в массиве NFT юзера
export async function getNftId(address_nft,user,index) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract_nft_nn=new Contract(address_nft, abi_nft, provider); 
    const daiContractWithSigner_nft_nn = contract_nft_nn.connect(signer);	
    try {
        const nftId = await contract_nft_nn.tokenOfOwnerByIndex(user,index);

		const numberId = nftId ? Number(bigNumber_to_number(nftId,0)) : 0

		return {success:true,nftId:numberId}
      } catch (err) {
        console.info('err in approve', err.message);

		return {success:false,nftId:null}
    }
}

// Получить ссылку на метадату по ID (id_nft(int))
export async function getNftMetaData(address_nft,id_nft) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract_nft_nn=new Contract(address_nft, abi_nft, provider); 
    const daiContractWithSigner_nft_nn = contract_nft_nn.connect(signer);	
    try {
        const data = await contract_nft_nn.tokenURI(id_nft);

		return {success:true,nftData:data}
      } catch (err) {
        console.info('err in approve', err.message);
		
		return {success:false,nftData:null}
    }
}

const parseMetaDataLink = (link) => {
	const updatedUrl = link.replace(/\/\d+$/, "");

	return updatedUrl
}

export const getUserNfts = async (address,user) => {
	try{
		const nftsDataMetaData = []
		const nftsData = []

		const {success,nfts} = await getNFTBalance(address,user)

		for (let i = 0; i < nfts; i++) {
			const {nftId} = await getNftId(address,user,i)
			
			const {nftData} = await getNftMetaData(address,nftId)

			nftsDataMetaData.push({link:nftData,nftId,nftIndex:i})
		}

		for (let i = 0; i < nftsDataMetaData.length; i++) {
			const metaLink = nftsDataMetaData[i].link;

			const response = await fetch(metaLink)

			const data = await response.json()
	
			nftsData.push({...data,nftId:nftsDataMetaData[i].nftId,nftIndex:nftsDataMetaData[i].nftIndex})		
		}

		return {success:true,nftsData}
	}catch(error){
		console.log(error)

		return {success:false,nftsData:[]}
	}
}

export async function approveNFT(address_nft,id_nft) {
    try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner()
		const address_pool= mainContractAddress;
		const contract_nft_nn=new Contract(address_nft, abi_nft, provider); 
		const daiContractWithSigner_nft_nn = contract_nft_nn.connect(signer);	

        const response = await daiContractWithSigner_nft_nn.approve(address_pool,id_nft);
      } catch (err) {
        console.info('err in approve', err.message);
        return (false,err.message)
    }
    return (true,'200')
}

/////////////////////////////////Изменение комиссии создателя в коллекции(adr(address) - адрес коллекции, fee(int) - % новой комиссии(задаётся в виде 1 decimal пример 25 = 2.5% комиссии))  
export async function changeCreatorFee(collectionAddress,fee) {  
	try {
		const {daiContractWithSigner_pool} = getMainSmart()

		await daiContractWithSigner_pool.change_creator_fee(collectionAddress,fee);

		return {success:true}
	  } catch (err) {
		console.info('err in transaction', err.message);
		
		return {success:false}
	}
}
  
/////////////////////////////////Изменение адреса создателя в коллекции(collectionAddress(address) - адрес коллекции, creator(str) - адрес)  
export async function changeCreator(collectionAddress,creator) {  
	try {
		const {daiContractWithSigner_pool} = getMainSmart()

		await daiContractWithSigner_pool.creator(collectionAddress,creator);

		return {success:true}
	  } catch (err) {
		console.info('err in transaction', err.message);
		
		return {success:false}
	}
}

export async function getFloorPriceUsdc (collectionAddress) { 	
	try{
		const {allOrders} = await getAllAvailableItemsUsd()
		const availableOrders = allOrders.filter((order) => {
			return order.Available && order.token_address === collectionAddress
		})
		let floorPrice = 0;
		
		for (let i = 0; i < availableOrders.length; i++) {
			const order = availableOrders[i];
			const price = Number(bigNumber_to_number(order.price,decimals))
	
			if(price < floorPrice || i === 0){
				floorPrice = price
			}
		}

		return {success:true,floorPriceUsdc:Number(floorPrice)}
	}catch(error){
		console.info(error)
		return {success:false,floorPriceUsdc:0}
	}
}

export async function getFloorPriceEth (collectionAddress) { 	
	try{
		const {allOrders} = await getAllAvailableItems()

		const availableOrders = allOrders.filter((order) => {
			return order.Available && order.token_address === collectionAddress
		})
		let floorPrice = 0;
		
		for (let i = 0; i < availableOrders.length; i++) {
			const order = availableOrders[i];
			const price = Number(bigNumber_to_number(order.price,decimals))
			
			if(price < floorPrice || i === 0){
				floorPrice = price
			}
		}

		return {success:true,floorPriceEth:Number(floorPrice)}
	}catch(error){
		console.info(error)
		return {success:false,floorPriceEth:0}
	}
}

export async function getListedNfts(collectionAddress) {
	try{
		const usdOrders = await getAllAvailableItemsUsd()
		const ethOrders = await getAllAvailableItems()
		const nftsId = {

		}

		const allOrders = [...usdOrders.allOrders,...ethOrders.allOrders]

		const availableOrders = allOrders.filter((order) => {

			if
				(
					order.Available 
					&& 
					String(order.token_address).toLowerCase() === String(collectionAddress).toLowerCase()
					&&
					!nftsId[bigNumber_to_number(order.token_id,0)]
				)
				{
					nftsId[bigNumber_to_number(order.token_id,0)] = bigNumber_to_number(order.token_id,0)
	
					return true
			}
		})

		return {success:true,listed:availableOrders.length,availableOrders:availableOrders,allOrders}
	}catch(error){
		console.log(error)

		return {success:false}
	}
}

export const getDateIntervalPrice = async (interval,ethExchange) => {
	try{
		const usdOrders = await getAllAvailableItemsUsd()
		const ethOrders = await getAllAvailableItems()

		let totalPrice = 0
		let actualOrders = 0
		let minPrice = 0
		let maxPrice = 0
		const intervalDate = getDateInterval(interval)

		for (let i = 0; i < usdOrders.allOrders.length; i++) {
			const order = usdOrders.allOrders[i];
			const orderNumberDate = new Date(Number(bigNumber_to_number(order.endTime,0))).getTime()
			const intervalNumberDate = new Date(intervalDate).getTime()
			const isActual = intervalNumberDate < orderNumberDate
			
			if(!isActual) continue

			let currentPrice = Number(bigNumber_to_number(order.price,decimals))

			actualOrders++ 
			totalPrice = totalPrice + currentPrice
			if(currentPrice > maxPrice){
				maxPrice = Number(currentPrice.toFixed(2))
			}
			if(minPrice > currentPrice || minPrice === 0){
				minPrice = Number(currentPrice.toFixed(2))
			}

		}

		for (let i = 0; i < ethOrders.allOrders.length; i++) {
			const order = ethOrders.allOrders[i];

			const orderNumberDate = new Date(Number(bigNumber_to_number(order.endTime,0))).getTime()
			const intervalNumberDate = new Date(intervalDate).getTime()
			const isActual = intervalNumberDate < orderNumberDate
			if(!isActual) continue
			const currentPrice = Number(bigNumber_to_number(order.price,decimals)) * Number(ethExchange)
	
			actualOrders++ 
			totalPrice = totalPrice + currentPrice
			if(currentPrice > maxPrice){
				maxPrice = Number(currentPrice.toFixed(2))
			}
			if(minPrice > currentPrice || minPrice === 0){
				minPrice = Number(currentPrice.toFixed(2))
			}
		}

		const middlePrice = Number(Number(totalPrice / actualOrders).toFixed(2))

		return {minPrice,maxPrice,middlePrice}
	}catch(error){
		return {success:false}
	}
}

export const getNftIntervalPrice = async (interval,ethExchange,nftId) => {
	try{
		const usdOrders = await getAllAvailableItemsUsd()
		const ethOrders = await getAllAvailableItems()

		let minPrice = 0
		let maxPrice = 0
		const intervalDate = getDateInterval(interval)

		for (let i = 0; i < usdOrders.allOrders.length; i++) {
			const order = usdOrders.allOrders[i];
			const orderNumberDate = new Date(Number(bigNumber_to_number(order.endTime,0))).getTime()
			const intervalNumberDate = new Date(intervalDate).getTime()
			const isActual = intervalNumberDate < orderNumberDate
			
			if(
				!isActual 
				||
				Number(bigNumber_to_number(order.token_id,0)) !== Number(nftId)
			) {
				continue
			}
		
			let currentPrice = Number(bigNumber_to_number(order.price,decimals))
	
			if(currentPrice > maxPrice){
				maxPrice = Number(currentPrice.toFixed(2))
			}
			if(minPrice > currentPrice || minPrice === 0){
				minPrice = Number(currentPrice.toFixed(2))
			}

		}

		for (let i = 0; i < ethOrders.allOrders.length; i++) {
			const order = ethOrders.allOrders[i];

			const orderNumberDate = new Date(Number(bigNumber_to_number(order.endTime,0))).getTime()
			const intervalNumberDate = new Date(intervalDate).getTime()
			const isActual = intervalNumberDate < orderNumberDate

			if(
				!isActual
				||
				Number(bigNumber_to_number(order.token_id,0)) !== Number(nftId)
				) {
					continue
				}

			const currentPrice = Number(bigNumber_to_number(order.price,decimals)) * Number(ethExchange)

			if(currentPrice > maxPrice){
				maxPrice = Number(currentPrice.toFixed(2))
			}
			if(minPrice > currentPrice || minPrice === 0){
				minPrice = Number(currentPrice.toFixed(2))
			}
		}
		
		return {minPrice,maxPrice}
	}catch(error){
		return {success:false}
	}
}

export const getNftFloorPrice = async (collectionAddress,nftId,currency) => {
	try{
		const allOrders = 
		currency === 'ETH'
		?
		(await getAllAvailableItems()).allOrders
		:
		(await getAllAvailableItemsUsd()).allOrders

		let floorPrice = 0

		for (let i = 0; i < allOrders.length; i++) {
			const order = allOrders[i];
			const price = bigNumber_to_number(order.price,decimals)
			const currentNftId = Number(bigNumber_to_number(order.token_id,0))		
			
			if(
				String(order.token_address).toLowerCase() !== String(collectionAddress).toLowerCase() 
				|| 
				currentNftId !== Number(nftId)) continue
	
			if(floorPrice > price || floorPrice === 0){
				floorPrice = price
			}
		}

		return {floorPrice}
	}catch(error){
		return {success:false}
	}
}

export async function getCollectionData (collectionAddress,currency,ethExchange,projectData) {
	try{
		const usdOrders = await getAllAvailableItemsUsd()
		const ethOrders = await getAllAvailableItems()
		let minPrice = 0
		let maxPrice = 0
		let totalPrice = 0
		const {listed} = await getListedNfts(collectionAddress)

		for (let i = 0; i < usdOrders.allOrders.length; i++) {
			const order = usdOrders.allOrders[i];
			
			if(collectionAddress !== order.token_address || !order.Available) continue 

			let price = Number(bigNumber_to_number(order.price,decimals))

			if(price > maxPrice){
				maxPrice = Number(price.toFixed(2))
			}

			if(minPrice > price || i === 0){
				minPrice = Number(price.toFixed(2))
			}

			totalPrice = totalPrice + price

		}

		for (let i = 0; i < ethOrders.allOrders.length; i++) {
			const order = ethOrders.allOrders[i];

			if(collectionAddress !== order.token_address || !order.Available) continue 

			let price = Number(bigNumber_to_number(order.price,decimals)) * Number(ethExchange)

			if(price > maxPrice){
				maxPrice = Number(price.toFixed(2))
			}

			if(minPrice > price || i === 0){
				minPrice = Number(price.toFixed(2))
			}

			totalPrice = totalPrice + price
		}

		const totalUsdc = await getTotalVolumeUsd()
		const totalEth = await getTotalVolumeEth()
		const supply = projectData.quantity
		const marketCap = Number(totalPrice + ((supply - listed) * minPrice)).toFixed(2) 
		
		const totalVolume = totalEth.value * Number(ethExchange) + totalUsdc.value

		return {totalVolume:totalVolume.toFixed(2),listed:listed,minPrice,maxPrice,marketCap,supply}
	}catch(error){
		console.log(error)

		return {success:false}
	}
}

export async function getOwnerCount(address_nft) {
    try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner()

		const nftContract = new Contract(address_nft, abi_nft, provider);
        // First find the mint count which is equal to the token count
        const transferFilter = nftContract.filters.Transfer("0x0000000000000000000000000000000000000000", null, null)
        const tokens = await nftContract.queryFilter(transferFilter)
	
        const tokenCount = tokens.length;
        // Iterate over tokens and store owner addresses in an array
        let owners = []
        for (let i = 0; i < tokenCount; i++) {
          // First, find the all transfers of the token 
          // from null` to `null` so we get all the transfers of `tokenId` 
          const transferFilter = nftContract.filters.Transfer(null, null, parseInt(tokens[i].args.tokenId))
          const tokenTransfers = await nftContract.queryFilter(transferFilter)

          // `args.to` of the last element gives the current owner of issued token
          let lastTransfer = tokenTransfers[tokenTransfers.length - 1]
          let currentOwner = lastTransfer.args.to

          // If the address has already found before, don't add it...
          if (!owners.includes(currentOwner)) {
            owners.push(currentOwner)
          }
        }

		return {success:true,owners}
    } catch (err) {
        console.info('err in get owners', err.message);
		return {success:false,owners:[]}
    }	
}

export async function getTotalVolumeEth() {  
	try {
		const {daiContractWithSigner_pool} = getMainSmart()

		const response =  await daiContractWithSigner_pool.total_volume_eth();
		
		const value = Number(bigNumber_to_number(response,decimals))

		return {success:true,value}
	}
	catch (err) {
	 console.info('err', err.message);
	 return {success:false}
	}
}
   
export async function getTotalVolumeUsd() {  
	try {
		const {daiContractWithSigner_pool} = getMainSmart()

	 	const response =  await daiContractWithSigner_pool.total_volume_usd();
	 	
		const value = Number(bigNumber_to_number(response,decimals))

	 	return {success:true,value}
	}
	catch (err) {
		console.info('err', err.message);

		return {success:false}	}
}

export async function getPriceForWeek(nftId,ethExchange){ 
	try{
		const dates = getDatesFromToday()
		const minDate = dates[dates.length - 1]
		const usdOrders = await getAllAvailableItemsUsd()
		const ethOrders = await getAllAvailableItems()
		const data = []
		const uniqueDates = {}

		for (let i = 0; i < usdOrders.allOrders.length; i++) {
			const order = usdOrders.allOrders[i];
			const orderDate = Number(bigNumber_to_number(order.endTime,0))
			const isValidDate = orderDate > minDate
			const id = Number(bigNumber_to_number(order.token_id,0))
	
			if(isValidDate && Number(nftId) === id){
				const price = Number(bigNumber_to_number(order.price,decimals)).toFixed(2)
				uniqueDates[orderDate] = true
				data.push({date:orderDate,'':Number(price)})
				if(!uniqueDates[orderDate]){
					uniqueDates[orderDate] = true
					data.push({date:orderDate,'':Number(price)})
				}
			}
		}
		for (let i = 0; i < ethOrders.allOrders.length; i++) {
			const order = ethOrders.allOrders[i];
			const orderDate = Number(bigNumber_to_number(order.endTime,0))
			const isValidDate = orderDate > minDate
			const id = Number(bigNumber_to_number(order.token_id,0))
	
			if(isValidDate && Number(nftId) === id){
				const price = (Number(bigNumber_to_number(order.price,decimals)) * Number(ethExchange)).toFixed(2)
				if(!uniqueDates[orderDate]){
					uniqueDates[orderDate] = true
					data.push({date:orderDate,'':Number(price)})
				}
			}
		}

		const sortedData = data.sort((a,b) => a.date - b.date).map((item) => {
			return {...item,date:`${new Date(item.date).getMonth() + 1}.${new Date(item.date).getDate()}.${new Date(item.date).getFullYear()}`}
		}).slice(0,dates.length)

		return sortedData
	}catch(error){
		console.log(error)
		return {success:false}
	}
}

export async function getBuyNftAccess(userAddress,nftId,isEth){ 
	try{
		let isAvailable = false
		const {allOrders} = 
		isEth
		?
		await getAllAvailableItems()
		:
		await getAllAvailableItemsUsd()
	
		for (let i = 0; i < allOrders.length; i++) {
			const order = allOrders[i];

			if(!order?.Available) continue

			isAvailable = 
			String(order?.buyer).toLowerCase() === String(userAddress).toLowerCase()
			&& 
			Number(number_to_bigNumber(order.token_id,0)) === Number(nftId)

			if(isAvailable){
				const orderData = {
					price:Number(bigNumber_to_number(order.price,decimals)),
					orderId:Number(bigNumber_to_number(order.item_id,0)),
					seller:order.seller,
					buyer:order.buyer,
				}
				return {success:isAvailable,isAvailable,order:orderData}
			}
		}

		return {success:true,isAvailable,order:null}
	}catch(error){
		console.log(error)

		return {success:false,isAvailable:false,order:null}
	}
}

export async function checkNftOwner(smartAddress,nftId){
	try{
		const {nftsData} = await getUserNfts(smartAddress,window.ethereum.selectedAddress)

		if(!nftsData.length) return {success:true,isOwner:false}

		const isOwner 
		=
		!!nftsData.find((item) => item.nftId === nftId) 
		
		return {success:true,isOwner}
	}catch(error){
		console.log(error)

		return {success:false,isOwner:false}
	}
}