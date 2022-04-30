const moment = require("moment");
process.on('unhandledRejection',async error => {
	if (error) {
        console.log(error.name + error.path || "?")
	console.log(error.message+ "\n\n")
	console.log(error.stack.slice(0,600) || "пусто")
		console.log(moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss'))
	}
});