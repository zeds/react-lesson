import React from "react";
import styled from "styled-components";
// import { useTranslation } from "react-i18next";

const ModalContainer = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 9999;
`;
const ModalOverlay = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
`;
const ModalContent = styled.div`
   background-color: #fff;
   width: 100%;
   max-width: 360px;
   padding: 20px;
   gap: 50px;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   z-index: 5;
   display: flex;
   flex-direction: column;
   align-items: center;
   transform: translateY(-200px);

   h3 {
      font-size: 1.6rem;
      font-weight: bold;
   }
`;
const ModalActions = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   margin-top: 16px;
   gap: 10px;
`;
const ModalButton = styled.button`
   width: 100%;
   padding: 8px 0;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   outline: none;
   &:hover {
      background: #69aff5;
   }  
`;
const ModalCancelButton = styled(ModalButton)`
   color: red;
`;
const ModalConfirmButton = styled(ModalButton)`
`;
interface ConfirmProps {
   status: boolean;
   showModal: any;
   onFunction: () => void;
   onFunction2: () => void;

   title?: React.ReactNode;
   leftBtn?: string;
   rightBtn?: string;
}

const AvatarConfirmModal: React.FC<ConfirmProps> = ({
   status,
   showModal,
   onFunction,
   onFunction2,
}) => {
   // const { t } = useTranslation();
   const finalTitle = "アバターを編集";
   const finalLeftBtn = "現在の写真を削除";
   const finalRightBtn = "ライブラリーから選択";
   return (
      <>
         {status && (
            <ModalContainer>
               <ModalOverlay onClick={() => { showModal(false)}}/>
               <ModalContent>
                  <h3>{finalTitle}</h3>
                  <ModalActions>
                     <ModalConfirmButton onClick={() => onFunction()}>
                        {finalRightBtn}
                     </ModalConfirmButton>
                     <ModalCancelButton onClick={() => onFunction2()}>
                        {finalLeftBtn}
                     </ModalCancelButton>
                     <ModalButton onClick={() => { showModal(false)}}>
                        キャンセル
                     </ModalButton>
                  </ModalActions>
               </ModalContent>
            </ModalContainer>
         )}
      </>
   );
};

export default AvatarConfirmModal;
