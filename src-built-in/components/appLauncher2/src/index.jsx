import "../style.css"
import "../../../../assets/css/font-finance.css"
import "../../../../assets/css/finsemble.css"
// Import js modules
import React from  'react'
import ReactDOM from  'react-dom'
import {createStore, getStore} from './stores/LauncherStore'
import storeActions from './stores/StoreActions'

// Import React components
import LeftNav from './components/LeftNav'
import Content from './components/Content'
import { FinsembleMenu } from '@chartiq/finsemble-react-controls';

class AppLauncher extends React.Component {

	constructor(props) {
		super(props);
		this.finWindow = fin.desktop.Window.getCurrent();
		this.openAppMarket = this.openAppMarket.bind(this);
	}

	componentWillMount() {
		this.finWindow.addEventListener('shown', () => {
			this.finWindow.focus();
		});
	}

	openAppMarket() {
		FSBL.Clients.LauncherClient.showWindow(
			{
				componentType: "App Market"
			},
			{
				monitor: "mine",
				staggerPixels: 0,
				spawnIfNotFound: true,
				left: "center",
				top: "center"
			}
		)
	}

	render() {
		return (
			<FinsembleMenu className="app-launcher-menu">
				<div className="app-launcher">
					<div className="complex-menu-wrapper">
						<LeftNav openAppMarket={this.openAppMarket} />
						<Content />
					</div>
				</div>
			</FinsembleMenu>
		)
	}
}

fin.desktop.main(function () {
	FSBL.addEventListener("onReady", function () {
		createStore((store) => {
			storeActions.initialize(() => {
				ReactDOM.render(<AppLauncher />, 
					document.getElementById("wrapper"))
			})
		});
	});
});