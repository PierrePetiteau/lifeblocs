import { ethers } from "hardhat";

async function main() {
  const Hello = await ethers.getContractFactory("Hello");
  const hello = await Hello.deploy();

  await hello.deployed();
  const greeting = await hello.hello();
  console.log("Greeting " + greeting);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
