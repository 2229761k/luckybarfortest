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
contract LuckyT2T is Bank {

    uint256 public minBet;
    uint256 public houseEdge; // in %
    uint256 private salt;
    IERC20 private token;
    address public manager;
    
    // Either True or False + amount
    event Won(bool _status, uint _amount);

    // sets the stakes of the bet
    constructor(uint _houseEdge) payable public {
        require(houseEdge <= 100);
        estalishOwnership();
        setProperties("thisissaltIneedtomakearandomnumber", 100e18, _houseEdge);
        setToken(0xdc04977a2078c8ffdf086d618d1f961b6c546222); // toka mainnet
        manager = owner;
    }

    function setToken(address _token) public onlyOwner {
        token = IERC20(_token);
    }

    function setManager(address _manager) public onlyOwner {
        manager = _manager;
    }

    function setProperties(string _salt, uint _minBet, uint _fee) public onlyOwner {
        salt = uint(keccak256(_salt));
        houseEdge = _fee;
        minBet = _minBet;
    }

    function() public { //fallback
        revert();
    }

    function playT2T(uint256 _value) payable public {
        require(value >= minBet);
        require(token.transferFrom(msg.sender, manager, _value));
        
        uint256 amountWon = _value * (50 + uint256(keccak256(block.timestamp, block.difficulty, salt++)) % 100 - houseEdge) / 100;
        require(token.transferFrom(manager, msg.sender, amountWon));

        emit Won(amountWon > _value, amountWon);
    }

    // function for owner to check contract balance
    function checkContractBalance() onlyOwner public view returns(uint) {
        return address(this).balance;
    }
    function checkContractBalanceToka() onlyOwner public view returns(uint) {
        return token.balanceOf(manager);
    }
}