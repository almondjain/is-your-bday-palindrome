var bdayDate = document.querySelector("#bday-input");
var checkbtn = document.querySelector("#check-btn");
var result = document.querySelector(".output");

function reverseDate(date){
    //split every character
    var listOfChars = str.split("");
    //reverse the listofchars
    var reversedListofChars = listOfChars.reverse();
    //now join all the reversed char (reversed list), as it will form a reversed string
    var reversedString = reversedListofChars.join("");
    //now return the reversed string
    return reversedString;
}

function isStringPalindrome(date){
    //it will return true or false, whether string is palindrome or not
    var reversedDate = reverseDate(date);
    return date === reversedDate;
}

function getDateInAllFormats(date){
    //we will create all possible formats of date, and send them in list

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];

}

function checkPalindrome(date){
    //before checking palindrome, we will fetch date in all formats, bcz we need to check on all these
    var dateFormatList = getDateInAllFormats(date);
    //for storage
    var palindromList = [];

    for(var i=0;i<dateFormatList.length;i++){
        //for each format of date we will check whether date is Palindrome or not
        var res =  isStringPalindrome(dateFormatList[i]);
        //push the result into list
        palindromList.push(res);
    }
    return palindromList;
}

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
        //now check Palindrome for the date
        var list = checkPalindrome(dateString);

    }

}

checkbtn.addEventListener("click",checkBday);