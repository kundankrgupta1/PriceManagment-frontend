import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { ContextProviderApp } from "../Context/ContextProvider";

const PrivateRoutes = ({ children }) => {
	const { isAuth } = useContext(ContextProviderApp);
	return isAuth ? children : <Navigate to="/login" />
}

export default PrivateRoutes