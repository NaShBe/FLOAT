import Decimal from "./decimal.mjs";

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
        try
        {
            this.raw = Decimal(number);
        }
        catch(err)
        {
            this.raw = Decimal("NaN");
        }
        this.floatType = floatType;
    }

    get sign()
    {
        return Decimal.sign(this.raw);
    }

    get significand()
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
            to calculate the significand:
                1) convert the number to the base
                2) shift the digits so the last digit is the only integer part
                    ex: 123.95 in base 10 is shifted to 1.2395 for the mantissa
                3) multiply 
                    This is to make up for the decimal part floored in the
                    exponent calculations:
                        4^10 * 4^0.5 = 4^10.5
                        4^10 * 2 = 4^10.5
                        4^10 * 2^10/10 = 4^10.5
                        (4 * 2^1/10)^10 = 4^10.5
                        


        */

    }

    static calcExponent(number, radix)
    {
        /*??????????
            to calculate the exponent:
                1) get the log for the number to the radix
                        ex: 2^n will get you 8 (n is the no. of digits needed to
                        represent 8-1)
                2) multiply by the radix and????? the number of digits in front of
                   the decimal point for the number
                        4^4 = 2^8 = 2^(4 * (2 * 1))
                        b100.0^10 = b10.0^1000
                3) floor the result (ensures)
        */
        var trueExp = Decimal.log(number, radix);
        var retExp = Decimal.floor(trueExp);
        return retExp;
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
        expLow = this.calcExponent(number, radix);
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
        this.raw = Decimal(number);
    }

    calcRaw(sign, significand, exponent)
    {
    }
    
    async send()
    {
        var retDict = {
            "hex": number.toString(16),
            "sign": this.sign,
            "significand": this.significand,
            "exponent": this.exponent,
            "bias": this.bias,
            "ufl": this,
            "ofl": this,
            "ulp": this,
            "relerr": this,
            "epsilon": this
        };
        return retDict;
    }
}

export class DecimalFloatingPoint
{

}

export class FixedPoint
{

}