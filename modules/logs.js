var config = { QUIET_LOG : false };
var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var log = bunyan.createLogger({
	name: 'olympic-now-moments',
	streams: [{
		level: 'debug',
		type: 'raw',
		stream: prettyStdOut
	}]
});

if (config.QUIET_LOG)
{
	for (var key in log)
	{
		var value = log[key];



		if (typeof value === "function")
		{
			log[key] = process.noop;
		}
	}
}



module.exports = log;
