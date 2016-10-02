var fileReader = require("./fileReader.js");
var fileWriter = require("./fileWritter.js");
var mailSender = require("./sendMail.js");
var externalip = require("externalip");

var mailOptions = {
    from: '',
    to: '',
    subject: 'Cambio IP'
};

var reader = fileReader.createFileReader("ip.txt");
var mailer = mailSender.createMailSender('', '');

reader.registerDataListener(function(data) {
	externalip(function (err, ip) {
		if( ip != data) {
			var writer = fileWriter.createFileWriter("ip.txt");
			writer.write(ip);
			mailOptions.text = ip;
			var response = mailer.sendMail(mailOptions);
			console.log(response);
		}
	});
});

