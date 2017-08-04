# aws-cognitoOnLambda
JavaScript code examples for running AWS Cognito on AWS Lambda.

I started this after struggling through the AWS documentation and examples, which were just confusing and doesn't say much.

Why run Cognito on Lambda?
--------------------------

I did this in my application because I didn't want to put the UserPoolId and ClientId in the HTML or JavaScript that goes to the front end. I alsso wasn't keen on including the Cognito js libraries in my project, since it would add to page load time. Running a server for this wasn't an option either, hence, stick it on Lambda.

Once it's on Lambda you can call the function through something like API Gateway. You'll have to create an API and just hit the endpoint from an HTML form submit action or ajax call.

Setup
-----

You'll need a working node.js local environment, or at the very least npm installed.

To install the necessary packages run: (Done in localSetup.sh script)

    $ npm install aws-sdk
    $ npm install amazon-cognito-identity-js

This will install the required packages to be imported into the functions.


Deploy to Lambda
-----------------

To deploy your functions to Lambda you'll have to build locally and create a .zip file that you can upload.

Be sure to only zip the contents you want to upload. I.e. the node_modules folder and the .js file. On MacOS or Linux you can run the following from within the working directory:

    zip -r function.zip .

or

    zip -r ../function.zip *

where "function" is the name of your function. Can be anything.

If you're on MacOs you can simply select both the node_modules folder and .js file that you want to upload, right click, and choose "Compress 2 items".

**Small gotcha**

You'll see that the files are named according to what they actually do, e.g. userLogin.js or userSignUp.js. When specifying the 'handler' for your function on the AWS console or the CLI, be sure to use the correct file name. By default the handler will be specified as "index.handler", which means Lambda will look for a file called "index.js". If, for example, you're deploying userLogin.js, the handler should be "userLogin.handler".