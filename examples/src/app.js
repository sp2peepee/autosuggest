import React from 'react';
import ReactDOM from 'react-dom';
import CONSTANTS from './common/constants';
import './example.less';

import AutoSearch from './components/AutoSearch';

ReactDOM.render(
	<div>
		<AutoSearch apiBase={ CONSTANTS.BASE_URL } label="Stocks (API based on TrakInvest stocks data)" />
	</div>,
	document.getElementById('example')
);
