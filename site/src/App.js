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
						<section>
							<h3>What data we collect</h3>
							<hr />
							<p className="bulk">
								None. No data is stored outside of the device
								itself.
								<br /> <br />
								We request the devices location within the app
								for the purpose of providing live weather in
								that area. This location data is not collected
								or stored on our servers at any time. Location
								permission is not requred to be granted for the
								app to work as intended (minus said weather
								features previously mentioned).
							</p>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
