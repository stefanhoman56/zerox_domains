import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const SaleModal = ({ show, onConfirm, onCancel, domain }) => {
    const [price, setPrice] = useState("");

    useEffect(() => {
        setPrice("");
    }, [domain]);

    return (
        <Modal
            show={show}
            size="sm"
            dialogClassName="sale-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <div className="drow">
                    <h5>List domain for sale</h5>
                </div>
                <div className="drow">
                    <h5> {domain} &nbsp;&nbsp;</h5>
                    <input id="priceinput" type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <h5>&nbsp;&nbsp;ETH</h5>
                </div>
                <div className="drow">
                    <p id="font">(Note: 1% of the sale will go to ZeroX Domains)</p>
                </div>
                <div className="drow">
                    <div id="cancelb" onClick={onCancel}>Cancel</div>
                    <div id="confirmb" onClick={() => onConfirm(price)}>Confirm</div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default SaleModal;