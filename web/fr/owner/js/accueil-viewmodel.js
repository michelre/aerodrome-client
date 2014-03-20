define(["knockout"], function (ko) {
    return function accueilVM(baseVM) {
        var self = this;

        //OBSERVABLES
		self.currentAirbaseManager = ko.observable(baseVM.currentAirebaseManager());
        //NOT OBSERVABLES


        //SERVICES
		
        //COMPUTED

    };
});