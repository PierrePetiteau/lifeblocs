// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Traces {
    uint public totalUsersAmount = 0;
    mapping(address => uint) users;

    function iAmPassedByHere() external {
        totalUsersAmount++;
        users[msg.sender] = totalUsersAmount;
    }

    function isPassedByHere(address user) view external returns (bool) {
        return  users[user] != 0 ? true : false;
    }
}
