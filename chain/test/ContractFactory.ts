import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe("ContractFactory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ContractFactory = await ethers.getContractFactory("ContractFactory");
    const factory = await ContractFactory.deploy();

    return { factory, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should build a contract", async function () {
      const { factory, owner } = await loadFixture(deployFixture);

      await factory.buildMeAContract({ value: ethers.utils.parseEther("0.001") });

      const ownerAddress = await owner.getAddress();
      const contractAddress = await factory.getContractBy(ownerAddress);
      const contract = await ethers.getContractAt("NFTContract", contractAddress);

      expect(await contract.amIOwner()).to.equal(true);
    });
  });
});
