import React from 'react'
import AppActionsMenu from './AppActionsMenu'
import AppTagsList from './AppTagsList'
import storeActions from '../stores/StoreActions'

/**
 * Used to make sure that a user is not waiting for component
 * to spawn after a double click, helps us prevent multiple
 * spawns for the same app.
 */
let pendingSpawn = false

export default class AppDefinition extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			favorites: []
		}
		this.onDragToFolder = this.onDragToFolder.bind(this)
		this.onDoubleClick = this.onDoubleClick.bind(this)
	}

	/**
	* Native HTML5 drag and drop
	**/
	onDragToFolder(event, app) {
		event.dataTransfer
			.setData('app', JSON.stringify(this.props.app))
	}
	/**
	 * Spawn a component on double click
	 */
	onDoubleClick(app) {
		if (pendingSpawn) return
		pendingSpawn = true
		FSBL.Clients.LauncherClient.spawn(app.name, {}, (error, data) => {
			pendingSpawn = false
		})
	}

	isFavorite() {
		return this.state.favorites.indexOf(this.props.app.appID) > -1
	}

	async componentWillMount() {
		const favFolder = await storeActions.getSingleFolder('Favorites')
		this.setState({
			favorites: Object.keys(favFolder.apps)
		})
	}

	render() {
		const app = this.props.app
		return (
			<div onDoubleClick={() => this.onDoubleClick(app)} className="app-item" draggable="true" onDragStart={this.onDragToFolder}>
				<span className="app-item-title">
					{app.icon !== undefined ? <i className={app.icon}></i> : null}
					{app.name} {this.isFavorite() && <i className='ff-favorite'></i>}
				</span>
				<AppTagsList tags={app.tags} />
				<AppActionsMenu app={app} folder={this.props.folder}/>
			</div>
		)
	}
}