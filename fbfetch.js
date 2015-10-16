var userId = "";
		var albumIds = [];
		var photoIds =  [];
		var photoSources = [];
		var counter = 0;
		maxImg = 50;
		var accessToken = '';
		document.getElementById("dJ").disabled = true;
		//---------------------------------------------------------------------------
		// Set up a call to FBs Graph API		
		function disPlayImages(){	
			if(myUserID.value != "" && myAccessToken.value != ""){ 
				var foo = document.getElementById("kargoeBlock");
				if (foo.hasChildNodes()) {foo.removeChild(foo.childNodes[0]);}
				userId = document.getElementById('myUserID').value;
				accessToken = document.getElementById('myAccessToken').value;
				maxImg = parseInt(document.getElementById('maxPix').value);
				getAlbums();
			}else{
				alert("Would you please enter some data?")
			}
			this.jsn = false;
		}
		// Diplay JSON with image URLs.
		function disPlayJSON(){			
			this.jsn = true;
			displayInstaBlocks();
		}		
		//-----------------------------------------------------------------------------
		// Call FB Graph API to retrieve users public album IDs 
		function getAlbums(){
		if(maxImg === 0){alert("You cant load zero pictures!! Please input a number betweeb 1 and 100.");return;}
		document.getElementById("dI").disabled = true;
			$.getJSON("https://graph.facebook.com/v2.5/" + userId + "/albums?fields=id&access_token=" + accessToken,
			function(response){ 			
				var result = JSON.parse(JSON.stringify(response));
				$.each(result.data, function(index, value) {albumIds.push(result.data[index].id);})
				getPhotoIds();
			});
		}
		//--------------------------------------------------------------------------------------------------------------
		// Call FB Graph API to retrieve each albums Photo IDs		
		function getPhotoIds(){
			$.when($.getJSON("https://graph.facebook.com/v2.5/" + albumIds[counter] + "/photos?&access_token=" + accessToken)).then(function(response){ 			
			var result = JSON.parse(JSON.stringify(response));
				for (var i = 0; i < result.data.length; i++){photoIds.push(result.data[i].id);}
				counter++;
				if(counter < albumIds.length){getPhotoIds();}else{counter=0;getImagesSources();}
			});			
		 }
		 //--------------------------------------------------------------------------------------------------------------
		 // Call FB Graph API to retrieve each photos URL
		function getImagesSources(){
			$.when($.getJSON("https://graph.facebook.com/v2.4/" + photoIds[counter] + "?fields=images&access_token=" + accessToken)).then(function(response){
			var result = JSON.parse(JSON.stringify(response));
			for (var i = 0; i < result.images.length; i++){
				//retrieve all photos with height <= 400 px and height >= 300 px. Could be edited to include more sizes
				if(result.images[i].height <= 400 && result.images[i].height >= 300){photoSources.push(result.images[i].source);}}					
				counter++;				
				if(counter > maxImg){
				console.log("photoSources.toString() and counter: " + counter + " " + photoSources.toString());displayInstaBlocks();return;}
				if(counter < photoIds.length){getImagesSources();}else{counter=0; console.log("photoSources.toString() and counter: " + counter + " " + photoSources.toString());}
			});
		}