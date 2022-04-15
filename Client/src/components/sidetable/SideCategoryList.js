import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./css/index.css";

const SideCategoryList = (props) => {
	// const clickCategory = (category) => {
	// 	if (category) {
	// 		chooseCategory(category.id);
	// 		getProducts(category.id);
	// 	} else {
	// 		this.props.actions.chooseCategory(0);
	// 		this.props.actions.getProducts(0);
	// 	}
	// };
	// const showme = async () => {
	// 	let url = "http://localhost:3000/categories";
	// 	let response = await fetch(url);
	// 	let data = await response.json();
	// 	console.log(data);
	// };

	// Data
	const [sideListItems, setSideListItems] = useState(props.sideListItems);
	const [currentItem, setCurrentItem] = useState(props.currentItem);
	const [listDataName, setListDataName] = useState(props.listDataName);
	const [listDataName2, setListDataName2] = useState(props.listDataName2);

	return (
		<div id="sideCategoryListBody">
			{/* <button onClick={() => this.showme()}> AAAA</button> */}
			<ListGroup className="categorylist-listgroup">
				<ListGroupItem
				// active={0 === currentCategory}
				// onClick={() => clickCategory(0)}
				>
					All Categories
				</ListGroupItem>

				{/* Category List */}

				{sideListItems.map((item) => (
					<ListGroupItem
						key={item[listDataName]}
						// onClick={() => this.clickCategory(category)}
						// active={item.id === currentItem}
					>
						{item[listDataName2]}
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
};

export default SideCategoryList;
