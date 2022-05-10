import React, { useState } from "react";
import "./css/index.css";

const Header = (props) => {
	// Header Title
	const [title] = useState(props.title);
	// Header Icon

	// Header Buttons
	const [headerButtons] = useState(props.headerButtons);
	const [headerCreateButton] = useState(props.headerCreateButton);
	const [headerUpdateButton] = useState(props.headerUpdateButton);
	const [headerDeleteButton] = useState(props.headerDeleteButton);
	const [headerCustomButton] = useState(props.headerCustomButton);
	const [headerCustomButtonColor] = useState(props.headerCustomButtonColor);
	// header Button Clicks
	const headerCreateButtonClick = () => {
		if (props.headerCreateButtonClick) {
			props.headerCreateButtonClick();
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
					{headerCreateButton && (
						<button className="btn btn-success" onClick={() => headerCreateButtonClick()}>
							Create
						</button>
					)}
					{headerUpdateButton && (
						<button className="btn btn-warning" onClick={() => headerUpdateButtonClick()}>
							Update
						</button>
					)}
					{headerDeleteButton && (
						<button className="btn btn-danger" onClick={() => headerDeleteButtonClick()}>
							Delete
						</button>
					)}
					{headerCustomButton && (
						<button
							className={`btn btn-${
								headerCustomButtonColor ? headerCustomButtonColor : "light"
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
};

export default Header;
