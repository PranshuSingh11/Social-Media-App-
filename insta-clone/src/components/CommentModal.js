
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = ({post}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="outline-info" style={{padding:"5px"}} onClick={toggle}>
        {(post.comments.length>1)?
        <>View all {post.comments.length} comments</>:
        (post.comments.length==1)?
        <>View {post.comments.length} comment</>:
        <>No comments</>
      }
        </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Comments</ModalHeader>
        <ModalBody>
          {
            post.comments.map(comment=>(
              <p><b>{comment.postedBy.name}</b> {comment.text}</p>
            ))
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;