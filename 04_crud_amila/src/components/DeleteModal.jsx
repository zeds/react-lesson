import React from "react";
import { styled } from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFrame = styled.div`
  width: 300px;
  height: 200px;
  background: white;
  position: relative;
  font-size: 20px;
  padding: 10px;
  border-radius: 4px;
  background: #f4fbfe;

`

const Modal = (props) => {
  const clickClose = (e) => {
    e.stopPropagation();
    props.close();
  };

  const clickConfirm = () => {
    props.confirm();
    props.close();
  };

  const clickCancel = () => {
    props.close();
  };

  return (
    <ModalContainer onClick={clickCancel}>
      <ModalFrame onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={clickClose}>
          ❌
        </button>
        <div>Confirm Deletion</div>
        <p>Are you sure you want to delete this item?</p>
        <div className="buttonBlock">
          <button className="cancel" onClick={clickCancel}>
            Cancel
          </button>
          <button className="confirm" onClick={clickConfirm}>
            Confirm
          </button>
        </div>
      </ModalFrame>
    </ModalContainer>
  );
};

export default Modal;
