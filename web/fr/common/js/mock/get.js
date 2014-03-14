define([], function () {
    return {
        getAirbases: function () {
            return {
                "airbases": [
                    {
                        "airbase_id": 1,
                        "airbase_name": "Grenoble-Le Versoud",
                        "airbase_address": "38420 Le Versoud",
                        "airbase_runwayNumber": 2,
                        "airbase_airbaseManager": {
                            "airbaseManager_id": 2,
                    		"airbaseManager_firstName": "Zinedine",
                    		"airbaseManager_lastName": "Zidane",
							"airbaseManager_address": "2 avenue du brezil",
                    		"airbaseManager_subscriptionDate": null,
                    		"airbaseManager_phone": "09876544656",
                    		"airbaseManager_mail": "zizou@gmail.com",
                    		"airbaseManager_pass": "3-0-98",
                    		"airbaseManager_lastModificationDate": null,
                    		"airbaseManager_sessionID": null,

                        }
                    },
                    {
                        "airbase_id": 2,
                        "airbase_name": "Corbas",
                        "airbase_address": "69000 Villeurbanne",
                        "airbase_runwayNumber": 2,
                        "airbase_airbaseManager": {
                        	"airbaseManager_id": 1,
                    		"airbaseManager_firstName": "Lenoix",
                    		"airbaseManager_lastName": "Pikou",
							"airbaseManager_address": "1 rue du pipou",
                    		"airbaseManager_subscriptionDate": null,
                    		"airbaseManager_phone": "0501020303",
                    		"airbaseManager_mail": "kikou@gmail.com",
                    		"airbaseManager_pass": "123456",
                    		"airbaseManager_lastModificationDate": null,
                    		"airbaseManager_sessionID": null,

                        }
                    }
                ]
            }
        },
        getPilot: function () {
            return {
                "pilot": {
                    "pilotAccount_id": 1,
                    "pilotAccount_firstName": "Jason",
                    "pilotAccount_lastName": "Fournier",
                    "pilotAccount_subscriptionDate": "2014-01-01",
                    "pilotAccount_phone": "06060606",
                    "pilotAccount_mail": "Jason@jason.fr",
                    "pilotAccount_pass": "123456",
                    "pilotAccount_basket": 100,
                    "pilotAccount_activity": "1",
                    "pilotAccount_lastModificationDate": "2014-01-01",
                    "pilotAccount_sessionID": null
                }
            }
        },
        getPilotAccount: function (id) {
            return {
                "pilot": {
                    "pilotAccount_id": 1,
                    "pilotAccount_firstName": "Jason",
                    "pilotAccount_lastName": "Fournier",
                    "pilotAccount_subscriptionDate": "2014-01-01",
                    "pilotAccount_phone": "06060606",
                    "pilotAccount_mail": "Jason@jason.fr",
                    "pilotAccount_pass": "123456",
                    "pilotAccount_basket": 100,
                    "pilotAccount_activity": "1",
                    "pilotAccount_lastModificationDate": "2014-01-01",
                    "pilotAccount_sessionID": null
                }
            }
        },
        getServicesByAirbase: function (airbaseId) {
            return {
				"services":[
                	{
						"service_id":1,
                    	"service_name": "atterissage",
						"service_type": "tonnage",
                    	"service_price": 30.00,
						"service_desc" : "tapir",
						"service_aircraftTypeCode" : "azerty",
						"service_weightRangeServices":[
								{
									"weightRangeService_tonMin" : 2,
									"weightRangeService_tonMax" : 4,
									"weightRangeService_priceFixed" : 15.0,
									"weightRangeService_pricePerTon" : 2.0,							
								},
								{
									"weightRangeService_tonMin" : 4,
									"weightRangeService_tonMax" : 6,
									"weightRangeService_priceFixed" : 30,
									"weightRangeService_pricePerTon" : 6,							
								},
							]
                	},
                	{
						"service_id":2,
                    	"service_name": "eclairage",
						"service_type": "forfais",
                    	"service_price": 30.00,
						"service_desc" : "tapir",
						"service_aircraftTypeCode" : "querty",
						"service_weightRangeServices":[]
                	} 
				]
			}
        },
        getService: function (serviceId) {
            return {
				"service":
                	{
						"service_id":1,
                    	"service_name": "atterissage",
						"service_type": "tonnage",
                    	"service_price": 30.00,
						"service_desc" : "tapir",
						"service_aircraftTypeCode" : "azerty",
						"service_weightRangeServices":[
								{
									"weightRangeService_id" : 1,
									"weightRangeService_tonMin" : 2,
									"weightRangeService_tonMax" : 4,
									"weightRangeService_priceFixed" : 15.0,
									"weightRangeService_pricePerTon" : 2.0,							
								},
								{
									"weightRangeService_id" : 2,
									"weightRangeService_tonMin" : 4,
									"weightRangeService_tonMax" : 6,
									"weightRangeService_priceFixed" : 30,
									"weightRangeService_pricePerTon" : 6,							
								},
							]
                	}
			}
        },		
        getManagers: function () {
            return {
				"managers":[
                {
                    "airbaseManager_id": 1,
                    "airbaseManager_firstName": "Lenoix",
                    "airbaseManager_lastName": "Pikou",
					"airbaseManager_address": "1 rue du pipou",
                    "airbaseManager_subscriptionDate": null,
                    "airbaseManager_phone": "0501020303",
                    "airbaseManager_mail": "kikou@gmail.com",
                    "airbaseManager_pass": "123456",
                    "airbaseManager_lastModificationDate": null,
                    "airbaseManager_sessionID": null,

                },
                {
                    "airbaseManager_id": 2,
                    "airbaseManager_firstName": "Zinedine",
                    "airbaseManager_lastName": "Zidane",
					"airbaseManager_address": "2 avenue du brezil",
                    "airbaseManager_subscriptionDate": null,
                    "airbaseManager_phone": "09876544656",
                    "airbaseManager_mail": "zizou@gmail.com",
                    "airbaseManager_pass": "3-0-98",
                    "airbaseManager_lastModificationDate": null,
                    "airbaseManager_sessionID": null,

                }
            ]}
        },
        getAirbase: function (id) {
            if (id == 1)
                return {
                    "airbase":{
                        "airbase_id": 1,
                        "airbase_name": "Grenoble-Le Versoud",
                        "airbase_address": "38420 Le Versoud",
                        "airbase_runwayNumber": 2,
                        "airbase_airbaseManager": {
                            "airbaseManager_id": 2,
                    		"airbaseManager_firstName": "Zinedine",
                    		"airbaseManager_lastName": "Zidane",
							"airbaseManager_address": "2 avenue du brezil",
                    		"airbaseManager_subscriptionDate": null,
                    		"airbaseManager_phone": "09876544656",
                    		"airbaseManager_mail": "zizou@gmail.com",
                    		"airbaseManager_pass": "3-0-98",
                    		"airbaseManager_lastModificationDate": null,
                    		"airbaseManager_sessionID": null,

                        }
                    }
				}
					
            if (id == 2)
                return {
                    "airbase":{
                        "airbase_id": 2,
                        "airbase_name": "Corbas",
                        "airbase_address": "69000 Villeurbanne",
                        "airbase_runwayNumber": 2,
                        "airbase_airbaseManager": {
                        	"airbaseManager_id": 1,
                    		"airbaseManager_firstName": "Lenoix",
                    		"airbaseManager_lastName": "Pikou",
							"airbaseManager_address": "1 rue du pipou",
                    		"airbaseManager_subscriptionDate": null,
                    		"airbaseManager_phone": "0501020303",
                    		"airbaseManager_mail": "kikou@gmail.com",
                    		"airbaseManager_pass": "123456",
                    		"airbaseManager_lastModificationDate": null,
                    		"airbaseManager_sessionID": null,

                        }
                    }
                }
        }
    }
})
