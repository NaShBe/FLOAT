# FLOAT: Floating-Point Simulator and Calculator

## Summary

FLOAT is designed to educate on the intricacies of floating-point arithmetic and shine light on the important challenge of representing numbers in computers both in hardware and in software.

FLOAT is developed in bare Javascript, utilizing only the [Decimal.js library](https://mikemcl.github.io/decimal.js/) to manage numbers with arbitrary precision. All the source code and resources are published within the [GitHub repository](https://github.com/NaShBe/FLOAT).

## Using FLOAT

FLOAT's main interface is the scientific notation display. Each aspect of the floating point representation is color coded: green for sign, blue for exponent, and red for mantissa. Click on any of these fields to change the value. The decimal number and other formattings will update in real-time as you manipulate these values.

Above the scientific notation display is the floating-point dropdown. From here, you can select from a multitude of representations. Currently, only the standard IEEE 754 floating point representations are supported.

Underneath the scientific notation display are details pertaining to the current value. These change in real-time with the scientific notation. Hover over any of the details to get more information on what they are.

## Goals for FLOAT

Currently, FLOAT allows you to manipulate the scientific notation dictating the floating-point representation used for decimal conversion. Although this is core functionality of FLOAT, there are other functionalities planned for the future:

* Manipulate any representation of the decimal number to update its value
* Apply simple unary and binary operations such as negation and addition
* Generate tables for certain floating point attributes

