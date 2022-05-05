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

	const navCreateProductClick = async (newProduct) => {
		dispatch(productActions.createProduct(newProduct, productActions.getProducts()));
	};
	const navUpdateProductClick = (productId, updatedProduct) => {
		dispatch(
			productActions.updateProduct(productId, updatedProduct, productActions.getProducts())
		);
	};
	const navDeleteProductClick = (oldProduct) => {
		dispatch(productActions.deleteProduct(oldProduct, productActions.getProducts()));
	};

	const tableDeleteButtonClick = (oldProduct) => {
		dispatch(productActions.deleteProduct(oldProduct.id, productActions.getProducts()));
	};

	return (
		<div className="">
			<Header title={"Products"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={products}
					//// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Description"}
					tableHead3={"Category"}
					tableHead4={"Seller"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					tableData3={"categoryName"}
					tableData4={"sellerUsername"}
					// Special
					isAdmin={true}
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Product"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateProductClick}
					navUpdateButtonClick={navUpdateProductClick}
					navDeleteButtonClick={navDeleteProductClick}
				/>
			</div>
		</div>
	);
};

export default AdminProducts;
