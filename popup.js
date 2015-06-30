// function list_session(callback){
// 	chrome.windows.getAll({populate:true}, function(window_list){
// 		var list = [];
// 		for(var i = 0; i<window_list.length; i++){
// 			list = list.concat(window_list[i].tabs);
// 		}
// 		//console.log(list);
// 		if(callback){
// 			callback(list);
// 		}
// 	});
// }

chrome.windows.getCurrent(function(win)
{
	chrome.tabs.getAllInWindow(win.id, function(tabs)
	{
		for (var i = 0; i<tabs.length; i++)
		{
			
			var item = $("<input type='checkbox'/>")
			.attr("name", tabs[i].title)
			.attr("value", tabs[i].url)
			.attr("id", tabs[i].title)
			.val(tabs[i].title);
			var s = "<label for=" + tabs[i].title + ">" + tabs[i].title + "</label>";
			item.appendTo("#activeTabs");
			//console.log(tabs[i].title);	
			//$("#activeTabs").after(item);
			item.after(s);	
			console.log(item.val());
		}
	});
});