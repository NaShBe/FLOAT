import Decimal from "./decimal.mjs";

export const ValueChangeType =
{
    Raw: "raw-bin-hex",
    Value: "value"
}

export const FloatTypes =
{
    IEEE_HALF_PRECISION: {name: "float16", mantRange: 10, expRang: 5, totalRange: 16, bias: 0xF},
    IEEE_SINGLE_PRECISION: {name: "float32", mantRange: 23, expRang: 8, totalRange: 32, bias: 0x7F},
    IEEE_DOUBLE_PRECISION: {name: "float64", mantRange: 52, expRang: 11, totalRange: 64, bias: 0x3FF},
    IEEE_QUADRUPLE_PRECISION: {name: "float128", mantRange: 112, expRang: 15, totalRange: 128, bias: 0x3FFF},
    IEEE_OCTUPLE_PRECISION: {name: "float256", mantRange: 236, expRang: 19, totalRange: 256, bias: 0x3FFFF}
}

class BaseNumber
{
    // might be used to implement shared functionality of FloatingPoint, FixedPoint, and DecimalFloatingPoint
}

export class FloatingPoint
{
    constructor(sign, mant, exp, floatType)
    {
        this.format = {};

        try
        {
            if (sign == "-")
            {
                this.sign = new Decimal("-1");
            }
            else
            {
                this.sign = new Decimal("1");
            }
            this.format = floatType;
            this.mant = new Decimal(mant);
            this.exp = new Decimal(exp);
        }
        catch(err)
        {
            this.sign = Decimal("NaN");
            this.mant = Decimal("NaN");
            this.exp = Decimal("NaN");
            this.format = FloatTypes["IEEE_SINGLE_PRECISION"];
        }
    }
    get value()
    {
        try
        {
            return Decimal.mul(Decimal.pow(2, this.exp), this.mant).mul(this.sign).toString();
        }
        catch(err)
        {
            alert(err);
            return new Decimal("NaN").toString();
        }
    }

    extractMembersFromValue(value, typeChange)
    {
        try
        {
            if(typeChange === ValueChangeType.Raw)
            {
                var decValue = Decimal(value);
            }
            else if (typeChange === ValueChangeType.Value)
            {
                var mantValue = new Decimal(value);
                var expValue = Decimal.floor(Decimal.log10(mantValue));
                var signValue = Decimal.sign(value);
                mantValue /= Decimal.pow(10, digitsFromSig);

                this.sign = signValue;
                this.exp = expValue;
                this.mant = mantValue;
            }
        }
        catch(err)
        {

        }
    }

    get bias()
    {
        return floatType.bias;
    }

    get ufl()
    {

    }

    get ofl()
    {

    }

    get ulp()
    {
        
    }

    get relErr()
    {

    }

    get machEps()
    {

    }
}

export class DecimalFloatingPoint
{

}

export class FixedPoint
{

}