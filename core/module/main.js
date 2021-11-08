import { FloatingPoint, FloatTypes, ValueChangeType} from "./float.js";

const MIN_RADIX = 1;
const MAX_RADIX = 36;

/*
    Input Validation
*/

function flipSign()
{
    if (this.innerHTML === "+")
    {
        this.innerHTML = "-";
    }
    else
    {
        this.innerHTML = "+";
    }
}

function validateFloatInput(e)
{
    //const validInput = /[0-9]*/gi;
    var target = e.target;
    var position = target.selectionStart;
    //this.innerHTML = this.innerHTML.match(validInput).join('');
    target.selectionEnd = position;
}

function validateDigitsInput(e)
{
    const validInput = /(^(\+|-)?|^[a-z0-9]*)[a-z0-9]*\.?([a-z0-9]*)|([a-z0-9]+)/gi;
    /*
        What validInput regex represents:
            * Any alphanumeric values are valid.
            * The input can be prepended with one '+' or '-' to represent sign
            * The first match may have 1 decimal point
            * Empty input is allowed
        Examples of strictly valid input:
            * -12498789234.19230
            * -NaN
            * Infinity
            * +.934Jk
    */
    if (typeof validateDigitsInput.previousValidDigits == "undefined")
    {
        validateDigitsInput.previousValidDigits = "";
    }
    var target = e.target;
    var position = target.selectionStart;
    digitInput.value = digitInput.value.match(validInput).join('');
    target.selectionEnd = position;
}

/*
    Float Update
*/

function updateFloatRepresentation(value)
{

}

function updateFloatFromSciNot()
{
    calcFloat = new FloatingPoint(signInput.innerHTML, "1." + mantissaInput.innerHTML, exponentInput.innerHTML, FloatTypes["IEEE_SINGLE_PRECISION"]);
    digitInput.value = calcFloat.value;
    if (calcFloat.sign.toString() == "NaN")
    {
        signOutput.innerHTML = "N/A";
    }
    else
    {
        signOutput.innerHTML = calcFloat.sign;
    }
    let binReturn = calcFloat.extractBinary();
    binSign.innerHTML = binReturn[0];
    binExponent.innerHTML = binReturn[1];
    binMantissa.innerHTML = binReturn[2];
    hexRepresentation.innerHTML = binReturn[3];
}

document.getElementById("jsEnabled").style.display = "block"; // show interface if js enabled

var signInput = document.getElementById("sigsign");
var mantissaInput = document.getElementById("sigmant");
var exponentInput = document.getElementById("sigexp");
var binSign = document.getElementById("binsign");
var binExponent = document.getElementById("binexp");
var binMantissa = document.getElementById("binmant");
var hexRepresentation = document.getElementById("hexrep");
var formatInput = document.getElementById("encoding");

var signOutput = document.getElementById("signout");

signInput.addEventListener("click", flipSign);
signInput.addEventListener("click", updateFloatFromSciNot);
mantissaInput.addEventListener("input", validateFloatInput);
mantissaInput.addEventListener("input", updateFloatFromSciNot);
exponentInput.addEventListener("input", validateFloatInput);
exponentInput.addEventListener("input", updateFloatFromSciNot);

var digitInput = document.getElementById("dinput");

var calcFloat;

updateFloatFromSciNot();
digitInput.addEventListener("input", validateDigitsInput);
