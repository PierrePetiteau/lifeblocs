import { ethers } from "hardhat";

async function main() {
  const Lifeblocs = await ethers.getContractFactory("Lifeblocs");
  const lifeblocs = await Lifeblocs.deploy();

  await lifeblocs.deployed();
  console.log(`Lifeblocs deployed to ${lifeblocs.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
