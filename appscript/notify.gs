// This function sends an SMS to a given phone number.
// The inputs are: 
//   notification_model - The JSON Structure as such: 
//      {
//        "crypto_symbol": "SHIB",
//        "current_value": "10000",
//        "target_price": "5000"
//        "contact": "+17132810000"
//      }
//
// The message will look something like this: 
// “Your {crypto_symbol} is valued at ${current_value}. Your target price is ${target_price}.”
//

TWILIO_SID = "xxxxxx"
TWILIO_AUTH_TOKEN = "xxxxxx"
TWILIO_NUMBER = "xxxxxx"

function sendSms(notification_model) {
  Logger.log("Entered notify.sendSms()");

  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/" + TWILIO_SID + "/Messages.json";
  var body = ("Your " + notification_model.crypto_symbol + 
              " is valued at $" + notification_model.current_value + 
              ". Your target price is $" + notification_model.target_price + ".");

  var payload = {
    "To": notification_model.contact,
    "Body" : body,
    "From" : TWILIO_NUMBER
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };

  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode(TWILIO_SID + ":" + TWILIO_AUTH_TOKEN)
  };

  var response = UrlFetchApp.fetch(messages_url, options);
}