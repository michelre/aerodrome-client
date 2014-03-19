define(["jquery", "common/js/mock/get"], function($, _get){
    return {
        getPilotAccount: function (id, callback) {
            setTimeout(function(){
                callback(_get.getPilotAccount().pilot)
            }, 1000)
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
            setTimeout(function(){
                callback(_get.getAirbases().airbases);
            }, 1000)
        },
        createAirbase: function (data, callback) {
            callback();
        },
        updateAirbase: function(id, data, callback){
            callback();
        },
		getAirbase: function (id,callback) {
            setTimeout(function(){
                callback(_get.getAirbase(id).airbase);
            }, 1000);
        },
		getManagers: function (callback) {
            callback(_get.getManagers().managers)
        },
        getServicesByAirbase: function(id,callback){
            setTimeout(function(){
                callback(_get.getServicesByAirbase(id).services);
            }, 1000)
        },
		getService: function(id,callback){
            callback(_get.getService(id).service);
        },
        modifyAirbase: function(id, data, callback){
            callback()
        },
        deleteAirbase: function(date, callback){
            callback()
        }
    }
})