import React, { useEffect, useState } from "react";
import HoitForm from "../components/HoitForm";
import Hoits from "../components/Hoits";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [hoits, setHoits] = useState([]);
  useEffect(() => {
    dbService
      .collection("hoits")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHoits(nweetArray);
      });
  }, []);

  return (
    <div className="container">
      <HoitForm userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {hoits.map((hoit) => (
          <Hoits
            key={hoit.id}
            hoitObj={hoit}
            isOwner={userObj.uid === hoit.creatorId}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
