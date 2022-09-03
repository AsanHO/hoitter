import { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const HoitForm = ({ userObj }) => {
  const [hoit, setHoit] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    if (hoit === "") {
      return;
    }
    event.preventDefault();
    let IMG_URL = "";
    if (attachment !== "") {
      const fileRef = storageService
        .ref()
        .child(`${userObj.uid}/${Date.now()}`);
      const responese = await fileRef.putString(attachment, "data_url");
      IMG_URL = await responese.ref.getDownloadURL();
    }
    const hoitObj = {
      text: hoit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      IMG_URL,
    };
    await dbService.collection("hoits").add(hoitObj);
    console.log("전송완료!");
    setHoit("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setHoit(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }; //리드가 끝났음을 알려주는 함수.
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={hoit}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};
export default HoitForm;
