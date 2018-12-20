pragma solidity ^0.4.18;


/**
 * @title Ownership
 * @dev Ownership contract establishes ownership (via owner address) and provides basic authorization control
 * functions (transferring of ownership and ownership modifier).
 */
contract Ownership {
    address public owner;

    event OwnershipTransferred(address previousOwner, address newOwner);


    /**
     * @dev The establishOwnership constructor sets original `owner` of the contract to the sender
     * account.
     */
    function estalishOwnership() public {
        owner = msg.sender;
    }


    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    /**
     * @dev Allows current owner to transfer control/ownership of contract to a newOwner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}


/**
 * @dev Termination contract for terminating the smart contract.
 * Terminate function can only be called by the current owner,
 * returns all funds in contract to owner and then terminates.
 */
contract Termination is Ownership {
    
    function terminate() public onlyOwner {
        selfdestruct(owner);
    }
    
}

/**
 * @dev Casino contract that sets terms of the minBet, houseEdge,
 * & contains betting and fallback function.
 */
contract Casino is Termination {

    uint minBet;
    uint houseEdge; // in %

    // Either True + amount or False + 0
    event Won(bool _status, uint _amount);

    // sets the stakes of the bet
    function Casino(uint _houseEdge) payable public {
        //require(_minBet > 0);
        require(_houseEdge <= 100);
        minBet = 0.1 ether;
        houseEdge = _houseEdge;

    }

    function() public { //fallback
        revert();

    }

    function betEth2Eth() payable public {
        require(msg.value >= minBet);

        uint amountWon = msg.value * (50 + uint(keccak256(block.timestamp)) % 100 - houseEdge) / 100;

        if (amountWon > msg.value) {
            if(!msg.sender.send(amountWon)) revert();
            emit Won(true, amountWon);
        }
        else {
            if(!msg.sender.send(amountWon)) revert();
            emit Won(false, 0);
        }
    }

    // function for owner to check contract balance
    function checkContractBalance() onlyOwner public view returns(uint) {
        return address(this).balance;
    }
}