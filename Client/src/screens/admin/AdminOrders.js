import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { orderActions } from "../../store/actions/orderActions";
import { useSelector } from "react-redux";

function AdminOrders() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(orderActions.getOrders());
	}, []);

	const orders = useSelector((state) => state.order.orders);

	const navCreateOrderClick = async (newOrder) => {
		dispatch(orderActions.createOrder(newOrder, orderActions.getOrders()));
	};
	const navUpdateOrderClick = (orderId, updatedOrder) => {
		dispatch(
			orderActions.updateOrder(
				orderId,
				updatedOrder,
				orderActions.getOrders()
			)
		);
	};
	const navDeleteOrderClick = (oldOrder) => {
		dispatch(orderActions.deleteOrder(oldOrder, orderActions.getOrders()));
	};

	const tableDeleteButtonClick = (oldOrder) => {
		dispatch(orderActions.deleteOrder(oldOrder.id, orderActions.getOrders()));
	};

	return (
		<div className="">
			<Header title={"Orders"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={orders}
					//// Table Content
					// Table Headings
					tableHead={"UserId"}
					tableHead2={"ProductId"}
					tableHead3={"SellerId"}
					tableHead4={"Status"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"userId"}
					tableData2={"productId"}
					tableData3={"sellerId"}
					tableData4={"orderStatus"}
					// Special
					isAdmin={true}
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Order"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateOrderClick}
					navUpdateButtonClick={navUpdateOrderClick}
					navDeleteButtonClick={navDeleteOrderClick}
				/>
			</div>
		</div>
	);
}

export default AdminOrders;
