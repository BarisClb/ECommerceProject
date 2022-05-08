import React, { useEffect, useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";

const UpdateOrderForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(0);
	const [entityFound, setEntityFound] = useState(false);

	const order = useSelector((state) => state.common.EntityToUpdate);

	const dispatch = useDispatch();

	const findEntity = (e) => {
		e.preventDefault();
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
			setNoteValue("");
			setAddressValue("");
			setPriceValue(0);
			setQuantityValue(0);
			setDiscountValue(0);
			setTotalValue(0);
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

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navUpdateButtonClick = (e) => {
		e.preventDefault();
		if (props.navUpdateButtonClick && idValue > 0) {
			let updatedOrder = {};
			if (changeOrderStatus) {
				updatedOrder = { ...updatedOrder, orderStatus: orderStatusValue };
			}
			if (changeNote) {
				updatedOrder = { ...updatedOrder, note: noteValue };
			}
			if (changeAddress) {
				updatedOrder = {
					...updatedOrder,
					address: addressValue,
				};
			}
			if (changePrice) {
				updatedOrder = {
					...updatedOrder,
					price: priceValue,
				};
			}
			if (changeQuantity) {
				updatedOrder = {
					...updatedOrder,
					quantity: quantityValue,
				};
			}
			if (changeDiscount) {
				updatedOrder = {
					...updatedOrder,
					discount: discountValue,
				};
			}
			if (changeUserId) {
				updatedOrder = {
					...updatedOrder,
					userId: userIdValue,
				};
			}
			if (changeProductId) {
				updatedOrder = {
					...updatedOrder,
					productId: productIdValue,
				};
			}

			props.navUpdateButtonClick(Number.parseInt(idValue), {
				...updatedOrder,
			});
		}
		setIdValue(0);
		setOrderStatusValue(0);
		setNoteValue("");
		setAddressValue("");
		setPriceValue(0);
		setQuantityValue(0);
		setDiscountValue(0);
		setTotalValue(0);
		setUserIdValue(0);
		setProductIdValue(0);
		setEntityFound(false);
		setChangeOrderStatus(true);
		setChangeNote(true);
		setChangeAddress(true);
		setChangePrice(true);
		setChangeQuantity(true);
		setChangeDiscount(true);
		setChangeUserId(true);
		setChangeProductId(true);
		dispatch(commonActions.getEntityToUpdate("Orders", 0));
		toggle();
	};

	// Update or Not

	const [changeOrderStatus, setChangeOrderStatus] = useState(true);
	const [changeNote, setChangeNote] = useState(true);
	const [changeAddress, setChangeAddress] = useState(true);
	const [changePrice, setChangePrice] = useState(true);
	const [changeQuantity, setChangeQuantity] = useState(true);
	const [changeDiscount, setChangeDiscount] = useState(true);
	const [changeUserId, setChangeUserId] = useState(true);
	const [changeProductId, setChangeProductId] = useState(true);

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<form onSubmit={(e) => navUpdateButtonClick(e)}>
					<ModalHeader className="modal-form-item">Update Order</ModalHeader>
					<ModalBody className="modal-form">
						{/* ORDER ID */}
						<div className="modal-form-item modal-form-id">
							<label htmlFor="modal-order-update-form-id" className="form-label">
								Id
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-id"
								placeholder="Id"
								value={idValue}
								onChange={(event) => setIdValue(event.target.value)}
								min="1"
							/>
							<button
								className="btn btn-primary get-entity-to-update-button"
								onClick={(e) => findEntity(e)}
							>
								Get Order
							</button>
						</div>
						{/* ORDER STATUS */}
						<div className="modal-form-item modal-form-orderStatus">
							<label htmlFor="modal-order-update-form-orderStatus" className="form-label">
								Order Status
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-orderStatus"
								placeholder="Order Status"
								value={orderStatusValue}
								onChange={(event) => setOrderStatusValue(event.target.value)}
								min="0"
								disabled={!changeOrderStatus}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-orderStatus-check"
									onChange={() => setChangeOrderStatus(!changeOrderStatus)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-orderStatus-check"
								>
									Don't Change
								</label>
							</div>
						</div>
						{/* ORDER NOTE */}
						<div className="modal-form-item modal-form-note">
							<label htmlFor="modal-order-update-form-note" className="form-label">
								Note
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-order-update-form-note"
								placeholder="Note"
								value={noteValue}
								onChange={(event) => setNoteValue(event.target.value)}
								disabled={!changeNote}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-note-check"
									onChange={() => setChangeNote(!changeNote)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-note-check"
								>
									Don't Change
								</label>
							</div>
						</div>
						{/* ORDER ADDRESS */}
						<div className="modal-form-item modal-form-address">
							<label htmlFor="modal-order-update-form-address" className="form-label">
								Address
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="modal-order-update-form-address"
								placeholder="Address"
								value={addressValue}
								onChange={(event) => setAddressValue(event.target.value)}
								disabled={!changeAddress}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-address-check"
									onChange={() => setChangeAddress(!changeAddress)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-address-check"
								>
									Don't Change
								</label>
							</div>
						</div>
						{/* ORDER PRICE */}
						<div className="modal-form-item modal-form-price">
							<label htmlFor="modal-order-update-form-price" className="form-label">
								Price
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-price"
								placeholder="Price"
								value={priceValue}
								onChange={(event) => setPriceValue(event.target.value)}
								min="0"
								disabled={!changePrice}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-price-check"
									onChange={() => setChangePrice(!changePrice)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-price-check"
								>
									Don't Change
								</label>
							</div>
						</div>
						{/* ORDER QUANTITY */}
						<div className="modal-form-item modal-form-quantity">
							<label htmlFor="modal-order-update-form-quantity" className="form-label">
								Quantity
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-quantity"
								placeholder="Quantity"
								value={quantityValue}
								onChange={(event) => setQuantityValue(event.target.value)}
								min="1"
								disabled={!changeQuantity}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-quantity-check"
									onChange={() => setChangeQuantity(!changeQuantity)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-quantity-check"
								>
									Don't Change
								</label>
							</div>
						</div>
						{/* ORDER DISCOUNT */}
						<div className="modal-form-item modal-form-discount">
							<label htmlFor="modal-order-update-form-discount" className="form-label">
								Discount
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-discount"
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
									id="modal-form-order-update-discount-check"
									onChange={() => setChangeDiscount(!changeDiscount)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-discount-check"
								>
									No Discount
								</label>
							</div>
						</div>
						{/* ORDER TOTAL */}
						<div className="modal-form-item modal-form-total">
							<label htmlFor="modal-order-update-form-total" className="form-label">
								Total
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-total"
								placeholder="Total"
								value={totalValue}
								onChange={(event) => setTotalValue(event.target.value)}
								min="0"
								disabled={true}
							/>
						</div>
						{/* ORDER USERID */}
						<div className="modal-form-item modal-form-userId">
							<label htmlFor="modal-order-update-form-userId" className="form-label">
								UserId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-userId"
								placeholder="UserId"
								value={userIdValue}
								onChange={(event) => setUserIdValue(event.target.value)}
								min="0"
								disabled={!changeUserId}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-userId-check"
									onChange={() => setChangeUserId(!changeUserId)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-userId-check"
								>
									Don't Change
								</label>
							</div>
						</div>
						{/* ORDER PRODUCTID */}
						<div className="modal-form-item modal-form-productId">
							<label htmlFor="modal-order-update-form-productId" className="form-label">
								ProductId
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="modal-order-update-form-productId"
								placeholder="ProductId"
								value={productIdValue}
								onChange={(event) => setProductIdValue(event.target.value)}
								min="0"
								disabled={!changeProductId}
							/>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="modal-form-order-update-productId-check"
									onChange={() => setChangeProductId(!changeProductId)}
								/>
								<label
									className="form-check-label"
									htmlFor="modal-form-order-update-productId-check"
								>
									Don't Change
								</label>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<button
							className="btn btn-warning form-input form-control"
							type="submit"
							disabled={!entityFound}
						>
							Update Order
						</button>
						<button className="btn btn-secondary form-input form-control" onClick={toggle}>
							Close
						</button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
};

export default UpdateOrderForm;
