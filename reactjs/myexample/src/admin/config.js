var ip = '13.209.68.188'; 
if (process.env.NODE_ENV == 'development') {
    ip = '192.168.219.109'; 
} else {
    ip = '13.209.68.188'; 
}
export const Config = {
    'NODE_SERVER' : 'http://' + ip + ':8888/api/'
};