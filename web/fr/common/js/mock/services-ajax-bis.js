define(["jquery", "common/js/mock/get"], function($, _get){
    return {
        getPilotAccount: function (id, callback) {
            callback(_get.getPilotAccount().pilot)
        },
        modifyPilotAccount: function (id, data, callback) {
            callback();
        },
        createPilotAccount: function (data, callback) {
            callback();
        },
        deletePilotAccount: function (idPilot, callback) {
            callback();
        },
        connectAccount: function(data, callback){
            callback();
        },
        getAirbases: function (callback) {
            callback(_get.getAirbases().airbases);
        },
        createAirbase: function (data, callback) {
            callback();
        },
        updateAirbase: function(id, data, callback){
            callback();
        },
        getAirbase: function (id,callback) {
            callback(_get.getAirbase(id).airbase);
        },
        getManagers: function (callback) {
            callback(_get.getManagers().managers)
        },
        getServicesByAirbase: function(id, callback){
            callback([
                {
                    "service_id": 2,
                    "service_name": "atterissage2",
                    "service_type": "tonnage",
                    "service_price": 0,
                    "service_desc": "Un autre service au tonnage",
                    "service_aircraftTypeCode": "1",
                    "services_weightRangeServices": [
                        {
                            "weightRangeService_tonMin": 0,
                            "weightRangeService_tonMax": 2,
                            "weightRangeService_priceFixed": 8.33,
                            "weightRangeService_pricePerTon": 0
                        },
                        {
                            "weightRangeService_tonMin": 2,
                            "weightRangeService_tonMax": 3,
                            "weightRangeService_priceFixed": 16.72,
                            "weightRangeService_pricePerTon": 0
                        },
                        {
                            "weightRangeService_tonMin": 3,
                            "weightRangeService_tonMax": 4,
                            "weightRangeService_priceFixed": 25.00,
                            "weightRangeService_pricePerTon": 0
                        },
                        {
                            "weightRangeService_tonMin": 4,
                            "weightRangeService_tonMax": 5,
                            "weightRangeService_priceFixed": 30.00,
                            "weightRangeService_pricePerTon": 0
                        },
                        {
                            "weightRangeService_tonMin": 5,
                            "weightRangeService_tonMax": 6,
                            "weightRangeService_priceFixed": 35.00,
                            "weightRangeService_pricePerTon": 0
                        },
                        {
                            "weightRangeService_tonMin": 6,
                            "weightRangeService_tonMax": 13,
                            "weightRangeService_priceFixed": 50,
                            "weightRangeService_pricePerTon": 6
                        },
                        {
                            "weightRangeService_tonMin": 13,
                            "weightRangeService_tonMax": 20,
                            "weightRangeService_priceFixed": 92,
                            "weightRangeService_pricePerTon": 6
                        },
                        {
                            "weightRangeService_tonMin": 20,
                            "weightRangeService_tonMax": 30,
                            "weightRangeService_priceFixed": 134,
                            "weightRangeService_pricePerTon": 5
                        },
                        {
                            "weightRangeService_tonMin": 30,
                            "weightRangeService_tonMax": 100000,
                            "weightRangeService_priceFixed": 184,
                            "weightRangeService_pricePerTon": 5
                        }
                    ]
                },
                {
                    "service_id": 3,
                    "service_name": "eclairage",
                    "service_type": "forfait",
                    "service_price": 15.0,
                    "service_desc": "Un service au forfait",
                    "service_aircraftTypeCode": "1",
                    "services_weightRangeServices": []
                }
            ])
        }
    }
})