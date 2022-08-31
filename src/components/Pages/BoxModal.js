import Modal from "react-bootstrap/Modal";

const BoxModal = ({ showModal, setShowModal, text }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal className="mt-5" show={showModal} onHide={handleClose}>
        <Modal.Body
          className={
            text === "Completed request"
              ? "text-success text-center py-5 h4"
              : "text-danger text-center py-5 h4"
          }
        >
          {text}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BoxModal;
