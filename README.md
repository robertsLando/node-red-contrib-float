# node-red-contrib-float
Node Red node to convert binary and decimal numbers in IEEE-754 floating point numbers

# Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-float

# Usage

Input **msg.payload** can be a Number or a binary String (just '0' and '1' chars) or an Array of this two objects.
Output **msg.payload** will be a Float or an Array of Float.

It's possible to set the max number of decimal digit of the output float Number with the node 'Decimal Digits' property.
If left blank the number will not be truncated.
