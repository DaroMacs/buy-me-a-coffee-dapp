// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract BuyMeACoffee{

    struct Memo {
        string name;
        string message;
         uint timeStamp;
         address from;

    }

    Memo [] memos;
    address payable owner;

    constructor(){
        owner= payable(msg.sender);
    }

    function buyChai(string calldata name, string calldata message) external payable {
        require(msg.value > 0, 'Amount should be greater than 0');
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender)); 
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}
