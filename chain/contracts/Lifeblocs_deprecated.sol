// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract Lifeblocs is ERC721, Ownable {
//     using Counters for Counters.Counter;

//     struct Bloc {
//         uint tokenId;
//         string emoji;
//         string label;
//         uint createdAt;
//     }

//     mapping(uint256 => Bloc) public _blocs;
//     Counters.Counter private _tokenIdCounter;

//     constructor(address _owner) payable ERC721("Lifeblocs", "LIFE") {
//         transferOwnership(_owner);
//     }

//     function safeMint(
//         address to,
//         string memory emoji,
//         string memory label
//     ) public onlyOwner {
//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();

//         _safeMint(to, tokenId);
//         _blocs[tokenId] = Bloc({
//             tokenId: tokenId,
//             emoji: emoji,
//             label: label,
//             createdAt: block.timestamp
//         });
//     }

//     function burn(uint256 tokenId) public {
//         //solhint-disable-next-line max-line-length
//         require(
//             _isApprovedOrOwner(_msgSender(), tokenId),
//             "ERC721: caller is not token owner or approved"
//         );

//         delete _blocs[tokenId];
//         _burn(tokenId);
//     }

//     function getMyBlocs() public view returns (Bloc[] memory) {
//         Bloc[] memory blocs = new Bloc[](_tokenIdCounter._value);
//         for (uint i = 0; i < _tokenIdCounter._value; i++) {
//             if (_blocs[i].exist && _isApprovedOrOwner(_msgSender(), i)) {
//                 Bloc storage member = _blocs[i];
//                 blocs[i] = member;
//             }
//         }
//         return blocs;
//     }
// }
