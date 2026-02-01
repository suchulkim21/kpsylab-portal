const { initDB, pool } = require('../modules/data_layer/mysql_client');

async function test() {
    try {
        console.log('Testing MySQL Connection...');
        await initDB();
        console.log('Connection and Initialization Successful.');

        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Query Test Result:', rows[0].solution);

        process.exit(0);
    } catch (error) {
        console.error('Test Failed:', error);
        process.exit(1);
    }
}

test();
