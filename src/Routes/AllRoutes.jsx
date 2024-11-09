import { Navigate, Route, Routes } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import Home from "../Pages/Home"
import AuthForm from "../Components/Login"
import { useContext } from "react"
import { ContextProviderApp } from "../Context/ContextProvider"
import SingleProduct from "../Components/SingleProduct"

const AllRoutes = () => {
	const { isAuth } = useContext(ContextProviderApp);
	return (
		<Routes>
			<Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>} />
			<Route path="/login" element={isAuth ? <Navigate to="/" /> : <AuthForm />} />
			<Route path="/product/:id" element={<PrivateRoutes><SingleProduct /></PrivateRoutes>} />
		</Routes>
	)
}

export default AllRoutes