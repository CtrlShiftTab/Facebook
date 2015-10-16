

	
	function displayInstaBlocks(){
	// JSON OUTPUT
	if(jsn){
		var json = syntaxHighlight(JSON.stringify(photoSources,undefined,4));
		var html = "<head><style>pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; } .string { color: green; } "; 
		html+= " .number { color: darkorange; } .boolean { color: blue; } .null { color: magenta; } .key { color: red; }</style></head><body>"; 
		html+= "<a href='javascript:history.go(-1)'>[Go Back]</a><br><br><pre>"+json+"</pre>"; 
		document.write(html);
		return;
	}
	//
	preload(photoSources);
	//
	var blockList = document.createElement('ul');
	for(var i = 0; i < photoSources.length; i++) {
		// List Item
		var listItem = document.createElement('li');	
		// Anchor
		var anchor = document.createElement('a');
		anchor.className += ' instaPop';
		anchor.href = "#instaPop-" + "kargoeBlock" + i.toString();
		// Hidden Inline element
		var popupContainer = document.createElement('div');
		popupContainer.id = "instaPop-" + "kargoeBlock" + i.toString();
		popupContainer.className += 'lightboxblock mfp-hide';
        //
        // Get the image
        var bigImg = document.createElement('img');
        bigImg.src = photoSources[i];
		//console.log(bigImg.src);
        //
		popupContainer.appendChild(bigImg);
		// Image
        var instaImg = document.createElement('img');
        instaImg.src = photoSources[i];
		anchor.appendChild(instaImg);
		anchor.appendChild(popupContainer);
		listItem.appendChild(anchor);
		blockList.appendChild(listItem);
	}
	document.getElementById("kargoeBlock").appendChild(blockList);
	document.getElementById("dI").disabled = false;
	document.getElementById("dJ").disabled = false;
	// When clicked, the popup appears
	$('.instaPop').magnificPopup({
		type:'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});
}



function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function preload(imageArray, index) {
		console.log("loading")
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            var img = new Image ();
            img.onload = function() {
                preload(imageArray, index + 1);				
            }
            img.src = imageArray[index];
		}
}

