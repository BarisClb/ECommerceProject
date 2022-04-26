import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonAction } from "../../store/actions";
import Loading from "../common/Loading";
import MainNavigation from "../navigation/MainNavigation";
import "./css/index.css";

const MainLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<MainNavigation />
			{common.IsLoading && <Loading />}
			{children}
		</>
	);
};

export default MainLayout;
