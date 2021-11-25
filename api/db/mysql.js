
// const mysql = require("mysql2");

// //     var connection = mysql.createConnection({
// //       connectionLimit : 100,
// //       host     : 'localhost',
// //       port     :  3306,
// //       user     : 'root',
// //       password : '',
// //       database : 'smiletech'
// //   });
// var sequelize = new Sequelize('store_digitization', 'smile_dev', 'Dev@2021', {
//     host: '103.9.159.151',
//     dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
  
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     },
  
// //     // SQLite only
// //     // storage: 'path/to/database.sqlite'
//   });
  
//   // Or you can simply use a connection uri
//   var sequelize = new Sequelize('postgres://smile_dev:store_digitization:22206/Dev@2021');


// var connection = mysql.createConnection({
//         connectionLimit : 100,
//         host     : '103.9.159.151',
//         port     :  22206,
//         user     : 'smile_dev',
//         password : 'Dev@2021',
//         database : 'store_digitization'
//     });
// connection.connect(function(error) {
//     if(!!error) {
//       console.log('Error');
//     }else{
//     console.log('Connected successfully!');
//   };
// });
// module.exports= connection;