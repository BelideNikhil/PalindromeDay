
const result=document.querySelector("#btn");
let userDate=document.querySelector("#user_birthday")
const daysInAMonth=[31,Number(`${new Date().getFullYear() % 4 ? 29 : 28}`),31,30,31,30,31,31,30,31,30,31];

const output=document.querySelector("#output");
const loading_gif=document.querySelector("#gif");


result.addEventListener("click",()=>{
    output.style.display='block'
    if(userDate.value===''){
        output.innerHTML="Please provide a date to find out."
    }
    else{
        output.style.display='none'
        loading_gif.style.display='block'
        setTimeout(()=>{
            output.style.display='block'
            loading_gif.style.display='none'
            inputDatehandler()
        },3500)
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
        output.innerHTML=`Whoa!!! Your birthdate in format ${returnedValue} is palindrome.`

    }else{
        let newData=nextPalindrome(inputDay,inputMonth,inputYear)
        let nearestPal=newData[0]
        let daysAway=newData[1]
        output.innerHTML=`Awww! Your birthdate is not palindrome. Nearest palindrome date is ${nearestPal} You missed it by ${daysAway} days.`
    }
}

// changes formats 
function checkFormats(dd,mm,yyyy){
    let dateStr=dd.toString()
    let monthStr=mm.toString()
    let yearStr=yyyy.toString()
    if(dateStr.length===1){
        dateStr="0"+dateStr
    }
    if(monthStr.length===1){
        monthStr="0"+monthStr
    }

    const formatOne= dateStr+monthStr+yearStr
    const formatTwo=monthStr+dateStr+yearStr
    const formatThree=yearStr+monthStr+dateStr

    if (isPalindrome(formatOne)){
        return (`${dateStr}-${monthStr}-${yearStr}`)
    }
    else if(isPalindrome(formatTwo)){
        return (`${monthStr}-${dateStr}-${yearStr}`);
    }
    else if(isPalindrome(formatThree)){
        return (`${yearStr}-${monthStr}-${dateStr}`);
    }
    else{
        return null
    }
}

// checks if given date is palindrome or not.
function isPalindrome(dateString){
    const reverseString=dateString.toString().split('').reverse().join('')
    if(dateString===reverseString){
        return true
    }
}

// gives us nearest pali when birthday is not pali
function nextPalindrome(day,month,year){
    
    let futuredDate = Number(day);
    let futreMonth = Number(month);
    let futureYear = Number(year);

    let pastDate = Number(day);
    let pastMonth = Number(month);
    let pastYear = Number(year);

    let missedDays = 0;
    while (true) {
        missedDays += 1;
        futuredDate += 1;
        pastDate -= 1;

        // running past and future date simultaneously and returning as soon as we find one
        if (futuredDate > daysInAMonth[futreMonth - 1]) {
            futuredDate = 1;
            futreMonth += 1;
            if (futreMonth > 12) {
                futreMonth = 1;
                futureYear += 1;
                if(futureYear>9999){
                    break
                }
            }
        }
        
        if (pastDate < 1) {
            pastMonth -= 1;
            if (pastMonth < 1) {
                pastYear -= 1;
                if(pastYear < 1) {
                    return ["", ""];
                }else{
                    pastMonth = 12;
                    pastDate = daysInAMonth[pastMonth - 1];
                }
            } else {
            pastDate = daysInAMonth[pastMonth - 1];
            }
        }
    
        console.log(pastDate,pastMonth,pastYear,"==",futuredDate,futreMonth,futureYear)
        // passing the day,month,year to check if pali and break using return statement if true
        const nextPali=checkFormats(futuredDate,futreMonth,futureYear);
        if (nextPali)
            return [nextPali, missedDays];

            const prevPali=checkFormats(pastDate,pastMonth,pastYear);
        if (prevPali)
            return [prevPali, missedDays];
    }
}