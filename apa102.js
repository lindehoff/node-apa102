var SPI = require('spi');

function Apa102() {
  var spi = new SPI.Spi('/dev/spidev0.0', {
    'mode': SPI.MODE['MODE_0'],  // always set mode as the first option
    'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low
  }, function(s){s.open();});

  var txbuf = new Buffer([ 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00 ]);
  var rxbuf = new Buffer([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

  spi.transfer(txbuf, rxbuf, function(device, buf) {
    // rxbuf and buf should be the same here
    var s = "";
    for (var i=0; i < buf.length; i++)
      s = s + buf[i] + " ";
      console.log(s + "- " + new Date().getTime());
  });    
};
module.exports = Apa102;