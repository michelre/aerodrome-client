define(["knockout"], function (ko) {
    return function Airbase(id,name, address, runwayNB, manager) {
        var self = this;
		
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.address = ko.observable(address);
		self.runwayNB = ko.observable(runwayNB);
		self.manager = ko.observable(manager);

        self.fullTextSearch = ko.computed(function(){
            return self.name() + " - " + self.address();
        });

    }
});
