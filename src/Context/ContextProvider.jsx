import { createContext, useState } from "react"

export const ContextProviderApp = createContext();
const ContextProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(!localStorage.getItem("token") ? false : true);
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(localStorage.getItem("token") ? JSON.parse(localStorage.getItem("user")) : null);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [search, setSearch] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [allProduct, setAllProduct] = useState([]);
	const [categoryName, setCategoryName] = useState([])
	const [brandNames, setBrandNames] = useState([]);
	return (
		<ContextProviderApp.Provider value={{ isAuth, setIsAuth, token, setToken, user, setUser, openAddForm, setOpenAddForm, search, setSearch, brand, setBrand, category, setCategory, allProduct, setAllProduct, brandNames, setBrandNames, categoryName, setCategoryName }}>
			{children}
		</ContextProviderApp.Provider>
	)
}

export default ContextProvider
