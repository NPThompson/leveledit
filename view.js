// view 

var view_position = { x: 0, y: 0}
var cursor_position = { x: 0, y : 0 }
var view_zoom_level = 0;
var context; // the viewcontext from the canvas


function screen_to_world( screen_point ){
	let view_zoom = 2 ** view_zoom_level;
	return {
		x: view_zoom * screen_point.x + view_position.x,
		y: view_zoom * screen_point.y + view_position.y
	}
}

function world_to_screen( world_point ){
	let view_zoom = 2 ** view_zoom_level;
	return {
		x: (world_point.x - view_position.x) / view_zoom,
		y: (world_point.y - view_position.y) / view_zoom
	}
}


function draw_rects( rs ){
	for( rect of rs ){
		context.beginPath();

		context.lineWidth = "1";
		context.strokeStyle = rect.color;
		rect_position = world_to_screen( rect )
		rect_point2   = world_to_screen( {x: rect.w, y: rect.h })
		context.rect( rect_position.x,
				rect_position.y,
				rect_point2.x - rect_position.x,
				rect_point2.y - rect_position.y);		
		context.stroke();
		
		context.fillStyle = rect.color
		context.fillText( rect.label || "", (rect_position.x + rect_point2.x)/2, (rect_position.y +rect_point2.y)/2 )
	}
}

function refresh_view( mode ){
	// background layer
	context.beginPath();
	context.fillStyle = "rgb(15, 23, 22)";
	context.rect( 0, 0, 2000, 2000 );
	context.fill();
	
	// Content Layer
	draw_rects( rects )

	// Tool Layer
	if(input.tool_pressed){
		draw_rects( mode.tool.build( input ))
	}

}
