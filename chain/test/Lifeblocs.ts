import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe("Lifeblocs", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const Lifeblocs = await ethers.getContractFactory("Lifeblocs");
    const contract = await Lifeblocs.deploy();
    const ownerAddress = await owner.getAddress();

    return { contract, owner, ownerAddress };
  }

  const parseBlocs = (blocs: any[]) => {
    // filter empty items
    const items = blocs.filter((v) => Boolean(v[3].toNumber()));

    // remap blocs in more human readable way
    return items.map((v) => ({
      tokenId: v[0].toNumber(),
      emoji: v[1],
      label: v[2],
      createdAt: v[3].toNumber() * 1000,
    }));
  };

  describe("Deployment", function () {
    it("Initial state", async function () {
      const { contract, ownerAddress } = await loadFixture(deployFixture);

      const blocs = parseBlocs(await contract.getLifeFrom(ownerAddress));
      expect(blocs.length).to.equal(0);
    });

    it("Mint a NFT", async function () {
      const { contract, ownerAddress } = await loadFixture(deployFixture);

      await contract.safeMint(ownerAddress, "🕹️", "Play my game");
      await contract.safeMint(ownerAddress, "☎️", "Dring");

      const blocs = parseBlocs(await contract.getLifeFrom(ownerAddress));

      expect(blocs.length).to.equal(2);

      expect(blocs[0].emoji).to.equal("🕹️");
      expect(blocs[0].label).to.equal("Play my game");
      expect(blocs[0].createdAt).not.to.equal(undefined);
    });

    it("Burn a NFT", async function () {
      const { contract, ownerAddress } = await loadFixture(deployFixture);

      await contract.safeMint(ownerAddress, "🕹️", "Play my game");
      await contract.safeMint(ownerAddress, "☎️", "Dring");
      await contract.burn(0);

      const blocsAfterBurn = parseBlocs(await contract.getLifeFrom(ownerAddress));

      expect(blocsAfterBurn.length).to.equal(1);
    });
  });
});
