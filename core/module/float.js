import { Decimal } from "./decimal.js";


export const FloatTypes =
{
    IEEE_HALF_PRECISION: "float16",
    IEEE_SINGLE_PRECISION: "float32",
    IEEE_DOUBLE_PRECISION: "float64",
    IEEE_QUADRUPLE_PRECISION: "float128",
    IEEE_OCTUPLE_PRECISION: "float256"
}

export class FloatingPoint
{
    constructor(number, floatType)
    {
        this.raw = Decimal(number);
        this.floatType = floatType;
        //this.exponent = this.calcExponent(this.raw);
        //this.manissa = this.calcManissa(this.raw);
    }

    get sign()
    {
        return Decimal.sign(this.raw);
    }

    get mantissa()
    {
        //return this.calcMantissa(number);
    }

    get exponent()
    {
        return this.calcExponent(number);
    }

    get radix()
    {
        
    }

    get bias()
    {

    }
    
    get precision()
    {
        
    }

    get valueMax()
    {

    }

    get valueMin()
    {
        
    }

    get eMin()
    {

    }

    get eMax()
    {

    }

    get isSubnormal()
    {

    }

    get binaryRep()
    {

    }

    get hexRep()
    {

    }

    static calcSignificand(number, radix)
    {
        /*
            to calculate mantissa:
                1) convert the number to the base
                2) shift the digits so the last digit is the only integer part
                    ex: 123.95 in base 10 is shifted to 1.2395 for the mantissa
        */
    }

    static calcExponent(number, radix)
    {
        return Decimal.log(number, radix);
    }

    static calcULP(number, radix, widthMantisa)
    {
        /*
            the Unit of Least Precision (ULP) of a floating point number is defined as:
            (b-a)/w, where
            a is closest number of the radix to the next smallest integral exponent
                * a = r ^ floor(logr(n))
                where:
                    - r is the radix
                    - n is the floating point number
                    - logr(n) is the exponent e where r^e = n
            b is closest number of the radix to the next largest integral exponent
                * b = r ^ logr(a) + 1
                where:
                    - logr(a) + 1 is the exponent of floor(logr(n)) + 1
            w is the radix raised to the number of digits available for the mantissa
                * w = r ^ p
                where:
                    p is the number of representable digits (number of mantissa bits for base 2)

            for the simulation, a lookup table will be used for decimal representation
        */
        expLow = Decimal.floor(this.calcExponent(number, radix));
        expHigh = expHigh + 1;
        b = Decimal.pow(radix, expHigh);
        a = Decimal.pow(radix, expLow);
        w = Decimal.pow(radix, widthMantisa);
        numPrec = Decimal(b-a/w);
        return numPrec;
    }

    modifyExponent()
    {

    }

    modifyMantissa()
    {

    }

    modifySign()
    {

    }

    modifyRadix()
    {

    }

    updateNumber(number)
    {
        this.hex = number.toString(16);
        this.mantissa = FloatingPoint.calcSignificand(number);
        this.exponent = FloatingPoint.calcExponent(number);
    }
}

export class DecimalFloatingPoint
{

}

export class FixedPoint
{

}