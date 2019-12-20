const publicIp = require('public-ip');
const PropertiesReader = require('properties-reader');
const cron = require('node-cron');
const Client = require('node-rest-client').Client;

const client = new Client();
const path = __dirname.replace("main", "")
var properties = PropertiesReader(path + 'application.properties');

var currentIp = "10.0.0.1";
const botKey = properties.get('telegram.botKey');
const chatId = properties.get('telegram.chatId');
console.log(botKey + "   -   " + chatId)
var url = "https://api.telegram.org/bot"+botKey+"/sendMessage?chat_id="+chatId+"&text=";

(async () => {
	currentIp = await publicIp.v4();
	console.log("IP actual: " + currentIp)
	client.get(url + currentIp, function (data, response) {
		console.log(data);
	});
})();

cron.schedule('*/5 * * * *', () => {
	console.log("Ejecutando");
	(async () => {
		const ip = await publicIp.v4();
		if (ip != currentIp) {
			console.log("Ip cambio, nueva IP: " + ip)
			currentIp = ip;
			client.get(url+ip, function (data, response) {
				console.log(data);
			});
		} else {
			console.log("No hay cambios");
		}
	})();
});
console.log("Aplicacion lista");