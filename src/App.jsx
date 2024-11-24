import AllRoutes from "./Routes/AllRoutes"
export const SERVER_URI = "https://pricemanagment-backend.onrender.com";
const App = () => {
	return (
		<div className="max-w-screen-xl mx-auto">
			<AllRoutes />
		</div>
	)
}

export default App