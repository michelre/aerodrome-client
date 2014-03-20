define(["knockout"], function (ko) {
    return function WeightRange(id,tonMin, tonMax, priceFixed, pricePerTon) {
		var noErrorIconClass = 'fa fa-check';
		var errorIconClass = 'fa fa-times';
		
		var noErrorClass = 'has-success';
		var errorClass = 'has-error';
		
        var self = this;
        self.tonMin = ko.observable(tonMin);
        self.tonMax = ko.observable(tonMax);
        self.priceFixed = ko.observable(priceFixed);
        self.pricePerTon = ko.observable(pricePerTon);
		self.id = ko.observable(id);
		
		//Validators
		self.isPositiveNumber = function(value){
			return (""+value).length>0 && !isNaN(value)	&& eval(value)>=0;
		};
		self.checkTonMin = ko.computed(function(){
			return self.isPositiveNumber(self.tonMin()) ? noErrorClass : errorClass;
		});
		
		self.checkTonMinIcon = ko.computed(function(){
			return self.isPositiveNumber(self.tonMin()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkTonMax = ko.computed(function(){
			return self.isPositiveNumber(self.tonMax()) ? noErrorClass : errorClass;
		});
		
		self.checkTonMaxIcon = ko.computed(function(){
			return self.isPositiveNumber(self.tonMax()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkPriceFixed = ko.computed(function(){
			return self.isPositiveNumber(self.priceFixed()) ? noErrorClass : errorClass;
		});
		
		self.checkPriceFixedIcon = ko.computed(function(){
			return self.isPositiveNumber(self.priceFixed()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkPricePerTon = ko.computed(function(){
			return self.isPositiveNumber(self.pricePerTon()) ? noErrorClass : errorClass;
		});
		
		self.checkPricePerTonIcon = ko.computed(function(){
			return self.isPositiveNumber(self.pricePerTon()) ? noErrorIconClass : errorIconClass;
		});
		
		self.fixDecimal = ko.computed(function(){
			if(self.checkPriceFixed()===noErrorClass) self.priceFixed(parseFloat(self.priceFixed()).toFixed(2));
		});
    };
});
