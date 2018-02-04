export const formApiData = ( results ) => {
	if ( !Array.isArray( results ) || !results.length ) {
		return [];
	}

	let formattedRes = [];
	results.forEach( ( res, i ) => {
		res.id    = `${res.exchange}_${res.companyName}`;
		res.value = `${res.exchange}, ${res.companyName}`;
		formattedRes.push( res );
	} );

	return formattedRes;
};
