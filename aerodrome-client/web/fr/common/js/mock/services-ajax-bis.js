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
                "service_id": 1,
                "service_name": "atterissage",
                "service_type": "tonnage",
                "service_price": 0,
                "service_desc": "Un service au tonnage",
                "service_aircraftTypeCode": "1",
                    "services_weightRangeServices": [
                        {
                            "weightRangeService_tonMin": 0,
                            "weightRangeService_tonMax": 2,
                            "weightRangeService_priceFixed": 15.0,
                            "weightRangeService_pricePerTon": 2.0
                        }
                    ]
                },
                {
                    "service_id": 2,
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