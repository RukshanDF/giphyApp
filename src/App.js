import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import MainLayout from './Layouts/MainLayout';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' component={MainLayout} />
			</Switch>
		</Router>
	);
}

export default App;
