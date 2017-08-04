const AWS = require('aws-sdk');
const AWSCognito = require('amazon-cognito-identity-js');
const userPoolId = '<user_pool_id>';
const clientId = '<client_id>';

/*
 *	The event param will look as follow:
 *
 *	event = {
 *		"name": "<email_address>",
 *		"password": "<password>",
 *		"email": "<email>",
 *		"birthday": "<birthday>",
 *		"locale": "<locale>"
 *	}
 *
 *	The keys in the event object passed to the function is user defined,
 *	so use the key names you actually pass through in your JSON data.
*/

exports.handler = function(event, context, callback) {
	var attr;

	var poolData = { 
		UserPoolId : userPoolId,
		ClientId : clientId
	};

	var userPool = new AWSCognito.CognitoUserPool(poolData);
	var attributeList = [];
	var attributes = [{
		Name : 'name',
		Value : event.name
	}, {
		Name : 'birthdate',
		Value : event.birthday
	}, {
		Name : 'locale',
		Value : event.locale
	}, {
		Name : 'updated_at',
		Value : '' + Math.round((new Date()).getTime() / 1000)
		//	updated_at has to be a Unix timestamp. The above gets current time.
	}];
	for(i = 0; i < attributes.length; i++) {
		attr = new AWSCognito.CognitoUserAttribute(attributes[i]);
		attributeList.push(attr);
	}

	userPool.signUp(event.email, event.password, attributeList, null, function(err, result){
		if (err) {
			callback(err);
			return;
		}
		cognitoUser = result.user;
		callback(null, cognitoUser);
	});
}