import { ethers } from "hardhat";

async function main() {
  const buyMeACoffee = await ethers.deployContract("BuyMeACoffee");
  await buyMeACoffee.waitForDeployment();

  console.log("Deployed contract. Address: ", `${buyMeACoffee.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
