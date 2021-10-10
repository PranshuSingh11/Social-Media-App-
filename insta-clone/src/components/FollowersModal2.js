
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FollowersModal2 = ({user}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log(user)

  return (
    <div>
      <Button color="outline-info" style={{padding:"5px",marginLeft:"10px",marginTop:"-3px"}} onClick={toggle}>
             Followers
        </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Followers</ModalHeader>
        <ModalBody>
            {
              (user.followers)?
              <>
              {
              user.followers.map(item=>(
                <><b>{item.name}</b><br></br></>
              ))
              }
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

export default FollowersModal2;