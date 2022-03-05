import Decimal from "./decimal.mjs";

var dataLookUpTable = {
    "ulp": {},
    "ofl": {},
    "ufl": {},
}

export const Flags=
{
    RepresentationWarning: "R",
    NaNError: "N",
}

export const ValueChangeType =
{
    Raw: "raw-bin-hex",
    Value: "value"
}

export const FloatEncodings =
{
    IEEE_HALF_PRECISION: 
    {
        name: "float16",
        size: 16,
        mantRange: 10,
        expRange: 5,
        bias: 0x0000000F
    },
    IEEE_SINGLE_PRECISION:
    {
        name: "float32",
        size: 32,
        mantRange: 23,
        expRange: 8,
        bias: 0x0000007F
    },
    IEEE_DOUBLE_PRECISION:
    {
        name: "float64",
        size: 64,
        mantRange: 52,
        expRange: 11,
        bias: 0x000003FF
    },
    IEEE_QUADRUPLE_PRECISION:
    {
        name: "float128",
        size: 128,
        mantRange: 112,
        expRange: 15,
        bias: 0x00003FFF
    },
    IEEE_OCTUPLE_PRECISION:
    {
        name: "float256",
        size: 256,
        mantRange: 236,
        expRange: 19,
        bias: 0x0003FFFF
    }
}

class BaseNumber
{
    // might be used to implement shared functionality of FloatingPoint, FixedPoint, and DecimalFloatingPoint
}

export class FloatingPoint
{
    constructor(sign, mant, exp, encoding)
    {
        this.format = encoding;

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
            this.format = encoding;
            this.mant = new Decimal(mant);
            this.exp = new Decimal(exp);
        }
        catch(err)
        {
            this.sign = Decimal("NaN");
            this.mant = Decimal("NaN");
            this.exp = Decimal("NaN");
            this.format = FloatEncodings["IEEE_SINGLE_PRECISION"];
        }
    }
    get value()
    {
        if (this.mant.equals(Decimal(1.0)) && this.exp.equals(Decimal(-this.bias)))
        {
            return Decimal(0)
        }
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

    get approximate()
    {
        let bin = this.extractBinary()
    }

    extractBinary()
    {
        let signValue = this.sign;
        let exponentOffset = 0;
        let exponentValue = 0;
        let mantissaValue = 0;
        let binRep = ["", "", "N/A", "N/A", []];
        let flags = []
        let hexRep = "N/A";
        try
        {
            if (this.exp > this.format["bias"] + 1 || this.exp < -this.format["bias"])
            {
                return binRep;
            }
            exponentOffset = this.format["mantRange"];
            exponentValue = this.exp.plus(this.format["bias"]).toBinary().substring(2);
            exponentValue = exponentValue.padStart(this.format["expRange"], "0")

            let mantissaMax = Decimal.pow(2, this.format["mantRange"]);
            mantissaValue = Decimal.mul(this.mant.minus(1.0), mantissaMax);
            if (mantissaValue.isNaN())
            {
                return binRep;
            }
            if (mantissaValue.mod(1) != 0)
            {
                flags += 'R';
            }
            mantissaValue = Decimal.floor(mantissaValue).toBinary().substring(2);
            if (mantissaValue.length > this.format["mantRange"])
            {
                return binRep;
            }
            mantissaValue = mantissaValue.padStart(this.format["mantRange"], "0");
            if (signValue.isPositive())
            {
                signValue = "0";
            }
            else
            {
                signValue = "1";
            }
            binRep = signValue + exponentValue + mantissaValue;
            if (mantissaValue == 0 && this.exp > this.format["bias"])
                {
                    let signVal = "+";
                    if (this.sign < 0) {signVal = "-";}
                    return [signValue, exponentValue, mantissaValue, signVal + "INFINITY", flags];
                }
            if (this.exp == this.format["bias"] + 1){hexRep = "NaN";}
            else {hexRep = parseInt(binRep, 2).toString(16);}
            return [signValue, exponentValue, mantissaValue, hexRep, flags];
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
        return this.format.bias;
    }

    get ufl()
    {
        let format = this.format.name
        if (!(format in dataLookUpTable.ufl))
        {
            let min_exp = -this.format.bias
            dataLookUpTable.ufl[format] = Decimal.pow(2, min_exp)
        }
        return dataLookUpTable.ufl[format]
    }

    get ofl()
    {
        let format = this.format.name
        if (!(format in dataLookUpTable.ofl))
        {
            let precision = Decimal(this.format.mantRange)
            let max_exp = Decimal.pow(2, this.format.expRange - 1)

            let formula_segment_1 = Decimal.sub(Decimal(1.0), Decimal.div(Decimal(1.0), Decimal.pow(2, precision)))
            let formula_segment_2 = Decimal.pow(2, max_exp)
            dataLookUpTable.ofl[format] = Decimal.mul(formula_segment_1, formula_segment_2)
        }
        return dataLookUpTable.ofl[format]
    }

    get ulp()
    {
        let format = this.format.name
        if (!(format in dataLookUpTable.ulp))
        {
            dataLookUpTable.ulp[format] = {};
        }

        if (!(this.exp in dataLookUpTable.ulp[format]))
        {
            let precision = this.format.mantRange
            let min_exp = -this.format.bias
            dataLookUpTable.ulp[format][this.exp] =
                Decimal.pow(
                    2,
                    Decimal.max(this.exp, min_exp) - precision + 1
                )
        }
        return dataLookUpTable.ulp[format][this.exp]
    }

    get relErr()
    {
        let real_number = this.value
        let float_number = NaN
        return "WIP"
    }

    get machEps()
    {
        return "WIP"
    }
}

export class DecimalFloatingPoint
{

}

export class FixedPoint
{

}