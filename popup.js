
chrome.windows.getCurrent(function(win)
{
	chrome.tabs.getAllInWindow(win.id, function(tabs)
	{
		//console.log(tabs);
		obj = {}; // title, tabId dictionary
		for (var i = 0; i<tabs.length; i++)
		{
			obj[tabs[i].title + i.toString()] = tabs[i].id; 
			var item = returnFormElement(tabs[i], i);
			var s = generateLabelForFormElement(tabs[i]); // create label item for text
			item.appendTo("#activeTabs"); // append form element
			item.after(s);	// append label
			
		}
		$("#btn-separate").on('click', separate); // if separate is clicked

		
		$("#btn-close").on('click', close);
			// var selectedId = [];
			// $("#activeTabs input:checked").each(function(){ // separate tabs which are selected if button clicked 
			// 	selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]);	
			// });
			// chrome.tabs.remove(selectedId);

		
	});
	

});


function returnFormElement(tab, i){
	var item = $("<input type='checkbox'/>")
			.attr("name", tab.title) // store form element, input type as a checkbox
			.attr("id", tab.id)
			.attr("url", tab.url)
			.attr("num", i)
			.val(tab.title);
	return item;
}

function generateLabelForFormElement(tab){
	var s = "<label for=" + tab.title + ">" + tab.title + "</label></br>";
	return s;
}

function separate(){
	var selected = [];
	var selectedId = [];
	$("#activeTabs input:checked").each(function(){ // separate tabs which are selected if button clicked
		selected.push($(this).attr("url")); 
		selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]); 
	});
	if(selected.length > 0){
		chrome.windows.create({type: 'normal', url: selected}); // put selected tabs in new window
		chrome.tabs.remove(selectedId); // delete selected tabs from current window
	}
}

function close(){
	var selectedId = [];
	$("#activeTabs input:checked").each(function(){ // separate tabs which are selected if button clicked 
		selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]);	
	});
	chrome.tabs.remove(selectedId);
}