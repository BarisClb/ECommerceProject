import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateOrderForm = (props) => {
	// FORM DATA
	const [noteValue, setNoteValue] = useState("");
	const [addressValue, setAddressValue] = useState("");
	const [priceValue, setPriceValue] = useState(0);
	const [quantityValue, setQuantityValue] = useState(0);
	const [discountValue, setDiscountValue] = useState(0);
	const [userIdValue, setUserIdValue] = useState(0);
	const [productIdValue, setProductIdValue] = useState(0);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = (e) => {
		e.preventDefault();
		setModal(!modal);
	};
	const navCreateButtonClick = (e) => {
		e.preventDefault();
		if (props.navCreateButtonClick) {
			let note = {};
			if (changeNote && noteValue !== "") {
				note = { note: noteValue };
			}
			let discount = { discount: 0 };
			if (changeDiscount && discountValue !== 0) {
				note = { note: noteValue };
			}

			props.navCreateButtonClick({
				...note,
				address: addressValue,
				price: priceValue,
				quantity: quantityValue,
				...discount,
				userId: userIdValue,
				productId: productIdValue,
			});
		}
		setNoteValue("");
		setAddressValue("");
		setPriceValue(0);
		setQuantityValue(0);
		setDiscountValue(0);
		setUserIdValue(0);
		setProductIdValue(0);
		setChangeNote(true);
		toggle();
	};

	const [changeNote, setChangeNote] = useState(true);
	const [changeDiscount, setChangeDiscount] = useState(true);

	return (
		<>
			<button className="btn btn-success" onClick={toggle}>
				Create
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navCreateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Create Order</ModalHeader>
					<ModalBody className="modal-form">
						{/* WARNING */}
						<div className="modal-form-item">
							<label className="form-label">Only User Accounts should Create Orders.</label>
						</div>
						{/* ORDER NOTE */}
						<div className="modal-form-item modal-form-note">
							<label htmlFor="modal-order-create-form-note" className="form-label">
								Note
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-order-create-form-note"
								placeholder="Note"
								value={noteValue}
								onChange={(event) => setNoteValue(event.target.value)}
								disabled={!changeNote}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-create-note-check"
									onChange={() => setChangeNote(!changeNote)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-create-note-check"
								>
									Don't Leave Note
								</label>
							</div>
						</div>
						{/* ORDER ADDRESS */}
						<div className="modal-form-item modal-form-address">
							<label htmlFor="modal-order-create-form-address" className="form-label">
								Address
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-order-create-form-address"
								placeholder="Address"
								value={addressValue}
								onChange={(event) => setAddressValue(event.target.value)}
							/>
						</div>
						{/* ORDER PRICE */}
						<div className="modal-form-item modal-form-price">
							<label htmlFor="modal-order-create-form-price" className="form-label">
								Price
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-create-form-price"
								placeholder="Price"
								value={priceValue}
								onChange={(event) => setPriceValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* ORDER QUANTITY */}
						<div className="modal-form-item modal-form-quantity">
							<label htmlFor="modal-order-create-form-quantity" className="form-label">
								Quantity
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-create-form-quantity"
								placeholder="Quantity"
								value={quantityValue}
								onChange={(event) => setQuantityValue(event.target.value)}
								min="1"
							/>
						</div>
						{/* ORDER DISCOUNT */}
						<div className="modal-form-item modal-form-discount">
							<label htmlFor="modal-order-create-form-discount" className="form-label">
								Discount
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-create-form-discount"
								placeholder="Discount"
								value={discountValue}
								onChange={(event) => setDiscountValue(event.target.value)}
								min="0"
								max="100"
								disabled={!changeDiscount}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-create-discount-check"
									onChange={() => setChangeDiscount(!changeDiscount)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-create-discount-check"
								>
									No Discount
								</label>
							</div>
						</div>
						{/* ORDER USERID */}
						<div className="modal-form-item modal-form-userId">
							<label htmlFor="modal-order-create-form-userId" className="form-label">
								UserId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-create-form-userId"
								placeholder="UserId"
								value={userIdValue}
								onChange={(event) => setUserIdValue(event.target.value)}
								min="0"
							/>
						</div>
						{/* ORDER PRODUCTID */}
						<div className="modal-form-item modal-form-productId">
							<label htmlFor="modal-order-create-form-productId" className="form-label">
								ProductId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-create-form-productId"
								placeholder="ProductId"
								value={productIdValue}
								onChange={(event) => setProductIdValue(event.target.value)}
								min="0"
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success form-input form-control" type="submit">
							Create Order
						</button>
						<button
							className="btn btn-secondary form-input form-control"
							onClick={(e) => toggle(e)}
						>
							Close
						</button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
};

export default CreateOrderForm;
