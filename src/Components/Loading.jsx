const Loading = ({ style1, style2, text }) => {
	return (
		<div className="flex items-center gap-4">
			<div className={`border-t-4 rounded-full ${style1} animate-spin`}></div>
			<p className={`${style2}`}>{text}</p>
		</div>
	)
}
export default Loading;
