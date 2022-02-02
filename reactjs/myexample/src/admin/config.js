var ip = 'couhensoft.com'; 

if (process.env.NODE_ENV == 'development') {
    ip = '192.168.219.119'; 
} else {
    ip = 'couhensoft.com'; 
}

export const Config = {
    'NODE_SERVER' : 'http://' + ip + ':8888/api/'
};
