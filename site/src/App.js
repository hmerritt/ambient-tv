import Logo from "./logo192.png";

const App = () => {
	return (
		<>
			<header className="app-wrapper">
				<div className="container">
					<div class="title">
						<img src={Logo} alt="logo" draggable="false" />
						<h1>Ambient TV</h1>
					</div>
				</div>
			</header>

			<div className="app-wrapper">
				<div className="container">
					<div>
						<h2>Privacy Policy</h2>
						<p className="bulk">
							Ambient TV does not store any information.
							<br /> <br />
							We request location permission only to get the
							latest weather in the users area, none of this data
							is stored.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
