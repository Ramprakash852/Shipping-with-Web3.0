"use client"
import React, { useContext, useEffect, useState } from "react";

import {
  Table,
  Form,
  Services,
  Profile,
  GetShipment,
  CompleteShipment,
  StartShipment,
} from "../../Components/index";

import { TrackingContext } from "../../Context/Tracking";

const index = () => {
    const {
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount,
        currentUser,
    } = useContext(TrackingContext);

    const [createShipmentModal,setCreateShipmentModal] = useState(false);
    const [openProfile,setOpenProfile] = useState(false);
    const [starModal,setStarModal] = useState(false);
    const [completeModal,setCompleteModal] = useState(false);
    const [getModal,setGetModal] = useState(false);

    const [allShipmentsdata,setallShipmentsdata] = useState();


    useEffect(()=>{
      const getCampaignsData = getAllShipment();
      return async (params) => {
        const allData = await getCampaignsData;
        setallShipmentsdata(allData);
      };
    },[]);

    return (
      <>
          <Services
            setOpenProfile={setOpenProfile}
            setCompleteModal={setCompleteModal}
            setGetModal={setGetModal}
            setStarModal={setStarModal}
            />
          <Table
            setCreateShipmentModal={setCreateShipmentModal}
            allShipmentsdata={allShipmentsdata}
          />
          <Form 
            createShipmentModal={createShipmentModal}
            createShipment={createShipment}
            setCreateShipmentModal={setCreateShipmentModal}
          />
          <Profile
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
            currentUser={currentUser}
            getCampaignsCount={getShipmentCount}
          />
          <CompleteShipment
            completeModal={completeModal}
            setCompleteModal={setCompleteModal}
            completeShipment={completeShipment}
          />
          <GetShipment
            getModal={getModal}
            setGetModal={setGetModal}
            getShipment={getShipment}
          />
          <StartShipment
            starModal={starModal}
            setStarModal={setStarModal}
            startShipment={startShipment}
          />
      </>
    );
};

export default index;
