
chrome.windows.getCurrent(function(win)
{
	chrome.tabs.getAllInWindow(win.id, function(tabs)
	{
		//console.log(tabs);
		obj = {}; // title, tabId dictionary
		// for (var i = 0; i<tabs.length; i++)
		// {
		// 	obj[tabs[i].title + i.toString()] = tabs[i].id; 
		// 	var item = returnFormElement(tabs[i], i);
		// 	var s = generateLabelForFormElement(tabs[i]); // create label item for text
		// 	item.appendTo("#activeTabs"); // append form element
		// 	//item.after(s);	// append label
			
		// }
		updateUI(tabs, obj);
		$("#activeTabs").children().on('click', function(){
			if(!$(this).prop("checked")){
				$(this).prop("checked", true);
				$(this).addClass("bg-success");
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
// console.log(selectedId);

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

function generateLabelForFormElement(tab){
	var s = "<label for=" + tab.title + ">" + tab.title + "</label></br>";
	return s;
}

function separate(){
	var selected = [];
	var selectedId = [];
	// $("#activeTabs input:checked").each(function(){ // separate tabs which are selected if button clicked
	// 	selected.push($(this).attr("url")); 
	// 	selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]); 
	// });
	$(".tabs").each(function(){
		if($(this).prop("checked")){
			selected.push($(this).attr("url")); 
			selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]);
		}
	});
	if(selected.length > 0){
		chrome.windows.create({type: 'normal', url: selected}); // put selected tabs in new window
		chrome.tabs.remove(selectedId); // delete selected tabs from current window
	}
	//updateUI(tabs, obj);
}

function close(){
	var selectedId = [];
	// $("#activeTabs").children("checked").each(function(){ // separate tabs which are selected if button clicked 
	// 	selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]);	
	// });
	$(".tabs").each(function(){
		if($(this).prop("checked")){
			selectedId.push(obj[$(this).attr("name") + $(this).attr("num")]);
		}
	});
	chrome.tabs.remove(selectedId);
	//updateUI(tabs, obj);
}

function updateUI(tabs, obj){
	//$(".tabs").emtpy();
	for (var i = 0; i<tabs.length; i++)
		{
			obj[tabs[i].title + i.toString()] = tabs[i].id; 
			var item = returnFormElement(tabs[i], i);
			var s = generateLabelForFormElement(tabs[i]); // create label item for text
			item.appendTo("#activeTabs"); // append form element
			//item.after(s);	// append label
			
		}
}