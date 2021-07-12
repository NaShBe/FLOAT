//import { FloatingPoint, FloatTypes } from "./float.js";

const MIN_RADIX = 1;
const MAX_RADIX = 36;

function validateRadixInput()
{
    /*
        This function dynamically enforces valid input for the radix.
        Because the radix input is checked in its whole, the event
        does not need to be checked. Any invalid state for the radix
        will revert the radix back to the previous valid input.

        Valid input includes:
            * an empty string
            * any number between the 1 and the maximum radix 36 (0-Z digits)
    */

    if (typeof validateRadixInput.previousValidRadix == "undefined")
    {
        validateRadixInput.previousValidRadix = "";
    }

    if(isNaN(radixInput.value))
    {
        if (radixInput.value == null || radixInput.value == "")
        {
            radixInput.value = "";
        }
        else
        {
            radixInput.value = validateRadixInput.previousValidRadix;
        }
    }
    
    else if (radixInput.value > MAX_RADIX)
    {
        radixInput.value = MAX_RADIX;
    }
    
    else if (radixInput.value < MIN_RADIX)
    {
        radixInput.value = "";
    }

    else
    {
        radixInput.value = parseInt(radixInput.value);
    }
    validateRadixInput.previousValidRadix = radixInput.value;
}

function validateDigitsInput()
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
    
    digitInput.value = digitInput.value.toUpperCase().match(validInput);
}

currentEntry = 0;
floatInput = 0;

digitInput = document.getElementById("dinput");
radixInput = document.getElementById("rinput");
radixInput.defaultValue = "2";
digitInput.defaultValue = "10010100";
radixInput.addEventListener("input", validateRadixInput);
digitInput.addEventListener("input", validateDigitsInput);
