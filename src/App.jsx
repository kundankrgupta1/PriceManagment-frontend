import AllRoutes from "./Routes/AllRoutes"
export const SERVER_URI = "http://localhost:8080";
const App = () => {
	return (
		<div className="max-w-screen-xl mx-auto">
			<AllRoutes />
		</div>
	)
}

export default App