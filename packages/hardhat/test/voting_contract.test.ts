import { expect } from "chai";
import { ethers } from "hardhat";
import { VotingContract } from "../typechain-types";

describe("VotingContract", function () {
  let votingContract: VotingContract;
  let owner: string;

  before(async () => {
    const candidates = ["Alice", "Bob", "Charlie"];
    const votingContractFactory = await ethers.getContractFactory("VotingContract");
    votingContract = (await votingContractFactory.deploy(candidates)) as VotingContract;
    await votingContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should initialize with correct candidates", async function () {
      const alice = await votingContract.candidates(0);
      expect(alice).to.equal("Alice");
    });
  });

  describe("Adding new candidates", function () {
    it("Should add new candidate", async function () {
      const nameNew = "Me"
      await votingContract.addCandidate(nameNew);
      const newCandidate = await votingContract.candidates(3);
      expect(newCandidate).to.equal(nameNew);
    });
  });

  describe("Voting", function () {
    it("Should allow voting for a valid candidate", async function () {
      await votingContract.vote("Alice");
      const aliceVotes = await votingContract.votes("Alice");
      expect(aliceVotes).to.equal(1);
    });

    it("Should revert for an invalid candidate", async function () {
      await expect(votingContract.vote("Unknown")).to.be.revertedWith("Invalid candidate");
    });
  });

  describe("Event Emission", function () {
    it("Should emit VoteCast event when voting", async function () {
      const [signer] = await ethers.getSigners();
      owner = await signer.getAddress();
      await expect(votingContract.vote("Alice"))
        .to.emit(votingContract, "VoteCast")
        .withArgs(owner, "Alice");
    });
  });
});
