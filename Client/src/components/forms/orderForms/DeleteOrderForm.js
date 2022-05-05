import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const DeleteOrderForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const order = useSelector((state) => state.common.EntityToUpdate);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navDeleteButtonClick = () => {
		if (props.navDeleteButtonClick && idValue > 0) {
			props.navDeleteButtonClick(Number.parseInt(idValue));
		}
		setIdValue(-1);
		toggle();
	};

	const dispatch = useDispatch();
	const findEntity = () => {
		dispatch(commonActions.getEntityToUpdate("Orders", idValue));
	};

	useEffect(() => {
		if (order.id) {
			setIdValue(order.id);
			setOrderStatusValue(order.orderStatus);
			setNoteValue(order.note);
			setAddressValue(order.address);
			setPriceValue(order.price);
			setQuantityValue(order.quantity);
			setDiscountValue(order.discount);
			setTotalValue(order.total);
			setUserIdValue(order.userId);
			setProductIdValue(order.productId);
			setEntityFound(true);
		} else {
			setIdValue(0);
			setOrderStatusValue(0);
			setTotalValue(0);
			setNoteValue("");
			setAddressValue("");
			setPriceValue(0);
			setQuantityValue(0);
			setDiscountValue(0);
			setUserIdValue(0);
			setProductIdValue(0);
			setEntityFound(false);
		}
	}, [order]);

	const [orderStatusValue, setOrderStatusValue] = useState(0);
	const [noteValue, setNoteValue] = useState("");
	const [addressValue, setAddressValue] = useState("");
	const [priceValue, setPriceValue] = useState(0);
	const [quantityValue, setQuantityValue] = useState(0);
	const [discountValue, setDiscountValue] = useState(0);
	const [totalValue, setTotalValue] = useState(0);
	const [userIdValue, setUserIdValue] = useState(0);
	const [productIdValue, setProductIdValue] = useState(0);

	return (
		<>
			<button className="btn btn-danger" onClick={toggle}>
				Delete
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">Delete Order</ModalHeader>
				<ModalBody className="modal-form">
					{/* ORDER ID */}
					<div className="modal-form-item modal-form-id">
						<label htmlFor="modal-order-delete-form-id" className="form-label">
							Id
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-id"
							placeholder="Id"
							value={idValue}
							onChange={(event) => setIdValue(event.target.value)}
							min="1"
						/>
						<button
							className="btn btn-primary get-entity-to-delete-button"
							onClick={() => findEntity()}
						>
							Get Order
						</button>
					</div>
					{/* ORDER STATUS */}
					<div className="modal-form-item modal-form-orderStatus">
						<label htmlFor="modal-order-delete-form-orderStatus" className="form-label">
							Order Status
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-orderStatus"
							placeholder="Order Status"
							value={orderStatusValue}
							onChange={(event) => setOrderStatusValue(event.target.value)}
							min="0"
							disabled={true}
						/>
					</div>
					{/* ORDER NOTE */}
					<div className="modal-form-item modal-form-note">
						<label htmlFor="modal-order-delete-form-note" className="form-label">
							Note
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-order-delete-form-note"
							placeholder="Note"
							value={noteValue}
							onChange={(event) => setNoteValue(event.target.value)}
							disabled={true}
						/>
					</div>
					{/* ORDER ADDRESS */}
					<div className="modal-form-item modal-form-address">
						<label htmlFor="modal-order-delete-form-address" className="form-label">
							Address
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-order-delete-form-address"
							placeholder="Address"
							value={addressValue}
							onChange={(event) => setAddressValue(event.target.value)}
							disabled={true}
						/>
					</div>
					{/* ORDER PRICE */}
					<div className="modal-form-item modal-form-price">
						<label htmlFor="modal-order-delete-form-price" className="form-label">
							Price
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-price"
							placeholder="Price"
							value={priceValue}
							onChange={(event) => setPriceValue(event.target.value)}
							min="0"
							disabled={true}
						/>
					</div>
					{/* ORDER QUANTITY */}
					<div className="modal-form-item modal-form-quantity">
						<label htmlFor="modal-order-delete-form-quantity" className="form-label">
							Quantity
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-quantity"
							placeholder="Quantity"
							value={quantityValue}
							onChange={(event) => setQuantityValue(event.target.value)}
							min="1"
							disabled={true}
						/>
					</div>
					{/* ORDER DISCOUNT */}
					<div className="modal-form-item modal-form-discount">
						<label htmlFor="modal-order-delete-form-discount" className="form-label">
							Discount
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-discount"
							placeholder="Discount"
							value={discountValue}
							onChange={(event) => setDiscountValue(event.target.value)}
							min="0"
							max="100"
							disabled={true}
						/>
					</div>
					{/* ORDER TOTAL */}
					<div className="modal-form-item modal-form-total">
						<label htmlFor="modal-order-delete-form-total" className="form-label">
							Total
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-total"
							placeholder="Total"
							value={totalValue}
							onChange={(event) => setOrderStatusValue(event.target.value)}
							min="0"
							disabled={true}
						/>
					</div>
					{/* ORDER USERID */}
					<div className="modal-form-item modal-form-userId">
						<label htmlFor="modal-order-delete-form-userId" className="form-label">
							UserId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-userId"
							placeholder="UserId"
							value={userIdValue}
							onChange={(event) => setUserIdValue(event.target.value)}
							min="0"
							disabled={true}
						/>
					</div>
					{/* ORDER PRODUCTID */}
					<div className="modal-form-item modal-form-productId">
						<label htmlFor="modal-order-delete-form-productId" className="form-label">
							ProductId
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-order-delete-form-productId"
							placeholder="ProductId"
							value={productIdValue}
							onChange={(event) => setProductIdValue(event.target.value)}
							min="0"
							disabled={true}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-danger form-input form-control"
						onClick={() => navDeleteButtonClick()}
						disabled={!entityFound}
					>
						Delete Order
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default DeleteOrderForm;
