module.exports = function(RED) {
    function floatConversion(data, fixed){

        if(typeof data==='number' && (data%1)===0) {
            data = data.toString(2);
        }

        if ((typeof data === 'string' || data instanceof String) && data.match("^[01]+$") && data.length <= 32){

            data = data.length < 32 ? '0'.repeat(32-data.length) + data : data;
            var sign = (data.charAt(0) == '1')?-1:1;
            var exponent = parseInt(data.substr(1, 8), 2) - 127;
            var significandBase = data.substr(9);
            var significandBin = '1'+significandBase;
            var i = 0;
            var val = 1;
            var significand = 0;

            if (exponent == -127) {
                if (significandBase.indexOf('1') == -1)
                return 0;
                else {
                    exponent = -126;
                    significandBin = '0'+significandBase;
                }
            }

            while (i < significandBin.length) {
                significand += val * parseInt(significandBin.charAt(i));
                val = val / 2;
                i++;
            }

            var floatValue = sign * significand * Math.pow(2, exponent);

            if(fixed)
                floatValue = floatValue.toFixed(fixed)/1;

            return floatValue;

        }
        else
            return null;


    }

    function FloatConversionNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            var data = msg.payload;
            var error = false;

            if(typeof data != 'string' && data.length >= 1){//array
                for(var i=0;i<data.length;i++){
                    data[i] = floatConversion(data[i], config.toFixed);
                    if(data[i] == null){
                        node.error('Error at index '+i+', value must be a 32 bit Integer or Binary number');
                        error = true;
                        break;
                    }
                }
            }
            else{
                data = floatConversion(data, config.toFixed);

                if(data == null){
                    node.error("msg.payload must be a 32 bit Integer or Binary number");
                    error = true;
                }
            }

            if(!error) {
                msg.payload = data;
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("toFloat",FloatConversionNode);
}
