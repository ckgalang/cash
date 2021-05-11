CURRENT_QUOTE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol="
COIN_MARKET_CAP_API_KEY = "xxxxxxxxxx"

PHONE_NUMBERS = {
  "user1": "+1234567891",
  "user2": "+1234567892"
}

CRYPTO_LIST = [
  {
    "crypto_symbol": "SHIB",
    "users": [
      // user1 SHIB
      {
        "number_of_units": 400,
        "target_price": 10000,
        "contact": PHONE_NUMBERS.user1
      },
      // user2 SHIB
      {
        "number_of_units": 420,
        "target_price": 6090,
        "contact": PHONE_NUMBERS.user2
      }
    ]
  }
]

function checkCurrentPricesOfCrypto() {
  Logger.log("Entered cryptohandler.checkCurrentPricesOfCrypto()");
  for (var curr_crypto of CRYPTO_LIST) {
    var user_list = curr_crypto.users;
    var current_price_per_coin = getCurrentPriceForCoin(curr_crypto.crypto_symbol);

    for (var user of user_list) {
      var current_value_of_investment = current_price_per_coin * user.number_of_units;
        if (current_value_of_investment >= user.target_price) {
          notification_data = {
            "crypto_symbol": curr_crypto.crypto_symbol,
            "current_value": String(current_value_of_investment),
            "target_price": String(user.target_price),
            "contact": user.contact
            }

          var response = sendSms(notification_data);
      }
    } 
  }
}

function getCurrentPriceForCoin(crypto_symbol) {
  Logger.log("Entered cryptohandler.getCurrentPriceForCoin()");
  let options = {
    "method": "get",
    "headers": {
      "X-CMC_PRO_API_KEY": COIN_MARKET_CAP_API_KEY
    }
  }

  let response = UrlFetchApp.fetch(CURRENT_QUOTE_URL + crypto_symbol, options);
  let jsonResp = JSON.parse(response);
  let currPricePerCoin = jsonResp.data[crypto_symbol].quote.USD.price

  return currPricePerCoin
}