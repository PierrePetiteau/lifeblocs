// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NFTContract {
    address payable public owner;

    constructor(address _owner) payable {
        owner = payable(_owner);
    }

    function amIOwner() external view returns (bool) {
        return owner == msg.sender;
    }
}

contract ContractFactory {
    mapping(address => NFTContract) nftContracts;

    function buildMeAContract() external payable returns (NFTContract) {
        require(msg.value == 0.001 ether);
        nftContracts[msg.sender] = new NFTContract{value: msg.value}(
            msg.sender
        );
        return nftContracts[msg.sender];
    }

    function getContractBy(
        address ownerAddress
    ) external view returns (NFTContract) {
        return nftContracts[ownerAddress];
    }
}
