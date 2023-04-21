
var rect_tool = {
	build : function( params ){
		if( params.points.length < 2){
			return [];
		}
		
		new_rect = { 
			x: Math.floor( params.points[0].x), 
			y: Math.floor( params.points[0].y),
			w: Math.floor( params.points[1].x),
			h: Math.floor( params.points[1].y),
			color: params.color,
			label: params.label
		};
			
		if(new_rect.w < new_rect.x){
			tmp = new_rect.w
			new_rect.w = new_rect.x
			new_rect.x = tmp
		}
		if(new_rect.h < new_rect.y){
			tmp = new_rect.h
			new_rect.h = new_rect.y
			new_rect.y = tmp
		}
		
		return [new_rect]
	},
	
	apply : function( params ){
		rects = rects.concat( this.build( params ) ); 
	}
}