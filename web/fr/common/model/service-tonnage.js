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

        self.quantity = ko.observable(1);

        //SERVICES
        self.init = function(){
			//console.log(weightRangeServices.length);
			if(weightRangeServices===undefined){
				weightRangeServices=[];
			}
            for(var i = 0; i < weightRangeServices.length; i++){
                self.weightRangeServices.push(new weightRange(weightRangeServices[i].weightRangeService_id,weightRangeServices[i].weightRangeService_tonMin,
                    weightRangeServices[i].weightRangeService_tonMax, weightRangeServices[i].weightRangeService_priceFixed,
                    weightRangeServices[i].weightRangeService_pricePerTon));
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

        self.totalPrice = ko.computed(function(){
            return self.quantity() * self.price();
        })

        self.init();

    };
});
