
var pwdDisplayElement = document.createElement("textarea"); 
document.getElementById("box").appendChild(pwdDisplayElement);
pwdDisplayElement.setAttribute("style" , "border-style: none; text-align:center; width:80%; margin-left:10%; margin-top:10%; position:absolute;");
pwdDisplayElement.setAttribute("readonly", "true");

userInputAndValidation();

function userInputAndValidation()
{
     passwordLen = parseInt(prompt("How many characters long do you want your password to be? (Enter a number from 8-128)"));
     console.log(passwordLen);
     if(passwordLen == "")
     {
         location.reload();
     }
     isUcAlpha = confirm("Do you want Upper case characters?");
     isLcAlpha = confirm("Do you want Lower case characters?");
     isSpecChar = confirm("Do you want special characters?");
     isNum = confirm("Do you want Numbers?");

    if(!(passwordLen >= 8 && passwordLen <= 128))
    {
        alert("Password Length must be from 8 to 128 characters");
        userInputAndValidation();

    }

    if(!(isUcAlpha || isLcAlpha || isSpecChar || isNum))
    {
        alert("Select atleast one set of characters");
        userInputAndValidation();

    }
    
}

var ucAlphaCharList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lcAlphaCharList = "abcdefghijklmnopqrstuvwxyz";
var specialCharList = "-*$&!#%";
var numList = "0123456789";

var pwdCharObjList = [upperCase = {arr : ucAlphaCharList, enabled: isUcAlpha}, lowerCase = {arr : lcAlphaCharList, enabled: isLcAlpha}, specialChar = {arr : specialCharList, enabled: isSpecChar} , numbers = {arr : numList, enabled: isNum}];

var selectedArryList = [];

console.log("1");
console.log(pwdCharObjList);


document.getElementById("generate-button").addEventListener("click",function() {genPassword(passwordLen)});
document.getElementById("cpyToClipboard").addEventListener("click",function() {copyToClipboard()});

function genPassword(pwdLen)
{
    selectedArryList = [];
    for(let i=0; i<pwdCharObjList.length;i++)
    {
        if(pwdCharObjList[i].enabled)
        {
            selectedArryList.push(pwdCharObjList[i].arr);
        }
    }

    console.log("2");
    console.log(selectedArryList);

    var noOfChars = Math.floor(pwdLen/selectedArryList.length);
    var remainingChars = pwdLen%selectedArryList.length;

    var password = '';

    for(let i=0; i<selectedArryList.length; i++)
    {
        for(let j=0; j<noOfChars; j++)
        {
            password += selectedArryList[i].charAt(Math.floor(Math.random() * selectedArryList[i].length));
        }
    }

    console.log(password);
    console.log(noOfChars);
    console.log(remainingChars);

    if(remainingChars != 0)
    {
        var selectedArray = selectedArryList[Math.floor(Math.random() * selectedArryList.length)];
        
        for(let i=0; i< remainingChars; i++)
        {
            password += selectedArray.charAt(Math.floor(Math.random() * selectedArray.length));
        }
                
    }

    password = password.split('').sort(function() {return (0.5 - Math.random())}).join('');

    console.log(password);
    pwdDisplayElement.textContent = password;

}

function copyToClipboard()
{
    pwdDisplayElement.select();
    document.execCommand('copy');
    pwdDisplayElement.blur();
}


