module.exports = function(RED) {
    function FloatConversionNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            var data = msg.payload;

            if(typeof data==='number' && (data%1)===0) {
                data = data.toString(2);
            }

            if ((typeof data === 'string' || myVar instanceof String) && data.matches("[01]+")){

                if (data.length < 32)
                data = ('00000000000000000000000000000000'+data).substr(data.length);
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

                node.send({payload: floatValue.toFixed(config.toFixed)});
            }
            else{
                node.error("Wrong msg.payload type, msg.payload must be a 32 bit Integer or Binary number")
            }


        });
    }
    RED.nodes.registerType("toFloat",FloatConversionNode);
}
