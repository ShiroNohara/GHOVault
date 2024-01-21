import React, { useEffect, useState } from "react";
import { getContract, getWalletClient } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import dummy_abi from "../artifacts/Vault.json";
import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
  parseEther,
} from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";

const Stake = () => {
  const { address, isConnected } = useAccount();
  const [to, setTo] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [amount, setStakedAmount] = useState("");
  const [maxWithdraw, setMaxWithdraw] = useState("");
  const [data, setData] = useState("");
  const publicClient = usePublicClient();
  useEffect(() => {
    handleReadBalance();
    handleReadRedeem();
  }, [address]);

  const handleDeposit = async () => {
    try {
      const client = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });
      const approve = await client.writeContract({
        address: "0x7983d4E90110D31aE1CCF86B2312ea541e487876",
        abi: dummy_abi.abi,
        functionName: "approve",
        args: ["0x7983d4E90110D31aE1CCF86B2312ea541e487876", parseEther(data)],
        account: address,
      });
      console.log(approve);

      if (approve) {
      }
      console.log("Transaction Submitted");
    } catch (error) {
      console.error(error);
    }
  };
  const handleWithdraw = async () => {
    try {
      const client = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });
      const approve = await client.writeContract({
        address: "0x7983d4E90110D31aE1CCF86B2312ea541e487876",
        abi: dummy_abi.abi,
        functionName: "withdraw",
        args: [maxWithdraw, address, address],
        account: address,
      });
      console.log(approve);

      if (approve) {
      }
      console.log("Transaction Submitted");
    } catch (error) {
      console.error(error);
    }
  };
  const handleReadBalance = async () => {
    const client = createPublicClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });

    try {
      const result = await client.readContract({
        address: "0x7983d4E90110D31aE1CCF86B2312ea541e487876",
        abi: dummy_abi.abi,
        functionName: "balanceOf",
        args: [address],
      });

      console.log(parseInt(result));
      setStakedAmount(parseInt(result));
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };
  const handleReadRedeem = async () => {
    const client = createPublicClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });

    try {
      const result = await client.readContract({
        address: "0x7983d4E90110D31aE1CCF86B2312ea541e487876",
        abi: dummy_abi.abi,
        functionName: "maxWithdraw",
        args: [address],
      });

      console.log(parseInt(result));
      setMaxWithdraw(parseInt(result));
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

  return (
    <div
      id="Home"
      className="min-h-screen flex items-center justify-center bg-black text-white"
    >
      {/* Left Section */}
      <div className="text-center mt-20 mr-4">
        <div className="bg-backgroundTint p-4 md:p-8 m-8 rounded-lg shadow-lg md:w-96">
          <h2 className="text-2xl font-bold text-center mb-4 text-customPurple">
            {" "}
            Stake to GHOVault and earn double interest
          </h2>

          <div className="mb-4">
            <input
              type="text"
              className="bg-backgroundTint mt-1 p-2 border rounded-md w-full text-white
                hover:border-mainColor focus:border-mainColor focus:outline-none"
              placeholder="Enter amount"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="mb-2">
            {/* <p className="text-center mb-4 text-gray-500">
              Submits a new transaction for approval by the wallet owners *will
              cost gas*
            </p> */}
            <button
              className="w-full bg-customPurple text-white py-2 rounded-md hover:bg-customCyan"
              onClick={handleDeposit}
            >
              Submit Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-l border-white h-custom mx-4"></div>

      {/* Right Section */}
      <div className="text-center mt-20 ml-4">
        <div className="bg-backgroundTint p-4 md:p-8 m-8 rounded-lg shadow-lg md:w-96">
          <h2 className="text-2xl font-bold text-center mb-4 text-customPurple">
            {" "}
            {/* Updated color code */}
            Total Amount Staked
          </h2>
          {/* Add logic to display the total amount staked */}
          <p className="text-xl">{amount} ETH</p>
        </div>
        <div className="text-center mt-20 mr-4">
          <div className="bg-backgroundTint p-4 md:p-8 m-8 rounded-lg shadow-lg md:w-96">
            <h2 className="text-2xl font-bold text-center mb-4 text-customPurple">
              {" "}
              Withdraw amount with Yeild
            </h2>
            <p className="text-xl">{maxWithdraw} ETH</p>

            <div className="m-4">
              <input
                type="text"
                className="bg-backgroundTint mt-1 p-2 border rounded-md w-full text-white
                hover:border-mainColor focus:border-mainColor focus:outline-none"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div className="mb-2">
              {/* <p className="text-center mb-4 text-gray-500">
              Submits a new transaction for approval by the wallet owners *will
              cost gas*
            </p> */}
              <button
                className="w-full bg-customPurple text-white py-2 rounded-md hover:bg-customCyan"
                onClick={handleWithdraw}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
