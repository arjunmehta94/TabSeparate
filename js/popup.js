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

				//trying to highlight the tabs which are selected 

				// var highlightinfo = {windowId : win.id, tabs: [parseInt($(this).attr("num"))]}
				// chrome.tabs.highlight(highlightinfo);
			}
			else{
				$(this).prop("checked", false);
				$(this).removeClass("bg-success");
			}
			
		});
		
		$("#btn-separate").on('click', separate); // if separate is clicked
		$("#btn-close").on('click', close); // if closed is clicked
		
	});
});

function returnFormElement(tab, i){
	var img = "<img class = 'favIconUrl' src=" + tab.favIconUrl.toString() + "></img>"
	var item = $("<div>" + img + " " + tab.title + "</div>")
			.attr("name", tab.title) 
			.attr("id", tab.id)
			.attr("url", tab.url)
			.attr("num", i)
			.prop("checked", false)
			.attr("class", "tabs")
			.val(tab.title);
	return item;
}

function separate(){
	var selectedId = [];
	
	$(".tabs").each(function(){
		if($(this).prop("checked")){
			selectedId.push(parseInt($(this).attr("id")));
		}
	});
	if(selectedId.length > 0){
		
		chrome.windows.create({type: 'normal', focused:false}, function(win){
			var winId = $.cookie("winId").toString();
			winId += win.id.toString() + " ";
			$.cookie("winId", winId);
			var winId = $.cookie("winId");
			var result = winId.split(" ");
			result.splice(result.length - 1, 1);
			var x = parseInt(result[result.length - 1]);
			chrome.tabs.move(selectedId, {"windowId":x, "index":-1});
			chrome.tabs.getAllInWindow(x, function(tabs){
				chrome.tabs.remove(tabs[0].id);
			});
		}); 
		$("#activeTabs").empty();
		// trying to update UI dynamically when separated
		chrome.windows.getCurrent(function(win){
			chrome.tabs.getAllInWindow(win.id, function(tabs){
				updateUI(tabs, win.id);
			})
		});
	}
	
	
}

function close(){
	var selectedId = [];

	$(".tabs").each(function(){
		if($(this).prop("checked")){
			selectedId.push(parseInt($(this).attr("id"))); 
		}
	});
	if (selectedId.length > 0){
		chrome.tabs.remove(selectedId);
		$("#activeTabs").empty();

		// trying to update UI dynamically when separated
		chrome.windows.getCurrent(function(win){
			chrome.tabs.getAllInWindow(win.id, function(tabs){
				updateUI(tabs, win.id);
			})
		});
	}
	
	
	// trying to update UI dynamically when closed 

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