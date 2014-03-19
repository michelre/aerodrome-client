define([], function(){
    return {
        getCurrentTime: function(){
            var date = new Date();
            return date.toTimeString().split(/ /)[0];
        },
        getCurrentDate: function(){
            var date = new Date();
            var months = {
                "0": "01",
                "1": "02",
                "2": "03",
                "3": "04",
                "4": "05",
                "5": "06",
                "6": "07",
                "7": "08",
                "8": "09",
                "9": "10",
                "10": "11",
                "11": "12"
            }

            return date.getUTCFullYear() + "-" + months[date.getUTCMonth()] + "-" + date.getUTCDate();
        },
        generatePassword: function(numMaj, numMin, numNum){
            var maj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var min = "abcdefghijklmnopqrstuvwxyz";
            var num = "0123456789";
            var pass = "";
            for(var i = 0; i < numMaj; i++){
                var numCharRandom = Math.floor((Math.random()*maj.length)+1)-1;
                pass += maj.charAt(numCharRandom);
            }
            for(var i = 0; i < numMin; i++){
                var numCharRandom = Math.floor((Math.random()*min.length)+1)-1;
                pass += min.charAt(numCharRandom);
            }
            for(var i = 0; i < numNum; i++){
                var numCharRandom = Math.floor((Math.random()*num.length)+1)-1;
                pass += num.charAt(numCharRandom);
            }
            return pass;
        }
    }
})
