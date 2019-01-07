pragma solidity ^0.4.24;
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

    struct pair {
        uint256 minBet;
        uint256 houseEdge; // in %
        bool bEnabled;
    }

    pair public sE2E;
    pair public sE2R;
    pair public sR2E;
    pair public sR2R;

    uint256 public E2R_Ratio;
    uint256 private salt;
    IERC20 private token;
    Rupy private rupy;
    address public manager;

    // Either True or False + amount
    event Won(bool _status, string _rewardType, uint _amount);
    event Swapped(string _target, uint _amount);

    // sets the stakes of the bet
    constructor() payable public {
        estalishOwnership();
        setProperties("thisissaltIneedtomakearandomnumber", 100000);
        setToken(0x1794f29a384a8329da53e7749ee333af31c7bc36); // toka mainnet
        setRupy(0x1794f29a384a8329da53e7749ee333af31c7bc36); // rupy mainnet
        setGameMinBet(100e18, 0.1 ether, 100e18, 0.1 ether);
        setGameFee(1,0,5,5);
        EnableGame(true, true, false, true);
        manager = owner;
    }

    function EnableGame(bool R2R, bool E2R, bool R2E, bool E2E) onlyOwner {
        sR2R.bEnabled = R2R;
        sE2R.bEnabled = E2R;
        sR2E.bEnabled = R2E;
        sE2E.bEnabled = E2E;
    }

    function setGameFee(uint256 R2R, uint256 E2R, uint256 R2E, uint256 E2E) onlyOwner {
        sR2R.houseEdge = R2R;
        sE2R.houseEdge = E2R;
        sR2E.houseEdge = R2E;
        sE2E.houseEdge = E2E;
    }

    function setGameMinBet(uint256 R2R, uint256 E2R, uint256 R2E, uint256 E2E) onlyOwner {
        sR2R.minBet = R2R;
        sE2R.minBet = E2R;
        sR2E.minBet = R2E;
        sE2E.minBet = E2E;
    }

    function setToken(address _token) public onlyOwner {
        token = IERC20(_token);
    }

    function setRupy(address _rupy) public onlyOwner {
        rupy = Rupy(_rupy);
    }

    function setManager(address _manager) public onlyOwner {
        manager = _manager;
    }

    function setProperties(string _salt, uint _E2R_Ratio) public onlyOwner {
        require(_E2R_Ratio > 0);
        salt = uint(keccak256(_salt));
        E2R_Ratio = _E2R_Ratio;
    }

    function() public { //fallback
        revert();
    }

    function swapR2T(address _from, uint256 _value) payable public {
        require(rupy.transferFrom(_from, manager, _value));
        require(token.transferFrom(manager, _from, _value));

        emit Swapped("TOKA", _value);
    }

    function swapT2R(address _from, uint256 _value) payable public {
        require(token.transferFrom(_from, manager, _value));
        require(rupy.transferFrom(manager, _from, _value));

        emit Swapped("RUPY", _value);
    }

    function playR2R(address _from, uint256 _value) payable public {
        require(sR2R.bEnabled);
        require(_value >= sR2R.minBet);
        require(rupy.transferFrom(_from, manager, _value));

        uint256 amountWon = _value * (50 + uint256(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sR2R.houseEdge) / 100;
        require(rupy.transferFrom(manager, _from, amountWon));

        emit Won(amountWon > _value, "RUPY", amountWon);
    }

    function playR2E(address _from, uint256 _value) payable public {
        require(sR2E.bEnabled);
        require(_value >= sR2E.minBet);
        require(rupy.transferFrom(_from, manager, _value));

        uint256 amountWon = _value * (50 + uint256(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sR2E.houseEdge) / 100 / E2R_Ratio;
        require(_from.send(amountWon));

        emit Won(amountWon > (_value / E2R_Ratio), "ETH", amountWon);
    }

    function playE2E() payable public {
        require(sE2E.bEnabled);
        require(msg.value >= sE2E.minBet);

        uint amountWon = msg.value * (50 + uint(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sE2E.houseEdge) / 100;
        require(msg.sender.send(amountWon));

        emit Won(amountWon > msg.value, "ETH", amountWon);
    }

    function playE2R() payable public {
        require(sE2R.bEnabled);
        require(msg.value >= sE2R.minBet);

        uint amountWon = msg.value * (50 + uint(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - sE2R.houseEdge) / 100 * E2R_Ratio;
        require(rupy.transferFrom(manager, msg.sender, amountWon));

        emit Won(amountWon > (msg.value * E2R_Ratio), "RUPY", amountWon);
    }

    // function for owner to check contract balance
    function checkContractBalance() onlyOwner public view returns(uint) {
        return address(this).balance;
    }
    function checkContractBalanceToka() onlyOwner public view returns(uint) {
        return token.balanceOf(manager);
    }
    function checkContractBalanceRupy() onlyOwner public view returns(uint) {
        return rupy.balanceOf(manager);
    }
}