import React from 'react';
import ReactDOM from 'react-dom';
import CONSTANTS from './common/constants';
import './example.less';

import AutoSearch from './components/AutoSearch';

ReactDOM.render(
	<div>
		<AutoSearch apiBase={ CONSTANTS.BASE_URL } label="Stocks Listing (API search based on TrakInvest Stocks Info)" />
	</div>,
	document.getElementById('example')
);
