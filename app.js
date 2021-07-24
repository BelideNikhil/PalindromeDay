
const result=document.querySelector("#btn");
let userDate=document.querySelector("#user_birthday")
const daysInAMonth=[31,28,31,30,31,30,31,31,30,31,30,31]

result.addEventListener("click",()=>{
    if(userDate.value===''){
        console.log("please enter")
    }
    else{
        inputDatehandler()
    }
})


function inputDatehandler(){
    // below splits date and srores as array
    const dateArray=userDate.value.split("-")
    const inputDay=dateArray[2]
    const inputMonth=dateArray[1]
    const inputYear=dateArray[0]
    let returnedValue= checkFormats(inputDay,inputMonth,inputYear)
    if(returnedValue){
        console.log(`yay, ${returnedValue}`)
    }else{
        let nearestPali=nextPalindrome(inputDay,inputMonth,inputYear)
        console.log(`nearest pali is ${nearestPali}`)
    }
}

// changes formats 
function checkFormats(dd,mm,yyyy){
    const formatOne=dd+mm+yyyy
    const formatTwo=mm+dd+yyyy
    const formatThree=dd+mm+(yyyy.substring(2))

    if(isPalindrome(formatOne)){
        return (`${dd}-${mm}-${yyyy}`)
    }else if(isPalindrome(formatTwo)){
        return (`${mm}-${dd}-${yyyy}`)
    }else if(isPalindrome(formatThree)){
        return `${dd}-${mm}-${yyyy.substring(2)}`
    }else{
        return null
    }
}
// checks if given date is palindrome or not.
function isPalindrome(dateString){
    const reverseString=dateString.split('').reverse().join('')
    if(dateString!=reverseString){
        return false
    }return true
}

// gives us nearest pali when birthday is not pali
function nextPalindrome(day,month,year){
    let ddOne=Number(day)
    let mmOne=Number(month)
    let yyOne=Number(year)

    let ddTwo=Number(day)
    let mmTwo=Number(month)
    let yyTwo=Number(year)

    for(let i=1;i>0;i++){
        // B not palindrome so starting with next day
        // future
        ddOne=ddOne+1;
        if(ddOne>Number(daysInAMonth[mmOne-1])){
            ddOne=1;
            mmOne=mmOne+1
            if(mmOne>12){
                mmOne=1;
                yyOne = yyOne+1
            }
        }
        let ddInString=ddOne.toString()
        let mmInString=mmOne.toString()
        let yyInString=yyOne.toString()
        // apending 0 if date/month is in 0-9
        if(ddInString.length==1){
            ddInString="0"+ddInString
        } 
        if(mmInString.length==1){
            mmInString="0"+mmInString
        }

        let flagDate=checkFormats(ddInString,mmInString,yyInString)
        if(flagDate){
            return (`${flagDate}`)
        }
        // history

        if(yyTwo>1){
            ddTwo=ddTwo-1;
            if(ddTwo<1){
                mmTwo=mmTwo-1;
                if(mmTwo<1){
                    mmTwo=12;
                    yyTwo=yyTwo-1;
                    if(yyTwo<1){
                        break;
                    }
                    ddTwo=daysInAMonth[mmTwo-1]
                }
            }


            let ddInString=ddTwo.toString()
            let mmInString=mmTwo.toString()
            let yyInString=yyTwo.toString()
            if(ddInString.length==1){
                ddInString="0"+ddInString
            } 
            if(mmInString.length==1){
                mmInString="0"+mmInString
            }

            let flagDate=checkFormats(ddInString,mmInString,yyInString)
            if(flagDate){
                return (`${flagDate}`)
            }

        }
        
    }
}
