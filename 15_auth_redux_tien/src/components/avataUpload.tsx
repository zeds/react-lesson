import AvatarConfirmModal from "./AvatarConfirmModal";

function AvataUpload() {
    const [confirmModal, setConfirmModal] = useState(false);
    useEffect(() => {
        document.body.style.overflow = confirmModal ? 'hidden' : 'auto';
      }, [confirmModal]);
      
    return ( <AvatarConfirmModal status={confirmModal} showModal={setConfirmModal} onFunction={() => setTest(true)} onFunction2={deleteImage}/> );
}

export default AvataUpload;