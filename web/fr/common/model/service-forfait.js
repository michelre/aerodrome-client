define(["knockout"], function (ko) {
    return function ServiceForfait(id, name, price, desc, aircraftTypeCode, airbaseId) {
        var self = this;
		
		var noErrorIconClass = 'fa fa-check';
		var errorIconClass = 'fa fa-times';
		
		var noErrorClass = 'has-success';
		var errorClass = 'has-error';

        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.type = ko.observable("forfait");
        self.price = ko.observable(price);
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);
        self.airbaseId = ko.observable(airbaseId);

        self.checked = ko.observable(false);
        self.quantity = ko.observable(1);
		
		self.isValid = function () {
			if(self.checkName()===noErrorClass &&
			self.checkDesc()===noErrorClass &&
			self.checkPrice()===noErrorClass){
				return true;
			}else{
				return false;
			}
		};
		
		//Validator
		self.isPositiveNumber = function(value){
			return (""+value).length>0 && !isNaN(value)	&& eval(value)>=0;
		};
		
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
		
		self.checkPriceIcon = ko.computed(function(){
			return self.isPositiveNumber(self.price()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkPrice = ko.computed(function(){
			return self.isPositiveNumber(self.price()) ? noErrorClass : errorClass;
		});

        self.totalPrice = ko.computed(function(){
            return self.quantity() * self.price();
        });

		self.fixPriceDecimal = ko.computed(function(){
			if(self.checkPrice()===noErrorClass) self.price(parseFloat(self.price()).toFixed(2));
		});

        self.formatedTotalPrice = ko.computed(function(){
            if(self.totalPrice())
                return parseFloat(self.totalPrice()).toFixed(2);
        });

        self.formatedPrice = ko.computed(function(){
            //if(self.price())
                return parseFloat(self.price()).toFixed(2);
        });
    };
});
