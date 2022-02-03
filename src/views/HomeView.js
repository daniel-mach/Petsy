import Header from "../components/Header/Header";
import CategoryListBar from "../components/Header/CategoryListBar/CategoryListBar";

const HomeView = (props) => {
	return (
		<div>
			HomeView
			<Header currentUser={props.currentUser} />
			<CategoryListBar />
		</div>
	);
};

export default HomeView;
