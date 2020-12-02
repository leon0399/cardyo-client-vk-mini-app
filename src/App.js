import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { View, ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import { login } from './redux/actions/auth'
import Home from './panels/Home'
import Persik from './panels/Persik'

import { parseQueryString } from './helpers';

const App = (props) => {
	const {
		vkUser,
		doLogin,
	} = props

	const [activePanel, setActivePanel] = useState('home');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		const launchParams = parseQueryString(window.location.search);

		const fetchData = async () => {
			await doLogin(launchParams)

			setPopout(null)
		}

		fetchData()
	}, [ doLogin ])

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={vkUser} go={go} />
			<Persik id='persik' go={go} />
		</View>
	);
}

const mapStateToProps = (state) => ({
	vkUser: state.auth.vkUser,
	user: state.auth.user,
})

export default connect(mapStateToProps, {
	doLogin: login
})(App);

