define(["jquery", "common/js/mock/get","jquery-cookie"], function($, _get){
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
		modifyPilotMdpAccount: function(idPilot,dataPilot){
			$.ajax({
				url: SaNPoint+"pilot/"+idPilot+"/updatePassword",
				dataType: "json",
				data: JSON.stringify(dataPilot),
				method:"PUT"
			}).done(function(data){
                  console.log(data);
			}).fail(function(jqXHR){
				console.log("Error modifMdpPilot:", jqXHR);
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
				url: SaNPoint+"login",
				method:"POST",
				dataType: "json",
				data: JSON.stringify(dataAccount)
			}).done(function(data, textStatus, jqXHR){
				$.cookie("id",data.pilotAccount.pilotAccount_id,{path:'/'})
				$.cookie("role",data.role,{path:'/'});
				
				console.log(document.cookie);
				
                    if(callback)
                        callback(data, textStatus, jqXHR)
			}).fail(function(jqXHR,status){
				  if(callback){
					 console.log("Error connectAccount:", jqXHR);
                     callback(null,jqXHR.status);
					 
				  }
			})
		},
		disconnectAccount: function(callback){
			$.ajax({
				url: SaNPoint+"logout",
				method:"GET",
			}).done(function(data, textStatus, jqXHR){
				
				$.removeCookie("id", { path: '/' });
				$.removeCookie("role", { path: '/' });
				
                    if(callback)
                        callback();
			}).fail(function(jqXHR,status){
				
					 console.log("Error disconnectAccount:", jqXHR);
                   
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
		
		updateService:function (dataService,callback,callbackData){
			$.ajax({
				url: SaNPoint+"service/"+dataService.service_id,
			    dataType: "json",
				data: JSON.stringify(dataService),
				method:"PUT"
			}).done(function(data){
                    if(callback)
                        callback(callbackData,dataService.service_id)
			}).fail(function(jqXHR){
				console.log("Error updateService:", jqXHR);
			});
		},
		
		createService:function (dataService,callback,callbackData){
			$.ajax({
				url: SaNPoint+"service/",
				dataType: "json",
				data: JSON.stringify(dataService),
				method:"POST"
			}).done(function(data){
                    if(callback)
                        callback(callbackData,data)
					return data.id; //besoin de l'id pour creation des weight range service
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
		},
		
		getService: function (id,callback) {
            $.ajax({
                url: SaNPoint+"service/"+id,
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getService:", jqXHR);
                })
        },
		
		getServicesByAirbase: function (idAirbase,callback) {
            $.ajax({
                url: SaNPoint+"servicesByAirbase/"+idAirbase,
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getServicesByAirbase:", jqXHR);
                })
        },
		
		getServices: function (callback) {
            $.ajax({
                url: SaNPoint+"services/"+idAirbase,
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getServicesByAirbase:", jqXHR);
                })
        },
		
		getAirbasesByManager: function (idManager,callback) {
            $.ajax({
                url: SaNPoint+"airbasesByManager/"+idManager,
				method:"GET"
            }).done(function (data) {
                    if(callback)
                        callback(data)
                }).fail(function (jqXHR) {
                    console.log("Error getAirbasesByManager:", jqXHR);
                })
        },
		
		updateWeightRangeService:function (dataWeightRangeService,callback){
			$.ajax({
				url: SaNPoint+"weightRangeService/"+dataWeightRangeService.service_WeightRangeService_id,
			    dataType: "json",
				data: JSON.stringify(dataWeightRangeService),
				method:"PUT"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error updateWeightRangeService:", jqXHR);
			});
		},
		
		createWeightRangeService:function (dataWeightRangeService,callback){
			$.ajax({
				url: SaNPoint+"weightRangeService/",
				dataType: "json",
				data: JSON.stringify(dataWeightRangeService),
				method:"POST"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error createWeightRangeService:", jqXHR);
			});
		},
		
		deleteWeightRangeService: function(idWeightRangeService, callback){
						console.log(idWeightRangeService);
			$.ajax({
				url: SaNPoint+"weightRangeService/"+idWeightRangeService,
				dataType: "json",
				method:"DELETE"
			}).done(function(data){
                    if(callback)
                        callback(data)
			}).fail(function(jqXHR){
				console.log("Error deleteWeightRangeService:", jqXHR);
			})
		}
		
		
		
	}
})