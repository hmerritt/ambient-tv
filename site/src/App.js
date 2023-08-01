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
								1. Location
								<br />
								We request the devices location within the app
								for the purpose of providing live weather in
								that area. This location data is not collected
								or stored on our servers at any time. Location
								permission is not requred to be granted for the
								app to work as intended (minus said weather
								features previously mentioned).
								<br /> <br />
								2. Anonymised app usage
								<br />
								Anonymised app usage data may be collected. This is
								non-personal telemetry data used for analytics
								and performance purposes only.
							</p>
						</section>
						<section>
							<h3>Device permissions</h3>
							<hr />
							<p className="bulk">
								1. INTERNET
								<br /> <br />
								2. READ_EXTERNAL_STORAGE
								<br /> <br />
								2. WRITE_EXTERNAL_STORAGE
								<br /> <br />
								3. ACCESS_FINE_LOCATION
								<br /> <br />
								4. ACCESS_COARSE_LOCATION
								<br /> <br />
								5. FOREGROUND_SERVICE
								<br /> <br />
								6. SYSTEM_ALERT_WINDOW
								<br /> <br />
								7. VIBRATE
								<br /> <br />
							</p>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
