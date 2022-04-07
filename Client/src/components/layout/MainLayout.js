import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonAction } from "../../store/actions";
import Loading from "../common/Loading";
import Navigation from "../navigation/Navigation";
import "./css/index.css";

const MainLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<Navigation />
			{common.IsLoading && <Loading />}
			{children}
		</>
	);
};

export default MainLayout;
