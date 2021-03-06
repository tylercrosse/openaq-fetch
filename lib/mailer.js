'use strict';

var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var moment = require('moment');

/**
 * Send a failure email to the interested contacts.
 * @param {array} to A list of email address to email
 * @param {string} name Name of the source which errored
 * @param {object} error An error object containing a description in error.message
 */
exports.sendFailureEmail = function (to, name, error) {
  var now = moment().utc().format('dddd, MMMM Do YYYY, H:mm:ss z');
  var text = 'We tried to import data for ' + name + ' at ' + now + ' ' +
    'but it looks like something has gone wrong, please check your script ' +
    'and we will try again soon. The error message we received from the ' +
    'system was "' + error.message + '"';
  sendgrid.send({
    to: to,
    from: process.env.EMAIL_FROM || 'noreply@openaq.org',
    subject: 'Failed OpenAQ data import',
    text: text
  }, function (err) {
    if (err) {
      return console.error(err);
    }
  });
};
