import { FloatingPoint, FloatTypes } from "./float.js";

const MIN_RADIX = 1;
const MAX_RADIX = 36;

/*
    Input Validation
*/

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

function updateFloat(value)
{

}

document.getElementById("jsEnabled").style.display = "block"; // show interface if js enabled

var currentEntry = 0;
var floatInput = 0;

var calcFloat = new FloatingPoint(1000, FloatTypes["IEEE_SINGLE_PRECISION"]);

var digitInput = document.getElementById("dinput");
digitInput.defaultValue = "10010100";
digitInput.addEventListener("input", validateDigitsInput);
