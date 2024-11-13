const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "base_token_fee",
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
				"name": "_sale_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_base_token",
				"type": "address"
			},
			{
				"internalType": "uint256[2]",
				"name": "_rates",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[2]",
				"name": "_raises",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256",
				"name": "_softcap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_hardcap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_liquidityPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_presale_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_presale_end",
				"type": "uint256"
			}
		],
		"name": "create",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeTo",
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
		"inputs": [],
		"name": "flatFee",
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
		"name": "getAllPresales",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "presaleAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "baseToken",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "symbol",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "tokenAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "rate",
								"type": "uint256"
							}
						],
						"internalType": "struct PresaleFactoryNew.TokenInfo",
						"name": "tokenInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "minRaise",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "maxRaise",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "softCap",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "hardCap",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "liquidityPercent",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "liquidityRate",
								"type": "uint256"
							}
						],
						"internalType": "struct PresaleFactoryNew.SaleInfo",
						"name": "saleInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "presaleStart",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "presaleEnd",
								"type": "uint256"
							}
						],
						"internalType": "struct PresaleFactoryNew.TimeInfo",
						"name": "timeInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "raisedAmount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "soldAmount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "numBuyers",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "finalized",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "canceled",
								"type": "bool"
							}
						],
						"internalType": "struct PresaleFactoryNew.StatusInfo",
						"name": "statusInfo",
						"type": "tuple"
					}
				],
				"internalType": "struct PresaleFactoryNew.PresaleInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeeTo",
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
		"inputs": [],
		"name": "getFlatFee",
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getPresaleAt",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "presaleAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "baseToken",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "symbol",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "tokenAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "rate",
								"type": "uint256"
							}
						],
						"internalType": "struct PresaleFactoryNew.TokenInfo",
						"name": "tokenInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "minRaise",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "maxRaise",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "softCap",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "hardCap",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "liquidityPercent",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "liquidityRate",
								"type": "uint256"
							}
						],
						"internalType": "struct PresaleFactoryNew.SaleInfo",
						"name": "saleInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "presaleStart",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "presaleEnd",
								"type": "uint256"
							}
						],
						"internalType": "struct PresaleFactoryNew.TimeInfo",
						"name": "timeInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "raisedAmount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "soldAmount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "numBuyers",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "finalized",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "canceled",
								"type": "bool"
							}
						],
						"internalType": "struct PresaleFactoryNew.StatusInfo",
						"name": "statusInfo",
						"type": "tuple"
					}
				],
				"internalType": "struct PresaleFactoryNew.PresaleInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPresaleCount",
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
		"name": "presaleAddresses",
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
		"name": "presaleInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "presaleAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "baseToken",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "tokenAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "rate",
						"type": "uint256"
					}
				],
				"internalType": "struct PresaleFactoryNew.TokenInfo",
				"name": "tokenInfo",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "minRaise",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxRaise",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "softCap",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "hardCap",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "liquidityPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "liquidityRate",
						"type": "uint256"
					}
				],
				"internalType": "struct PresaleFactoryNew.SaleInfo",
				"name": "saleInfo",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "presaleStart",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "presaleEnd",
						"type": "uint256"
					}
				],
				"internalType": "struct PresaleFactoryNew.TimeInfo",
				"name": "timeInfo",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "raisedAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "soldAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numBuyers",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "finalized",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "canceled",
						"type": "bool"
					}
				],
				"internalType": "struct PresaleFactoryNew.StatusInfo",
				"name": "statusInfo",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "presale_in_native",
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
		"name": "referralAddress",
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
		"inputs": [],
		"name": "referralFee",
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
		"name": "sale_token_fee",
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
				"name": "feeReceivingAddress",
				"type": "address"
			}
		],
		"name": "setFeeTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "setFlatFee",
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
		"name": "transferOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default abi;