chrome.windows.getCurrent(function(win)
{
	chrome.tabs.getAllInWindow(win.id, function(tabs)
	{
		//console.log(tabs);
		obj = {}; // title, tabId dictionary
		for (var i = 0; i<tabs.length; i++)
		{
			obj[tabs[i].title + i.toString()] = tabs[i].id; 
			var item = $("<input type='checkbox'/>")
			.attr("name", tabs[i].title) // store form element, input type as a checkbox
			.attr("value", tabs[i].url)
			.attr("id", tabs[i].id)
			.attr("url", tabs[i].url)
			.attr("num", i)
			.val(tabs[i].title);
			var s = "<label for=" + tabs[i].title + ">" + tabs[i].title + "</label></br>"; // create label item for text
			item.appendTo("#activeTabs"); // append form element
			item.after(s);	// append label
			
		}
		$("#btn-separate").on('click', function(){ // if separate is clicked
			var selected = [];
			var selectedId = [];
			$("#activeTabs input:checked").each(function(){ // separate tabs which are selected if button clicked
				selected.push($(this).attr('url')); 
				selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]); 
			});
			chrome.windows.create({type: 'normal', url: selected}); // put selected tabs in new window
			chrome.tabs.remove(selectedId); // delete selected tabs from current window
		});
		$("#btn-close").on('click', function(){
			var selectedId = [];
			$("#activeTabs input:checked").each(function(){ // separate tabs which are selected if button clicked 
				selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]);	
			});
			chrome.tabs.remove(selectedId);

		});
	});
	

});



