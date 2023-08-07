import {Button, Modal} from 'react-bootstrap'

export const ModalWrapper = (props: { show: any; handleClose: any; handleShow: any, children: any; title: string }) => {
const {show, handleClose, handleShow, title, children} = props

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {handleShow && <Button variant="primary" onClick={handleShow}>
            Save Changes
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalWrapper