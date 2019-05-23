var Connection = require('tedious').Connection;
    var config = {
        userName: 'sa',
        database: "testdatabase",
        password: 'Ginger123',
        server: 'localhost\\DAVIDSQL',
        port: 1433
    };
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement1();
    });

    var Request = require('tedious').Request
    var TYPES = require('tedious').TYPES;

    function executeStatement1() {
        request = new Request("insert into Test (ProjectID,EditDate,WhoEdit) values (100,2019-02-03,BOOOOOO);", function(err) {
         if (err) {
            console.log(err);}
        });
        request.addParameter('Name', TYPES.NVarChar,'SQL Server Express 2014');
        request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2014');
        request.addParameter('Cost', TYPES.Int, 11);
        request.addParameter('Price', TYPES.Int,11);
        request.on('row', function(columns) {
            columns.forEach(function(column) {
              if (column.value === null) {
                console.log('NULL');
              } else {
                console.log("Product id of inserted item is " + column.value);
              }
            });
        });
        connection.execSql(request);
    }
