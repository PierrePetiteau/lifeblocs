import { ethers } from "hardhat";

async function main() {
  const LifeblocsFactory = await ethers.getContractFactory("LifeblocsFactory");
  const lifeblocsFactory = await LifeblocsFactory.deploy();

  await lifeblocsFactory.deployed();
  console.log(`LifeblocsFactory deployed to ${lifeblocsFactory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
