// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";

const lock = await ethers.deployContract("Vault", [
  "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  "100",
  "100",
  "1708528966",
]);

await lock.waitForDeployment();

console.log(`Vault deployed to ${lock.target}`);
