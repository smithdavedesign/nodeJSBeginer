var sql = require("mssql");

var dbConfig = {
  server: "localhost\\DAVIDSQL",
  database: "testdatabase",
  user: "sa",
  password: "Ginger123",
  port: 1433
};

function getEmp() { //connect to sql server and show some stuff on console
  var conn = new sql.ConnectionPool(dbConfig); //conection object
  // const transaction = new sql.Transaction(conn)
  var req = new sql.Request(conn); //request
  console.log("1");

  conn.connect(function(err) {
    if (err) {
      console.log(err); //if error log on the console the error
      return;
    }

    req.query("SELECT * FROM Test", function(err, recordset) {
      if (err) {
        console.log(err); //if error log on the console the error
        return;
      } else {
        console.log(recordset);
      }

      const transaction = new sql.Transaction()
      transaction.begin(err => {
        // ... error checks
        console.log("transaction called");
        console.log("2");
        const request = new sql.Request(transaction)
        request.query('insert into Test (ProjectID,EditDate,WhoEdit) values (100,2019-02-03,BOOOOOO)', (err, result) => {
          // ... error checks
          console.log("2");
          transaction.commit(err => {
            // ... error checks

            console.log("Transaction committed.")
          })
        })
      })


      conn.close();
    });
  });

}

getEmp();
