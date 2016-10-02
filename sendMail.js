var nodemailer = require('nodemailer');

var MailSender = function (email, password) {

	var smtpConfig = {
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // use SSL 
	    auth: {
	        user: email,
	        pass: password
	    }
	};

	var transporter = nodemailer.createTransport(smtpConfig);

	this.sendMail = function(mail) {
		var response;
		transporter.sendMail(mail, function(error, info) {
		    if(error){
		        response = error;
		    }
		    response = info;
		});
		return response;
	}
}

exports.createMailSender = function(email, password) {
	return new MailSender(email, password);
}
