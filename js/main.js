function file_reader(ev){				
	var tgt = ev.target || window.event.srcElement,
	files = tgt.files;

	// FileReader support
	if (FileReader && files && files.length) {
		loadFile(files[0]);
	}
}
function mouselog(ev){				
	//window.console.log("ev", ev.target.id);
	if (ev.type == "mouseenter")
	{
		if (ev.target.id == "upload_photo")
		{
			document.getElementById("upload_photo").style.border = "1px dashed red";
		}
		if (ev.target.id == "change_file")
		{
			document.getElementById("change_file").style.color = "red";
			document.getElementById("change_file").style.cursor = "pointer";
		}
		if (ev.target.id.includes("theme"))
		{
			document.getElementById(ev.target.id).style.cursor = "pointer";
		}
	}
	
	if (ev.type == "mouseleave")
	{
		if (ev.target.id == "upload_photo")
		{
			document.getElementById("upload_photo").style.border = "1px dashed grey";
		}
		
		if (ev.target.id == "change_file")
		{
			document.getElementById("change_file").style.color = "DarkRed";
			document.getElementById("change_file").style.cursor = "pointer";
		}
	}
	
	
}

function dropHandler(ev) {			  
  ev.preventDefault();

  if (ev.dataTransfer.items) {
	// Use DataTransferItemList interface to access the file(s)
	[...ev.dataTransfer.items].forEach((item, i) => {
	  // If dropped items aren't files, reject them
	  if (item.kind === "file") {
		const file = item.getAsFile();
		loadFile(file);
	  }
	});
  }
}
function dragOverHandler(ev) {
	//console.log("File(s) in drop zone");
	document.getElementById("upload_photo").style.border = "1px dashed red";
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
}
function dropLeaveHandler(ev) {
	//console.log("File(s) in drop zone");
	document.getElementById("upload_photo").style.border = "1px dashed grey";
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
}
function loadFile(file) {
	var fr = new FileReader();
	fr.onload = function () {
		var image = document.getElementById("img_file");
		image.src = fr.result;
		document.getElementById("upload_text").style.display = "none";
		
		
		image.onload = function () {
			var tag = document.getElementById("theme_name").innerHTML;
			var ev = {
				srcElement:{
					id: tag
				}
			};
			theme_change(ev)
		};
		
		
	}
	fr.readAsDataURL(file);
}

