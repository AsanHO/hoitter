import { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Hoits = ({ hoitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newhoit, setNewhoit] = useState(hoitObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`hoits/${hoitObj.id}`).delete();
      await storageService.refFromURL(hoitObj.IMG_URL).delete();
    }
  };
  const toggleEditing = () => setEditing((cur) => !cur);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewhoit(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`hoits/${hoitObj.id}`).update({ text: newhoit });
    setEditing(false);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your hoit"
              value={newhoit}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{hoitObj.text}</h4>
          {hoitObj.IMG_URL && <img src={hoitObj.IMG_URL} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hoits;
