
function union( ...objects ){
	rv = {}
	for( object of objects ){
		for(const [k, v] of Object.entries( object )){
			rv[k] = v
		}
	}
	return rv
}
