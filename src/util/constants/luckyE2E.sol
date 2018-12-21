pragma solidity ^0.4.18;
/**
  * @title Luckybar
  * @author Joshua Choi
  * @dev
  *
  */
interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender)
    external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function approve(address spender, uint256 value)
    external returns (bool);

  function transferFrom(address from, address to, uint256 value)
    external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}
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
}

/**
 * @dev contract that sets terms of the minBet, houseEdge,
 * & contains betting and fallback function.
 */
contract LuckyT2T is Bank {

    uint256 public minBet;
    uint256 public houseEdge; // in %
    uint256 private salt;
    address private token;
    IERC20 private tokenContract;
    // Either True or False + amount
    event Won(bool _status, uint _amount);

    // sets the stakes of the bet
    constructor(uint _houseEdge) payable public {
        require(_houseEdge <= 100);
        estalishOwnership();
        setProperties("thisissaltIneedtomakearandomnumber", 0.1 ether, _houseEdge);
        setToken(0x0bfd1945683489253e401485c6bbb2cfaedca313); // toka mainnet
    }

    function setToken(address _token) public onlyOwner {
        token = _token;
        tokenContract = IERC20(token);
    }

    function setProperties(string _salt, uint _minBet, uint _fee) public onlyOwner {
        salt = uint(keccak256(_salt));
        houseEdge = _fee;
        minBet = _minBet;
    }

    function() public { //fallback
        revert();
    }

    function playE2E() payable public {
        require(msg.value >= minBet);

        uint amountWon = msg.value * (50 + uint(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - houseEdge) / 100;

        if(!msg.sender.send(amountWon)) revert();

        emit Won(amountWon > msg.value, amountWon);
    }

    // function for owner to check contract balance
    function checkContractBalance() onlyOwner public view returns(uint) {
        return address(this).balance;
    }
    function checkContractBalanceToka() onlyOwner public view returns(uint) {
        return tokenContract.balanceOf(this);
    }
}
