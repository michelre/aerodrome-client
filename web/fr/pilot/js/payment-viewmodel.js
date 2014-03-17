define(["knockout", "typeahead", "common/js/mock/services-ajax-bis", "pilot/binding/autocomplete-airbase" ,"common/model/airbase", "common/model/plane", "common/model/service-forfait", "common/model/service-tonnage", "common/model/landing"],
    function (ko, typeahead, services, autocompleteAirbase, airbase, plane, serviceForfait, serviceTonnage, landing) {
    return function paymentVM(baseVM) {
            var self = this;

            //OBSERVABLES
            self.pilot           = ko.observable(baseVM.currentPilot());
            self.currentStep     = ko.observable("atterissage");
            self.airbases        = ko.observableArray([]);
            self.servicesForfait = ko.observableArray([]);
            self.servicesTonnage = ko.observableArray([]);
            self.plane           = ko.observable();
            self.landing         = ko.observable();
            self.airbaseInput    = ko.observable("");

            self.servicesForfaitSelected = ko.observableArray([]);
            self.servicesTonnageSelected = ko.observableArray([]);

            self.errorForm       = ko.observable(false);
            self.selectedServiceType = ko.observable("forfait");
            self.total           = ko.observable(20000);


            //NOT OBSERVABLES
            self.airbasesJSON = [];

            //SERVICES
            self.init = function(){
                //PROVISOIRE
                self.getServicesByAirbase(0)

                self.plane(new plane("", ""));
                self.landing(new landing(undefined, "", ""));
                self.getAirbases();
            }

            self.getAirbases = function(callback){
                services.getAirbases(function(data){
                    for(var i = 0; i < data.length; i++){
                        self.airbases.push(new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address))
                        self.airbasesJSON.push({ "fullTextSearch": self.airbases()[i].fullTextSearch() })
                    }
                });
            };

            self.getServicesByAirbase = function(id){
                self.servicesForfait.removeAll();
                self.servicesTonnage.removeAll();
                services.getServicesByAirbase(id, function(data){
                    for(var i = 0; i < data.length; i++){
                        if(data[i].service_type === "forfait"){
                            self.servicesForfait.push(new serviceForfait(data[i].service_id, data[i].service_name, data[i].service_price,
                                data[i].service_desc, data[i].service_aircraftTypeCode));
                        }
                        if(data[i].service_type === "tonnage"){
                            self.servicesTonnage.push(new serviceTonnage(data[i].service_id, data[i].service_name,
                                data[i].service_desc, data[i].service_aircraftTypeCode, data[i].services_weightRangeServices));
                        }
                    }
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
                    self.getServicesByAirbase(self.landing().airbase().id());
                    self.errorForm(false);
                    self.currentStep("avion");
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
                }else{
                    self.errorForm(true);
                }
            };

            self.previousStepPlaneButton = function(){
                self.currentStep("atterissage");
            };

            self.nextStepServicesButton = function(){
                self.currentStep("validation")
            };

            self.previousStepServicesButton = function(){
                self.currentStep("avion");
            };

            self.nextStepValidationButton = function(){
                self.currentStep("paiement")
            };

            self.previousStepValidationButton = function(){
                self.currentStep("services");
            };

            self.payButton = function(){
                console.log("paiement")
            }

            self.previousStepPaiementButton = function(){
                self.currentStep("validation");
            };

            self.changeSelectedServiceType = function(data, event){
                self.selectedServiceType(event.currentTarget.value);
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
                return (self.currentStep() === 'atterissage') ? "fa fa-pencil" : "";
            });

            self.currentStepAvionClass = ko.computed(function(){
                return (self.currentStep() === 'avion') ? "fa fa-pencil" : "";
            });

            self.currentStepServicesClass = ko.computed(function(){
                return (self.currentStep() === 'services') ? "fa fa-pencil" : "";
            });

            self.currentStepValidationClass = ko.computed(function(){
                return (self.currentStep() === 'validation') ? "fa fa-pencil" : "";
            });

            self.currentStepPaiementClass = ko.computed(function(){
                return (self.currentStep() === 'paiement') ? "fa fa-pencil" : "";
            });

            self.totalPrice = ko.computed(function(){
                var total = 0;
                for(var i = 0; i < self.servicesForfaitSelected().length; i++){
                    total += self.servicesForfaitSelected()[i].price();
                }
                for(var i = 0; i < self.servicesTonnageSelected().length; i++){
                    total += self.servicesTonnageSelected()[i].price();
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
                    total += self.servicesForfaitSelected()[i].price();
                }
                return total;
            });

            self.totalTonnage = ko.computed(function(){
                var total = 0;
                for(var i = 0; i < self.servicesTonnageSelected().length; i++){
                    total += self.servicesTonnageSelected()[i].price();
                }
                return total;
            });

            self.init()

        }
});
