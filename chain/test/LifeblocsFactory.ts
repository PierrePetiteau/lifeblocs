import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe("LifeblocsFactory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const LifeblocsFactory = await ethers.getContractFactory("LifeblocsFactory");
    const factory = await LifeblocsFactory.deploy();

    await factory.buildMeAContract({ value: ethers.utils.parseEther("0.001") });

    const ownerAddress = await owner.getAddress();
    const contractAddress = await factory.getContractBy(ownerAddress);
    const lifeblocsContract = await ethers.getContractAt("Lifeblocs", contractAddress);

    return { factory, owner, ownerAddress, lifeblocsContract };
  }
  const parseBlocs = (blocs: any[]) => {
    const items = blocs.filter((v) => v[v.length - 1]);
    return items.map((v) => ({
      tokenId: v[0].toNumber(),
      emoji: v[1],
      label: v[2],
      description: v[3],
      createdAt: v[4].toNumber() * 1000,
    }));
  };

  describe("Deployment", function () {
    it("Create a subcontract", async function () {
      const { lifeblocsContract } = await loadFixture(deployFixture);

      const blocs = parseBlocs(await lifeblocsContract.getMyBlocs());
      expect(blocs.length).to.equal(0);
    });

    it("Mint a NFT", async function () {
      const { ownerAddress, lifeblocsContract } = await loadFixture(deployFixture);

      await lifeblocsContract.safeMint(ownerAddress, "🕹️", "Play my game", "");
      await lifeblocsContract.safeMint(ownerAddress, "☎️", "Dring", "");

      const blocs = parseBlocs(await lifeblocsContract.getMyBlocs());

      expect(blocs.length).to.equal(2);

      expect(blocs[0].emoji).to.equal("🕹️");
      expect(blocs[0].label).to.equal("Play my game");
      expect(blocs[0].description).to.equal("");
      expect(blocs[0].createdAt).not.to.equal(undefined);
    });

    it("Burn a NFT", async function () {
      const { ownerAddress, lifeblocsContract } = await loadFixture(deployFixture);

      await lifeblocsContract.safeMint(ownerAddress, "🕹️", "Play my game", "");
      await lifeblocsContract.safeMint(ownerAddress, "☎️", "Dring", "");
      await lifeblocsContract.burn(0);

      const blocsAfterBurn = parseBlocs(await lifeblocsContract.getMyBlocs());
      expect(blocsAfterBurn.length).to.equal(1);
    });
  });
});
