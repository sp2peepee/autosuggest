import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import CONSTANTS from '../common/constants';
import { formApiData } from '../common/utilities';

export default class AutoSuggest extends React.Component {

	constructor ( props ) {
		super( props );
		this.state = {
			backspaceRemoves : true,
			multi            : true,
			limit            : props.limit,
			offset           : props.offset,
			toggleCache      : false
		};

		this.onChange       = this._onChange.bind( this );
		this.switchToMulti  = this._switchToMulti.bind( this );
		this.switchToSingle = this._switchToSingle.bind( this );
		this.getUsers       = this._getUsers.bind( this );
		this.gotoUser       = this._gotoUser.bind( this );
		this.onLimitChange  = this._onLimitChange.bind( this );
		this.onOffsetChange = this._onOffsetChange.bind( this );
	};

	_onChange ( value ) {
		this.setState( {
			value : value
		} );

		let values = ( this.state.multi ? value[ value.length - 1 ] : value ) || {};

		this._gotoUser( values );
	};

	_onLimitChange ( event ) {
		this.setState( {
			limit       : event.target.value,
			toggleCache : !this.state.toggleCache
		} );
	}

	_onOffsetChange ( event ) {
		this.setState( {
			offset : event.target.value,
			toggleCache : !this.state.toggleCache
		} );
	}

	_switchToMulti () {
		this.setState( {
			multi : true,
			value : [ this.state.value ]
		} );
	};

	_switchToSingle () {
		this.setState( {
			multi : false,
			value : this.state.value ? this.state.value[ 0 ] : null
		} );
		this._gotoUser( this.state.value[ 0 ] );
	};

	_getUsers ( input ) {
		if ( !input ) {
			return Promise.resolve( { options : [] } );
		}

		let state  = this.state;
		let offset = state.offset ? `&${CONSTANTS.OFFSET}=${state.offset}` : '';
		let limit  = state.limit ? `&${CONSTANTS.LIMIT}=${state.limit}` : '';
		let apiUrl = `${this.props.apiBase}${input}${offset}${limit}`;

		return fetch( apiUrl )
			.then( ( response ) => response.json() )
			.then( ( res ) => {
				return { options : formApiData( res.results ) };
			} );
	};

	_gotoUser ( value ) {
		this.setState( {
			capital : value.capital,
			country : value.country
		} );
	};

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{ this.props.label }</h3>
				<Select.Async multi={ this.state.multi } value={ this.state.value } onChange={ this.onChange }
											onValueClick={ this.gotoUser } valueKey="id" labelKey="value" loadOptions={ this.getUsers }
											backspaceRemoves={ true } toggleCache={ this.state.toggleCache }/>
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={ this.state.multi }
									 onChange={ this.switchToMulti }/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={ !this.state.multi }
									 onChange={ this.switchToSingle }/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
				<div className="more-options">
					<input type="number" className="Select-control" placeholder="Offset" onChange={ this.onOffsetChange }/>
					<input type="number" className="Select-control" placeholder="Limit" onChange={ this.onLimitChange }/>
				</div>
				{ this.state.capital && <div className="results">
					<p><b> Capital </b> { this.state.capital } </p>
					<p><b> Country </b> { this.state.country } </p>
				</div> }
				<div className="hint">This example uses fetch.js for showing Async options with Promises</div>
			</div>
		);
	}

}

