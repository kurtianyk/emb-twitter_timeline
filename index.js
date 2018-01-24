module.exports = require('./node_modules/twitter-node-client/lib/Twitter');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var config = {
    "consumerKey": "H0lvheVqYI1dw5gf4qaT8uHWC",
    "consumerSecret": "LWV4wrVvb8n2dZPmdlQWIZ1v0zNqmodprOoXfQpMueRfWn9QoT",
    "accessToken": "955402711771566081-1DKfHJltRaeFXbZ9Owg44J6qKvoGXJa",
    "accessTokenSecret": "ZWPbmDEIotwP6Uapv4tjw6Jss4fyb2t3jEZOSu8SCifdQ"
};

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.post('/twitter/user', function (req, res) {
	var username = req.body.username;
	var data = twitter.getUserTimeline({ screen_name: username}, function(error, response, body){
		res.status(404).send({
			"error" : "User Not Found"
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
});

app.listen(port, (err) => {
  if (err) {
   return console.log(`something bad happened ${err}`);
 }
 console.log(`server is listening on ${port}`);
});
