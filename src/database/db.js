
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: 'buddy'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
module.exports =connection;




// app.use(express.json());

// const conn = mysql.createConnection({

// });

// app.post('/signup', (req, res) => {
//   const { username, password, email, gender, role, name, birthDate, telephoneNumber } = req.body;

//   const query = `INSERT INTO users (username, password, email, gender, role, name, birthDate, telephoneNumber) 
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
//   conn.query(query, [username, password, email, gender, role, name, birthDate, telephoneNumber], (error, results) => {
//     if (error) {
//       console.error('Error inserting user:', error);
//       res.status(500).json({ error: 'An error occurred while registering user.' });
//     } else {
//       console.log('User registered successfully');
//       res.status(200).json({ message: 'User registered successfully' });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
