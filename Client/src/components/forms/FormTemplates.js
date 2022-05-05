import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

function FormTemplate() {
	const [xyzValue, setXyzValue] = useState("");
	const [onchangeValue, setOnchangeValue] = useState("");
	const onchangeValueUpdate = (newXyzValue) => {
		setOnchangeValue(newXyzValue);
	};
	const [changeValue, setChangeValue] = useState(false);
	// Modal
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	// ABC = ENTITYNAME,
	// DEF = TYPE OF ACTION (ADD,DELETE,UPDATE),
	// XYZ = VALUE NAME (NAME,DESCRIPTION,PRICE)(CASE SENSITIVE)
	return (
		<>
			<button className="btn btn-warning" onClick={toggle}>
				DEF
			</button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader className="modal-form-item">DEF Abc</ModalHeader>
				<ModalBody className="modal-form">
					{/* TEXT */}
					<div className="modal-form-item modal-form-xyz">
						<label htmlFor="modal-ABC-DEF-form-xyz" className="form-label">
							Xyz
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="modal-ABC-DEF-form-xyz"
							placeholder="Xyz"
							value={onchangeValue}
							onChange={(event) => onchangeValueUpdate(event.target.value)}
							disabled={!changeValue}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-ABC-DEF-xyz-check"
								onChange={() => setChangeValue(!changeValue)}
							/>
							<label className="form-check-label" htmlFor="modal-form-ABC-DEF-xyz-check">
								Don't Change
							</label>
						</div>
					</div>
					{/* NUMBER */}
					<div className="modal-form-item modal-form-xyz">
						<label htmlFor="modal-ABC-DEF-form-xyz" className="form-label">
							Xyz
						</label>
						<input
							type="number"
							className="form-control form-input"
							id="modal-ABC-DEF-form-xyz"
							placeholder="Xyz"
							value={onchangeValue}
							onChange={(event) => onchangeValueUpdate(event.target.value)}
							min=""
							max=""
							disabled={!changeValue}
						/>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="modal-form-ABC-DEF-xyz-check"
								onChange={() => setChangeValue(!changeValue)}
							/>
							<label className="form-check-label" htmlFor="modal-form-ABC-DEF-xyz-check">
								Don't Change
							</label>
						</div>
					</div>
					{/* SELECT */}
					<div className="modal-form-item modal-form-xyz">
						<label htmlFor="modal-form-xyz" className="form-label">
							Xyz
						</label>
						<Input
							type="select"
							className="form-control form-input"
							id="modal-ABC-DEF-form-xyz"
							placeholder="Xyz"
							value={onchangeValue}
							onChange={(event) => setChangeValue(event.target.value)}
						>
							<option value={-1}>Choose a Product to Update</option>
							{/* {products ? (
								products.map((product) => {
									return (
										<option key={product.id} value={product.id}>
											{product.name}
										</option>
									);
								})
							) : (
								<option disabled={true}>No Products Found</option>
							)} */}
						</Input>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						className="btn btn-warning form-input form-control"
						// onClick={() => def()}
					>
						DEF Abc
					</button>
					<button className="btn btn-secondary form-input form-control" onClick={toggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
}

export default FormTemplate;
