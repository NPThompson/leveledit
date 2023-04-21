
load_mode = null
function mode_loader( select_label, select_color, select_tool, icon, mode ){
	return function( load_it ){
		mode.tool = load_it.tool;
		mode.color = load_it.color;
		mode.label = load_it.label;
		mode.icon = load_it.icon;
		
		select_label.value = mode.label;
		select_color.style.backgroundColor = mode.color;
		icon.style.backgroundColor = mode.color;
	}
}

function default_mode(){
	return {
		tool: rect_tool,
        color: "rgb(240, 60, 40)",
        label: "",
	    icon: [ 0,0,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0,
				0,1,1,1,0,
				0,0,0,0,0 ]
	}
}

function build_toolbar( mode_ref ){
	defmode = default_mode();	

	let toolbar = document.querySelector("#toolbar");
	let icon = custom_mode_icon( defmode, defmode );
	toolbar.appendChild(icon)
	
	let select_tool = document.querySelector("#tool");
	init_tools( select_tool );
	select_tool.addEventListener("change", ()=>{
		mode_ref.tool = tool_select.value;
	});
	
	let select_color = document.querySelector("#color");
	init_colors( select_color );
	select_color.addEventListener("change", ()=>{
		mode_ref.color = select_color.value;
		icon.style.backgroundColor = mode_ref.color;
		select_color.style.backgroundColor = mode_ref.color;
	});
	
	let select_label = document.querySelector("#label");
	select_label.addEventListener("change", ()=>{
		mode_ref.label = select_label.value;
	});
	
	load_mode = mode_loader( select_label, select_color, select_tool, icon, mode_ref );
	load_mode( default_mode() );

	// wire up update logic
}



function init_tools( tool_select  ){
	append_tool = ( the_tool, tool_name )=>{
		let tool_option = document.createElement("option");
		tool_option.setAttribute("value", the_tool );
		tool_option.innerText = tool_name;
		tool_select.appendChild(tool_option);
	}
	
	append_tool( rect_tool, "rectangle" );
}

function init_colors( color_select ){
	append_color = ( color_value )=>{
		let color_option = document.createElement("option");
		color_option.setAttribute("value", color_value )
		color_option.style.backgroundColor = color_value;
		color_select.appendChild(color_option);
	}
	
	append_color( "rgb(240, 60, 40)"	);
	append_color( "rgb( 20, 200, 120)" );
	append_color( "rgb( 40, 80, 200)" );
	append_color( "rgb(240, 160, 10)" );
	append_color( "rgb(255, 255, 255)" );
	append_color( "rgb(200, 120, 20)" );
	append_color( "rgb(200, 20, 200)" );
	append_color( "rgb(80, 80, 80)" );
}

// if source_icon == null, it is an inactive icon 
// otherwise, it is a clickable icon and modifying it modifies the source icon
function custom_mode_icon( custom_mode, source_icon_element ){
    var rv = document.createElement("div");
    rv.classList.add("grid-icon");
    for(i = 0; i < 25; i++){
        let cell = document.createElement("div");
        cell.classList.add("grid-cell")
        
		if( source_icon_element != null )
			cell.addEventListener("click", ()=>{
				if(cell.classList.contains('cell-on')){
					cell.classList.remove('cell-on');
					cell.classList.add('cell-off');
				}else{
					cell.classList.remove('cell-off');
					cell.classList.add('cell-on');
				}})
			
		if( custom_mode.icon[i] ){
            cell.classList.add("cell-on")
        }else{
            cell.classList.add("cell-off")
        }
        rv.appendChild(cell);
    }
	if( source_icon_element == null ){
		rv.addEventListener("click", ()=>{
			
		});
	}
	
    return rv;
}