
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FollowingModal = ({ufollowing}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log(ufollowing)

  return (
    <div>
      <Button color="outline-info" style={{padding:"5px",marginLeft:"10px",marginTop:"-3px"}} onClick={toggle}>
             Following
        </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Following</ModalHeader>
        <ModalBody>
          {
            (ufollowing)?
              <>
            {  ufollowing.map(item=>(
                 <> <b>{item.name}</b><br></br> </>
              ))}
              </>:
              <></>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FollowingModal;