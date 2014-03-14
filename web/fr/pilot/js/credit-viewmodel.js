define(["knockout"], function (ko) {
    return function creditVM(baseVM) {
        var self = this;
		var baseVM = baseVM;
        //OBSERVABLES

		 self.pilotAccount = ko.observable(baseVM.currentPilot());
		
		 //self.credit=ko.observable();
		 self.montantCredit=ko.observable("");


        //NOT OBSERVABLES


        //SERVICES

        //COMPUTED
		
		 self.nouveauCredit=ko.computed(function(){
		 	
			return self.pilotAccount().credit();
		 
		 });
		 
		 console.log(self.pilotAccount().credit());

    }
});