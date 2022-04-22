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

	const navAddSellerComp = async (newSeller) => {
		dispatch(sellerActions.addSeller(newSeller));
	};
	const navUpdateSellerComp = (oldSeller, newSeller) => {
		dispatch(sellerActions.updateSeller(oldSeller, newSeller));
	};
	const navDeleteSellerComp = (oldSeller) => {
		dispatch(sellerActions.deleteSeller(oldSeller));
	};

	return (
		<div className="">
			<Header title={"Sellers"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={sellers}
					// Table Content
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
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={"Seller"}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={navAddSellerComp}
					navUpdateButtonClick={navUpdateSellerComp}
					navDeleteButtonClick={navDeleteSellerComp}
				/>
			</div>
		</div>
	);
}

export default AdminSellers;
