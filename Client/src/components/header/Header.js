import React, { useState } from "react";
import "./css/index.css";

export default function Header(props) {
	// Header Title
	const [title, setTitle] = useState(props.title);
	// Header Icon

	// Header Buttons
	const [headerButtons, setHeaderButtons] = useState(props.headerButtons);
	const [headerAddButton, setHeaderAddButton] = useState(
		props.headerAddButton
	);
	const [headerUpdateButton, setHeaderUpdateButton] = useState(
		props.headerUpdateButton
	);
	const [headerDeleteButton, setHeaderDeleteButton] = useState(
		props.headerDeleteButton
	);
	const [headerCustomButton, setHeaderCustomButton] = useState(
		props.headerCustomButton
	);
	const [headerCustomButtonColor, setheaderCustomButtonColor] = useState(
		props.headerCustomButtonColor
	);
	// header Button Clicks
	const headerAddButtonClick = () => {
		if (props.headerAddButtonClick) {
			props.headerAddButtonClick();
		}
	};
	const headerUpdateButtonClick = () => {
		if (props.headerUpdateButtonClick) {
			props.headerUpdateButtonClick();
		}
	};
	const headerDeleteButtonClick = () => {
		if (props.headerDeleteButtonClick) {
			props.headerDeleteButtonClick();
		}
	};
	const headerCustomButtonClick = () => {
		if (props.headerCustomButtonClick) {
			props.headerCustomButtonClick();
		}
	};

	return (
		<div className="header-body">
			<i className="fa-solid fa-gears font"></i>
			<h1>{title ? title : "Title"}</h1>
			{headerButtons && (
				<div className="header-buttons">
					{headerAddButton && (
						<button
							className="btn btn-success"
							onClick={() => headerAddButtonClick()}
						>
							Add
						</button>
					)}
					{headerUpdateButton && (
						<button
							className="btn btn-warning"
							onClick={() => headerUpdateButtonClick()}
						>
							Update
						</button>
					)}
					{headerDeleteButton && (
						<button
							className="btn btn-danger"
							onClick={() => headerDeleteButtonClick()}
						>
							Delete
						</button>
					)}
					{headerCustomButton && (
						<button
							className={`btn btn-${
								headerCustomButtonColor
									? headerCustomButtonColor
									: "light"
							}`}
							onClick={() => headerCustomButtonClick()}
						>
							{headerCustomButton && headerCustomButton}
						</button>
					)}
				</div>
			)}
		</div>
	);
}
