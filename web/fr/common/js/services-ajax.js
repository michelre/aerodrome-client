define(["jquery", "common/js/mock/get",], function($, _get){
	var SaNPoint = "http://tarikgilani.eweb702.discountasp.net/ws/";
	return {
		getPilotAccount: function(idPilot, callback){
			$.ajax({
				url: SaNPoint+"pilot/"+idPilot,
				dataType: "json",
				method:"GET"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error getAccountPilot:", jqXHR);
			})
		},
		modifyPilotAccount: function(idPilot,dataPilot, callback){
			$.ajax({
				url: SaNPoint+"pilot/"+idPilot,
				dataType: "json",
				data: JSON.stringify(dataPilot),
				method:"PUT"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error getAccountPilot:", jqXHR);
			})
		},
		createPilotAccount: function(dataPilot, callback){
			$.ajax({
				url: SaNPoint+"pilot/",
				dataType: "json",
				data: JSON.stringify(dataPilot),
				method:"POST"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error createAccountPilot:", jqXHR);
			})
		},
		deletePilotAccount: function(idPilot, callback){
			$.ajax({
				url: SaNPoint+"pilot/delete/"+idPilot,
				dataType: "json",
				method:"DELETE"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error deleteAccountPilot:", jqXHR);
			})
		},
		connectAccount: function(dataAccount, callback){
			$.ajax({
				url: "",
				dataType: "json",
				data: JSON.stringify(dataAccount)
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error connectAccount:", jqXHR);
			})
		},
		getAirbases: function (callback) {
            $.ajax({
                url: SaNPoint+"airbases",
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getAirbases:", jqXHR);
                })
        },
		
		getAirbase: function (id,callback) {
            $.ajax({
                url: SaNPoint+"airbase/"+id,
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getAirbases:", jqXHR);
                })
        },
		
		createAirbase:function (dataAirbase,callback){
			$.ajax({
				url: SaNPoint+"airbase/",
				dataType: "json",
				data: JSON.stringify(dataAirbase),
				method:"POST"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error createAirbase:", jqXHR);
			});
		},
		
		updateAirbase:function (dataAirbase,callback){
			$.ajax({
				url: SaNPoint+"airbase/"+dataAirbase.airbase_id,
			    dataType: "json",
				data: JSON.stringify(dataAirbase),
				method:"PUT"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error updateAirbase:", jqXHR);
			});
		},
		
		deleteAirbase: function(iAirbase, callback){
			$.ajax({
				url: SaNPoint+"airbase/"+iAirbase,
				dataType: "json",
				method:"DELETE"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error deleteAirbase:", jqXHR);
			})
		},
		
		getManagers: function (callback) {
            $.ajax({
                url: SaNPoint+"AirbaseManager",
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getOwner:", jqXHR);
                })
        },
		
		crediterCompte: function (dataCredit,callback){
			$.ajax({
				url: SaNPoint+"pilot/"+dataCredit.pilotAccount_id+"/credit",
			    dataType: "json",
				data: JSON.stringify(dataCredit),
				method:"PUT"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error crediterCompte:", jqXHR);
			});
		},
		
		updateService:function (dataService,callback){
			$.ajax({
				url: SaNPoint+"service/"+dataService.id,
			    dataType: "json",
				data: JSON.stringify(dataService),
				method:"PUT"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error updateService:", jqXHR);
			});
		},
		
		createService:function (dataService,callback){
			$.ajax({
				url: SaNPoint+"service/",
				dataType: "json",
				data: JSON.stringify(dataService),
				method:"POST"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error createService:", jqXHR);
			});
		},
		
		deleteService: function(idService, callback){
			$.ajax({
				url: SaNPoint+"service/"+idService,
				dataType: "json",
				method:"DELETE"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error deleteService:", jqXHR);
			})
		}
	}
})