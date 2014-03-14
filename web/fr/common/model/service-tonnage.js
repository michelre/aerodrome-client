define(["knockout", "common/model/weight-range"], function (ko, weightRange) {
    return function ServiceTonnage(id, name, desc, aircraftTypeCode, weightRangeServices) {
        var self = this;

        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);
        self.weightRangeServices = ko.observableArray([]);

        self.checked = ko.observable(false);

        self.aircraftWeight = ko.observable(undefined);

        //SERVICES
        self.init = function(){
            for(var i = 0; i < weightRangeServices.length; i++){
                self.weightRangeServices.push(new weightRange(weightRangeServices[i].weightRangeService_tonMin,
                    weightRangeServices[i].weightRangeService_tonMax, weightRangeServices[i].weightRangeService_priceFixed,
                    weightRangeServices[i].weightRangeService_pricePerTon))
            }
        };

        self.findCorrectWeightRange = function(aircraftWeight){
            for(var i = 0; i < self.weightRangeServices().length; i++){
                if(self.weightRangeServices()[i].tonMin() <= aircraftWeight && aircraftWeight < self.weightRangeServices()[i].tonMax())
                    return self.weightRangeServices()[i];
            }
            return self.weightRangeServices()[self.weightRangeServices().length-1];
        };

        //COMPUTED

        self.price = ko.computed(function(){
            if(self.aircraftWeight()){
                var weightRange = self.findCorrectWeightRange(parseFloat(self.aircraftWeight()));
                var diffWeightMax = self.aircraftWeight() - weightRange.tonMin();
                return (weightRange.pricePerTon() > 0) ? weightRange.priceFixed() + (diffWeightMax * weightRange.pricePerTon()) : weightRange.priceFixed();
            }
            return null;
        });

        self.init();

    }
});
