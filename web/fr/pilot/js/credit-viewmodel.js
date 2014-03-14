define(["knockout"], function (ko) {
    return function creditVM() {
        var self = this;

        //OBSERVABLES
		 self.pilotAccount = ko.observable(new pilot("","","","","","",""));
		 self.credit=ko.observable("");
		 self.nouveauCredit=ko.observable("");
		 self.montantCredit=ko.observable("");


        //NOT OBSERVABLES


        //SERVICES

        //COMPUTED

    }
});