pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./Secondary.sol";   // This is under OpenZeppelin 'ownership' category

 /**
  * @title  Escrow
  * @dev    Simple escrow that holds funds for payee until payee withdraws
  */

contract Escrow is Secondary {
    
    using SafeMath for uint256;

    event DepEvent(address payeeAddr, uint256 weiAmount);
    event  WdEvent(address payeeAddr, uint256 weiAmount);

    mapping(address => uint256) private _depTable;

    /**
     * @dev   Looks up deposit linked to payee address in mapping 
     * @param payeeAddr is destination address of funds
     */
    function depositsOf(address payeeAddr) public view returns (uint256) {
        
        return _depTable[payeeAddr];
    }

    /**
     * @dev   Stores sent amount as credit to be withdrawn
     * @param payeeAddr is destination address of funds
     */
    function deposit(address payeeAddr) public onlyPrimary payable {
        
        uint256 amount = msg.value;
        _depTable[payeeAddr] = _depTable[payeeAddr].add(amount);

        emit DepEvent(payeeAddr, amount);
    }

    /**
     * @dev   Withdraw accumulated balance for payee
     * @param payeeAddr is address whose funds will be withdrawn and transferred to
     */
    function withdraw(address payable payeeAddr) public onlyPrimary {
        
        uint256 payment = _depTable[payeeAddr];
        _depTable[payeeAddr] = 0;
        payeeAddr.transfer(payment);

        emit WdEvent(payeeAddr, payment);
    }
}