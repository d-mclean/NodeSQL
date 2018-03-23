var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'ServerAdmin', // update me
     password: '<PW REMOVED>', // update me
     server: '<SERVER REMOVED>', // update me
     options: 
        {
           database: '<DB REMOVED>' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          "SELECT TOP 5 *
			FROM SalesLT.Product P
				INNER JOIN SalesLT.ProductModel PM
					ON PM.ProductModelID = P.ProductModelID
				INNER JOIN SalesLT.ProductCategory PC
					ON PC.ProductCategoryID = P.ProductCategoryID
				INNER JOIN SalesLT.ProductDescription PD
					ON PD.ProductDescriptionID = P.ProductID",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }