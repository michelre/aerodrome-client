define(["knockout", "common/model/weight-range"], function (ko, weightRange) {
    return function ServiceTonnage(id, name, desc, aircraftTypeCode, weightRangeServices) {
        var self = this;
		
		var noErrorIconClass = 'fa fa-check';
		var errorIconClass = 'fa fa-times';
		
		var noErrorClass = 'has-success';
		var errorClass = 'has-error';
		
        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);
        self.weightRangeServices = ko.observableArray([]);

        self.aircraftWeight = ko.observable(undefined);

        //SERVICES
        self.init = function(){
            for(var i = 0; i < weightRangeServices.length; i++){
                self.weightRangeServices.push(new weightRange(weightRangeServices[i].service_weightRangeService_id,weightRangeServices[i].service_WeightRangeService_tonMin,
                    weightRangeServices[i].service_WeightRangeService_tonMax, weightRangeServices[i].service_WeightRangeService_priceFixed,
                    weightRangeServices[i].service_WeightRangeService_pricePerTon))
            }
        };

        self.findCorrectWeightRange = function(aircraftWeight){
            for(var i = 0; i < self.weightRangeServices().length; i++){
                if(self.weightRangeServices()[i].tonMin() <= aircraftWeight && aircraftWeight < self.weightRangeServices()[i].tonMax())
                    return self.weightRangeServices()[i];
            }
            return self.weightRangeServices()[self.weightRangeServices().length-1];
        };
		
		self.isValid = function () {
			if(self.checkName()===noErrorClass &&
			self.checkDesc()===noErrorClass){
				for (var i = 0; i < self.weightRangeServices().length; i++) {
					if(self.weightRangeServices()[i].checkTonMin()===errorClass ||
						self.weightRangeServices()[i].checkTonMax()===errorClass ||
						self.weightRangeServices()[i].checkPriceFixed()===errorClass ||
						self.weightRangeServices()[i].checkPricePerTon()===errorClass){
						return false;	
					}
				}
				return true;
			}else{
				return false;
			}
		};
        //COMPUTED

        self.price = ko.computed(function(){
            if(self.aircraftWeight()){
                var weightRange = self.findCorrectWeightRange(parseFloat(self.aircraftWeight()));
                var diffWeightMax = self.aircraftWeight() - weightRange.tonMin();
                return (weightRange.pricePerTon() > 0) ? Math.round((weightRange.priceFixed() + (diffWeightMax * weightRange.pricePerTon()))*100)/100 : weightRange.priceFixed();
            }
            return null;
        });
		
		self.checkName = ko.computed(function(){
			return self.name()!=="" ? noErrorClass : errorClass;
		});
		
		self.checkNameIcon = ko.computed(function(){
			return self.name()!=="" ? noErrorIconClass : errorIconClass;
		});
		
		self.checkDesc = ko.computed(function(){
			return self.desc()!=="" ? noErrorClass : errorClass;
		});
		
		self.checkDescIcon = ko.computed(function(){
			return self.desc()!=="" ? noErrorIconClass : errorIconClass;
		});

        self.init();

    }
});
