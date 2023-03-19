// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Lifeblocs is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    struct Lifebloc {
        uint tokenId;
        string emoji;
        string label;
        uint createdAt;
    }

    mapping(uint256 => Lifebloc) public _lifeblocs;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Lifeblocs", "LIFE") {}

    function safeMint(
        address to,
        string memory emoji,
        string memory label
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _lifeblocs[tokenId] = Lifebloc({
            tokenId: tokenId,
            emoji: emoji,
            label: label,
            createdAt: block.timestamp
        });
    }

    function getLifeFrom(
        address owner
    ) public view returns (Lifebloc[] memory) {
        Lifebloc[] memory life = new Lifebloc[](_tokenIdCounter._value);

        for (uint tokenId = 0; tokenId < _tokenIdCounter._value; tokenId++) {
            if (owner == _ownerOf(tokenId)) {
                Lifebloc storage member = _lifeblocs[tokenId];
                life[tokenId] = member;
            }
        }

        return life;
    }
}
