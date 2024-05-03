// ==UserScript==
// @name         Paws
// @namespace    http://tombenner.co/
// @version      0.0.1
// @description  Keyboard shortcuts for the AWS Console
// @author       Tom Benner
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// @require https://code.jquery.com/jquery-1.11.3.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.js
// @require https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js
// ==/UserScript==

$.noConflict();

var Paws = {};

Paws.App = (function () {
    var self = this;

    self.commandsCallbacks = {
        //Home
        'home': {href: '/console'},
        // Services
        'ct': {href: '/cloudtrail/home#/events'},
        'ecé': {href: '/ec2/v2/home#Instances'},
      	// Region redirect issue on "iam"
        'iam': {href: '/iam/home'},
        'r("': {href: '/route53/home#hosted-zones:'},
        'rds': {href: '/rds/home#dbinstances:'},
        'red': {href: '/redshift/home#serverless-dashboard'},
        'ddb': {href: '/dynamodbv2/home#tables'},
        's"': {href: '/s3/home'},
        'ssm': {href: '/systems-manager/parameters/'},
        'sec': {href: '/secretsmanager/listsecrets'},
        'gw': {href: '/apigateway/main/apis'},
        'sqs': {href: '/sqs/home'},
        'sns': {href: '/sns/home#/topics'},
        'stf': {href: '/states/home#/statemachines'},
        'vpc': {href: '/vpc/home'},
        'cfn': {href: '/cloudformation/home'},
        'cfr': {href: '/cloudfront/home#/distributions'},
        'ff': {href: '/lakeformation/home#databases'},
        'glu': {href: '/glue/home#/v2/data-catalog/databases'},
        'ath': {href: '/athena/home#/query-editor'},
        'da': {href: '/lambda/home'},
        'bat': {href: '/batch/home#jobs'},
      	'ecr': {href: '/ecr/private-registry/repositories'},
      	'emr': {href: '/emr/home#/clusters'},
       	'ecs': {href: '/ecs/v2/clusters'}
    };

    self.init = function () {
        self.initCommands();
        self.log('Initialized');
    };

    self.initCommands = function () {
        _.each(self.commandsCallbacks, function (value, key) {
            var command = key;
            command = command.split('').join(' ');
            var callback;
            if (value['href']) {
                callback = function () {
                    self.log('Redirecting to ' + value['href']);
                    window.location.href = value['href'];
                };
            } else {
                self.log('Invalid callback');
            }
            Mousetrap.bind(command, function () {
                callback();
                return false;
            });
        });
    };

    self.log = function (message) {
        console.log('Paws: ' + message);
    };

    self.init();

    return self;
});

new Paws.App();
