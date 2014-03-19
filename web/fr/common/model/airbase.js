define(["knockout", "common/model/manager"], function (ko, _manager) {
    return function Airbase(id,name, address, runwayNB, manager) {
        var self = this;
		
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.address = ko.observable(address);
		self.runwayNB = ko.observable(runwayNB);
		self.manager = ko.observable(undefined);

        self.fullTextSearch = ko.computed(function(){
            if(self.name() && self.address())
                return self.name() + " - " + self.address();
        });

        self.init = function(){
            self.manager(new _manager(manager.airbaseManager_id, manager.airbaseManager_firstName, manager.airbaseManager_lastName,
                manager.airbaseManager_address, manager.airbaseManager_phone, manager.airbaseManager_mail, manager.airbaseManager_pass))
        }

        self.init();

    }
});
