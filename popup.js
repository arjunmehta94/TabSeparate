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
			.attr("url", tabs[i].url)
			.val(tabs[i].title);
			var s = "<label for=" + tabs[i].title + ">" + tabs[i].title + "</label>";
			item.appendTo("#activeTabs");
			//console.log(tabs[i].title);	
			//$("#activeTabs").after(item);
			item.after(s);	
			//console.log(item.val());
		}
	});
	$("#btn-separate").on('click', function(){
		var selected = [];
		$("#activeTabs input:checked").each(function(){
			selected.push($(this).attr('url'));
		});
		//console.log(selected[0]);
		chrome.windows.create({type: 'normal', url: selected[0]});
	});

});


//console.log(selected);

