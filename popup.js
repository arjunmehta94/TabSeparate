var xval = 0;
winId = "";
$.cookie("winId", winId);
chrome.windows.getCurrent(function(win)
{
	chrome.tabs.getAllInWindow(win.id, function(tabs)
	{
		updateUI(tabs, win.id);
		$("#activeTabs").children().on('click', function(){
			if(!$(this).prop("checked")){
				$(this).prop("checked", true);
				$(this).addClass("bg-success");
				// highlightinfo = {tabs: [parseInt($(this).attr("id"))]}
				// chrome.tabs.highlight(highlightinfo);
			}
			else{
				$(this).prop("checked", false);
				$(this).removeClass("bg-success");
			}
			
		});
		
		$("#btn-separate").on('click', separate); // if separate is clicked
		$("#btn-close").on('click', close); // if closed is clicked
		//updateUI(tabs, obj);
	});
});

function returnFormElement(tab, i){
	var item = $("<div>" + (i+1).toString() + ": " + tab.title + "</div>")
			.attr("name", tab.title) // store form element, input type as a checkbox
			.attr("id", tab.id)
			.attr("url", tab.url)
			.attr("num", i)
			.prop("checked", false)
			.attr("class", "tabs")
			.val(tab.title);
	return item;
}

function separate(){
	var selected = [];
	var selectedId = [];
	
	$(".tabs").each(function(){
		if($(this).prop("checked")){
			selected.push($(this).attr("url")); 
			selectedId.push(parseInt($(this).attr("id")));
		}
	});
	if(selected.length > 0){
		
		chrome.windows.create({type: 'normal'}, function(win){
			var winId = $.cookie("winId").toString();
			winId += win.id.toString() + " ";
			$.cookie("winId", winId);
			var winId = $.cookie("winId");
			var result = winId.split(" ");
			result.splice(result.length - 1, 1);
			var x = parseInt(result[result.length - 1]);
			chrome.tabs.move(selectedId, {"windowId":x, "index":-1});
			// chrome.tabs.getAllInWindow(x, function(tabs){
			// 	chrome.tabs.remove(tabs[0].id);
			// });
		}); 
	}
	//updateUI(tabs, obj);
}
function windowId(win)
{
	console.log(win.id);
	return win.id;
}
function close(){
	var selectedId = [];

	$(".tabs").each(function(){
		if($(this).prop("checked")){
			selectedId.push(parseInt($(this).attr("id"))); 
		}
	});
	chrome.tabs.remove(selectedId);
	//updateUI(tabs, obj);
}

function updateUI(tabs, id){
	//$(".tabs").emtpy();
	var winId = $.cookie("winId");
	winId += id.toString() + " ";
	$.cookie("winId", winId);
	for (var i = 0; i<tabs.length; i++)
		{
			var item = returnFormElement(tabs[i], i);
			item.appendTo("#activeTabs"); // append form element
		}
}