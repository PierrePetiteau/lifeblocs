import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe("Traces", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Traces = await ethers.getContractFactory("Traces");
    const traces = await Traces.deploy();

    return { traces, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should see a trace", async function () {
      const { traces, owner } = await loadFixture(deployFixture);

      await traces.iAmPassedByHere();

      const ownerAddress = await owner.getAddress();
      const isPassedByHere = await traces.isPassedByHere(ownerAddress);

      expect(isPassedByHere).to.equal(true);
    });
  });
});
