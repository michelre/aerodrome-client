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
        getServicesByAirbase: function(id,callback){
            callback(_get.getServicesByAirbase(id).services);
        },
		getService: function(id,callback){
            callback(_get.getService(id).service);
        }
    }
})