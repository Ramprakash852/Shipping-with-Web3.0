"use client";

import React, { useState, useEffect } from "react";
import { Web3Modal } from '@web3modal/react';
import { BrowserProvider, ethers } from "ethers";
import { JsonRpcProvider } from "ethers/providers";
// import { utils } from "ethers/utils";

// INTERNAL IMPORT
import tracking from "../Context/Tracking.json";
const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ContractABI = tracking.abi;

// Fetching smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;
  
    try {
      // Initialize Web3Modal
      const web3Modal = new Web3Modal({
        cacheProvider: true, // Optional: Enables caching of selected provider
        providerOptions: {
          injected: {
            package: null, // Use MetaMask
          },
        },
      });
  
      // Open Web3Modal to connect wallet
      const connection = await web3Modal.connect();
  
      // Create a provider and signer
      const provider = new BrowserProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
  
      // Call the createShipment function
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.parseUnits(price, 18),
        { value: ethers.parseUnits(price, 18) }
      );
      await createItem.wait();
      console.log(createItem);
    } catch (error) {
      console.log("Error while creating shipment", error);
    }
  };

  const getAllShipment = async (params) => {
    try {
      const provider = new JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.formatEther(shipment.price.toString()),
        pickupTime: Number(shipment.pickupTime),
        deliveryTime: Number(shipment.deliveryTime),
        distance: Number(shipment.distance),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
      return allShipments;
    } catch (error) {
      console.log("error while getting shipment",error);
    }
  };

  const getShipmentCount = async (params) => {
    try {
      if (!window.ethereum) return "Install MetaMask Wallet";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentCount = await contract.getShipmentCount(accounts[0]);
      return Number(shipmentCount);
    } catch (error) {
      console.log("error in getting Shipment Count");
    }
  };

  const completeShipment = async (completeShip) => {
    console.log(completeShip);

    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new BrowserProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        { gasLimit: 300000 }
      );

      await transaction.wait();
      console.log(transaction);

    } catch (error) {
      console.log("Error while completing shipment", error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Install MetaMask Wallet";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipmentCount(
        accounts[0],
        index * 1
      );

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: Number(shipment[2]),
        deliveryTime: Number(shipment[3]),
        distance: Number(shipment[4]),
        price: ethers.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };

      return SingleShipment;
    } catch (error) {
      console.log("Error while getting Shipment");
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;
    try {
      if (!window.ethereum) return "Install MetaMask Wallet";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new BrowserProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );
      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log("error at starting shipment", error);
    }
  };

  const checkIfWalletConnected = async (params) => {
    try {
      if (!window.ethereum) return "Install MetaMask Wallet";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      return "Not connected";
    }
  };

  const connectWallet = async (params) => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something Went Wrong";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
