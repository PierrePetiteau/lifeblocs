// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.9;

// import "./Lifeblocs.sol";

// contract LifeblocsFactory {
//     mapping(address => Lifeblocs) nftContracts;

//     function buildMeAContract() external payable returns (Lifeblocs) {
//         nftContracts[msg.sender] = new Lifeblocs(msg.sender);
//         return nftContracts[msg.sender];
//     }

//     function getContractBy(
//         address ownerAddress
//     ) external view returns (Lifeblocs) {
//         return nftContracts[ownerAddress];
//     }
// }
