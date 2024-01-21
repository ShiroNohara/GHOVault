import React, { useEffect, useState } from "react";
import { getContract, getWalletClient } from "@wagmi/core";
import { usePublicClient } from "wagmi";
// import abi from "../artifacts/MultiSigWallet.json";
import dummy_abi from "../artifacts/Vault.json";
import { createWalletClient, custom, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";

const Borrow = () => {
  const { address, isConnected } = useAccount();
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const publicClient = usePublicClient();

  const handleTransactionSubmit = async () => {
    try {
      const client = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });
      const { request } = await publicClient.simulateContract({
        address: "0x125328D415Ef139Af95810746D64C11B43F45Bb7", // calling multiSig
        abi: dummy_abi.abi,
        functionName: "submitTransaction",
        args: [to, value, data],
        account: address,
      });
      await client.writeContract(request);
      console.log("Transaction Submitted");
    } catch (error) {
      console.error(error);
    }
  };

  // Assuming you have state and functions (setTo, setValue, etc.) defined elsewhere in your component.

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
            Borrow GHO tokens from GHOVault
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
              onClick={handleTransactionSubmit}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-l border-white h-custom mx-4"></div>

      {/* Right Section */}
      <div className="text-center mt-20 mr-4">
        <div className="bg-backgroundTint p-4 md:p-8 m-8 rounded-lg shadow-lg md:w-96">
          <h2 className="text-2xl font-bold text-center mb-4 text-customPurple">
            {" "}
            Repay Borrowed Amount
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
              onClick={handleTransactionSubmit}
            >
              Repay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrow;
