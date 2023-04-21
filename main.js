
// model
var rects = []
var selected_rects = []

// tool input points
input = {
	points: [],
	scroll_pressed: false,
	tool_pressed: false
}


function update_cursor_position( x, y){
	cursor_position.x = x;
	cursor_position.y = y;
	document.querySelector("#cursor_position").innerText = "" + x + ", " + y
}


document.addEventListener("DOMContentLoaded", ()=>{
    // const text_area = document.querySelector("#edit_text");
    // text_area.addEventListener("input", () =>{
        // document.title = "*" + file.name;      
    // });
	update_cursor_position( 0,0 )

    let file_in = document.querySelector("#file_open");
    let save_file = document.querySelector("#save_file");
	let view = document.querySelector("#view");
	context = view.getContext("2d");
	context.font = "12px lucida console";
	// fixes blurry pixels. Only God knows why
	context.translate(-0.5,-0.5);

	// let custom_tools_list = builtins + load_saved_custom_tools()
	let mode = {}
	build_toolbar( mode );
	
	view.addEventListener("mousedown", (event)=>{
		input.points = [ screen_to_world( cursor_position ), screen_to_world( cursor_position ) ]
		if( event.button == 1 ){
			input.scroll_pressed = true
		} 
		else if( event.button == 0 ){
			input.tool_pressed = true;
		}
		refresh_view( mode );
	});
	
	view.addEventListener("mouseup", (event)=>{
		if(event.button == 0 && input.tool_pressed){
			mode.tool.apply( union( mode, input ) )
		}
		
		input.tool_pressed = false;
		if(input.scroll_pressed){
			view_position.x = Math.floor(view_position.x);
			view_position.y = Math.floor(view_position.y);
		}
		input.scroll_pressed = false;
		
		refresh_view( mode );
	});
	
	view.addEventListener("mousemove", (event)=>{
		const rect = view.getBoundingClientRect();
		update_cursor_position( event.pageX - rect.left, event.pageY - rect.top )
		if(input.tool_pressed){
			input.points[1] = screen_to_world( cursor_position );
			refresh_view( mode );
		}
		let view_zoom = 2 ** view_zoom_level;
		if(input.scroll_pressed){
			view_position.x -= event.movementX * view_zoom;
			view_position.y -= event.movementY * view_zoom;
			refresh_view( mode );
		}
	});
	
	view.addEventListener("wheel", (event)=>{
		if(event.shiftKey){
			if(event.deltaY > 0){
				view_zoom_level += 1;
			}
			if(event.deltaY < 0){
				view_zoom_level -= 1;
			}
			refresh_view( mode );
		}
	});


	refresh_view( mode );

    document.title = "level editor";

    file = {
        new : true,
        name : "new-level",
        type : ""
    }

    save_file?.addEventListener("click", ()=>{
		var file_data = "insert into walls values "
		for( rect of rects ){
			file_data += "(1, " + rect.x + ", " + rect.y + ", " + rect.w + ", " + rect.h + "),";
		}
		
		var save_file = new Blob([file_data], {type:"text/plain"});
        var link = document.createElement("a");
        var url = URL.createObjectURL( save_file );
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        setTimeout(_=>{
            document.body.removeChild(link);
            window.URL.revokeObjectURL( url );
        }, 0);
        file.new = false;
        document.title = file.name;
    });

    file_in?.addEventListener("change", () => {
        // const [open_file] = file_in.files;
        // file.name = open_file.name;
        // document.title = file.name;
        // if(open_file){
            // const reader = new FileReader();
            // reader.addEventListener("load", ()=>{
                // text_area.value = reader.result;
            // });
            // reader.readAsText(open_file);
            // file_in.files = [];
        // }
    });

	use_custom_animated_css();
});