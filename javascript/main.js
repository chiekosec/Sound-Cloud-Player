
var SoundCloud = {}
var Search = {}

Search.enter = function(){
	var searchBox = document.querySelector('.js-search')
	searchBox.addEventListener('keyup', function(e){
		if(e.which == 13){
			document.querySelector('.js-search-results').innerHTML = ''
			SoundCloud.getTrack(e.target.value)
		}
	});
}

Search.clickButton = function(){
	var button = document.querySelector('.js-submit')
	button.addEventListener('click', function(){
		var sBox = document.querySelector('.js-search')
		document.querySelector('.js-search-results').innerHTML = ''
		SoundCloud.getTrack(sBox.value)
	});
}

Search.enter()
Search.clickButton()

SoundCloud.init = function(){
	SC.initialize({
  		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}

SoundCloud.init()

SoundCloud.getTrack = function(input){
	SC.get('/tracks', {
	  q: input
	})
	.then(function(tracks) {	
		//console.log(tracks)
		SoundCloud.addCards(tracks)
	});
}


SoundCloud.addCards = function(mtracks){

	mtracks.forEach(function(track){

		var card = document.createElement('div')
		card.classList.add('card')

		var img_div = document.createElement('div')
		img_div.classList.add('image')

		var img = document.createElement('img')
		img.classList.add('image_img')
		img.src = track.artwork_url.replace('large', 't500x500') || 'https://picsum.photos/200'

		var content = document.createElement('div')
		content.classList.add('content')

		var header = document.createElement('div')
		header.classList.add('header')	

		var link = document.createElement('a')
		link.href = track.permalink_url
		link.target = '_blank'
		link.innerHTML = track.title

		var playlistButton = document.createElement('div')
		playlistButton.classList.add('ui', 'bottom', 'attached', 'button', 'js-button')

		var icon = document.createElement('i')
		icon.classList.add('add', 'icon')

		var span = document.createElement('span')
		span.innerHTML = 'Add to Playlist'

		// appending

		card.appendChild(img_div)
		img_div.appendChild(img)
		card.appendChild(content)
		content.appendChild(header)
		header.appendChild(link)
		card.appendChild(playlistButton)
		playlistButton.appendChild(icon)
		playlistButton.appendChild(span)

		var searchResults = document.querySelector('.search-results')
		searchResults.appendChild(card)

		playlistButton.addEventListener('click',function(){
			SoundCloud.addToPlaylist(track.permalink_url);
		});
	})
}


SoundCloud.addToPlaylist = function(trackURL){

	SC.oEmbed(trackURL, {
	  auto_play: true
	}).then(function(embed){
		var leftCol = document.querySelector('.js-playlist')

		var box = document.createElement('div')
		box.innerHTML = embed.html

		leftCol.insertBefore(box, leftCol.firstChild)

		localStorage.setItem("key", leftCol.innerHTML)
	});
}


var leftCol = document.querySelector('.js-playlist')
leftCol.innerHTML = localStorage.getItem("key")

var button = document.querySelector('.negative')
button.addEventListener('click', function(){
	document.querySelector('.col-left').innerHTML = ''
	localStorage.clear();
});