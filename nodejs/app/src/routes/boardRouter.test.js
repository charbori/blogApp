require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import Dotenv from 'dotenv';
process.env.NODE_ENV = 'test';
import '../env/env.js';
const { addPost } = require("../controller/boardController.js");

test('addPost fn', () => {
    const test_datas = {title : 'test_title', contents : 'test_content', user_id: 1312312};
    const request = {query : test_datas};
    const response = {success: false, data: '', send: function(param) { return param.success }};
    return addPost(request, response).then((res) => {
        expect(res).toEqual({success: true, data:""});
    })
});