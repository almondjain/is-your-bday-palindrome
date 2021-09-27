var bdayDate = document.querySelector("#bday-input");
var checkbtn = document.querySelector("#check-btn");
var result = document.querySelector(".output");

//It willl return day,montha and year as a string
function getDateAsString(date){
    var dateInString = {day:"", month:"", year:""};
    
    //if day is leass than 10 then have to add 0 in front of them, like 9 -> 09
    if(date.day < 10){
        dateInString.day = "0"+date.day;
    }
    //if day is greater than 10 (like 24) then convert them into string
    else{
        dateInString.day = date.day.toString();
    }

    //Now similarly check for month as well, if less than 10 then add 0, else convert into string
    if(date.month<10){
        dateInString.month = "0"+date.month;
    }else{
        dateInString.day = date.month.toString();
    }

    //there is no need to check for year, as we need not to add 0 inthat case, just convert them into String
    dateInString.year = date.year.toString();

    return dateInString;
}

function checkBday(){
    var bdayString = bdayDate.value;

    //check whether string is empty or not
    if(bdayString !== ""){
        //splitting on the basis of -, and taking only numerical vaalues
        var date = bdayString.split("-");
        //storing date, month and year seperately
        var yy = date[0];
        var mm = date[1];
        var dd = date[2];

        //storing date in a object
        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yy);
        };

        //collect day,month and year as single string
        var dateString = getDateAsString(date);

    }

}

checkbtn.addEventListener("click",checkBday);