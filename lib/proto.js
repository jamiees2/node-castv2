var fs        = require('fs');
var path      = require('path');
var protobuf  = require('protocol-buffers');

var buffers = protobuf(fs.readFileSync(path.join(__dirname, 'cast_channel.proto')));

var messages = [
  'CastMessage', 
  'AuthChallenge', 
  'AuthResponse', 
  'AuthError', 
  'DeviceAuthMessage'
];

messages.forEach(function(message) {
  module.exports[message] = {
    serialize: function(data) {
      return buffers[message].encode(data);
    },
    parse: function(data) {
      return buffers[message].decode(data);
    }
  };
});