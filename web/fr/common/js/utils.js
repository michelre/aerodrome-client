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
            //return date.getUTCDate()+"/0"+date.getUTCMonth()+"/"+date.getUTCFullYear()
        }
    }
})
