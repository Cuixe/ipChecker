var fs = require("fs");

var FileReader = function(file) {
	
	var reader = fs.createReadStream(file);

	this.registerEventListener = function(event, listener) {
		reader.on(event, listener);
	}

	this.registerErrorListener = function(listener) {
		this.registerEventListener('error', listener);
	}

	this.registerDataListener = function(listener) {
		this.registerEventListener('data', listener);
	}

	this.registerEndListener = function(listener) {
		this.registerEventListener('end', listener);
	}

	this.registerFinishListener = function(listener) {
		this.registerEventListener('finish', listener);
	}
}

exports.createFileReader = function(filePath) {
	return new FileReader(filePath);
}