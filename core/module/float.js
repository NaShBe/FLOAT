import Decimal from "./decimal.mjs";

export const ValueChangeType =
{
    Raw: "raw-bin-hex",
    Value: "value"
}

export const FloatTypes =
{
    IEEE_HALF_PRECISION: {name: "float16", size: 16, mantRange: 10, expRang: 5, totalRange: 16, bias: 0xF},
    IEEE_SINGLE_PRECISION: {name: "float32", size: 32, mantRange: 23, expRang: 8, totalRange: 32, bias: 0x7F},
    IEEE_DOUBLE_PRECISION: {name: "float64", size: 64, mantRange: 52, expRang: 11, totalRange: 64, bias: 0x3FF},
    IEEE_QUADRUPLE_PRECISION: {name: "float128", size: 128, mantRange: 112, expRang: 15, totalRange: 128, bias: 0x3FFF},
    IEEE_OCTUPLE_PRECISION: {name: "float256", size: 256, mantRange: 236, expRang: 19, totalRange: 256, bias: 0x3FFFF}
}

class BaseNumber
{
    // might be used to implement shared functionality of FloatingPoint, FixedPoint, and DecimalFloatingPoint
}

export class FloatingPoint
{
    constructor(sign, mant, exp, floatType)
    {
        this.format = floatType;

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

    extractBinary()
    {
        let signValue = this.sign;
        let exponentOffset = 0;
        let exponentValue = 0;
        let mantissaValue = 0;
        let binRep = ["", "", "N/A", "N/A"];
        let hexRep = "N/A";
        try
        {
            let mantissaMax = Decimal.pow(2, this.format["mantRange"]);
            if (this.exp > this.format["bias"] + 1) {return binRep;}
            mantissaValue = Decimal.mul(this.mant.minus(1.0), mantissaMax);
            mantissaValue = Decimal.floor(mantissaValue).toBinary().substring(2);
            if (mantissaValue > mantissaMax) {return binRep;}
            mantissaValue = mantissaValue.padStart(this.format["mantRange"], "0");
            exponentOffset = this.format["mantRange"];
            exponentValue = this.exp.plus(this.format["bias"]).toBinary().substring(2);
            exponentValue = exponentValue.padStart(this.format["expRange"], "0")
            if (signValue.isPositive()) {signValue = "0";} else {signValue = "1";}
            binRep = signValue + exponentValue + mantissaValue;
            if (mantissaValue == 0 && this.exp > this.format["bias"])
                {
                    let signVal = "+";
                    if (this.sign < 0) {signVal = "-";}
                    return ["", "", binRep, signVal + "INFINITY"];
                }
            if (this.exp == this.format["bias"] + 1) {hexRep = "NaN";}
            else {hexRep = parseInt(binRep, 2).toString(16);}

            return [signValue, exponentValue, mantissaValue, hexRep];
        }
        catch(err)
        {
            alert(err);
            return binRep;
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