import React, { useState } from "react";
import "./css/index.css";
import "../css/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useSelector } from "react-redux";

const UpdateSellerForm = (props) => {
	// FORM DATA
	const [idValue, setIdValue] = useState(-1);
	const idValueUpdate = (newSellerId) => {
		setIdValue(newSellerId);
		if (newSellerId >= 0) {
			let seller = sellers.find(
				(seller) => seller.id === Number.parseInt(newSellerId)
			);
			setNameValue(seller.name);
			setDescriptionValue(seller.description);
		} else {
			setNameValue("");
			setDescriptionValue("");
		}
	};
	const [nameValue, setNameValue] = useState("");
	const nameValueUpdate = (newNameValue) => {
		setNameValue(newNameValue);
	};
	const [descriptionValue, setDescriptionValue] = useState("");
	const descriptionValueUpdate = (newDescriptionValue) => {
		setDescriptionValue(newDescriptionValue);
	};

	const sellers = useSelector((state) => state.seller.sellers);

	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const navUpdateButtonClick = () => {
		if (
			props.navUpdateButtonClick &&
			idValue >= 0 &&
			nameValue &&
			descriptionValue
		) {
			props.navUpdateButtonClick(Number.parseInt(idValue), {
				name: nameValue,
				description: descriptionValue,
			});
		}
		setNameValue("");
		setDescriptionValue("");
		toggle();
	};

	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				Update
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="acdFormItem">Update Seller</ModalHeader>
				<ModalBody className="acdForm">
					<div className="acdFormItem updateFormOldDescription d-flex">
						<label htmlFor="updateForm-id" className="form-label">
							Old Seller
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="updateForm-id"
							placeholder="Seller"
							value={idValue}
							onChange={(event) => idValueUpdate(event.target.value)}
						>
							<option value={-1}>Choose a Seller to Update</option>
							{sellers ? (
								sellers.map((seller) => {
									return (
										<option key={seller.id} value={seller.id}>
											{seller.name}
										</option>
									);
								})
							) : (
								<option>No Sellers Found</option>
							)}
						</Input>
					</div>
					<div className="acdFormItem updateFormNewName d-flex">
						<label htmlFor="updateForm-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-name"
							placeholder="New Name"
							value={nameValue}
							onChange={(event) => nameValueUpdate(event.target.value)}
						/>
					</div>
					<div className="acdFormItem updateFormNewDescription d-flex">
						<label
							htmlFor="updateForm-description"
							className="form-label"
						>
							Description
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="updateForm-description"
							placeholder="New Description"
							value={descriptionValue}
							onChange={(event) =>
								descriptionValueUpdate(event.target.value)
							}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						onClick={() => navUpdateButtonClick()}
					>
						Update Seller
					</button>
					<button
						className="btn btn-secondary form-input form-control"
						onClick={toggle}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UpdateSellerForm;
