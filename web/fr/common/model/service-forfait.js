define(["knockout"], function (ko) {
    return function ServiceForfait(id, name, price, desc, aircraftTypeCode) {
        var self = this;
		
		var noErrorIconClass = 'fa fa-check';
		var errorIconClass = 'fa fa-times';
		
		var noErrorClass = 'has-success';
		var errorClass = 'has-error';

        //OBSERVABLES
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.price = ko.observable(price);
        self.desc = ko.observable(desc);
        self.aircraftTypeCode = ko.observable(aircraftTypeCode);

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
			return (""+self.price()).length>0 && !isNaN(self.price()) ? noErrorIconClass : errorIconClass;
		});
		
		self.checkPrice = ko.computed(function(){
			return (""+self.price()).length>0 && !isNaN(self.price()) ? noErrorClass : errorClass;
		});

        self.totalPrice = ko.computed(function(){
            return self.quantity() * self.price();
        });

        self.formatedTotalPrice = ko.computed(function(){
            if(self.totalPrice())
                return self.totalPrice().toFixed(2)
        })

        self.formatedPrice = ko.computed(function(){
            //if(self.price())
                return self.price().toFixed(2);
        });
    }
});
