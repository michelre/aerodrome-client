define(["knockout", "common/model/weight-range"], function (ko, weightRange) {
    return function ServiceTonnage(id, name, price, desc, aircraftTypeCode, weightRangeServices) {
        var self = this;

        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.price = ko.observable(price);
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);
        self.weightRangeServices = ko.observableArray([]);

        self.checked = ko.observable(false);

        //SERVICES
        self.init = function(){
            for(var i = 0; i < weightRangeServices.length; i++){
                self.weightRangeServices.push(new weightRange(weightRangeServices[i].weightRangeService_tonMin,
                    weightRangeServices[i].weightRangeService_tonMax, weightRangeServices[i].weightRangeService_priceFixed,
                    weightRangeServices[i].weightRangeService_pricePerTon))
            }
        }

        self.init();

    }
});
