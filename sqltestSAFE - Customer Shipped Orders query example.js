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
          "SELECT FirstName + ' ' + ISNULL(MiddleName + ' ', '')+ LastName AS CustomerName,
				C.CustomerID, 
				COALESCE(EmailAddress, Phone) AS PrimaryContact,
				SalesOrderID, 
				OrderDate,
				CASE WHEN ShipDate IS NULL THEN 'Pending'
				ELSE 'Shipped'
				END AS ShippingStatus
			FROM SalesLT.Customer C
				LEFT JOIN SalesLT.SalesOrderHeader SOH
					ON SOH.CustomerID = C.CustomerID
			WHERE ShipDate IS NOT NULL",
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