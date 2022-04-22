import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { productActions } from "../../store/actions/productActions";
import { useSelector } from "react-redux";

const AdminProducts = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getProducts());
	}, []);

	const products = useSelector((state) => state.product.products);

	const navAddProductComp = async (newProduct) => {
		dispatch(productActions.addProduct(newProduct));
	};
	const navUpdateProductComp = (oldProduct, newProduct) => {
		dispatch(productActions.updateProduct(oldProduct, newProduct));
	};
	const navDeleteProductComp = (oldProduct) => {
		dispatch(productActions.deleteProduct(oldProduct));
	};

	return (
		<div className="">
			<Header title={"Products"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={products}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Price"}
					tableHead3={"Stock"}
					tableHead4={"SellerId"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"price"}
					tableData3={"stock"}
					tableData4={"sellerId"}
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
					isNav={"Product"}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
				/>
			</div>
		</div>
	);
};

export default AdminProducts;
