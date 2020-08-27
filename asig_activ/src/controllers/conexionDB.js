const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-34-238-26-109.compute-1.amazonaws.com',
    user: 'tkynnngllvhlys',
    password: 'c74d38efd61e8a13900166bbf2f32fc5c41a7653cbc74acf889be34d596666a4',
    database: 'ddbm4g8tu06oqv',
    port: '5432'
});
module.exports=pool;