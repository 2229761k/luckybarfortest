pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;
/**
  * @title Luckybar
  * @author Joshua Choi
  * @dev
  *
  */

import "./Toka_ERC827.sol";


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
contract Bank is Ownership {

    function terminate() public onlyOwner {
        selfdestruct(owner);
    }

    function withdraw(uint amount) payable public onlyOwner {
        if(!owner.send(amount)) revert();
    }

    function depositSpecificAmount(uint _deposit) payable public onlyOwner {
        require(msg.value == _deposit);
    }

    function deposit() payable public onlyOwner {
        require(msg.value > 0);
    }

 /**
   * @dev Transfer tokens from one address to another
   * @param from address The address which you want to send tokens from
   * @param to address The address which you want to transfer to
   * @param value uint256 the amount of tokens to be transferred
   */
}

/**
 * @dev contract that sets terms of the minBet, houseEdge,
 * & contains betting and fallback function.
 */
contract LuckyBar is Bank {

    struct record {
        uint[5] date;
        uint[5] amount;
        address[5] account;
    }
    
    struct pair {
        uint256 minBet;
        uint256 houseEdge; // in %
        uint256 reward;
        bool bEnabled;
        record ranking;
        record latest;
    }

    pair public sE2E;
    pair public sE2C;
    pair public sC2E;
    pair public sC2C;

    uint256 public E2C_Ratio;
    uint256 private salt;
    IERC20 private token;
    StandardTokenERC827 private chip;
    address public manager;

    // Either True or False + amount
    //event Won(bool _status, string _rewardType, uint _amount, record[5], record[5]); // it does not work maybe because of its size is too big
    event Won(bool _status, string _rewardType, uint _amount);
    event Swapped(string _target, uint _amount);

    // sets the stakes of the bet
    constructor() payable public {
        estalishOwnership();
        setProperties("thisissaltIneedtomakearandomnumber", 100000);
        setToken(0x1794f29a384a8329da53e7749ee333af31c7bc36); // toka mainnet
        setChip(0xd90c20b9a57ec628ae4b1d38eb1f30680b8f1594); // chip mainnet
        setGameMinBet(100e18, 0.1 ether, 100e18, 0.1 ether);
        setGameFee(1,0,5,5);
        EnableGame(true, true, false, true);
        setReward(0,5000,0,5000);
        manager = owner;
    }
    
    function getRecordsE2E() public view returns(uint[5], uint[5], address[5],uint[5], uint[5], address[5]) {
        return (sE2E.ranking.date,sE2E.ranking.amount,sE2E.ranking.account, sE2E.latest.date,sE2E.latest.amount,sE2E.latest.account);
    }
    function getRecordsE2C() public view returns(uint[5], uint[5], address[5],uint[5], uint[5], address[5]) {
        return (sE2C.ranking.date,sE2C.ranking.amount,sE2C.ranking.account, sE2C.latest.date,sE2C.latest.amount,sE2C.latest.account);
    }
    function getRecordsC2E() public view returns(uint[5], uint[5], address[5],uint[5], uint[5], address[5]) {
        return (sC2E.ranking.date,sC2E.ranking.amount,sC2E.ranking.account, sC2E.latest.date,sC2E.latest.amount,sC2E.latest.account);
    }
    function getRecordsC2C() public view returns(uint[5], uint[5], address[5],uint[5], uint[5], address[5]) {
        return (sC2C.ranking.date,sC2C.ranking.amount,sC2C.ranking.account, sC2C.latest.date,sC2C.latest.amount,sC2C
        .latest.account);
    }

    function setReward(uint256 C2C, uint256 E2C, uint256 C2E, uint256 E2E) public onlyOwner {
        sC2C.reward = C2C;
        sE2C.reward = E2C;
        sC2E.reward = C2E;
        sE2E.reward = E2E;
    }
    
    function EnableGame(bool C2C, bool E2C, bool C2E, bool E2E) public onlyOwner {
        sC2C.bEnabled = C2C;
        sE2C.bEnabled = E2C;
        sC2E.bEnabled = C2E;
        sE2E.bEnabled = E2E;
    }

    function setGameFee(uint256 C2C, uint256 E2C, uint256 C2E, uint256 E2E) public onlyOwner {
        sC2C.houseEdge = C2C;
        sE2C.houseEdge = E2C;
        sC2E.houseEdge = C2E;
        sE2E.houseEdge = E2E;
    }

    function setGameMinBet(uint256 C2C, uint256 E2C, uint256 C2E, uint256 E2E) public onlyOwner {
        sC2C.minBet = C2C;
        sE2C.minBet = E2C;
        sC2E.minBet = C2E;
        sE2E.minBet = E2E;
    }

    function setToken(address _token) public onlyOwner {
        token = IERC20(_token);
    }

    function setChip(address _chip) public onlyOwner {
        chip = StandardTokenERC827(_chip);
    }

    function setManager(address _manager) public onlyOwner {
        manager = _manager;
    }

    function setProperties(string _salt, uint _E2C_Ratio) public onlyOwner {
        require(_E2C_Ratio > 0);
        salt = uint(keccak256(_salt));
        E2C_Ratio = _E2C_Ratio;
    }

    function() public { //fallback
        revert();
    }

    function swapC2T(address _from, uint256 _value) payable public {
        require(chip.transferFrom(_from, manager, _value));
        require(token.transferFrom(manager, _from, _value));

        emit Swapped("TOKA", _value);
    }

    function swapT2C(address _from, uint256 _value) payable public {
        require(token.transferFrom(_from, manager, _value));
        require(chip.transferFrom(manager, _from, _value));

        emit Swapped("CHIP", _value);
    }

    function playC2C(address _from, uint256 _value) payable public {
        require(sC2C.bEnabled);
        require(_value >= sC2C.minBet);
        require(chip.transferFrom(_from, manager, _value));

        uint256 amountWon = _value * (50 + uint256(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sC2C.houseEdge) / 100;
        require(chip.transferFrom(manager, _from, amountWon + _value * sC2C.reward)); // reward. but set to be zero.
        
        // ranking
        for(uint i=0;i<5;i++) {
            if(sC2C.ranking.amount[i] < amountWon) {
                for(uint j=4;j>i;j--) {
                    sC2C.ranking.amount[j-1] = sC2C.ranking.amount[j];
                    sC2C.ranking.date[j-1] = sC2C.ranking.date[j];
                    sC2C.ranking.account[j-1] = sC2C.ranking.account[j];
                }
                sC2C.ranking.amount[i] = amountWon;
                sC2C.ranking.date[i] = now;
                sC2C.ranking.account[i] = _from;
                break;
            }
        }
        // latest
        for(i=4;i>0;i--) {
            sC2C.latest.amount[i] = sC2C.latest.amount[i-1];
            sC2C.latest.date[i] = sC2C.latest.date[i-1];
            sC2C.latest.account[i] = sC2C.latest.account[i-1];
        }
        sC2C.latest.amount[0] = amountWon;
        sC2C.latest.date[0] = now;
        sC2C.latest.account[0] = _from;

        emit Won(amountWon > _value, "CHIP", amountWon);//, sC2C.ranking, sC2C.latest);
    }

    function playC2E(address _from, uint256 _value) payable public {
        require(sC2E.bEnabled);
        require(_value >= sC2E.minBet);
        require(chip.transferFrom(_from, manager, _value));

        uint256 amountWon = _value * (50 + uint256(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sC2E.houseEdge) / 100 / E2C_Ratio;
        require(_from.send(amountWon));
        
        // ranking
        for(uint i=0;i<5;i++) {
            if(sC2E.ranking.amount[i] < amountWon) {
                for(uint j=4;j>i;j--) {
                    sC2E.ranking.amount[j-1] = sC2E.ranking.amount[j];
                    sC2E.ranking.date[j-1] = sC2E.ranking.date[j];
                    sC2E.ranking.account[j-1] = sC2E.ranking.account[j];
                }
                sC2E.ranking.amount[i] = amountWon;
                sC2E.ranking.date[i] = now;
                sC2E.ranking.account[i] = _from;
                break;
            }
        }
        // latest
        for(i=4;i>0;i--) {
            sC2E.latest.amount[i] = sC2E.latest.amount[i-1];
            sC2E.latest.date[i] = sC2E.latest.date[i-1];
            sC2E.latest.account[i] = sC2E.latest.account[i-1];
        }
        sC2E.latest.amount[0] = amountWon;
        sC2E.latest.date[0] = now;
        sC2E.latest.account[0] = _from;

        emit Won(amountWon > (_value / E2C_Ratio), "ETH", amountWon);//, sC2E.ranking, sC2E.latest);
    }

    function playE2E() payable public {
        require(sE2E.bEnabled);
        require(msg.value >= sE2E.minBet);

        uint amountWon = msg.value * (50 + uint(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sE2E.houseEdge) / 100;
        require(msg.sender.send(amountWon));
        require(chip.transferFrom(manager, msg.sender, msg.value * sE2E.reward)); // reward!!

        // ranking
        for(uint i=0;i<5;i++) {
            if(sE2E.ranking.amount[i] < amountWon) {
                for(uint j=4;j>i;j--) {
                    sE2E.ranking.amount[j-1] = sE2E.ranking.amount[j];
                    sE2E.ranking.date[j-1] = sE2E.ranking.date[j];
                    sE2E.ranking.account[j-1] = sE2E.ranking.account[j];
                }
                sE2E.ranking.amount[i] = amountWon;
                sE2E.ranking.date[i] = now;
                sE2E.ranking.account[i] = msg.sender;
                break;
            }
        }
        // latest
        for(i=4;i>0;i--) {
            sE2E.latest.amount[i] = sE2E.latest.amount[i-1];
            sE2E.latest.date[i] = sE2E.latest.date[i-1];
            sE2E.latest.account[i] = sE2E.latest.account[i-1];
        }
        sE2E.latest.amount[0] = amountWon;
        sE2E.latest.date[0] = now;
        sE2E.latest.account[0] = msg.sender;

        emit Won(amountWon > msg.value, "ETH", amountWon);//, sE2E.ranking, sE2E.latest);
    }

    function playE2C() payable public {
        require(sE2C.bEnabled);
        require(msg.value >= sE2C.minBet);

        uint amountWon = msg.value * (50 + uint(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sE2C.houseEdge) / 100 * E2C_Ratio;
        require(chip.transferFrom(manager, msg.sender, amountWon));
        require(chip.transferFrom(manager, msg.sender, msg.value * sE2C.reward)); // reward!!
        
        // ranking
        for(uint i=0;i<5;i++) {
            if(sE2C.ranking.amount[i] < amountWon) {
                for(uint j=4;j>i;j--) {
                    sE2C.ranking.amount[j-1] = sE2C.ranking.amount[j];
                    sE2C.ranking.date[j-1] = sE2C.ranking.date[j];
                    sE2C.ranking.account[j-1] = sE2C.ranking.account[j];
                }
                sE2C.ranking.amount[i] = amountWon;
                sE2C.ranking.date[i] = now;
                sE2C.ranking.account[i] = msg.sender;
                break;
            }
        }
        // latest
        for(i=4;i>0;i--) {
            sE2C.latest.amount[i] = sE2C.latest.amount[i-1];
            sE2C.latest.date[i] = sE2C.latest.date[i-1];
            sE2C.latest.account[i] = sE2C.latest.account[i-1];
        }
        sE2C.latest.amount[0] = amountWon;
        sE2C.latest.date[0] = now;
        sE2C.latest.account[0] = msg.sender;

        emit Won(amountWon > (msg.value * E2C_Ratio), "CHIP", amountWon);//, sE2C.ranking, sE2C.latest);
    }

    // function for owner to check contract balance
    function checkContractBalance() onlyOwner public view returns(uint) {
        return address(this).balance;
    }
    function checkContractBalanceToka() onlyOwner public view returns(uint) {
        return token.balanceOf(manager);
    }
    function checkContractBalanceChip() onlyOwner public view returns(uint) {
        return chip.balanceOf(manager);
    }
}