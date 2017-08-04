const AWS = require('aws-sdk');
const AWSCognito = require('amazon-cognito-identity-js');
const userPoolId = '<user_pool_id>';
const clientId = '<client_id>';

/*
 *	The event param will look as follow:
 *
 *	event = {
 *		"email": "<email_address>",
 *		"password": "<password>"
 *	}
 *
 *	The keys in the event object passed to the function is user defined,
 *	so use the key names you actually pass through in your JSON data.
*/

exports.handler = function(event, context, callback) {
	var authenticationData = {
		Username : event.email,
		Password : event.password,
	};
	var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
	var poolData = {
		UserPoolId : userPoolId,
		ClientId : clientId
	};
	var userPool = new AWSCognito.CognitoUserPool(poolData);
	var userData = {
		Username : event.email,
		Pool : userPool
	};
	var cognitoUser = new AWSCognito.CognitoUser(userData);
	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: function (result) {
			callback(null, result);
		},
		onFailure: function(err) {
			callback(err);
		}
	});
}