define(["knockout"], function (ko) {
    return function WeightRange(tonMin, tonMax, priceFixed, pricePerTon, editionStatus) {
		var noErrorIconClass = 'fa fa-check';
		var errorIconClass = 'fa fa-times';
		
		var noErrorClass = 'has-success';
		var errorClass = 'has-error';
		
        var self = this;
        self.tonMin = ko.observable(tonMin);
        self.tonMax = ko.observable(tonMax);
        self.priceFixed = ko.observable(priceFixed);
        self.pricePerTon = ko.observable(pricePerTon);
		
		self.editionStatus = ko.observable(editionStatus);//delete update ou create
		
		//Validators
		self.checkTonMin = ko.computed(function(){
			return (""+self.tonMin()).length>0 && !isNaN(self.tonMin()) ? noErrorClass : errorClass;
		});
		
		self.checkTonMinIcon = ko.computed(function(){
			return (""+self.tonMin()).length>0 && !isNaN(self.tonMin()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkTonMax = ko.computed(function(){
			return (""+self.tonMax()).length>0 && !isNaN(self.tonMax()) ? noErrorClass : errorClass;
		});
		
		self.checkTonMaxIcon = ko.computed(function(){
			return (""+self.tonMax()).length>0 &&!isNaN(self.tonMax()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkPriceFixed = ko.computed(function(){
			return (""+self.priceFixed()).length>0 &&!isNaN(self.priceFixed()) ? noErrorClass : errorClass;
		});
		
		self.checkPriceFixedIcon = ko.computed(function(){
			return (""+self.priceFixed()).length>0 &&!isNaN(self.priceFixed()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkPricePerTon = ko.computed(function(){
			return (""+self.pricePerTon()).length>0 &&!isNaN(self.pricePerTon()) ? noErrorClass : errorClass;
		});
		
		self.checkPricePerTonIcon = ko.computed(function(){
			return (""+self.pricePerTon()).length>0 &&!isNaN(self.pricePerTon()) ? noErrorIconClass : errorIconClass;
		});
    }
});
