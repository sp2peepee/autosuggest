export const formApiData = ( results ) => {
	if ( !Array.isArray( results ) || !results.length ) {
		return [];
	}

	let formattedRes = [];
	results.forEach( ( res, i ) => {
		res.id    = `${res.country}_${res.capital}`;
		res.value = `${res.capital}, ${res.country}`;
		formattedRes.push( res );
	} );

	return formattedRes;
};