function theme_change(ev) {
	//window.console.log("ev", ev.srcElement.id);
	var isUpload = document.getElementById("upload_text").style.display;
	if (isUpload != "none")
	{
		return;
	}
	
	document.getElementById("theme_name").innerHTML = ev.srcElement.id;
	var image = document.getElementById("img_file");
	document.getElementById("price_zone").style.top = (((image.offsetHeight + 4) / 2)) + "px";
	document.getElementById("price_zone").style.display = "block";
	
	if (ev.srcElement.id == "theme_blur")
	{
		/* удаляем старые фильтры */
		document.getElementById("theme_zone").classList.remove('tv-static');
		document.getElementById("img_theme").style.display =  "none";
		document.getElementById("img_theme").src =  "";
		document.getElementById("theme_zone").style.display = "none";
		
		image.classList.add('blur_zone');
	}
	else if (ev.srcElement.id == "theme_color")
	{
		/* удаляем старые фильтры */
		image.classList.remove('blur_zone');
		document.getElementById("theme_zone").classList.remove('tv-static');
		document.getElementById("img_theme").style.display =  "none";
		document.getElementById("img_theme").src =  "";
		
		document.getElementById("theme_zone").style.display = "block";
		document.getElementById("theme_zone").style.width = ((image.offsetWidth != 800) ? image.offsetWidth + 1 : 800) + "px";
		document.getElementById("theme_zone").style.height = image.offsetHeight + "px";
		document.getElementById("theme_zone").style.top =  "-" + (image.offsetHeight + 4) + "px";
	}
	else if (ev.srcElement.id.includes("theme_gradient"))
	{
		/* удаляем старые фильтры */
		image.classList.remove('blur_zone');					
		document.getElementById("theme_zone").classList.remove('tv-static');
		document.getElementById("img_theme").style.display =  "none";
		document.getElementById("img_theme").src =  "";
		
		document.getElementById("theme_zone").style.display = "block";
		document.getElementById("theme_zone").style.width = ((image.offsetWidth != 800) ? image.offsetWidth + 1 : 800) + "px";
		document.getElementById("theme_zone").style.height = image.offsetHeight + "px";
		document.getElementById("theme_zone").style.top =  "-" + (image.offsetHeight + 4) + "px";
		
		document.getElementById("theme_zone").style.background = document.getElementById(ev.srcElement.id).style.background;
		document.getElementById("theme_zone").style["background-size"] = "400%";
		document.getElementById("theme_zone").style.animation = 'gradient_zone 20s linear infinite'
	}
	else if (ev.srcElement.id == "theme_noise")
	{
		/* удаляем старые фильтры */
		image.classList.remove('blur_zone');
		document.getElementById("theme_zone").style.background = "";
		document.getElementById("theme_zone").style.animation = "";
		document.getElementById("img_theme").style.display =  "none";
		document.getElementById("img_theme").src =  "";
		
		document.getElementById("theme_zone").style.display = "block";
		document.getElementById("theme_zone").style.width = ((image.offsetWidth != 800) ? image.offsetWidth + 1 : 800) + "px";
		document.getElementById("theme_zone").style.height = image.offsetHeight + "px";
		document.getElementById("theme_zone").style.top =  "-" + (image.offsetHeight + 4) + "px";
		
		document.getElementById("theme_zone").classList.add('tv-static');
	}
	else if (ev.srcElement.id == "upload_theme")
	{
		/* удаляем старые фильтры */
		image.classList.remove('blur_zone');
		document.getElementById("theme_zone").style.background = "";
		document.getElementById("theme_zone").style.animation = "";
		
		document.getElementById("theme_zone").style.display = "block";
		document.getElementById("theme_zone").style.width = ((image.offsetWidth != 800) ? image.offsetWidth + 1 : 800) + "px";
		document.getElementById("theme_zone").style.height = image.offsetHeight + "px";
		document.getElementById("theme_zone").style.top =  "-" + (image.offsetHeight + 4) + "px";
		
		document.getElementById("img_theme").style.width = ((image.offsetWidth != 800) ? image.offsetWidth + 1 : 800) + "px";
		document.getElementById("img_theme").style.height = image.offsetHeight + "px";
		document.getElementById("img_theme").style.top =  "-" + (image.offsetHeight + 4) + "px";
		
		var tgt = ev.target || window.event.srcElement,
		files = tgt.files;
		// FileReader support
		if (FileReader && files && files.length) {
			var fr = new FileReader();
				fr.onload = function () {
					document.getElementById("img_theme").style.display = "block";
					document.getElementById("img_theme").src = fr.result;
				}
				fr.readAsDataURL(files[0]);
		}
	}
	else 
	{
		image.classList.remove('blur_zone');
		document.getElementById("theme_zone").style.display = "none";
		document.getElementById("theme_zone").classList.remove('tv-static');
		document.getElementById("price_zone").style.display = "none";
		document.getElementById("img_theme").style.display =  "none";
		document.getElementById("img_theme").src =  "";
	}
	
}

function change_color(ev) {
	//document.getElementById("theme_zone").style["background-color"] = ev.target.value;
	document.getElementById("theme_zone").style.background = ev.target.value;
	start_farm();
}
function start_farm() {
	auth_donates();
	//setTimeout(() => get_donates(), 1000);
}
function auth_donates() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			window.console.log("xhr", xhr);
			window.console.log("body", xhr.responseText);
			//start_farm();
		}
	}
	xhr.open('GET', ' https://www.donationalerts.com/oauth/authorize', true);
	xhr.setRequestHeader('client_id', '14288');
	xhr.setRequestHeader('redirect_uri', 'https://urbanghosts.github.io/Secret-Banner/');
	xhr.setRequestHeader('response_type', 'zFBlc2n9zrTYX8cLonY4PtLuFQK31tVzKOhfLfWp');
	xhr.setRequestHeader('scope', 'oauth-donation-index');
	xhr.send();
}
function get_donates() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			window.console.log("xhr", xhr);
			window.console.log("body", xhr.responseText);
			//start_farm();
		}
	}
	xhr.open('GET', 'https://www.donationalerts.com/api/v1/alerts/donations', true);
	xhr.setRequestHeader('Authorization', 'Bearer fLDZzLVr3TI5T2OHbZjl');
	xhr.send();
}
