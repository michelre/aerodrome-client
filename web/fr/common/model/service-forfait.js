define(["knockout"], function (ko) {
    return function ServiceForfait(id, name, price, desc, aircraftTypeCode) {
        var self = this;


        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.price = ko.observable(price);
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);

    }
});
