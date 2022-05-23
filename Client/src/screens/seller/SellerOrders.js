import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table";
import { orderActions } from "../../store/actions/orderActions";
import Header from "../../components/header/Header";

function SellerOrders() {
	const dispatch = useDispatch();

	const seller = useSelector((state) => state.account.seller);

	// Table Data
	const orders = useSelector((state) => state.order.orders);
	useEffect(() => {
		dispatch(orderActions.getSortedOrdersByEntity("Seller", listSorting, seller.id));
	}, []);

	// Table Side Button Actions
	const tableCustomButtonClick = (oldOrder) => {
		dispatch(
			orderActions.updateOrder(
				oldOrder.id,
				{ orderStatus: 2 },
				orderActions.getSortedOrdersByEntity("Seller", sortInfo, seller.id)
			)
		);
	};
	const tableCustomButton2Click = (oldOrder) => {
		dispatch(
			orderActions.updateOrder(
				oldOrder.id,
				{ orderStatus: 0 },
				orderActions.getSortedOrdersByEntity("Seller", sortInfo, seller.id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		if (seller && seller.id) {
			listSorting = { ...listSorting, ...listSortingValues };
			dispatch(orderActions.getSortedOrdersByEntity("Seller", listSorting, seller.id));
		}
	};
	// Default Sort Values
	let listSorting = {
		reversed: true,
		searchWord: "",
		pageNumber: 1,
		pageSize: 20,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

	return (
		<div className="seller-order-screen-wrapper">
			<Header title={"Orders"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={orders}
					// Table Content
					// Table Headings
					tableHead={"User"}
					tableHead2={"Product"}
					tableHead3={"Seller"}
					tableHead4={"Status"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"userUsername"}
					tableData2={"productName"}
					tableData3={"sellerUsername"}
					tableData4={"orderStatus"}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={false}
					// Table Custom Buttons
					tableCustomButton={"Send Order"}
					tableCustomButton2={"Cancel Order"}
					tableCustomButtonColor={"primary"}
					tableCustomButtonColor2={"danger"}
					tableCustomButtonClick={tableCustomButtonClick}
					tableCustomButton2Click={tableCustomButton2Click}
					// Nav
					isNav={"Order"}
					navCreateButton={false}
					navUpdateButton={false}
					navDeleteButton={false}
					// Nav Action
					navCreateButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Date"}
					tableSortBy2={"User"}
					tableSortByValue2={"UserUsername"}
					tableSortBy3={"OrderStatus"}
					tableSortByValue3={"OrderStatus"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default SellerOrders;
