const abi = [
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
            }, {
                "internalType": "uint256",
                "name": "_softcap",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_hardcap",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_liquidityPercent",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_presale_start",
                "type": "uint256"
            }, {
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
    }
]

export default abi;