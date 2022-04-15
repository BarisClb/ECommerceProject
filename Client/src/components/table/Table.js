import React, { useEffect, useState } from "react";
import "./css/index.css";
import AddProductForm from "../forms/productForms/AddProductForm";
import DeleteProductForm from "../forms/productForms/DeleteProductForm";
import UpdateProductForm from "../forms/productForms/UpdateProductForm";
import AddCategoryForm from "../forms/categoryForms/AddCategoryForm";
import UpdateCategoryForm from "../forms/categoryForms/UpdateCategoryForm";
import DeleteCategoryForm from "../forms/categoryForms/DeleteCategoryForm";
import MiniCart from "./MiniCart";

const Table = (props) => {
	// Data
	const [apiData, setApiData] = useState(props.apiData);
	// This Is For Search
	const [originalApiData, setOriginalApiData] = useState(props.apiData);
	const [instaSearch] = useState(props.instaSearch);
	// Table Content
	// Table Headers
	const [tableHead] = useState(props.tableHead);
	const [tableHead2] = useState(props.tableHead2);
	const [tableHead3] = useState(props.tableHead3);
	const [tableHead4] = useState(props.tableHead4);
	const [buttonHeadName] = useState(props.buttonHeadName);
	// Table Data
	const [tableData] = useState(props.tableData);
	const [tableData2] = useState(props.tableData2);
	const [tableData3] = useState(props.tableData3);
	const [tableData4] = useState(props.tableData4);
	// Special
	const [isCategories] = useState(props.isCategories);
	const [isNav] = useState(props.isNav);
	const [isCart] = useState(props.isCart);
	// Table Buttons
	const [tableButtons] = useState(props.tableButtons);
	const [tableAddButton] = useState(props.tableAddButton);
	const [tableUpdateButton] = useState(props.tableUpdateButton);
	const [tableDeleteButton] = useState(props.tableDeleteButton);
	const [tableCustomButton] = useState(props.tableCustomButton);
	const [tableCustomButton2] = useState(props.tableCustomButton2);
	const [tableCustomButton3] = useState(props.tableCustomButton3);
	// Table Button Clicks / Functions
	const tableAddButtonClick = (newData) => {
		if (props.tableAddButtonClick) {
			props.tableAddButtonClick(newData);
		}
	};
	const tableUpdateButtonClick = (oldData, newData) => {
		if (props.tableUpdateButtonClick) {
			props.tableUpdateButtonClick(oldData, newData);
		}
	};
	const tableDeleteButtonClick = (oldData) => {
		if (props.tableDeleteButtonClick) {
			props.tableDeleteButtonClick(oldData);
		}
	};
	const tableCustomButtonClick = (data) => {
		if (props.tableCustomButtonClick) {
			props.tableCustomButtonClick(data);
		}
	};
	const tableCustomButton2Click = (data) => {
		if (props.tableCustomButtonClick) {
			props.tableCustomButton2Click(data);
		}
	};
	const tableCustomButton3Click = (data) => {
		if (props.tableCustomButtonClick) {
			props.tableCustomButton3Click(data);
		}
	};
	// Custom Button Colors
	const [tableCustomButtonColor] = useState(props.tableCustomButtonColor);
	const [tableCustomButtonColor2] = useState(props.tableCustomButtonColor2);
	const [tableCustomButtonColor3] = useState(props.tableCustomButtonColor3);
	// Nav Buttons
	const [navAddButton] = useState(props.navAddButton);
	const [navUpdateButton] = useState(props.navUpdateButton);
	const [navDeleteButton] = useState(props.navDeleteButton);
	const [navCustomButton] = useState(props.navCustomButton);
	// Nav Button Clicks
	const navAddButtonClick = (newData) => {
		if (props.navAddButtonClick) {
			props.navAddButtonClick(newData);
		}
		setAddForm(!addForm);
		setUpdateForm(false);
		setDeleteForm(false);
	};
	const navUpdateButtonClick = (oldData, newData) => {
		if (props.navUpdateButtonClick) {
			props.navUpdateButtonClick(oldData, newData);
		}
		setAddForm(false);
		setUpdateForm(!updateForm);
		setDeleteForm(false);
	};
	const navDeleteButtonClick = (oldData) => {
		if (props.navDeleteButtonClick) {
			props.navDeleteButtonClick(oldData);
		}
		setAddForm(false);
		setUpdateForm(false);
		setDeleteForm(!deleteForm);
	};
	const navCustomButtonClick = () => {
		if (props.navCustomButtonClick) {
			props.navCustomButtonClick();
		}
	};
	// Nav Custom Button Color
	const [navCustomButtonColor] = useState(props.navCustomButtonColor);
	// Nav Search
	const [searchValue, setSearchValue] = useState("");
	const searchValueUpdate = (newWord) => {
		setSearchValue(newWord);
	};
	const searchTheWord = () => {
		setApiData(
			originalApiData.filter((element) => {
				if (tableData) {
					if (element[tableData] != null) {
						return element[tableData]
							.toLowerCase()
							.includes(searchValue.toLowerCase());
					}
				} else {
					return element.toLowerCase().includes(searchValue.toLowerCase());
				}
			})
		);
	};
	// Modals

	// Form Buttons
	const [addForm, setAddForm] = useState(false);
	const [updateForm, setUpdateForm] = useState(false);
	const [deleteForm, setDeleteForm] = useState(false);

	// UseEffect
	// Updating the Values
	useEffect(() => {
		setApiData(props.apiData);
		setOriginalApiData(props.apiData);
	}, [props.apiData]);

	// Search on write
	useEffect(() => {
		if (instaSearch) {
			searchTheWord();
		}
	}, [searchValue]);

	return (
		// NAV
		<div className="table-body">
			{isNav && (
				<nav className="navbar table-nav navbar-light bg-secondary">
					<div className="container-fluid">
						<div className="navbar-buttons">
							Operations:
							{navAddButton &&
								(isCategories ? (
									<AddCategoryForm
										navAddButtonClick={navAddButtonClick}
									/>
								) : (
									<AddProductForm
										navAddButtonClick={navAddButtonClick}
									/>
								))}
							{navUpdateButton &&
								(isCategories ? (
									<UpdateCategoryForm
										navUpdateButtonClick={navUpdateButtonClick}
									/>
								) : (
									<UpdateProductForm
										navUpdateButtonClick={navUpdateButtonClick}
									/>
								))}
							{navDeleteButton &&
								(isCategories ? (
									<DeleteCategoryForm
										navDeleteButtonClick={navDeleteButtonClick}
									/>
								) : (
									<DeleteProductForm
										navDeleteButtonClick={navDeleteButtonClick}
									/>
								))}
							{navCustomButton && (
								<button
									className={`btn btn-${
										navCustomButtonColor
											? navCustomButtonColor
											: "light"
									}`}
									onClick={() => navCustomButtonClick()}
								>
									{navCustomButton && navCustomButton}
								</button>
							)}
						</div>
						<div className="nav-search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
								value={searchValue}
								onChange={(event) =>
									searchValueUpdate(event.target.value)
								}
							/>
							<button
								className="btn btn-primary"
								type="submit"
								onClick={() => searchTheWord()}
							>
								Search
							</button>
						</div>
					</div>
				</nav>
			)}
			{/* TABLE */}
			<table className="table table-striped table-secondary">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">{`${
							tableHead ? tableHead : "Table Head"
						} Name`}</th>
						{/* Optional Headers */}
						{tableHead2 && <th scope="col">{tableHead2}</th>}
						{tableHead3 && <th scope="col">{tableHead3}</th>}
						{tableHead4 && <th scope="col">{tableHead4}</th>}
						{/* Buttons PlaceHolder */}
						{isCart ? (
							<MiniCart />
						) : (
							tableButtons && (
								<th scope="col" className="thead-buttons text-end">
									{buttonHeadName ? buttonHeadName : "Operations"}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{apiData &&
						apiData.map((data, index) => {
							return (
								<tr key={data.id ? data.id : index}>
									<th scope="row">{index + 1}</th>
									{tableData && <td>{data[tableData]}</td>}
									{tableData2 && <td>{data[tableData2]}</td>}
									{tableData3 && <td>{data[tableData3]}</td>}
									{tableData4 && <td>{data[tableData4]}</td>}
									{tableButtons && (
										<td className="table-buttons text-end">
											{tableAddButton && (
												<button
													className="btn btn-success"
													onClick={() => tableAddButtonClick(data)}
												>
													Add
												</button>
											)}
											{tableUpdateButton && (
												<button
													className="btn btn-warning"
													onClick={() =>
														tableUpdateButtonClick(data)
													}
												>
													Update
												</button>
											)}
											{tableDeleteButton && (
												<button
													className="btn btn-danger"
													onClick={() =>
														tableDeleteButtonClick(data)
													}
												>
													Delete
												</button>
											)}
											{tableCustomButton && (
												<button
													className={`btn btn-${
														tableCustomButtonColor
															? tableCustomButtonColor
															: "secondary"
													}`}
													onClick={() =>
														tableCustomButtonClick(data)
													}
												>
													{tableCustomButton && tableCustomButton}
												</button>
											)}
											{tableCustomButton2 && (
												<button
													className={`btn btn-${
														tableCustomButtonColor2
															? tableCustomButtonColor2
															: "secondary"
													}`}
													onClick={() =>
														tableCustomButton2Click(data)
													}
												>
													{tableCustomButton2 &&
														tableCustomButton2}
												</button>
											)}
											{tableCustomButton3 && (
												<button
													className={`btn btn-${
														tableCustomButtonColor3
															? tableCustomButtonColor3
															: "secondary"
													}`}
													onClick={() =>
														tableCustomButton3Click(data)
													}
												>
													{tableCustomButton3 &&
														tableCustomButton3}
												</button>
											)}
										</td>
									)}
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
