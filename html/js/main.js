window.addEvent('domready', function(){
	window.refresher = new Refresher();
});

Refresher = new Class({
	data: {'ajax': 1},
	initialize: function(){
		this.request = new Request.JSON({
			'url': '/index.php',
			'method': 'POST',
			'data': this.data,
			'onError': function(){
				console.log('error');
			},
			'onSuccess': function(r){
				this.rebuildTable(r);
			}.bind(this)
		});
		this.timer = setTimeout(function(){
			//this.request.send();
		}.bind(this), 2000);
	},
	rebuildTable: function(r){
		var last = ($$('#torrentTable tbody > tr').length - 2);
		$$('#torrentTable tr.ttr').dispose();
		Object.each(r, function(l){
			var tr = new Element('tr').adopt(
				new Element('td', {
					'class': 'tiny',
					'with': 420
				}).adopt(
					new Element('img', {
						'src': '/images/' + l.image,
						'width': 16,
						'height': 16,
						'title': l.title + l.entry,
						'border': 0,
						'align': 'absmiddle'
					}),
					new Element('a', {
						'href': 'maketorrent.php?download=' + l.entry
					}).adopt(
						new Element('img', {
							'src': 'images/down.gif',
							'width': 9,
							'height': 9,
							'title': 'Download torrent file',
							'border': 0,
							'align': 'absmiddle'
						})
					),
					new Element('span', {
						'text': ' ' + l.displayname
					})
				),
				new Element('td', {'align': 'right'}).adopt(
					new Element('font', {
						'class': 'tiny',
						'html': l.size
					})
				),
				new Element('td', {'align': 'center'}).adopt(
					new Element('a', {
						'href': 'message.php?to_user=' + l.owner
					}).adopt(
						new Element('font', {
							'class': 'tiny',
							'text': l.owner
						})
					)
				),
				new Element('td', {
					'html': l.status
				}),
				new Element('td'),
				new Element('td')
			);
			tr.inject($$('#torrentTable tbody')[0]);
		});
	}
});