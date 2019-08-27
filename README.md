# node-red-contrib-float

<a href="https://www.buymeacoffee.com/MVg9wc2HE" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

Node Red node to convert binary and decimal numbers in IEEE-754 floating point numbers

# Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-float

# Usage

Input **msg.payload** can be a Number or a binary String (just '0' and '1' chars) or an Array of this two objects.
Output **msg.payload** will be a Float or an Array of Float.

It's possible to set the max number of decimal digit of the output float Number with the node 'Decimal Digits' property.
If left blank the number will not be truncated.
