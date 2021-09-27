var bdayDate = document.querySelector("#bday-input");
var checkbtn = document.querySelector("#check-btn");
var result = document.querySelector(".output");

function isLeapYear(year){
    //check whether year is leap year or not
    if(year%400 === 0){
        return true;
    }

    if(year%100 === 0){
        return false;
    }

    if(year%4 === 0){
        return true;
    }

    return false;
}

function getNextDate(date){
    //normally, we will add 1 to the date, for the next date
    var day = date.day +1;
    //month and year doesnot incement on next day
    var month = date.month;
    var year = date.year;

    //created a list where we added no of days in each month, for further calculation
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //but what if, it is last date of the month, then month will change
    //what if it is febuary, and there is leap year 
    //what if it is last day of year, so year also increases

    //if month is febuary
    if(month === 2){
        //now if it is Leap Year then we have range of 29 days, otherwise 28 days
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month=3;
            }
        }
        //if is is not a leap year, then it will have range of 28 days
        else{
            if(day>28){
                day=1;
                month=3;
            }
        }
    } 
    //for rest of the months
    else{
        //due to index value we are doing -1
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    //now we will go for year, if month>12, them it would be next year
    if(month>12){
        month=1;
        year++;
    }

    //now return the next(calculated) date
    return {day:day, month:month, year:year};
}

function getNextPalindromeDate(date){
    //we will check on every next date, so fetch next date
    var nextDate = getNextDate(date);
    //this counter will give no of days
    var counter = 0;

    //this loop will continue until we get palindrome
    while(1){
        counter++;
        //get date in string format
        var dateStr = getDateAsString(nextDate);
        //check whether date is palindome or not
        var resultList = checkPalindrome(dateStr);

        for(let i=0;i<resultList.length;i++){
            if(resultList[i]){
                return [counter,nextDate];
            }
        }
        //if it is not a palindrome then get next date and update it
        nextDate = getNextDate(nextDate);
    }
}

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
            year: Number(yy)
        };

        //collect day,month and year as single string
        var dateString = getDateAsString(date);
        //now check Palindrome for the date
        var list = checkPalindrome(dateString);

        //now we will check, if any value of list of checkPalindrome method is true, then we will updtae
        //our var isPalidrome and break, bcz it indicates that yes, given date is Palindrome
        var isPalindrome = false;
        for(let i=0;i<list.length;i++){
            if(list[i]){
                isPalindrome=true;
                break;
            }
        }

        //now we will check, what if date is not a palindrome
        //in this case we have return nearest possible value of date which can be a palindrome
        if(!isPalindrome){
            //we will fetch next closest Palindrome Date
            const [count1,nextDate] = getNextPalindromeDate(date);
        }
    }

}

checkbtn.addEventListener("click",checkBday);