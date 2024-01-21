// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

import "./ERC4626Fees.sol";

contract Vault is ERC4626Fees {
    
    uint32 public stakeDuration;

    constructor(IERC20 _asset, uint256 _entryBasisPoints,uint256 _exitBasisPoints, uint32 _duration) ERC4626Fees(_entryBasisPoints,_exitBasisPoints) ERC4626(_asset) ERC20("Vault Ocean Token", "vOCT") {
        stakeDuration = _duration;
    }

    mapping(address lender => uint32 epoch) public stakeTimeEpochMapping;
    
    function getWithdrawEpoch() public view returns(uint32){
        return stakeTimeEpochMapping[msg.sender] + stakeDuration; 
    }

    function setDuration(uint32 _duration) public onlyOwner{
        stakeDuration = _duration;
    }

    function _blockTimestamp() internal view virtual returns(uint32){
        return uint32(block.timestamp);
    }

    
    /** @dev See {IERC4626-deposit}. */
    function deposit(uint256 assets, address receiver) public virtual override  returns (uint256) {
        require(assets>0,"Assets can't be zero");
        uint256 maxAssets = maxDeposit(receiver);
        if (assets > maxAssets) {
            revert ERC4626ExceededMaxDeposit(receiver, assets, maxAssets);
        }

        uint256 shares = previewDeposit(assets);
        _deposit(_msgSender(), receiver, assets, shares);
        afterDeposit(assets, shares);

        // overridden
        stakeTimeEpochMapping[msg.sender] = uint32(block.timestamp);

        return shares;
    }

    /** @dev See {IERC4626-mint}.
     *
     * As opposed to {deposit}, minting is allowed even if the vault is in a state where the price of a share is zero.
     * In this case, the shares will be minted without requiring any assets to be deposited.
     */
    function mint(uint256 shares, address receiver) public virtual override returns (uint256) {
        uint256 maxShares = maxMint(receiver);
        if (shares > maxShares) {
            revert ERC4626ExceededMaxMint(receiver, shares, maxShares);
        }

        uint256 assets = previewMint(shares);
        _deposit(_msgSender(), receiver, assets, shares);
        afterDeposit(assets, shares);
        return assets;

    }

    /** @dev See {IERC4626-withdraw}. */
    function withdraw(uint256 assets, address receiver, address owner) public virtual override returns (uint256) {
        // overridden
        require(getWithdrawEpoch() <= _blockTimestamp(),"Not eligible right now, funds can be redeem after locking period");

        uint256 maxAssets = maxWithdraw(owner);
        if (assets > maxAssets) {
            revert ERC4626ExceededMaxWithdraw(owner, assets, maxAssets);
        }

        uint256 shares = previewWithdraw(assets);
        beforeWithdraw(assets, shares);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return shares;
    }

    /** @dev See {IERC4626-redeem}. */
    function redeem(uint256 shares, address receiver, address owner) public virtual override returns (uint256) {
        // overridden
        require(getWithdrawEpoch() <= _blockTimestamp(),"Not eligible right now, funds can be redeem after locking period");

        
        // require(
        //     getWithdrawEpoch() <= _blockTimestamp(),
        //     string(abi.encodePacked("You can withdraw funds after this ", getWithdrawEpoch(), "Epoch"))
        // );

        uint256 maxShares = maxRedeem(owner);
        if (shares > maxShares) {
            revert ERC4626ExceededMaxRedeem(owner, shares, maxShares);
        }

        uint256 assets = previewRedeem(shares);
        beforeWithdraw(assets, shares);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return assets;
    }

    function changeEntryFee(uint256 _fee)public onlyOwner {
        entryFeeBasisPoints = _fee;
    }
    function changeExitFee(uint256 _fee)public onlyOwner {
        exitFeeBasisPoints = _fee;
    }

     function borrow(uint256 assets, address receiver) public returns (uint256) {
        require(assets > 0, "Borrowed assets must be greater than 0");
        require(sharesOwned[msg.sender] >= assets, "Insufficient shares to borrow");

        uint256 shares = previewBorrow(assets);
        _withdraw(owner(), receiver, msg.sender, assets, shares);

        // Add your custom logic for borrowing here

        return shares;
    }

    /** @dev Repay borrowed assets to the vault.
     *
     * Requirements:
     * - The borrower must have enough assets to repay the specified amount.
     * - The repaying amount must be greater than 0.
     *
     * @param assets The amount of assets to repay.
     * @param receiver The address that will receive the repaid assets.
     * @return The amount of shares burned during the repayment process.
     */
    function repay(uint256 assets, address receiver) public returns (uint256) {
        require(assets > 0, "Repaid assets must be greater than 0");
        require(balanceOf(msg.sender) >= assets, "Insufficient assets to repay");

        uint256 shares = previewRepay(assets);
        _deposit(_msgSender(), receiver, assets, shares);

        // Add your custom logic for repayment here

        return shares;
    }

    /*//////////////////////////////////////////////////////////////
                          INTERNAL HOOKS LOGIC
    //////////////////////////////////////////////////////////////*/

    // function afterDeposit(uint256 assets, uint256 shares) internal virtual {}
    function afterDeposit(uint256 assets, uint256 shares) internal virtual {
        // uint256 interest = assets /10;
        // SafeERC20.safeTransferFrom(IERC20(asset()),owner(), address(this),interest);
    }
    
    function beforeWithdraw(uint256 assets, uint256 shares) internal virtual {
        //  uint256 interest = assets /10;
        // SafeERC20.safeTransferFrom(IERC20(asset()),owner(), address(this),interest);
    
    }


    // function afterDeposit(uint256 assets, uint256 shares) internal virtual {}
    
    // function beforeWithdraw(uint256 assets, uint256 shares) internal virtual {}   
}