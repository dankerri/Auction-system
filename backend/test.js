var dir = require('node-dir');

dir.readFiles(__dirname+'/public/user',
	function(err, content, next) {
		if (err) throw err;
		next();
},
	function(err, files){
		if(err) throw err;
		console.log('finished reading files: ', files);
})
