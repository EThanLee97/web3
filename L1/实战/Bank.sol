// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Bank {
    address public immutable owner;
    event Deposit(address _ads, uint256 amount);
    event Withdraw(uint256 amount);
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // 构造函数
    constructor() payable {
        owner = msg.sender;
    }

    // 方法
    function withdraw() external {
        require(msg.sender == owner, "Not Owner");
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        // 将所有 ETH 发送给合约所有者
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer failed");
        emit Withdraw(balance);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
