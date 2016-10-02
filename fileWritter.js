var fs = require("fs");

var FileWriter = function(filePath) {

	var writerStream = fs.createWriteStream(filePath);

	this.write = function(data) {
		 writerStream.write(data,'UTF8');
		 writerStream.end();
	}
}

exports.createFileWriter = function(filePath) {
	return new FileWriter(filePath);
}