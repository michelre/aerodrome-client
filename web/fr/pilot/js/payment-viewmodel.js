 define(["knockout", "typeahead", "common/js/services-ajax", "pilot/binding/autocomplete-airbase" , "common/model/airbase", "common/model/plane", "common/model/service-forfait", "common/model/service-tonnage", "common/model/landing", "common/js/utils"],
    function (ko, typeahead, services, autocompleteAirbase, airbase, plane, serviceForfait, serviceTonnage, landing, utils) {
        return function paymentVM(baseVM) {
            var self = this;
            //var flag_paymentType = 0;


            /******************
             OBSERVABLES
             ******************/
            self.pilot = ko.observable(baseVM.currentPilot());
            self.currentStep = ko.observable("");
            self.airbases = ko.observableArray([]);
            self.plane = ko.observable();
			
			self.successPayment=ko.observable();
			self.warningEmptyInput = ko.observable();
			self.warningSupNumber = ko.observable();
			self.warningModePaiement = ko.observable();

			
            self.landing = ko.observable();
            self.airbaseInput = ko.observable("");

            self.errorForm = ko.observable(false);
            self.total = ko.observable(20000);
            self.paymentType = ko.observable("paypal");
            self.initAirbasesDone = ko.observable(false);
            self.services = ko.observableArray([]);
            self.selectedServices = ko.observableArray([]);
			
			self.reglementCB = ko.observable(false); 
			self.reglementPaypal = ko.observable(false); 


            //NOT OBSERVABLES
          
            self.montantCredit = ko.observable();

            self.paypal = ko.observable(false);

            self.creditCard = ko.observable(false);
            
			
			

            /******************
             NON-OBSERVABLES
             ******************/

            self.airbasesJSON = [];

            //SERVICES
            self.init = function () {
                self.plane(new plane("", ""));
                self.landing(new landing(undefined, utils.getCurrentDate(), utils.getCurrentTime()));
                self.getAirbases();

                if($.cookie("currentStep") === "paiement")
                    self.currentStep("paiement");
                else
                    self.currentStep("atterissage");

                if($.cookie("total"))
                    self.total(parseFloat($.cookie("total")));
				
            }

            self.getAirbases = function (callback) {
                services.getAirbases(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var _airbase = new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbase_runwayNumber, data[i].airbase_airbaseManager);
                        self.airbasesJSON.push({ "fullTextSearch": _airbase.fullTextSearch() })
                        self.airbases.push(_airbase);
                    }
                    self.initAirbasesDone(true);
                });
            };

            //SERVICES
			
				self.checkCreditCard = function() {
				   self.reglementCB(true);
				   self.reglementPaypal(false);
				   return true;
				}
				
				self.checkPaypal = function() {
				   self.reglementPaypal(true);
				   self.reglementCB(false);
				   return true;
				}   
				
            self.crediterCompte = function () {
                if (self.allValidator()) {    /*** [LA VERIF PAR ALERT DEGUEU JARTERA] ***/
                    if (self.montantCredit() == "0" || self.montantCredit() == "" || self.montantCredit() == null){
                       	self.warningEmptyInput(false);
						self.warningSupNumber(true);
						self.warningModePaiement(false);
					}else if (!self.reglementPaypal()&& !self.reglementCB()){
                       	self.warningEmptyInput(false);
						self.warningSupNumber(false);
						self.warningModePaiement(true);
				}else {
                        if (self.reglementPaypal()) {
                            var url = "templates/credit_paypal.htm?pilotAccount_id=" + encodeURIComponent(self.pilot().id()) + "&price=" + encodeURIComponent(self.montantCredit());
                            window.location.href = url;
                        }
                        else if ( self.reglementCB()) {
                            var url = "templates/credit_creditCard.htm?pilotAccount_id=" + encodeURIComponent(self.pilot().id()) + "&price=" + encodeURIComponent(self.montantCredit());
                            window.location.href = url;
                        }
                    }

                } else {
                     	self.warningEmptyInput(true);
						self.warningSupNumber(false);
						self.warningModePaiement(false);
                }
                
            }
			
			
            self.allValidator = ko.computed(function () {
                return true;
            });

            self.getServicesByAirbase = function (id, callback) {
                self.services.removeAll();
                self.selectedServices.removeAll();
                services.getServicesByAirbase(id, function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].service_type === "forfait") {
                            self.services.push(new serviceForfait(data[i].service_id, data[i].service_name, data[i].service_price,
                                data[i].service_desc, data[i].service_aircraftType_code, data[i].airbase_id));
                        }
                        if (data[i].service_type === "tonnage") {
                            self.services.push(new serviceTonnage(data[i].service_id, data[i].service_name,
                                data[i].service_desc, data[i].aircraftType_code, data[i].airbase_id, data[i].service_weightRangeService));
                        }
                    }
                    if (callback)
                        callback();
                });
            };

            self.findAirbaseByFullTextSearch = function (fullTextSearch) {
                for (var i = 0; i < self.airbases().length; i++) {
                    if (self.airbases()[i].fullTextSearch() === fullTextSearch)
                        return self.airbases()[i];
                }
                return undefined;
            }

            self.nextStepLandingButton = function () {
                if (self.landing().allInputsFilled()) {
                    self.getServicesByAirbase(self.landing().airbase().id(), function () {
                        self.errorForm(false);
							self.currentStep("avion");
                    });
                } else {
                    self.errorForm(true);
                }
            }

            self.nextStepPlaneButton = function () {
                if (self.plane().allInputsFilled()) {
                    self.errorForm(false);
                    self.currentStep("services");
                    for (var i = 0; i < self.services().length; i++) {
                        if (self.services()[i].type() === "tonnage")
                            self.services()[i].aircraftWeight(self.plane().weight());
                    }
                      self.currentStep("services");
                } else {
                    self.errorForm(true);
                }
            };

            self.previousStepPlaneButton = function () {
                self.currentStep("atterissage");
            };

            self.nextStepServicesButton = function () {
                self.selectedServices.sort(function (left, right) {
                    return left.name() == right.name() ? 0 : (left.name() < right.name() ? -1 : 1)
                })
                self.currentStep("validation");
            };

            self.previousStepServicesButton = function () {
                self.currentStep("avion");
            };

            self.nextStepValidationButton = function () {
				var servicesJson=[];
				self.selectedServices().forEach(function(entry) {
					var serviceJson = {service_id : entry.id(),service_quantite : parseInt(entry.quantity())}
					servicesJson.push(serviceJson);
			    });
				
				var transactionService = {
					aircraft : { aircraft_ton:parseFloat(self.plane().weight()),
					  			 aircraft_number:self.plane().immat()
							   },
					services : servicesJson							   
				}
				
				console.log(transactionService);
				services.sendServiceTransaction(transactionService,function(){
				});
				
                $.cookie('total', self.total(), { expires: 7, path: '/' });
				$.cookie('currentStep', "paiement", { expires: 7, path: '/' });
                self.currentStep("paiement");
            };

            self.previousStepValidationButton = function () {
                self.currentStep("services");
            };
            //Paiement
            self.payButton = function()
			{
				$("#dialog_message").show();
				$("#dialog_message").dialog({
					width: 'auto', 
					maxWidth: 600,
					height: 'auto',
					modal: true,
					fluid: true, //new option
					resizable: false,
					buttons: {
						'Ok': function () {
							
							var totalToPay = self.totalEuros().replace('€', '');
							var credit = self.pilot().creditEuros().replace('€', '');
							
							totalToPayNegative = "-"+totalToPay
							var remainingCredit = credit - totalToPay;
							var remainingCreditWithEuroSymbol = remainingCredit + " €.";
							var newCredit = {
									pilotAccount_id: self.pilot().id(),
									prix: parseFloat(totalToPay)
								}
							
							console.log(newCredit);
							
							services.payLanding(newCredit, function(data, status){
								if(status==200){
									$("#credit").append(remainingCreditWithEuroSymbol);
									self.successPayment(true);
									setTimeout(function()
									{	self.successPayment(false);
										$.removeCookie("currentStep",{ path: '/' });
										window.location="/fr/pilot";
									},2000);
									
								}else{
									alert("un probleme est intervenue pendant la transation veuillez réessayer uterieurment.");
								}
							});
							$(this).dialog("close");
							
							
						},
						'Annuler': function()
						{
							$(this).dialog("close");
						}
					}
				});
            }
			
			 self.modeReglementPaypalCss= ko.computed(function(){
				 return self.reglementPaypal() ? "active" : "";
		  	 });
		 
		 	 self.modeReglementCBCss= ko.computed(function(){
			 	return self.reglementCB() ? "active" : "";
		 	});

            self.cancelPaiementButton = function () {
				$.removeCookie("currentStep",{ path: '/' });
                //$.cookie("currentStep", "atterissage",{ expires: 7, path: '/' });
                $.removeCookie("total",{ path: '/' });
                window.location.reload();
            };

            self.updateAirbaseSelected = ko.computed(function () {
                if (self.landing() && self.airbaseInput() !== "")
                    self.landing().airbase(self.findAirbaseByFullTextSearch(self.airbaseInput()));
                else if (self.landing())
                    self.landing().airbase(undefined);
            });

            self.displayErrorLanding = ko.computed(function () {
                if (self.landing())
                    return (!self.landing().allInputsFilled() && self.errorForm()) ? "show" : "hidden";
            });

            self.displayErrorPlane = ko.computed(function () {
                if (self.plane())
                    return (!self.plane().allInputsFilled() && self.errorForm()) ? "show" : "hidden";
            });

            self.currentStepAtterissageClass = ko.computed(function () {
                return (self.currentStep() === 'atterissage') ? "active" : "";
            });

            self.currentStepAvionClass = ko.computed(function () {
                return (self.currentStep() === 'avion') ? "active" : "";
            });

            self.currentStepServicesClass = ko.computed(function () {
                return (self.currentStep() === 'services') ? "active" : "";
            });

            self.currentStepValidationClass = ko.computed(function () {
                return (self.currentStep() === 'validation') ? "active" : "";
            });

            self.currentStepPaiementClass = ko.computed(function () {
                return (self.currentStep() === 'paiement') ? "active" : "";
            });

            self.totalPrice = ko.computed(function () {
                var total = 0;
                for (var i = 0; i < self.selectedServices().length; i++) {
                    total += self.selectedServices()[i].totalPrice();
                }
                self.total(total);
            });

            self.enoughCredit = ko.computed(function () {
                return (parseFloat(self.pilot().credit()) >= parseFloat(self.total())) ? true : false;
            });
			
			self.displaySuccessPayment = ko.computed(function () {
                return (self.successPayment()) ? "show" : "hidden"
            });
			
			self.displayWarningEmptyInput  = ko.computed(function(){
				return self.warningEmptyInput() ? "show" : "hidden";
			});
		
			self.displayWarningSupNumber  = ko.computed(function(){
				return self.warningSupNumber() ? "show" : "hidden";
			});
		
			self.displayWarningModePaiement  = ko.computed(function(){
				return self.warningModePaiement() ? "show" : "hidden";
			});

            self.notEnoughCreditClass = ko.computed(function () {
                return (!self.enoughCredit()) ? "show" : "hidden"
            });

            self.enoughCreditClass = ko.computed(function () {
                return (self.enoughCredit()) ? "show" : "hidden"
            });

            self.futureCredit = ko.computed(function () {
                if(self.total()){
                    var futureCredit = parseFloat(self.pilot().credit()) - parseFloat(self.total());
                    return futureCredit.toFixed(2) + "€";
                }
            });

            self.totalEuros = ko.computed(function () {
                if(self.total())
                    return self.total().toFixed(2) + "€";
            });

            self.init()

        }
    });
