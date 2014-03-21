define(["knockout", "common/model/weight-range"], function (ko, weightRange) {
    return function ServiceTonnage(id, name, desc, aircraftTypeCode, airbaseId, weightRangeServices) {
        var self = this;

        var noErrorIconClass = 'fa fa-check';
        var errorIconClass = 'fa fa-times';

        var noErrorClass = 'has-success';
        var errorClass = 'has-error';


        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.type = ko.observable("tonnage");
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);
        self.weightRangeServices = ko.observableArray([]);
        self.airbaseId = ko.observable(airbaseId);

        self.aircraftWeight = ko.observable(undefined);

        self.quantity = ko.observable(1);

        //SERVICES
        self.init = function () {
            if (weightRangeServices) {
                for (var i = 0; i < weightRangeServices.length; i++) {
                    self.weightRangeServices.push(new weightRange(weightRangeServices[i].service_id, weightRangeServices[i].weightRangeService_id, weightRangeServices[i].weightRangeService_tonMin,
                        weightRangeServices[i].weightRangeService_tonMax, weightRangeServices[i].weightRangeService_priceFixed,
                        weightRangeServices[i].weightRangeService_pricePerTon));
                }
            }
        };

        self.findCorrectWeightRange = function (aircraftWeight) {
            for (var i = 0; i < self.weightRangeServices().length; i++) {
                if (self.weightRangeServices()[i].tonMin() <= aircraftWeight && aircraftWeight < self.weightRangeServices()[i].tonMax())
                    return self.weightRangeServices()[i];
            }
            return self.weightRangeServices()[self.weightRangeServices().length - 1];
        };

        self.isValid = function () {
            if (self.checkName() === noErrorClass &&
                self.checkDesc() === noErrorClass) {
                for (var i = 0; i < self.weightRangeServices().length; i++) {
                    if (self.weightRangeServices()[i].checkTonMin() === errorClass ||
                        self.weightRangeServices()[i].checkTonMax() === errorClass ||
                        self.weightRangeServices()[i].checkPriceFixed() === errorClass ||
                        self.weightRangeServices()[i].checkPricePerTon() === errorClass) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        };
        //COMPUTED

        self.price = ko.computed(function () {
            if (self.aircraftWeight()) {
                var weightRange = self.findCorrectWeightRange(parseFloat(self.aircraftWeight()));
                var diffWeightMax = parseFloat(self.aircraftWeight()) - parseFloat(weightRange.tonMin());
                return (parseFloat(weightRange.pricePerTon()) > 0) ? parseFloat(weightRange.priceFixed()) + (diffWeightMax * parseFloat(weightRange.pricePerTon())) : parseFloat(weightRange.priceFixed())
            }
            return null;
        });

        self.checkName = ko.computed(function () {
            return self.name() !== "" ? noErrorClass : errorClass;
        });

        self.checkNameIcon = ko.computed(function () {
            return self.name() !== "" ? noErrorIconClass : errorIconClass;
        });

        self.checkDesc = ko.computed(function () {
            return self.desc() !== "" ? noErrorClass : errorClass;
        });

        self.checkDescIcon = ko.computed(function () {
            return self.desc() !== "" ? noErrorIconClass : errorIconClass;
        });

        self.totalPrice = ko.computed(function () {
            return self.quantity() * self.price();
        });

        self.formatedTotalPrice = ko.computed(function () {
            if (self.totalPrice())
                return parseFloat(self.totalPrice()).toFixed(2);
        });

        self.formatedPrice = ko.computed(function () {
            if (self.price())
                return parseFloat(self.price()).toFixed(2);
        });

        self.init();

    };
});
