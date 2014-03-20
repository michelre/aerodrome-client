define(["knockout", "typeahead", "common/js/services-ajax", "pilot/binding/autocomplete-airbase" ,"common/model/airbase", "common/model/plane", "common/model/service-forfait", "common/model/service-tonnage", "common/model/landing", "common/js/utils"],
    function (ko, typeahead, services, autocompleteAirbase, airbase, plane, serviceForfait, serviceTonnage, landing, utils) {
    return function paymentVM(baseVM) {
            var self = this;
			var flag_paymentType = 0;
			var msg_higherThan0 = "Merci de Saisir un montant supérieur à 0";
			var msg_radioBoxChecked = "Merci de choisir l'un des 2 modes de paiement";	
			
			
			
            /******************
			 OBSERVABLES
			******************/
            self.pilot           = ko.observable(baseVM.currentPilot());
            self.currentStep     = ko.observable("");
            self.airbases        = ko.observableArray([]);
            self.servicesForfait = ko.observableArray([]);
            self.servicesTonnage = ko.observableArray([]);
            self.plane           = ko.observable();
            self.landing         = ko.observable();
            self.airbaseInput    = ko.observable("");

            self.servicesForfaitSelected = ko.observableArray([]);
            self.servicesTonnageSelected = ko.observableArray([]);

            self.errorForm       = ko.observable(false);
            self.total           = ko.observable(20000);
            self.paymentType     = ko.observable("paypal");
            self.initAirbasesDone        = ko.observable(false);			
			self.montantCredit=ko.observable();

			self.paypal = ko.observable(false);
			self.checkPaypal = function() {
					   flag_paymentType = 1;
					   return true;
					}   
			
			self.creditCard = ko.observable(false);
			self.checkCreditCard = function() {
					   flag_paymentType = 2;
					   return true;
					}  

			//---------------------------------
			
			ko.bindingHandlers.numeric = {
				init: function (element, valueAccessor) {
					$(element).on("keydown", function (event) {
						// Allow: backspace, delete, tab, escape, and enter
						if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
							// Allow: Ctrl+A
							(event.keyCode == 65 && event.ctrlKey === true) ||
							// Allow: . ,
							(event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
							// Allow: home, end, left, right
							(event.keyCode >= 35 && event.keyCode <= 39)) {
							// let it happen, don't do anything
							return;
						}
						else {
							// Ensure that it is a number and stop the keypress
							if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
								event.preventDefault();
							}
						}
					});
				}
			};

            /******************
			 NON-OBSERVABLES
			******************/
            self.airbasesJSON = [];

            //SERVICES
            self.init = function(){
                self.plane(new plane("", ""));
                self.landing(new landing(undefined, utils.getCurrentDate(), utils.getCurrentTime()));
                self.getAirbases();
				
				$.cookie('currentStep', "atterissage", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'))
            }

            self.getAirbases = function(callback){
                services.getAirbases(function(data){
                    for(var i = 0; i < data.length; i++){
                        var _airbase = new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbase_runwayNumber, data[i].airbase_airbaseManager);
                        self.airbasesJSON.push({ "fullTextSearch": _airbase.fullTextSearch() })
                        self.airbases.push(_airbase);
                    }
                    self.initAirbasesDone(true);
                });
            };

			            //SERVICES
			self.crediterCompte = function()
			{
				if(self.allValidator())
				{	/*** [LA VERIF PAR ALERT DEGUEU JARTERA] ***/
					//Test value to make sure it doesn't equal 0 
					if(self.montantCredit() == "0" || self.montantCredit() == "" || self.montantCredit() == null)
						alert(msg_higherThan0);
					//Confirm that the radio Box is Checked for the Payment Mode
					else if ($('input[type=radio]:checked').length == 0)
						alert(msg_radioBoxChecked);
					else
					{
						//Paypal Choice [Placeholder]
						if (flag_paymentType == 1)
						{
							var url = "templates/credit_paypal.htm?pilotAccount_id=" + encodeURIComponent(self.pilot().id()) + "&price=" + encodeURIComponent(self.montantCredit());
							window.location.href = url;
						}
						//Credit Card [Placeholder]
						else
						{
							var url = "templates/credit_creditCard.htm?pilotAccount_id=" + encodeURIComponent(self.pilot().id()) + "&price=" + encodeURIComponent(self.montantCredit());
							window.location.href = url;
						}
					}
					
				}else{
					alert("Les champs n'ont pas tous été saisis");
				};
			}
			 self.allValidator = ko.computed(function(){
				 return true;
			 });
			 
            self.getServicesByAirbase = function(id, callback){
                self.servicesForfait.removeAll();
                self.servicesTonnage.removeAll();
                self.servicesForfaitSelected.removeAll();
                self.servicesTonnageSelected.removeAll();
                services.getServicesByAirbase(id, function(data){
                    for(var i = 0; i < data.length; i++){
                        if(data[i].service_type === "forfait"){
                            self.servicesForfait.push(new serviceForfait(data[i].service_id, data[i].service_name, data[i].service_price,
                                data[i].service_desc, data[i].service_aircraftType_code, data[i].airbase_id));
                        }
                        if(data[i].service_type === "tonnage"){
                            self.servicesTonnage.push(new serviceTonnage(data[i].service_id, data[i].service_name,
                                data[i].service_desc, data[i].aircraftType_code, data[i].airbase_id, data[i].service_weightRangeService));
                        }
                    }
                    if(callback)
                        callback();
                });
            };

            self.findAirbaseByFullTextSearch = function(fullTextSearch){
                for(var i = 0; i < self.airbases().length; i++){
                    if(self.airbases()[i].fullTextSearch() === fullTextSearch)
                        return self.airbases()[i];
                }
                return undefined;
            }

            self.nextStepLandingButton = function(){
                if(self.landing().allInputsFilled()){
                    self.getServicesByAirbase(self.landing().airbase().id(), function(){
                        self.errorForm(false);
						$.cookie('currentStep', "avion", { expires: 7, path: '/' });
						self.currentStep($.cookie('currentStep'));
                    });
                }else{
                    self.errorForm(true);
                }
            }

            self.nextStepPlaneButton = function(){
                if(self.plane().allInputsFilled()){
                    self.errorForm(false);
                    self.currentStep("services");
                    for(var i = 0; i < self.servicesTonnage().length; i++){
                        self.servicesTonnage()[i].aircraftWeight(self.plane().weight());
                    }
					$.cookie('currentStep', "services", { expires: 7, path: '/' });
					self.currentStep($.cookie('currentStep'));
                }else{
                    self.errorForm(true);
                }
            };

            self.previousStepPlaneButton = function(){
                self.currentStep("atterissage");
				$.cookie('currentStep', "atterissage", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'));
            };

            self.nextStepServicesButton = function(){
                self.currentStep("validation");
				$.cookie('currentStep', "validation", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'));
            };

            self.previousStepServicesButton = function(){
                self.currentStep("avion");
				$.cookie('currentStep', "avion", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'));
            };

            self.nextStepValidationButton = function(){
                self.currentStep("paiement");
				$.cookie('currentStep', "paiement", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'));
            };

            self.previousStepValidationButton = function(){
                self.currentStep("services");
				$.cookie('currentStep', "services", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'));
            };
			//Paiement
            self.payButton = function(){
				
				//payer(montant);
				//alert(self.pilotAccount + self.creditEuros() + self.totalEuros());
            }

            self.previousStepPaiementButton = function(){
                self.currentStep("validation");
				$.cookie('currentStep', "validation", { expires: 7, path: '/' });
				self.currentStep($.cookie('currentStep'));
            };

            self.updateAirbaseSelected = ko.computed(function(){
                if(self.landing() && self.airbaseInput() !== "")
                    self.landing().airbase(self.findAirbaseByFullTextSearch(self.airbaseInput()));
                else if(self.landing())
                    self.landing().airbase(undefined);
            });

            self.displayErrorLanding = ko.computed(function(){
                if(self.landing())
                    return (!self.landing().allInputsFilled() && self.errorForm()) ? "show" : "hidden";
            });

            self.displayErrorPlane = ko.computed(function(){
                if(self.plane())
                    return (!self.plane().allInputsFilled() && self.errorForm()) ? "show" : "hidden";
            });

            self.currentStepAtterissageClass = ko.computed(function(){
                return (self.currentStep() === 'atterissage') ? "active" : "";
            });

            self.currentStepAvionClass = ko.computed(function(){
                return (self.currentStep() === 'avion') ? "active" : "";
            });

            self.currentStepServicesClass = ko.computed(function(){
                return (self.currentStep() === 'services') ? "active" : "";
            });

            self.currentStepValidationClass = ko.computed(function(){
                return (self.currentStep() === 'validation') ? "active" : "";
            });

            self.currentStepPaiementClass = ko.computed(function(){
                return (self.currentStep() === 'paiement') ? "active" : "";
            });

            self.totalPrice = ko.computed(function(){
                var total = 0;
                for(var i = 0; i < self.servicesForfaitSelected().length; i++){
                    total += self.servicesForfaitSelected()[i].totalPrice();
                }
                for(var i = 0; i < self.servicesTonnageSelected().length; i++){
                    total += self.servicesTonnageSelected()[i].totalPrice();
                }
                self.total(total);
            });

            self.enoughCredit = ko.computed(function(){
                return (parseFloat(self.pilot().credit()) > parseFloat(self.total())) ? true : false;
            });

            self.notEnoughCreditClass = ko.computed(function(){
               return (!self.enoughCredit()) ? "show" : "hidden"
            });

            self.enoughCreditClass = ko.computed(function(){
                return (self.enoughCredit()) ? "show" : "hidden"
            });

            self.futureCredit = ko.computed(function(){
                var futureCredit = parseFloat(self.pilot().credit()) - parseFloat(self.total());
                return futureCredit.toFixed(2)+"€";
            });

            self.totalEuros = ko.computed(function(){
                return self.total().toFixed(2)+"€";
            });

            self.totalForfait = ko.computed(function(){
                var total = 0;
                for(var i = 0; i < self.servicesForfaitSelected().length; i++){
                    total += self.servicesForfaitSelected()[i].totalPrice();
                }
                return total;
            });

            self.totalTonnage = ko.computed(function(){
                var total = 0;
                for(var i = 0; i < self.servicesTonnageSelected().length; i++){
                    total += self.servicesTonnageSelected()[i].totalPrice();
                }
                return total;
            });

            self.init()

        }
});
