import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hello", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();

    return { hello, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should say Hello world", async function () {
      const { hello } = await loadFixture(deployFixture);

      expect(await hello.hello()).to.equal("Hello world");
    });
  });
});
