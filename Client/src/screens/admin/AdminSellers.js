import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { sellerActions } from "../../store/actions/sellerActions";
import { useSelector } from "react-redux";

function AdminSellers() {
	const dispatch = useDispatch();

	// Table Data
	const sellers = useSelector((state) => state.seller.sellers);
	useEffect(() => {
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(sellerActions.getSortedSellers(sortInfo));
	}, []);

	// Nav Form Actions
	const navCreateSellerClick = async (newSeller) => {
		dispatch(sellerActions.createSeller(newSeller, sellerActions.getSortedSellers(sortInfo)));
	};
	const navUpdateSellerClick = (sellerId, updatedSeller) => {
		dispatch(
			sellerActions.updateSeller(
				sellerId,
				updatedSeller,
				sellerActions.getSortedSellers(sortInfo)
			)
		);
	};
	const navDeleteSellerClick = (oldSeller) => {
		dispatch(sellerActions.deleteSeller(oldSeller, sellerActions.getSortedSellers(sortInfo)));
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldSeller) => {
		dispatch(sellerActions.deleteSeller(oldSeller.id, sellerActions.getSortedSellers(sortInfo)));
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(sellerActions.getSortedSellers(sortInfo));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: false,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

	return (
		<div id="admin-seller-screen-wrapper">
			<Header title={"Sellers"} />
			<div id="admin-seller-table-wrapper" className="container-fluid">
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
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Name"}
					tableSortBy3={"Username"}
					tableSortBy4={"EMail"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default AdminSellers;
