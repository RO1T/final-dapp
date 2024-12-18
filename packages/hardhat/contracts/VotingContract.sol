// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract VotingContract {
    string[] public candidates;
    mapping(string => uint256) public votes;

    event VoteCast(address indexed voter, string candidate);
    event CandidateAdded(string candidate);

    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    function vote(string memory candidate) public {
        require(isValidCandidate(candidate), "Invalid candidate");
        votes[candidate]++;
        emit VoteCast(msg.sender, candidate);
    }

    function isValidCandidate(string memory candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(candidate))) {
                return true;
            }
        }
        return false;
    }

    function addCandidate(string memory candidate) public {
        candidates.push(candidate);
        emit CandidateAdded(candidate); // Вызов события
    }
}
