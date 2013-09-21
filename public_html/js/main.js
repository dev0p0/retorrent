window.addEvent('domready', function(){
	window.refresher = new Refresher();
});

Refresher = new Class({
	data: {'ajax': 1},
	initialize: function(){
		this.request = new Request.JSON({
			'url': '/',
			'method': 'POST',
			'data': this.data,
			'onError': function(){
				console.log('error');
			},
			'onSuccess': function(r){
				this.rebuildTable(r);
				setTimeout(function(){
					this.request.send();
				}.bind(this), 2000);
			}.bind(this)
		});
		setTimeout(function(){
			//this.request.send();
		}.bind(this), 2000);
	},
	rebuildTable: function(r){
		$$('#torrentTable tr.ttr').dispose();
		Object.each(r, function(l){
			var tr = new Element('tr', {
				'class': 'ttr'
			}).adopt(
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
					'valign': 'bottom',
					'html': l.status
				}),
				new Element('td').adopt(
					new Element('div', {
						'class': 'tiny',
						'align': 'center',
						'text': l.esttime
					})
				),
				new Element('td').adopt(
					new Element('div', {
						'align': 'center',
						'class': 'tpanel'
					}).adopt(
						new Element('a', {
							'href': 'details.php?torrent=' + l.entry + '&als=false',
							'events': {
								'click': function(ev){
									ev.stop();
									StartTorrent('startpop.php?torrent=' + l.entry);
								}
							}
						}).adopt(
							new Element('img', {
								'src': 'images/properties.png',
								'width': 18,
								'height': 13,
								'title': 'Torrent Details - User: ' + l.owner,
								'border': 0
							})
						)
					)
				)
			);
			if (1){
				var tp = tr.getElement('.tpanel')[0];


			}
			tr.inject($$('#torrentTable .btr')[0], 'before');
		});
	}
});









new Element('a', {
	'href': '/?alias_file=' + l.alias + '&kill=' + l.kill_id + '&kill_torrent=' + l.entry
}).adopt(
	new Element('img', {
		'src': 'images/' + (l.seed ? 'seed_on' : 'kill') + '.gif',
		'width': 16,
		'height': 16,
		'title': 'Stop Torrent',
		'border': 0
	})
),
new Element('img', {
	'src': 'images/delete_' + (l['delete'] ? l['delete'] : 'off') + '.gif',
	'width': 16,
	'height': 16,
	'border': 0
})








