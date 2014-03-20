define(["knockout", "typeahead", "common/js/services-ajax", "pilot/binding/autocomplete-airbase" ,"common/model/airbase", "common/model/plane", "common/model/service-forfait", "common/model/service-tonnage", "common/model/landing", "common/js/utils"],
    function (ko, typeahead, services, autocompleteAirbase, airbase, plane, serviceForfait, serviceTonnage, landing, utils) {
    return function paymentVM(baseVM) {
            var self = this;

            //OBSERVABLES
            self.pilot           = ko.observable(baseVM.currentPilot());
            self.currentStep     = ko.observable("atterissage");
            self.airbases        = ko.observableArray([]);
            self.plane           = ko.observable();
            self.landing         = ko.observable();
            self.airbaseInput    = ko.observable("");

            self.errorForm       = ko.observable(false);
            self.total           = ko.observable(20000);
            self.paymentType     = ko.observable("paypal");
            self.initAirbasesDone        = ko.observable(false);
            self.services = ko.observableArray([]);
            self.selectedServices = ko.observableArray([]);


            //NOT OBSERVABLES
            self.airbasesJSON = [];

            //SERVICES
            self.init = function(){
                self.plane(new plane("", ""));
                self.landing(new landing(undefined, utils.getCurrentDate(), utils.getCurrentTime()));
                self.getAirbases();
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

            self.getServicesByAirbase = function(id, callback){
                self.services.removeAll();
                self.selectedServices.removeAll();
                services.getServicesByAirbase(id, function(data){
                    for(var i = 0; i < data.length; i++){
                        if(data[i].service_type === "forfait"){
                            self.services.push(new serviceForfait(data[i].service_id, data[i].service_name, data[i].service_price,
                                data[i].service_desc, data[i].service_aircraftType_code, data[i].airbase_id));
                        }
                        if(data[i].service_type === "tonnage"){
                            self.services.push(new serviceTonnage(data[i].service_id, data[i].service_name,
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
                        self.currentStep("avion");
                    });
                }else{
                    self.errorForm(true);
                }
            }

            self.nextStepPlaneButton = function(){
                if(self.plane().allInputsFilled()){
                    self.errorForm(false);
                    self.currentStep("services");
                    for(var i = 0; i < self.services().length; i++){
                        if(self.services()[i].type() === "tonnage")
                            self.services()[i].aircraftWeight(self.plane().weight());
                    }
                }else{
                    self.errorForm(true);
                }
            };

            self.previousStepPlaneButton = function(){
                self.currentStep("atterissage");
            };

            self.nextStepServicesButton = function(){
                self.selectedServices.sort(function(left, right){
                    return left.name() == right.name() ? 0 : (left.name() < right.name() ? -1 : 1)
                })
                self.currentStep("validation")
            };

            self.previousStepServicesButton = function(){
                self.currentStep("avion");
            };

            self.nextStepValidationButton = function(){
                self.currentStep("paiement");
            };

            self.previousStepValidationButton = function(){
                self.currentStep("services");
            };
			//Paiement
            self.payButton = function(){
				
				//payer(montant);
				//alert(self.pilotAccount + self.creditEuros() + self.totalEuros());
            }

            self.previousStepPaiementButton = function(){
                self.currentStep("validation");
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
                for(var i = 0; i < self.selectedServices().length; i++){
                    total += self.selectedServices()[i].totalPrice();
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

            self.init()

        }
});
