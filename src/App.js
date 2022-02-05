import { Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import CategoryView from "./views/CategoryView";
import ProductView from "./views/ProductView";
import ProfileView from "./views/ProfileView";
import { useState, useEffect } from "react";
import { auth, getBusinessList } from "./utils/db";
import { businessListContext } from "./contexts/BusinessListContext";
import CategoryListBar from "./components/Header/CategoryListBar/CategoryListBar";
import Header from "./components/Header/Header";
import FilteredBusinessList from "./components/CategoryList/FilteredBusinessList";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [businessList, setBusinessList] = useState([]);
	const [category, setCategory] = useState("");
	const [city, setCity] = useState("");

	const [product, setProduct] = useState("");

	useEffect(() => {
		return auth.onAuthStateChanged(setCurrentUser);
	}, []);

	useEffect(() => {
		getBusinessList(setBusinessList);
	}, []);

	return (
		<businessListContext.Provider value={businessList}>
			<Routes>
				<Route
					path="*"
					element={
						<HomeView
							product={product}
							setProduct={setProduct}
							currentUser={currentUser}
							setCategory={setCategory}
						/>
					}
				/>
				<Route path="/category" element={<CategoryView />} />

				<Route
					path={`/product/${product.id}`}
					element={<ProductView product={product} />}
				/>
				<Route path="/profile" element={<ProfileView />} />
			</Routes>
			<Routes>
				<Route
					path="*"
					element={
						<>
							<CategoryListBar
								category={category}
								setCategory={setCategory}
							/>
						</>
					}></Route>
				<Route
					path="/profile"
					element={
						<Header currentUser={currentUser} setCity={setCity} />
					}></Route>
			</Routes>
			<FilteredBusinessList city={city} category={category} />
		</businessListContext.Provider>
	);
}

export default App;
