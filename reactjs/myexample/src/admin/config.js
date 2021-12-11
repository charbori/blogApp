var ip = require("ip");
export const Config = {
    'NODE_SERVER' : 'http://' + ip.address() + ':8888/api/'
};