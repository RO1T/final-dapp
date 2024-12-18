import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployVotingContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const candidates = ["Alice", "Bob", "Charlie"];

  await deploy("VotingContract", {
    from: deployer,
    args: [candidates],
    log: true,
    autoMine: true,
  });

  console.log("VotingContract deployed!");
};

export default deployVotingContract;
deployVotingContract.tags = ["VotingContract"];
