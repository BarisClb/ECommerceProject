import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { sellerActions } from "../../store/actions/sellerActions";
import { useSelector } from "react-redux";

function AdminSellers() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(sellerActions.getSellers());
	}, []);

	const sellers = useSelector((state) => state.seller.sellers);

	const navCreateSellerClick = async (newSeller) => {
		dispatch(sellerActions.createSeller(newSeller, sellerActions.getSellers()));
	};
	const navUpdateSellerClick = (sellerId, updatedSeller) => {
		dispatch(sellerActions.updateSeller(sellerId, updatedSeller, sellerActions.getSellers()));
	};
	const navDeleteSellerClick = (oldSeller) => {
		dispatch(sellerActions.deleteSeller(oldSeller, sellerActions.getSellers()));
	};

	const tableDeleteButtonClick = (oldSeller) => {
		dispatch(sellerActions.deleteSeller(oldSeller.id, sellerActions.getSellers()));
	};

	return (
		<div className="">
			<Header title={"Sellers"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={sellers}
					//// Table Content
					// Table Headings
					tableHead={"Name"}
					tableHead2={"Username"}
					tableHead3={"EMail"}
					tableHead4={false}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"username"}
					tableData3={"eMail"}
					tableData4={false}
					// Special
					isAdmin={true}
					isSellers={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Seller"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateSellerClick}
					navUpdateButtonClick={navUpdateSellerClick}
					navDeleteButtonClick={navDeleteSellerClick}
				/>
			</div>
		</div>
	);
}

export default AdminSellers;
