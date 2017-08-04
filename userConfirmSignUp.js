const AWS = require('aws-sdk');
const AWSCognito = require('amazon-cognito-identity-js');
const userPoolId = '<user_pool_id>';
const clientId = '<client_id>';

/*
 *	The event param will look as follow:
 *
 *	event = {
 *		"email": "<email_address>",
 *		"confirmationCode": "<confirmation_code>"
 *	}
 *
 *	The keys in the event object passed to the function is user defined,
 *	so use the key names you actually pass through in your JSON data.
*/
exports.handler = function(event, context, callback) {
	var poolData = {
		UserPoolId : userPoolId,
		ClientId : clientId
	};

	var userPool = new AWSCognito.CognitoUserPool(poolData);
	var userData = {
		Username : event.email,	// I specified email to be used as username, specify 'Username' according to your setup.
		Pool : userPool
	};

	var cognitoUser = new AWSCognito.CognitoUser(userData);
	cognitoUser.confirmRegistration(event.confirmationCode, true, function(err, result) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, result);
	});
}