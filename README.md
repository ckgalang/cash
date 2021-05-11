# cash (crypto alert system handler)
This system is designed to help users track cryptocurrency prices. It uses app scripts to host the trigger and function.
 
# Features
1. A trigger runs on a schedule to run this function
2. Given a list of cryptocurrencies track their current prices using the coinmarketcap API
3. Given the amount of units owned by a user and the current cryptocurrency price, check the current value of the investment
4. Given a target price, check to see if the current value of the investment is same or higher
5. If the current value of the investment is greater than or equal to the target price, notify the user using the notification model

# Project Details
    .
    ├── appscript              # File that contains the gs scripts from https://developers.google.com/apps-script 
    │   ├── code.gs            # main file that contains main method
    │   ├── crypthandler.gs    # checks coin market cap for latest quote
    │   └── notify.gs          # uses twilio to send notifications
    └── trigger.json           # contains configuration details for trigger in app scripts
 
# Data Models
1. Trigger
    a. hour_frequency: The amount of time in hours between each job in which the trigger will run the serverless function. Example - 6
    {
		“hour_frequency”: 6
    }
2. Crypto Currency List
    a. crypto_symbol: The symbol for the cryptocurrency we’re tracking, based on the Coin Market Cap trading Symbol. Example - Shiba Inu Coin = “SHIB”, Bitcoin = “BTC”
    b. users: A list of users and their preferences
        i. number_of_units: The amount of cryptocurrency owned by the user, based on the crypto_symbol. Example - 1000
        ii. target_price: The target price in which the system will notify the user. Example - 10000
        iii. contact: The point of contact to notify the user that the target_price has been reflected in the market. Example - “713218xxxx”
	{
		[
			{
                “crypto_symbol”: “SHIB”,
                "users": [
                    {
                        “number_of_units”: 1000,
                        “target_price”: 10000,
                        “contact”: “713218xxxx”
                    },
                    {
                        “number_of_units”: 1000,
                        “target_price”: 10000,
                        “contact”: “713218xxxx”
                    }
                ]
            }.
            {
                “crypto_symbol”: BTC,
                "users": [
                    {
                        “number_of_units”: 1000,
                        “target_price”: 10000,
                        “contact”: “713218xxxx”
                    },
                    {
                        “number_of_units”: 1000,
                        “target_price”: 10000,
                        “contact”: “713218xxxx”
                    }
                ]
            }...
        ]
    }

# Notification Model
“Your {{ crypto_symbol }} is valued at {{ current_value }}. Your target price is {{ target_price }}”
 
# Components
1. Messaging Service - Twilio
2. Trigger Service - App Scripts
3. Function Service -  App Scripts
 
# Dependencies
1. Coin market API
2. App Scripts
3. Twilio API

# Variables that need to change

## cryptohandler.gs
1. COIN_MARKET_CAP_API_KEY: API Key for your coin market developer account
2. PHONE_NUMBERS: list of phone numbers for users
3. CRYPTO_LIST: list of cryptocurrencies and the settings for users

## notify.gs
1. TWILIO_SID: sid tied to twilio account
2. TWILIO_AUTH_TOKEN: auth token tied to twilio account
3. TWILIO_NUMBER: phone number tied to twilio account