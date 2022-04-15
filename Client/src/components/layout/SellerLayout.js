import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonAction } from "../../store/actions";
import MainLayout from "./MainLayout";
import "./css/index.css";
import SellerNavigation from "../navigation/SellerNavigation";

const SellerLayout = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<MainLayout>
				<SellerNavigation />
				{children}
			</MainLayout>
		</>
	);
};

export default SellerLayout;
