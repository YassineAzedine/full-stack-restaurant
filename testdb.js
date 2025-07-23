const { Client } = require('pg');


const client  = new Client({
    connectionString: "postgresql://postgres:yassine0711@localhost:5432/restaurant_db",

});

async function testdb(){
    try{
     await client.connect() 
        console.log("Connected to the database successfully");
    }
    catch(err){
        console.error("Error in testdb function:", err);
    }
}


testdb()