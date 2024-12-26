const bodyParser = require('body-parser');
const zlib = require('zlib');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const mysql1=require('mysql2/promise');
const puppeteer = require('puppeteer');
const pdf = require('html-pdf');
const https = require('https');


 // Set timeout to 0 for no timeout, or adjust as needed



 //twillo
 const twilio = require('twilio');
 const accountSid = 'ACdef1938da46c0059c04579ec457b9a3d';
const authToken = 'a5f80d9482c46e7ed0a8f5f6a275e50f';
const twilioPhoneNumber = '+19044743632';
const twilioPhoneNumber1 = '+14155238886';


const client = new twilio(accountSid, authToken);


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const uuid = require('uuid');
// const upload = multer({ dest: 'uploads/' });
const storage1 = multer.memoryStorage(); // Store file data in memory
const upload1= multer({ storage: storage1 });
// const pdfjsLib = require('pdfjs-dist/es5/build/pdf');
// const pdfjsLib = require('pdfjs-dist');
const { PDFDocument, rgb } = require('pdf-lib');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const storage2 = multer.memoryStorage();
const upload2 = multer({ storage: storage2 }); 



const fs = require('fs');
// const PDFDocument = require('pdfkit');
const sizeOf = require('image-size');

const port = process.env.PORT || 3000;
const secretKey = 'mySecretKeyForJWTAuthentication';// for token generation

const app = express();


// const multer = require('multer');
const xlsx = require('xlsx');
const { log } = require('console');
const doc = require('pdfkit');
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));


// const storage = multer.memoryStorage(); // Use memory storage for handling files without saving to disk
// const upload = multer({ storage: storage });

const corsOptions = {
  origin: ['https://paplexpress.com', 'http://localhost:4200'],
  optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Ensure 'pdfs' directory exists
const pdfsDirectory = path.join(__dirname, 'pdfs');
if (!fs.existsSync(pdfsDirectory)) {
  fs.mkdirSync(pdfsDirectory);
}




//*******************************************************************************//

require('dotenv').config(); // Load environment variables from a .env file
// require('dotenv').config({ path: '.env.prod' });

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const sqlDatabase1 = process.env.SQL_DATABASE1;
const sqlDatabase2 = process.env.SQL_DATABASE2;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLEINT_URL;

// Logging environment variables to console for verification
console.log('DB Host:', dbHost);
console.log('DB User:', dbUser);
console.log('Server URL:', serverUrl);
console.log('Client URL:', clientUrl);

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.SQL_DATABASE1 || 'paplworkspace',
});

const db1 = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.SQL_DATABASE2 || 'papl_inspection',
});


const db2 = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.SQL_DATABASE3 || 'inspection_master',
});
// const db = mysql.createPool({
//   host: process.env.DB_HOST || '127.0.0.1',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.SQL_DATABASE1 || 'paplworkspace',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// const db1 = mysql.createPool({
//   host: process.env.DB_HOST || '127.0.0.1',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.SQL_DATABASE2 || 'papl_inspection',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// const db2 = mysql.createPool({
//   host: process.env.DB_HOST || '127.0.0.1',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.SQL_DATABASE3 || 'inspection_master',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });



const db_promise = mysql1.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.SQL_DATABASE2 || 'papl_inspection',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});





//***************************************************************************//

// const port = process.env.PORT;

// Function to connect to MySQL database
async function connectToDatabase() {
  try {
    const pool = mysql1.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.SQL_DATABASE2 || 'papl_inspection',
  waitForConnections: true,
  connectionLimit: 5, // Try reducing the limit
  queueLimit: 0, // No limit for the connection queue
  connectTimeout: 10000, // 10 seconds
    });
    return pool;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection failed');
  }
}
const pool = connectToDatabase();




//inspection master
// Database connection


// For mail response button link
const mail_response = process.env.CLEINT_URL + '/Mail_Response' || 'http://localhost:4200/Mail_Response';


db.connect((err) => {
  if (err) {
    console.error('Error', err);
    return;
  }
   else {
    console.log('Connected to MySQL Papl Client Database');
  }
});

// Connect to the MySQL database
db1.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL Papl Inspection');
});

db2.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL Inspection Master');
});



//api for certificate sequence
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to MySQL Papl Client Database:', err);
//   } else {
//     console.log('Connected to MySQL Papl Client Database');
//     connection.release();
//   }
// });

// db1.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to MySQL Papl Inspection Database:', err);
//   } else {
//     console.log('Connected to MySQL Papl Inspection Database');
//     connection.release();
//   }
// });

// db2.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to MySQL Inspection Master Database:', err);
//   } else {
//     console.log('Connected to MySQL Inspection Master Database');
//     connection.release();
//   }
// });
app.get('/api/next-id', (req, res) => {
  db1.query('SELECT IFNULL(MAX(id) + 1, 1) AS next_id FROM uploaded_files', (error, results, fields) => {
      if (error) throw error;
      res.json(results[0].next_id);
  });
});
// Endpoint for handling file uploads
// app.post('/api/upload_certificate', upload.single('file'), (req, res) => {
//   if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//   }

//   const fileData = req.file.buffer; // Get the file data from memory

//   const { filename } = req.file;
//   const { unit_name, document_id,building_name,contract } = req.body;

//   // Save file details and data to the database
//   // const sql = 'INSERT INTO uploaded_files ( unit_name, document_id, file_data) VALUES (?, ?, ?)';
//   // db1.query(sql, [ unit_name, document_id, fileData], (err, result) => {
//   //     if (err) {
//   //         console.error('Error saving file details to database:', err);
//   //         return res.status(500).send('Error saving file details to database.');
//   //     }
//   //     console.log('File details and data saved to database:', result);
//   //     res.status(200).send('File uploaded and details saved to database.');
//   // });
//   const sql = 'INSERT INTO uploaded_files (unit_name, document_id, file_data,building_name,contract) VALUES (?,?,?, ?, ?)';
//   db1.query(sql, [unit_name, document_id, fileData,building_name,contract], (err, result) => {
//     if (err) {
//       console.error('Error saving file details to database:', err);
//       return res.status(500).json({ error: 'Error saving file details to database.' });
//     }
//     console.log('File details and data saved to database:', result);
//     res.status(200).json({ message: 'File uploaded and details saved to database.' });
//   });
// });

// upload certificate 
// app.post('/api/upload_certificate', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const fileData = req.file.buffer; // Get the file data from memory
//   const { filename } = req.file;
//   const { unit_name, document_id, building_name, contract,inspector_name } = req.body;

//   // Insert file details and data into the database
//   const sql = 'INSERT INTO uploaded_files (unit_name, document_id, file_data, building_name, contract,inspector_name) VALUES (?,?, ?, ?, ?, ?)';
//   db1.query(sql, [unit_name, document_id, fileData, building_name, contract,inspector_name], (err, result) => {
//     if (err) {
//       console.error('Error saving file details to database:', err);
//       return res.status(500).json({ error: 'Error saving file details to database.' });
//     }
//     console.log('File details and data saved to database:', result);
//     res.status(200).json({ message: 'File uploaded and details saved to database.' });
//   });
// });


//twillio

app.post('/api/send-sms', (req, res) => {
  const { to, message } = req.body;

  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: to
    })
    .then((message) => res.json({ success: true, messageId: message.sid }))
    .catch((error) => {
      console.error('Error sending SMS:', error);  // Log the full error object to the console
      res.status(500).json({ success: false, error: error.message, details: error });
    });
});






//indexdb
app.get('/api/get_Master_Value_for_DB', (req, res) => {
  const queryCheck = "SELECT DISTINCT(security) FROM inspection_master";

  // console.log("initntint-----=-p=-p=-p=-p=-p=-p=-p=-p=-p")
  db1.query(queryCheck, (err, securityResults) => {
      if (err) {
          console.error("Error:", err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      const query = "SELECT id, Product, Parts, Description, Reference, Risklevel, Photo, Dropdown, functional_point, Positive_MNT, Positive_ADJ, Negative_MNT, Negative_ADJ, Emergency_Features, Customer_Scope, security,marks FROM inspection_master";

      db1.query(query, (err, results) => {
          if (err) {
              console.error("Error:", err);
              return res.status(500).json({ error: 'Internal server error' });
          } else {
              // Ensure that there is at least one security result to avoid undefined errors
              if (securityResults.length === 1) {
                const returnval = [];


                results.forEach(item => {
                  const parts = item.Parts.trim().toLowerCase().replace(/ /g, '_');
                  if (!returnval[parts]) {
                      returnval[parts] = [];
                  }
                  returnval[parts].push(item);
              });
              
              const value = {
                  key: securityResults[0].security,
              };
              
              // Assigning all key-value pairs from returnval to the value object
              Object.keys(returnval).forEach(key => {
                  value[key] = returnval[key];
              });
              
              res.json(value);
              
              
              } else {
                  res.status(404).json({ error: 'No security keys found' });
              }
          }
      });
  });
});


// checkKey_DB
app.get('/api/checkKey_DB', (req, res) => {
  const key = req.query.key;

  const queryCheck = "SELECT DISTINCT( security) FROM inspection_master WHERE 1;";
  db1.query(queryCheck, (err, securityResults) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if(securityResults.length==1){

      const found = securityResults.some(result => result.security === key);
      res.json(found);
    }
    else{
      res.json(false)
    }
   
  });
});





app.get('/getImage/:document_id', (req, res) => {
  const { document_id } = req.params;

  // Prepare SQL statement to fetch filedata
  const query = 'SELECT filedata FROM file WHERE document_id = ?';
  
  db1.query(query, [document_id], (error, results, fields) => {
    if (error) {
      console.error('Error fetching image data:', error);
      return res.status(500).send('Error fetching image data.');
    }

    if (results.length === 0) {
      return res.status(404).send('Image data not found.');
    }

    const imageData = results[0].filedata;
    res.send(imageData);
  });
});


app.post('/uploadFile', upload.single('fileUpload'), (req, res) => {
  const { document_id } = req.body;
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Read file asynchronously
    fs.readFile(req.file.path, (readError, fileData) => {
      if (readError) {
        console.error('Error reading file:', readError);
        return res.status(500).send('Error reading file.');
      }

      // Delete existing record if any
      const deleteQuery = 'DELETE FROM file WHERE document_id = ?';
      db1.query(deleteQuery, [document_id], (deleteError, deleteResult) => {
        if (deleteError) {
          console.error('Error deleting existing record:', deleteError);
          return res.status(500).send('Error deleting existing record.');
        }

        // Delete temporary file
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError) {
            console.error('Error deleting temporary file:', unlinkError);
          }
        });

        // Prepare SQL statement for insertion
        const insertQuery = 'INSERT INTO file (filename, filedata, document_id) VALUES (?, ?, ?)';
        const values = [req.file.originalname, fileData, document_id];

        // Execute SQL statement for insertion
        db1.query(insertQuery, values, (insertError, insertResult, fields) => {
          if (insertError) {
            console.error('Error inserting file data:', insertError);
            return res.status(500).send('Error uploading file.');
          }
          console.log('File data inserted successfully:', insertResult);
          // Instead of just sending 'File uploaded successfully.', you can send a JSON response
          res.status(200).json({ message: 'File uploaded successfully.' });
        });
      });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal server error.');
  }
});



//upload certificate with checking duplica
app.post('/api/upload_certificate', upload1.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileData = req.file.buffer; // Get the file data from memory
  const { filename } = req.file;
  const { unit_name, document_id, building_name, contract, inspector_name } = req.body;

  // Check if a record with the same values already exists
  const selectSql = 'SELECT COUNT(*) AS count FROM uploaded_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
  db1.query(selectSql, [unit_name, document_id, building_name, contract, inspector_name], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error checking existing record:', selectErr);
      return res.status(500).json({ error: 'Error checking existing record.' });
    }

    const count = selectResult[0].count;

    if (count > 0) {
      // If a record exists, delete it
      const deleteSql = 'DELETE FROM uploaded_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
      db1.query(deleteSql, [unit_name, document_id, building_name, contract, inspector_name], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting existing record:', deleteErr);
          return res.status(500).json({ error: 'Error deleting existing record.' });
        }
        console.log('Existing record deleted.');
        // Insert the current record
        insertNewRecord();
      });
    } else {
      // If no record exists, insert the current record directly
      insertNewRecord();
    }
  });

  function insertNewRecord() {
    // Insert file details and data into the database
    const insertSql = 'INSERT INTO uploaded_files (unit_name, document_id, file_data, building_name, contract, inspector_name) VALUES (?, ?, ?, ?, ?, ?)';
    db1.query(insertSql, [unit_name, document_id, fileData, building_name, contract, inspector_name], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error saving file details to database:', insertErr);
        return res.status(500).json({ error: 'Error saving file details to database.' });
      }
      console.log('File details and data saved to database:', insertResult);
      res.status(200).json({ message: 'File uploaded and details saved to database.' });
    });
  }
});



//upload report
// app.post('/api/upload_report', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const fileData = req.file.buffer; // Get the file data from memory
//   const { filename } = req.file;
//   const { unit_name, document_id, building_name, contract } = req.body;

//   // Insert file details and data into the database
//   const sql = 'INSERT INTO report_files (unit_name, document_id, file_data, building_name, contract) VALUES (?, ?, ?, ?, ?)';
//   db1.query(sql, [unit_name, document_id, fileData, building_name, contract], (err, result) => {
//     if (err) {
//       console.error('Error saving file details to database:', err);
//       return res.status(500).json({ error: 'Error saving file details to database.' });
//     }
//     console.log('File details and data saved to database:', result);
//     res.status(200).json({ message: 'File uploaded and details saved to database.' });
//   });
// });

//upload report
app.post('/api/upload_report', upload1.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileData = req.file.buffer; // Get the file data from memory
  const { filename } = req.file;
  const { unit_name, document_id, building_name, contract, inspector_name } = req.body;

  // Check if a record with the same values already exists
  const selectSql = 'SELECT COUNT(*) AS count FROM report_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
  db1.query(selectSql, [unit_name, document_id, building_name, contract, inspector_name], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error checking existing record:', selectErr);
      return res.status(500).json({ error: 'Error checking existing record.' });
    }

    const count = selectResult[0].count;

    if (count > 0) {
      // If a record exists, delete it
      const deleteSql = 'DELETE FROM report_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
      db1.query(deleteSql, [unit_name, document_id, building_name, contract, inspector_name], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting existing record:', deleteErr);
          return res.status(500).json({ error: 'Error deleting existing record.' });
        }
        console.log('Existing record deleted.');
        // Insert the current record
        insertNewRecord();
      });
    } else {
      // If no record exists, insert the current record directly
      insertNewRecord();
    }
  });

  function insertNewRecord() {
    // Insert file details and data into the database
    const insertSql = 'INSERT INTO report_files (unit_name, document_id, file_data, building_name, contract, inspector_name) VALUES (?, ?, ?, ?, ?, ?)';
    db1.query(insertSql, [unit_name, document_id, fileData, building_name, contract, inspector_name], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error saving file details to database:', insertErr);
        return res.status(500).json({ error: 'Error saving file details to database.' });
      }
      console.log('File details and data saved to database:', insertResult);
      res.status(200).json({ message: 'File uploaded and details saved to database.' });
    });
  }
});

// app.post('/addUnitDetails', (req, res) => {
//   const { unitArray, contract, doc } = req.body;

//   // Check if document_id exists
//   db1.query('SELECT report_array FROM unit_details WHERE document_id = ?', [doc], (error, results, fields) => {
//       if (error) {
//           console.error('Error fetching report_array:', error);
//           return res.status(500).json({ error: 'Error fetching report_array' });
//       }

//       let existingReportArray = [];

//       if (results.length > 0 && results[0].report_array) {
//           existingReportArray = JSON.parse(results[0].report_array);
//       }

//       let combinedArray;

//       if (existingReportArray.length > 0) {
//           // Concatenate existing report_array with new unit_array
//           combinedArray = [existingReportArray, unitArray];

//           // Update report_array
//           db1.query('UPDATE unit_details SET report_array = ? WHERE document_id = ?', [JSON.stringify(combinedArray), doc], (error, results, fields) => {
//               if (error) {
//                   console.error('Error updating unit details:', error);
//                   return res.status(500).json({ error: 'Error updating unit details' });
//               }
//               console.log('Unit details updated successfully');
//               return res.status(200).json({ success: true });
//           });
//       } else {
//           // If no existing report_array, use unitArray directly
//           combinedArray = [unitArray];

//           // Insert new record
//           db1.query('UPDATE unit_details SET report_array = ? WHERE document_id = ?', [JSON.stringify(combinedArray),doc], (error, results, fields) => {
//               if (error) {
//                   console.error('Error inserting unit details:', error);
//                   return res.status(500).json({ error: 'Error inserting unit details' });
//               }
//               console.log('Unit details inserted successfully');
//               return res.status(200).json({ success: true });
//           });
//       }
//   });
// });
// getQuality_emergency
app.get('/api/getQuality_emergency', (req, res) => {
  const { doc_id, unit_array } = req.query;
  const unitArr_for_img = unit_array.split(',');
  console.log("##",doc_id,unitArr_for_img)

  const sql = 'SELECT  mark,unit_no, description, dropdown_option, checked, section, Positive_MNT, Positive_ADJ, Negative_MNT, Negative_ADJ, Emergency_Features, Customer_Scope FROM record_values WHERE Emergency_Features=? AND unit_no IN (?) AND document_id =?';
  db1.query(sql,[1,unitArr_for_img,doc_id], (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    else if (result.length === 0) {
      res.status(404).json({ error: 'Data no found' });
      return;
    }
    else{
      return res.json(result) // Change this to the appropriate type for your images


    }    
  });
});


// getChecklist_Record_Val_with_unit
app.get('/api/getChecklist_Record_Val_with_unit', (req, res) => {
  const { doc_id, unit_array } = req.query;
  const unitArr_for_img = unit_array.split(',');
  console.log("parsed val",unitArr_for_img,doc_id)

  db1.query('SELECT id, document_id, inspector_name, unit_no, description, dropdown_option, checked,  needforReport, section, Positive_MNT, Positive_ADJ, Negative_MNT, Negative_ADJ, Emergency_Features, Customer_Scope,marks,img FROM  record_values WHERE document_id = ?  AND unit_no IN (?)', [doc_id, unitArr_for_img], (error, result) => {
      if (error) {
          console.error('Error fetching record values:', error);
          return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.length === 0) {
          return res.status(404).json({ error: 'No record values found' });
      }

      // Loop through the result to handle each image
      result.forEach((row, index) => {
          if (row.img !=null && row.checked) {
              // Assuming img is stored as a Buffer or Blob in the database
              const image = row.img;

              // Set the correct headers
              res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on actual image type

              console.log("working",row.description)
              // Assign the image data to the result object
              result[index].img = image;
          }
        else{
          result[index].img = null;
        }
      });

      // Send the modified result with image data
      return res.send(result);
  });
});


// app.post('/addUnitDetails', (req, res) => {
//   const { unitArray, contract, doc } = req.body;

//   // Check if document_id exists
//   db1.query('SELECT report_array FROM unit_details WHERE document_id = ?', [doc], (error, results, fields) => {
//       if (error) {
//           console.error('Error fetching report_array:', error);
//           return res.status(500).json({ error: 'Error fetching report_array' });
//       }

//       let existingReportArray = [];
//       if (results.length > 0 && results[0].report_array) {
//           existingReportArray = JSON.parse(results[0].report_array);
//       }

//       let combinedArray;
//       let reportId = existingReportArray.length + 1; // Auto-incrementing ID

//       // Add the report ID to the unit array
//       let unitArrayWithId = {
//           reportId: reportId,
//           units: unitArray
//       };

//       if (existingReportArray.length > 0) {
//           combinedArray = existingReportArray.concat([unitArrayWithId]);

//           db1.query('UPDATE unit_details SET report_array = ? WHERE document_id = ?', [JSON.stringify(combinedArray), doc], (error, results, fields) => {
//               if (error) {
//                   console.error('Error updating unit details:', error);
//                   return res.status(500).json({ error: 'Error updating unit details' });
//               }
//               console.log('Unit details updated successfully');
//               return res.status(200).json({ success: true, reportId: reportId });
//           });
//       } else {
//           combinedArray = [unitArrayWithId];

//           db1.query('UPDATE unit_details SET report_array = ? WHERE document_id = ?', [JSON.stringify(combinedArray), doc], (error, results, fields) => {
//               if (error) {
//                   console.error('Error inserting unit details:', error);
//                   return res.status(500).json({ error: 'Error inserting unit details' });
//               }
//               console.log('Unit details inserted successfully');
//               return res.status(200).json({ success: true, reportId: reportId });
//           });
//       }
//   });
// });

app.post('/addUnitDetails', (req, res) => {
  const { unitArray, contract, doc } = req.body;

  // Convert the incoming unitArray to a sorted string for comparison
  const sortedIncomingUnits = JSON.stringify(unitArray.sort());

  // Check if document_id exists
  db1.query('SELECT report_array FROM unit_details WHERE document_id = ?', [doc], (error, results, fields) => {
      if (error) {
          console.error('Error fetching report_array:', error);
          return res.status(500).json({ error: 'Error fetching report_array' });
      }

      let existingReportArray = [];
      if (results.length > 0 && results[0].report_array) {
          existingReportArray = JSON.parse(results[0].report_array);
      }

      // Helper function to check if the current unit combination already exists
      const findExistingCombination = (units) => {
          const sortedExistingUnits = JSON.stringify(units.sort());
          return sortedExistingUnits === sortedIncomingUnits;
      };

      // Find the existing combination's reportId
      const existingReport = existingReportArray.find(report => findExistingCombination(report.units));

      if (existingReport) {
          // The combination already exists, return its reportId
          return res.status(200).json({ success: true, reportId: existingReport.reportId, message: 'This combination of units already exists.' });
      }

      // Auto-incrementing ID for new report
      let newReportId = existingReportArray.length + 1;

      // Add the report ID to the new unique unit array
      let unitArrayWithId = {
          reportId: newReportId,
          units: unitArray
      };

      // Combine the new unique units with the existing report array
      let combinedArray = existingReportArray.concat([unitArrayWithId]);

      // Update the database with the new combined array
      db1.query('UPDATE unit_details SET report_array = ? WHERE document_id = ?', [JSON.stringify(combinedArray), doc], (error, results, fields) => {
          if (error) {
              console.error('Error updating unit details:', error);
              return res.status(500).json({ error: 'Error updating unit details' });
          }
          console.log('Unit details updated successfully');
          return res.status(200).json({ success: true, reportId: newReportId });
      });
  });
});




app.get('/api/get_pdf', (req, res) => {
  const { id,unit } = req.query;
  if (!id) {
    return res.status(400).send('ID parameter is required.');
  }

  const sql = "SELECT file_data FROM uploaded_files WHERE document_id = ? and unit_name =?";
  db1.query(sql, [id,unit], (err, result) => {
    if (err) {
      console.error('Error fetching PDF data from MySQL:', err);
      return res.status(500).send('Error fetching PDF data from MySQL.');
    }
    if (result.length === 0) {
      return res.status(404).send('PDF not found in MySQL.');
    }

    const pdfData = result[0].file_data;
    res.contentType('application/pdf').send(pdfData);
  });
});

//get pdf of report
//get pdf of certificate
app.get('/api/get_pdf1', (req, res) => {
  const { id,unit } = req.query;
  if (!id) {
    return res.status(400).send('ID parameter is required.');
  }

  const sql = "SELECT file_data FROM report_files WHERE document_id = ? and unit_name =?";
  db1.query(sql, [id,unit], (err, result) => {
    if (err) {
      console.error('Error fetching PDF data from MySQL:', err);
      return res.status(500).send('Error fetching PDF data from MySQL.');
    }
    if (result.length === 0) {
      return res.status(404).send('PDF not found in MySQL.');
    }

    const pdfData = result[0].file_data;
    res.contentType('application/pdf').send(pdfData);
  });
});

//view page of certificate
app.get('/api/upload_files_fetch', (req, res) => {
  const name = req.query.encodedValue;
  console.log('inspector name in view certificate is',name);

  // Execute query to fetch all records
  db1.query(`SELECT * FROM uploaded_files where inspector_name='${name}'`, (error, results, fields) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    res.json(results);
  });
});

//view page of report
app.get('/api/upload_report_fetch', (req, res) => {
  const name = req.query.name;
  console.log('report inspector name', name);

  // Execute query to fetch all records
  db1.query('SELECT id, contract, document_id, building_name, inspector_name,unit_name FROM report_files WHERE inspector_name = ?', [name], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
    res.json(results);
  });
});

//rejected reports
//view page of report
app.get('/api/reject_report_fetch', (req, res) => {
  const name = req.query.name;
  console.log('report inspector name', name);

  // Execute query to fetch all records
  db1.query('SELECT id,reject,rejected_reason, contract, document_id, building_name, inspector_name,unit_name FROM report_files WHERE inspector_name = ? and reject=?', [name,1], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
    res.json(results);
  });
});


//generated report
app.get('/api/upload_report_fetch1', (req, res) => {
  const name = req.query.name;
  console.log('report inspector name', name);

  // Execute query to fetch all records
  db1.query('SELECT id, contract, document_id, building_name, inspector_name,unit_name FROM report_files WHERE inspector_name = ? and report_status=?', [name,1], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
    res.json(results);
  });
});


//unit details fetch
app.get('/api/unit_fetch', (req, res) => {
  const name = req.query.encodedValue;

  // Execute query to fetch all records
  db1.query('SELECT * FROM unit_details WHERE head = ? AND closing_flag = ? and inspector_name=?', [1, 0,name], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    res.json(results);
  });
});

//feed back fetch
//unit details fetch
app.get('/api/feed_back_fetch', (req, res) => {
  const name = req.query.encodedValue;

  // Execute query to fetch all records
  db1.query('SELECT * FROM unit_details WHERE head = ? AND feed_back = ? and inspector_name=?', [1, 0,name], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    res.json(results);
  });
});

// // API endpoint to fetch specific record by ID
// app.get('/api/upload_files_fetch/:id', (req, res) => {
//   const id = req.params.id;
//   // Execute query to fetch record by ID
//   db1.query('SELECT * FROM uploaded_files WHERE id = ?', [id], (error, results, fields) => {
//     if (error) {
//       return res.status(500).json({ message: error.message });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'File not found' });
//     }
//     res.json(results[0]);
//   });
// });
// API endpoint to fetch PDF file by ID
app.get('/api/upload_files_fetch/:id/pdf', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows, fields] = await db1.execute('SELECT pdf_data FROM uploaded_files WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('PDF not found.');
    }
    const pdfData = rows[0].pdf_data;
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

///////////////////////////////////////////////////////////////////////////////////////////

const TransporterData = () => {
  return new Promise((resolve, reject) => {
    db.execute('SELECT App_password, Email, Organization FROM mail_automation', (error, result) => {
      if (error) {
        reject(error);
      } else {
        let transporterData = null;
        for (let i = 0; i < result.length; i++) {
          if (result[i].App_password && result[i].Email && result[i].Organization) {
            transporterData = {
              user: result[i].Email,
              pass: result[i].App_password
            };
            console.log('Email:', transporterData.user);
            console.log('Password:', transporterData.pass);
            break; // Exit the loop once the first non-empty row is found
          }
        }
        if (transporterData) {
          resolve(transporterData);
        } else {
          reject(new Error('Transporter data not found'));
        }
      }
    });
  });
};

async function getTransporterCredentials() {
  try {
    const transporterData = await TransporterData();
    console.log('Transporter data:', transporterData);
    // You can now use transporterData in further processing
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function
getTransporterCredentials();


///////////////////////////////////////////////////////////////////////////////////////////

// const TransporterData = () => {
//   return new Promise((resolve, reject) => {
//     db.execute('SELECT App_password, Email, Organization FROM mail_automation ', (error, result) => {
//       if (error) {
//         reject(error);
//       } else {
//         if (result.length === 0) {
//           reject(new Error('User not found'));
//         } else {
//           const myObject = {
//             user: result[0].Email,
//             pass: result[0].App_password
//           };
//           console.log('Email:', myObject.user);
//           console.log('Password:', myObject.pass);
//           resolve(myObject);
//         }
//       }
//     });
//   });
// };

//////////////////////////////////////////////////////////////////////////////////
const sendVerificationEmail = async (email, token, callback) => {
  try {
    // Retrieve transporter data
    const transporterData = await TransporterData();

    // Create transporter using retrieved data
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: transporterData.user,
        pass: transporterData.pass,
      },
    });

    // Construct email options
    const verificationLink = process.env.serverUrl + `api/verify-email?email=${email}&token=${token}`;
    const mailOptions = {
      from: transporterData.user,
      to: email,
      subject: 'Email Verification',
      html: `Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
//////////////////////////////////////////////////////////////////////////////////



// const sendVerificationEmail= async (email, token) => {
//   try {
    
//     let transporter;

//     // Use await to wait for TransporterData to resolve
//     const data = await TransporterData();

//     transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: data.user,
//         pass: data.pass,
//       },
//     });

//     const verificationLink = process.env.SERVER_URL + `/api/verify-email?email=${email}&token=${token}`;

//     const mailOptions = {
//       from: 'paplsoft.itservice@gmail.com',
//       to: email,
//       subject: 'Email Verification',
//       html: `Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email sending error:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//   }
// };

/////////////////////////////////////////////////////////////////////////////////
const sendVerificationEmailboolean = async (email, token, callback) => {
  try {
    // Retrieve transporter data
    const transporterData = await TransporterData();

    // Create transporter using retrieved data
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: transporterData.user,
        pass: transporterData.pass,
      },
    });

    // Construct verification link
    const verificationLink = process.env.SERVER_URL + `/api/verify-email?email=${email}&token=${token}`;

    // Construct email options
    const mailOptions = {
      from: transporterData.user, // Use retrieved email address as sender
      to: email,
      subject: 'Email Verification',
      html: `Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};


/////////////////////////////////////////////////////////////////////////////////




// // Resend verify Link
// const sendVerificationEmailboolean= async (email, token, callback) => {
//   try {
  
//     let transporter;

//     // Use await to wait for TransporterData to resolve
//     const data = await TransporterData();

//     transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: data.user,
//         pass: data.pass,
//       },
//     });

//     const verificationLink = process.env.SERVER_URL + `/api/verify-email?email=${email}&token=${token}`;

//     const mailOptions = {
//       from: 'paplsoft.itservice@gmail.com',
//       to: email,
//       subject: 'Email Verification',
//       html: `Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email sending error:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//   }
//    catch (error) {
//     console.error('Error sending email:', error.message);
//   }
// };



app.get('/api/getinfdata_forMail', (req, res) => {
  const { id } = req.query;

  // Step 1: Retrieve data from inf_26 table
  db1.query('SELECT  id,contract_number, customer_contact_name,location, master_customer_name, customer_workorder_name, customer_workorder_date, type_of_inspection, project_name, customer_contact_mailid, no_of_mandays_as_per_work_order, total_units_schedule, schedule_from, schedule_to, inspection_time_ins, inspector_list FROM inf_26 WHERE id=?',[id],(error,result)=>{

    if (error) {
      console.log("Error");
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
     else {
     
       result[0].inspector_list = JSON.parse(result[0].inspector_list).filter(item => item.trim() !== '');
        const originalDate = new Date(result[0].customer_workorder_date);

         const options = {
             year: 'numeric',
            month: '2-digit',
              day: '2-digit'
              };

        // result[0].customer_workorder_date = new Intl.DateTimeFormat('en-US', options).format(originalDate);

        // result[0].schedule_from,
        const originalDate_schedulefrom = new Date(result[0].schedule_from);

        const options_schedulefrom = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          weekday: 'long'
        };

        result[0].schedule_from = new Intl.DateTimeFormat('en-GB', options_schedulefrom).format(originalDate_schedulefrom);


        // To 
        const originalDate_scheduleto= new Date(result[0].schedule_to);

        const options_scheduleto = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          weekday: 'long'
        };

        result[0].schedule_to = new Intl.DateTimeFormat('en-GB', options_scheduleto).format(originalDate_scheduleto);
       
        const inputString = result[0].inspection_time_ins;
        const regex = /\(([^)]+)\)/;
        const match = inputString.match(regex);

        if (match) {
          result[0].inspection_time_ins=match[1];
       } 



       return res.json(result)

      
      
      }
  });
}); 

// checkContract_Avai_INF


app.get('/api/checkContract_Avai_INF',(request,response)=>{

  const{contract}=request.query;
  db1.query('SELECT id FROM inf_26 WHERE contract_number = ?', [contract], (error, result) => {


    if( result)
    {
     return response.json(result)
    }
  });

})





// getinfdata_forReport
app.get('/api/getinfdata_forReport', (req, res) => {
  const { id } = req.query;



  db1.query('SELECT id,customer_contact_name, location,building_name, master_customer_name, customer_workorder_name, customer_workorder_date, type_of_inspection, project_name, customer_contact_mailid, no_of_mandays_as_per_work_order,client_whatsapp_number, total_units_schedule, schedule_from, schedule_to, inspection_time_ins,oem_details,inspector_array FROM inf_26 WHERE contract_number = ?', [id], (error, result) => {
      if (error) {
          console.log("Error");
          res.status(500).json({ success: false, message: 'Internal server error.' });
      } else {

        if(result.length>0){

        console.log("Before",result);

      
        const originalDate = new Date(result[0].customer_workorder_date);

         const options = {
             year: 'numeric',
            month: '2-digit',
              day: '2-digit'
              };

        // result[0].customer_workorder_date = new Intl.DateTimeFormat('en-US', options).format(originalDate);

        // result[0].schedule_from,
        const originalDate_schedulefrom = new Date(result[0].schedule_from);

        const options_schedulefrom = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          weekday: 'long'
        };

        result[0].schedule_from = new Intl.DateTimeFormat('en-GB', options_schedulefrom).format(originalDate_schedulefrom);


        // To 
        const originalDate_scheduleto= new Date(result[0].schedule_to);

        const options_scheduleto = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          weekday: 'long'
        };

        result[0].schedule_to = new Intl.DateTimeFormat('en-GB', options_scheduleto).format(originalDate_scheduleto);
       
        const inputString = result[0].inspection_time_ins;
        const regex = /\(([^)]+)\)/;
        const match = inputString.match(regex);

        if (match) {
          result[0].inspection_time_ins=match[1];
       } 
       return res.json(result)
        }
        else{
          return res.json(null)
        }

      }
  });
  
}); 

// getUnit_details_Report
app.get('/api/getUnit_details_Report',(req,res)=>{
  const{contact_num}=req.query;
  console.log('111',contact_num);
  
  db1.query('SELECT `document_id`, `contract_number`, `unit_no`, `witness_details`, `inspector_name`, `building_name` FROM `unit_details` WHERE `contract_number`=?', [contact_num], (error, result) => {


    if( result)
    {
     return res.json(result)
    }
  });
})

// getBrief_spec_value
app.get('/api/getBrief_spec_value', (req, res) => {
  const { docid } = req.query;
  console.log("docid", docid);



  // Assuming unit_id is a stringified JSON array 
  let unitIdsArray;
  try {
    console.log("unit_id",req.query.unit_id);
    unitIdsArray = req.query.unit_id.split(',');
  } catch (e) {
    return res.status(400).json({ message: "Invalid unit_id format" });
  }

  console.log("unit_id", unitIdsArray);
  console.log("unit_id length", unitIdsArray.length);

  // Adjusted SQL query
  let sql = 'SELECT * FROM `breif_spec` WHERE document_id = ? AND unit_no IN (?)';
  // No need for extra array wrapping around unitIdsArray
  let queryParams = [docid, unitIdsArray];

  console.log("SQL Query:", sql); // Log the constructed SQL query

  // Adjusting how the query is executed to properly spread the array for the IN clause
  db1.query(sql, queryParams, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log("Result:", results.length, results); // Log the results from the database
    return res.json(results);
  });
});







// getinsectionmasterData

app.get('/api/getinsectionmasterData', (req, res) => {
  console.log("inspection master server called")

    let sql = 'SELECT * FROM `inspection_master` WHERE 1';


console.log("SQL Query:", sql); // Log the constructed SQL query
db1.query(sql, (error, results) => {
  if (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  // console.log("Result:", results); // Log the results from the database
  return res.json(results);
});
});
// getinspectionmaster_description_for_Variable
app.get('/api/getinspectionmaster_description_for_Variable',(req,res)=>{
  const{part}=req.query;
  db1.query('SELECT    `Description` FROM `inspection_master` WHERE `Parts`=?', [part], (error, result) => {
    if( result)
    {
     return res.json(result)
    }
  });
})

// getChecklist_Record_Val

app.get('/api/getChecklist_Record_Val',(req,res)=>{
  const{doc_id}=req.query;
  db1.query('SELECT `id`, `document_id`, `inspector_name`, `unit_no`, `description`, `dropdown_option`, `checked`, `img`, `needforReport`, `section`,`risk_level` FROM `record_values` WHERE `document_id`=?', [doc_id], (error, result) => {
    if( result)
    {
     return res.json(result)
    }
  });
})


app.get('/records', (req, res) => {
  const { document_id, unit_no} = req.query;
  console.log('body',req.query);
  
  const query = `SELECT * FROM record_values WHERE document_id = ? AND unit_no = ?`;

  db1.query(query, [document_id, unit_no], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});










// get Inspector data for mail table 
app.get('/api/getInspectordata_forMail', async (req, res) => {
  try {
    const { inspectors } = req.query;
    const regex = /\b\d+\b/g;

    const extractedNumbers_PSN = inspectors.match(regex);

    // console.log("-->", extractedNumbers_PSN);

    const resultsArray = await getinsp_Data_For_Inf(extractedNumbers_PSN);

    // console.log('Final Results:', resultsArray);
    return res.json(resultsArray);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


async function getinsp_Data_For_Inf(extractedNumbers_PSN) {
  const resultsArray = [];

  for (const inspector_PSN of extractedNumbers_PSN) {
    const query = 'SELECT `NAME`, `designation`, `contact_no`, `email_id` FROM `emp_data` WHERE `PSN_NO` = ?';

    try {
      const [rows, fields] = await db_promise.query(query, [inspector_PSN]);
      // Access the row data and push it into the resultsArray
      resultsArray.push(rows[0]);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // You might want to handle the error accordingly, e.g., push an empty object or a placeholder value
      resultsArray.push({});
    }
  }

  // console.log("====>", resultsArray.length);
  return resultsArray;
}
 






app.get('/api/getMailSetupdata_forMail', (req, res) => {
  const { organization } = req.query;
  console.log(organization);

  db.query('SELECT App_password, Email FROM mail_automation WHERE Organization=?', [organization], (error, result) => {
   
    if (result.length > 0) {
      // Send the result as a JSON response to the client
      // console.log(result)
      return res.json(result);
    } else {
      // Send a response indicating that no data was found
      return res.status(404).json({ message: 'No data found for the organization' });
    }
  });
});


let resultsArray_CV = []; // Initialize resultsArray_CV globally as an empty array

// getInspector_CV_data_forMail
app.get('/api/getInspector_CV_data_forMail', async (req, res) => {
  try {
    const { inspectors } = req.query;
    const regex = /\b\d+\b/g;

    const extractedNumbers_PSN_For_CV = inspectors.match(regex);

    resultsArray_CV = await getinsp_CV_Data_For_Inf(extractedNumbers_PSN_For_CV);

    return res.json(resultsArray_CV);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getinsp_CV_Data_For_Inf(extractedNumbers_PSN_For_CV) {
  const resultsArray = [];

  for (const inspector_PSN of extractedNumbers_PSN_For_CV) {
    const query = 'SELECT `pdf` FROM `pdf_cv` WHERE `PSN_NO`= ?';

    try {
      const [rows, fields] = await db_promise.query(query, [inspector_PSN]);

      if (rows[0] !== undefined && rows[0] !== null) {
        resultsArray.push(rows[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
// console.log("====>", resultsArray.length);

  return resultsArray;
}

// app.post('/api/sendmailtocli') route handler remains unchanged
app.post('/api/sendmailtocli', async (req, res) => {
  const {
    id,
    customername,
    totalunit,
    projectname,
    location,
    contract_number,
    customer_workorder_name,
    from,
    to,
    noOfDays,
    inspectionType,
    inspectionTime,
    customerMail,
    emailIds_CC,
    inspectorData,
    appPassword,
    senderEmail,
    inspectors
  } = req.body;

  console.log('difference between days', noOfDays);
  console.log("customer name", customername);

  try {
    const extractedNumbers = [];
    const numberRegex = /-\s(\d+)/;
    inspectors.forEach((str) => {
      const match = str.match(numberRegex);
      if (match && match[1]) {
        extractedNumbers.push(match[1]);
      }
    });

    // Retrieve transporter data
    const resultsArray_CV=await getinsp_CV_Data_For_Inf(extractedNumbers);
    const transporterData = await TransporterData();

    // Create transporter using retrieved data
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: transporterData.user,
        pass: transporterData.pass,
      },
    }); 

    const recipientEmails = customerMail.split(',').map(email => email.trim());
    console.log('mails',recipientEmails);
    

    const generatePersonnelRows = (personnelArray) => {
      let slNo = 1;
      return personnelArray.map(person => {
        return `
          <tr>
            <td style="padding-left: 10px;color: black;">${slNo++}</td>
            <td style="padding-left: 10px;color: black;">${person[1]}</td>
            <td style="padding-left: 10px;color: black;">${person[3]}</td>
            <td style="padding-left: 10px;color: black;">${person[5]}</td>
            <td style="padding-left: 10px;color: black;">${person[7]}</td>
          </tr>
        `;
      }).join('');
    };

    const mailBody = `
    <p style="color: black;">Dear Sir/Madam,</p>
    <p style="color: black;">Kind Attention:<b> ${customername}</b> </p>
    <p style="color: black;">Thank you for your order for the inspection of <b>${totalunit} Units</b> at <b> ${projectname}-${location}</b></p>
    <p style="color: black;">Please note the following:-</p>
    <div style="padding-left: 20px;">
    <table width="600" height="20" border="1" >
        <tr>
            <td style="padding: 4px;color: black;" >PAPL Order Reference</td>
            <td style="padding: 4px;color: black;  font-weight:bold" colspan="4">${contract_number}</td></tr>
            <tr>
            <td style="padding: 4px;color: black;" >Customer Order Reference</td>
            <td style="padding: 4px;color: black;" colspan="4">${customer_workorder_name}</td>
        </tr>
        <tr>
           <td style="padding: 4px; color: black;" rowspan="2"> Proposed Inspection Dates</td> 
           <td style="padding: 4px;color: black;" rowspan="1" colspan="2">Inspection Start Date</td>
          <td style="padding: 4px;color: black;">${from}</td></tr>
          <tr>
          <td style="padding: 4px;color: black;">Inspection End Date</td>
          <td style="padding: 4px;color: black;" rowspan="1" colspan="2">${to}</td>
        </tr>
        
        <tr>
            <td style="padding: 4px;color: black;" >Inspection Type</td>
            <td style="padding: 4px;color: black;" colspan="4">${inspectionType}</td>
        </tr>
        <tr>
            <td style="padding: 4px;color: black;" >Calibrated instruments carried by us</td>
            <td style="padding: 4px;color: black;" colspan="4">Metal Scale, Taper Scale, Measuring Tape</td>
        </tr>
    </table>
    </div>
    <br>
    <p style="color: black;"><b> The inspection will be carried out between ${inspectionTime}.</b></p>
    <p style="color: black;">The Inspection will be conducted by the following personnel (Credentials Attached) and request you kindly process the entry Pass accordingly.</p>
    <div style="padding-left: 20px;">
    <table border="1">
        <tr>
            <th style="color: black;">SL. NO</th>
            <th style="color: black;">NAME</th>
            <th style="color: black;">DESIGNATION</th>
            <th style="color: black;">MOBILE</th>
            <th style="color: black;">E-MAIL ID</th>
        </tr>
        
        
        ${generatePersonnelRows(inspectorData)}
        
    </table>
    </div>
    <br>
    <p style="color: black;">Representatives of OEM/ Service providers at the supervisory level with adequate manpower <b>(One Technical Person per Inspector)</b> and tools as listed below should be made available throughout the inspection for coordination and support.</p>
    <p style="color: black;">We need -: </p>
    <div style="padding-left: 20px;">
          <p style="color: black;">1. Permission to enter the premises</p>
    
        <p style="color: black;">2. Permission to travel on Equipment, enter the Pit, Car Top, and Machine Room. OEM/service provider or the building management should not object.</p>
    
        <p style="color: black;">3. Permission to carry Torch, Measuring tape, and other measuring instruments.</p>
    
        <p style="color: black;">4. Permission to record measurements and other findings as may be required.</p>
    
       <p style="color: black;">5. <u><b>Permission to carry a camera </b></u>and photograph the installation including the lobby, Elevator Pit, Elevator Machine fixing arrangements, Car top, floor landing fixtures, and any other space related to the equipment</p>
    </div>
    
       <p style="color: black;">The Following Tools and measuring instruments with <u>Valid Calibration Certificates from NABL Accredited laboratories, traceable to national/international references </u>should be made available by the OEM/Service Provider throughout the inspection.</p>
    <div style="padding-left: 20px;">
       <table border="1" width="200" >
        <tr >
           <td style="text-align: center;color: black; font-weight:bold" >TOOLS</td>
        </tr>
        <tr>
            <td style="text-align: center;color: black;">HANDLAMP</td>
        </tr>
        <tr>
            <td style="text-align: center;color: black;">HAND TOOLS</td>
        </tr>
        <tr>
            <td style="text-align: center;color: black;">DOOR OPEN KEYS</td>
        </tr>
    </table>
    </div>
    <br>
    <p style="color: black;">
        <b>This inspection shall be independent & impartial,</b> irrespective of any other engagement that PAPL Corp shall have with you. Please refer to our policy <a href="https://paplcorp.com/policy.html">(https://paplcorp.com/policy.html)</a> on the same for more information.
    
    Please email your feedback/ concerns/ complaints if any on the constitution of the inspector/s or any other issue about our engagement to <a href="info@paplcorp.com">info@paplcorp.com</a> the same shall be addressed on priority. Please refer to our policy on complaints and appeals <a href="https://paplcorp.com/policy-04.html">(https://paplcorp.com/policy-04.html)</a></p>
    <div >
    <p style="font-weight: bolder; color: black;">Note: This email is automatically generated by the system. Incase of Queries/clarifications, please do not hesitate to reach out to the PAPL team. Kindly confirm your availability by Clicking the 'Response' button. </p>
    </div>
    
    <br>
    <br>
    <div style="padding-left: 45%;"  >
    
    <br>
    <a href=${mail_response}?id=${id} target="_blank"> <!-- Use mail_response here -->
        <button style="background-color: #3559E0; color: white; padding: 10px 20px; border-radius: 5px; "  >Response</button>
    </a>
    </div>
    <br>
    <br>
    `;

    // Ensure resultsArray_CV is an array before attempting to map it

    const attachments = resultsArray_CV.length > 0 ? resultsArray_CV.map((pdf, index) => {
      return {
        filename: `CV-attachment${index + 1}.pdf`,
        content: pdf.pdf.toString('base64'),
        encoding: 'base64',
        contentType: 'application/pdf'
      };
    }) : [];

    const mailOptions = {
      from: transporterData.user,
      to: recipientEmails,
      cc: emailIds_CC,
      subject: "Elevators Inspection," + projectname,
      html: mailBody,
      attachments: attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent report:', info.response);
    return res.json({ success: info.response });
  } catch (error) {
    console.error('Error:', error);
    console.error('Stack Trace:', error.stack);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
  }
});







// 
// app.post('/api/sendmailtocli', async (req, res) => {
//   const {
//     id,
//     customername,
//     totalunit,
//     projectname,
//     location,
//     contract_number,
//     customer_workorder_name,
//     from,
//     to,
//     noOfDays,
//     inspectionType,
//     inspectionTime,
//     customerMail,
//     emailIds_CC,
//     inspectorData,
//     appPassword,
//     senderEmail,
//     inspectors
//   } = req.body;
//   console.log('difference between days',noOfDays);

//   console.log("customer name", customername);
  
//   try {
//     // Handle the data from the request body
//     console.log(">>>>", customername, totalunit, projectname, location, from, to, noOfDays, inspectionType, inspectionTime, customerMail,inspectorData, appPassword, senderEmail, inspectors); 
//     const extractedNumbers = [];
//     const numberRegex = /-\s(\d+)/;
//     inspectors.forEach((str) => {
//       // Use the regular expression to match and extract the number
//       const match = str.match(numberRegex);
//       // If a match is found, push the extracted number to the array
//       if (match && match[1]) {
//         extractedNumbers.push(match[1]);
//       }
//     });

//     // Retrieve transporter data
//     const transporterData = await TransporterData();

//     // Create transporter using retrieved data
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: transporterData.user,
//         pass: transporterData.pass,
//       },
    
// });
    
// const generatePersonnelRows = (personnelArray) => {
//   let slNo = 1;
//   return personnelArray.map(person => {
   

//     return `
//       <tr>
//       <td style="padding-left: 10px;color: black;">${slNo++}</td>
//         <td style="padding-left: 10px;color: black;">${person[1]}</td>
//         <td style="padding-left: 10px;color: black;">${person[3]}</td>
//         <td style="padding-left: 10px;color: black;">${person[5]}</td>
//         <td style="padding-left: 10px;color: black;">${person[7]}</td>
//       </tr>
//     `;
//   }).join('');;
// };



//     const mailBody = `
    
//     <p style="color: black;">Dear Sir/Madam,</p>
//     <p style="color: black;">Kind Attention:<b> ${customername}</b> </p>
//     <p style="color: black;">Thank you for your order for the inspection of <b>${totalunit} Units</b> at <b> ${projectname}-${location}</b></p>
//     <p style="color: black;">Please note the following:-</p>
//     <div style="padding-left: 20px;">
//     <table width="600" height="20" border="1" >
//         <tr>
//             <td style="padding: 4px;color: black;" >PAPL Order Reference</td>
//             <td style="padding: 4px;color: black;  font-weight:bold" colspan="4">${contract_number}</td></tr>
//             <tr>
//             <td style="padding: 4px;color: black;" >Customer Order Reference</td>
//             <td style="padding: 4px;color: black;" colspan="4">${customer_workorder_name}</td>
//         </tr>
//         <tr>
//            <td style="padding: 4px; color: black;" rowspan="2"> Proposed Inspection Dates</td> 
//            <td style="padding: 4px;color: black;" rowspan="1" colspan="2">Inspection Start Date</td>
//           <td style="padding: 4px;color: black;">${from}</td></tr>
//           <tr>
//           <td style="padding: 4px;color: black;">Inspection End Date</td>
//           <td style="padding: 4px;color: black;" rowspan="1" colspan="2">${to}</td>
//         </tr>
//         <tr>
//             <td style="padding: 4px;color: black;">Total Number of Days</td > 
//             <td style="padding: 4px;color: black;" colspan="4">	${noOfDays} Days</td>
//         </tr> 
//         <tr>
//             <td style="padding: 4px;color: black;" >Inspection Type</td>
//             <td style="padding: 4px;color: black;" colspan="4">${inspectionType}</td>
//         </tr>
//         <tr>
//             <td style="padding: 4px;color: black;" >Calibrated instruments carried by us</td>
//             <td style="padding: 4px;color: black;" colspan="4">Metal Scale, Taper Scale, Measuring Tape</td>
//         </tr>
//     </table>
//     </div>
//     <br>
//     <p style="color: black;"><b> The inspection will be carried out between ${inspectionTime}.</b></p>
//     <p style="color: black;">The Inspection will be conducted by the following personnel (Credentials Attached) and request you kindly process the entry Pass accordingly.</p>
//     <div style="padding-left: 20px;">
//     <table border="1">
//         <tr>
//             <th style="color: black;">SL. NO</th>
//             <th style="color: black;">NAME</th>
//             <th style="color: black;">DESIGNATION</th>
//             <th style="color: black;">MOBILE</th>
//             <th style="color: black;">E-MAIL ID</th>
//         </tr>
        
        
//         ${generatePersonnelRows(inspectorData)}
        
//     </table>
//     </div>
//     <br>
//     <p style="color: black;">Representatives of OEM/ Service providers at the supervisory level with adequate manpower <b>(One Technical Person per Inspector)</b> and tools as listed below should be made available throughout the inspection for coordination and support.</p>
//     <p style="color: black;">We need -: </p>
//     <div style="padding-left: 20px;">
//           <p style="color: black;">1. Permission to enter the premises</p>
    
//         <p style="color: black;">2. Permission to travel on Equipment, enter the Pit, Car Top, and Machine Room. OEM/service provider or the building management should not object.</p>
    
//         <p style="color: black;">3. Permission to carry Torch, Measuring tape, and other measuring instruments.</p>
    
//         <p style="color: black;">4. Permission to record measurements and other findings as may be required.</p>
    
//        <p style="color: black;">5. <u><b>Permission to carry a camera </b></u>and photograph the installation including the lobby, Elevator Pit, Elevator Machine fixing arrangements, Car top, floor landing fixtures, and any other space related to the equipment</p>
//     </div>
    
//        <p style="color: black;">The Following Tools and measuring instruments with <u>Valid Calibration Certificates from NABL Accredited laboratories, traceable to national/international references </u>should be made available by the OEM/Service Provider throughout the inspection.</p>
//     <div style="padding-left: 20px;">
//        <table border="1" width="200" >
//         <tr >
//            <td style="text-align: center;color: black; font-weight:bold" >TOOLS</td>
//         </tr>
//         <tr>
//             <td style="text-align: center;color: black;">HANDLAMP</td>
//         </tr>
//         <tr>
//             <td style="text-align: center;color: black;">HAND TOOLS</td>
//         </tr>
//         <tr>
//             <td style="text-align: center;color: black;">DOOR OPEN KEYS</td>
//         </tr>
//     </table>
//     </div>
//     <br>
//     <p style="color: black;">
//         <b>This inspection shall be independent & impartial,</b> irrespective of any other engagement that PAPL Corp shall have with you. Please refer to our policy <a href="https://paplcorp.com/policy.html">(https://paplcorp.com/policy.html)</a> on the same for more information.
    
//     Please email your feedback/ concerns/ complaints if any on the constitution of the inspector/s or any other issue about our engagement to <a href="info@paplcorp.com">info@paplcorp.com</a> the same shall be addressed on priority. Please refer to our policy on complaints and appeals <a href="https://paplcorp.com/policy-04.html">(https://paplcorp.com/policy-04.html)</a></p>
//     <div >
//     <p style="font-weight: bolder; color: black;">Note: This email is automatically generated by the system. Incase of Queries/clarifications, please do not hesitate to reach out to the PAPL team. Kindly confirm your availability by Clicking the 'Response' button. </p>
//     </div>
    
//     <br>
//     <br>
//     <div style="padding-left: 45%;"  >
    
//     <br>
//     <a href=${mail_reposonse}id=${id} target="_blank">
//       <button style="background-color: #3559E0; color: white; padding: 10px 20px; border-radius: 5px; "  >Response</button>
//     </a>
//     </div>
//     <br>
//     <br>
//     `;
//     const attachments = resultsArray_CV.map((pdf, index) => {
//       return {
//         filename: `CV-attachment${index + 1}.pdf`,
//         content: pdf.pdf.toString('base64'),
//         encoding: 'base64', // set encoding to base64
//         contentType: 'application/pdf' 
//       };
//     });
   

//     // console.log("000000", emailIds_CC)
//     // console.log("attachment",attachments)
//     const mailOptions = {
//       from:transporterData.user,
//       to: customerMail, // Replace with the actual recipient email
//       cc:emailIds_CC,
//       subject:  "Elevators & Escalators Inspection,"+projectname,
//       html: mailBody,
//       attachments: attachments
//     };


//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent report:',info.response);
//     return res.json({ success: info.response });
//   } catch (error) {
//     // console.error('Error:', error.message);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Client_approval
app.post('/api/Client_approval', (req, res) => {
  const { id } = req.body;
  console.log("Server called", id);

  db1.query("UPDATE `inf_26` SET `client_approval_status` = ? WHERE `id` = ?", ["1", id], (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    } else {
      if (result.affectedRows > 0) {
        console.error("Approved:");
        res.status(200).json("Approved");
      } else {
        console.error("Record not found:");
        res.status(404).json("Record not found");
      }
    }
  });
});



// submitRejection
app.post('/api/submitRejection', (req, res) => {
  const { data,id } = req.body;
  console.log("Server called", id);

  db1.query("UPDATE `inf_26` SET `client_rejection_reason` = ? WHERE `id` = ?", [data, id], (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    } else {
      if (result.affectedRows > 0) {
        console.error("Added:");
        res.status(200).json("Added");
      } else {
        console.error("Record not found:");
        res.status(404).json("Record not found");
      }
    }
  });
});

// check ngonint state
app.post('/api/Check_Client_response', (req, res) => {
  const { id } = req.body;
  console.log("Server called", id);

  db1.query("SELECT `client_approval_status`, `client_rejection_reason` FROM `inf_26` WHERE `id`=?", [ id], (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    } else {
     
        console.error("Added:");
        res.status(200).json(result);
     
    }
  });
});
// set_send_Mail_status

app.post('/api/setMailstatus', (req, res) => {
  const { id } = req.body;
  console.log("Server called===", id);

db1.query("UPDATE `inf_26` SET`mailset_status`='1' WHERE id=?",[id],(err,result)=>{
  if(result)
  {
    res.json({ message: 'Mail status set successfully' });
  }
  else{
    res.json({ message: 'Mail status Not successfully' });
  }
});

  
});


// get_Rejection_schedule

app.get('/api/get_Rejection_schedule', (req, res) => {
  console.log("Server called *****&");

  db1.query("SELECT * FROM `reject_cause` WHERE 1", (err, result) => {
    if (result) {
      console.log(result);
      res.json(result);   
    } else {
      res.json({ message: 'Mail status Not successfully' });
    }
  });
});

// get_checklistmaster

app.get('/api/get_checklistmaster', (req, res) => {
  // db.query('SELECT App_password, Email FROM mail_automation WHERE Organization=?', [organization], (error, result) => {
    db1.query("SELECT * FROM `inspection_master` WHERE 1",(err,result)=>{
    if (result) {
      // Send the result as a JSON response to the client
      // console.log(result)
      return res.json(result);
    } else {
      // Send a response indicating that no data was found
      return res.status(404).json({ message: 'No data found for the organization' });
    }
  });
});

// getpitContent

app.get('/api/getpitContent', (req, res) => {
  const { product } = req.query;
  console.log("PPP called", product);

  const query = 'SELECT `Description` FROM `inspection_master` WHERE `Parts`= ?';
  db1.query(query, [product], (err, results) => {
    if (results) {
      console.log(results);
      res.json(results); // Send the results back to the client
    } else {
      console.error(err);
      res.status(500).send('Error occurred');
    }
  });
});


// get_insp_master_checklist_description
app.get('/api/get_insp_master_checklist_description', (req, res) => {
  const { Description } = req.query;
  console.log("PPP called", Description);

  const query = 'SELECT   `Reference`, `Photo`, `Dropdown`,Negative_MNT,Negative_ADJ,Positive_ADJ,Positive_MNT,Emergency_Features,Customer_Scope,functional_point,Risklevel,id,mark FROM `inspection_master` WHERE `Description`= ?';
  db1.query(query, [Description], (err, results) => {
    if (results) {
      console.log("/////",results);
      res.json(results); // Send the results back to the client
    } else {
      console.error(err);
      res.status(500).send('Error occurred');
    }
  });
});

//get units
// getUnitNumbers
app.get('/api/getUnitNumbers',(req,res)=>{
  const{contractNo,documentidForUrl}=req.query;
  db1.query('SELECT  unit_no FROM unit_details WHERE document_id=? AND contract_number=?', [documentidForUrl,contractNo], (error, result) => {
    if( result)
    {
       
          
      db1.query('SELECT Parts FROM inspection_master GROUP BY Parts ORDER BY MIN(id) ASC', (error, partsResult) => {
        if (error) {
            console.error('Error fetching distinct Parts:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        else{
          db1.query('SELECT Description,Parts FROM inspection_master GROUP BY Description ORDER BY MIN(id) ASC', (error, description_parts_Result) => {
            if (error) {
                console.error('Error fetching distinct Parts:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log("/////",description_parts_Result)
            return res.json({ unit: result, parts: partsResult,descriptionParts :description_parts_Result});
          });

        }

           
  });
    
    }
  });
})

app.post('/api/insert_Record_Values', upload.single('image'), (req, res) => {
  const {id_no,risk_level,functional_point, documentId, inspectorName, section, unitNo, title, valueArray, checkpoint, NeedforReport, positive_MNT, positive_ADJ, Negative_MNT, Negative_ADJ, Emergency_Features, Customerscope,mark } = req.body;
  console.log('id no is',id_no);
  console.log('mark is',mark);
  console.log('positive',positive_ADJ);
  
  // Check if image exists in the request
  console.log('marks is',mark);
  
  const image = req.file;
  const profileImagePath = image ? image.path : null;
  let imageData = null;

  const parsedPositiveMNT = parseFloat(positive_MNT);
  const parsedPositiveADJ = parseFloat(positive_ADJ);

  const parsedNegativeMNT = parseFloat(Negative_MNT)|0;
  const parsedNegativeADJ = parseFloat(Negative_ADJ)|0;
  // const risk_level1=parseInt(risk_level)
  const parsedEmergencyFeatures = Emergency_Features === '1';
  const parsedCustomerScope = Customerscope === '1';
  const parsedCheckpoint = checkpoint === 'true';
  const parsedNeedforReport = NeedforReport === 'true';

  // Check if image data exists and read it
  if (image) {
    imageData = fs.readFileSync(image.path);
  }

  console.log('document id is',documentId);
  console.log('section ',section);
  console.log('inspector name',inspectorName);
  console.log('unit no',unitNo);
  console.log('title is ',title);
  console.log('value array',valueArray);

  // Construct the SQL query to check if the record already exists
  const checkQuery = `SELECT COUNT(*) AS count FROM record_values WHERE document_id = ? AND section = ? AND inspector_name = ? AND unit_no = ? AND description = ? AND dropdown_option = ?`;

  // Execute the check query
  db1.query(checkQuery, [documentId, section, inspectorName, unitNo, title, valueArray], (error, results) => {
    if (error) {
      console.error('Error checking if record already exists:', error);
      return res.status(500).json({ error: 'An error occurred while checking if record already exists.' });
    }

    // Check if any records with the same constraints already exist
    const count = results[0].count;
    console.log('count is',count);
    if (count > 0) {
      // If the record already exists, delete existing records with the same id_no
      const deleteQuery = `DELETE FROM record_values WHERE id_no = ? AND document_id = ? AND section = ? AND inspector_name = ? AND unit_no = ? AND description = ? AND dropdown_option = ?`;

      db1.query(deleteQuery, [id_no,documentId, section, inspectorName, unitNo, title, valueArray], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error('Error deleting existing records:', deleteError);
          return res.status(500).json({ error: 'An error occurred while deleting existing records.' });
        }
        console.log('Delete query executed. Affected rows:', deleteResults.affectedRows);


        // Proceed with insertion after deletion
        insertRecords();
      });
    } else {
      // If the record doesn't exist, proceed with insertion directly
      insertRecords();
    }
  });

function insertRecords(){
  const query = `INSERT INTO record_values (marks,id_no,risk_level,functional_point,document_id, inspector_name, unit_no, description, dropdown_option, checked, img, needforReport, section, Positive_MNT, Positive_ADJ, Emergency_Features, Customer_Scope) VALUES ?`;

  // Prepare the data to be inserted
  const values = [];
  

  

    values.push([mark,id_no,risk_level,functional_point,documentId,inspectorName,unitNo,title, valueArray,parsedCheckpoint,imageData,parsedNeedforReport,section,  parsedPositiveMNT,parsedPositiveADJ,parsedEmergencyFeatures,parsedCustomerScope]);
   

  // Execute the insertion query
  db1.query(query, [values], (error, results) => {
    if (error) {
      console.error('Error inserting into pit:', error);
      return res.status(500).json({ error: 'An error occurred while inserting into database.' });
    }
    if (results && results.affectedRows > 0) {
      if (profileImagePath) {
        fs.unlink(profileImagePath, (err) => {
          if (err) {
            console.error('Error deleting image file:', err);
          }
        });
      }
      return res.json("Data Saved Successfully");
    } else {
      return res.status(500).json({ error: 'No rows were inserted into the database.' });
    }
  });


 }
});











 // get_getinspectionMaster_unique_for_quality
 app.get('/api/get_getinspectionMaster_unique_for_quality', async (req, res) => {
   
   
  const sql = 'SELECT  DISTINCT `Parts`,`id`, `Description`, `Dropdown` FROM `inspection_master` WHERE 1';
  db1.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching image from database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
     
    }
    else{


      // console.log(">>",result)
  

      let finalArray = transformData(result);

    //  console.log("<",finalArray);

      return res.json(finalArray)
    }
   
  
})
});





// from serverUrl.js
app.post('/api/Check_check_data_exists', (req, res) => {
  const { Doc, unit, section, insp_name, String_array } = req.body;


  const parsedStringArray = String_array.split('~');

  // Array to store boolean values indicating data existence
  const dataExistsArray = [];

  // Function to check if data exists based on provided criteria
  const checkDataExists = (criteria) => {
    return new Promise((resolve, reject) => {
      // Execute database query to check if data exists based on the criteria
      const query = `
        SELECT COUNT(*) AS count
        FROM record_values
        WHERE document_id=? AND unit_no=? AND section=? AND inspector_name=? AND description=?
      `;
      db1.query(query, criteria, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Check if any records exist based on the query result
          // console.log('result is ',results);

          const count = results[0].count;
          resolve(count > 0);
        }
      });
    });
  };

  const promises = parsedStringArray.map(async (item) => {
    const dataExists = await checkDataExists([Doc, unit, section, insp_name, item]);
    dataExistsArray.push(dataExists);
  });

  // Wait for all promises to resolve
  Promise.all(promises)
    .then(() => {
      // console.log("Data exists array:", dataExistsArray);
      // Send the dataExistsArray as the response
      console.log('response array ',dataExistsArray);
      res.json(dataExistsArray);

    })
    .catch((error) => {
      console.error("Error checking data existence:", error);
      res.status(500).json({ error: 'An error occurred while checking data existence.' });
    });
});















app.get('/api/verify-email', (req, res) => {
  const { email, token } = req.query;


  const query='SELECT Emailtoken FROM clientadmin WHERE Email= ?';
  db.query(query, [email], (err, results) => {
    if(err)
    {
      // console.log("Verification status",error)
      return res.status(101).json("Email verification faild");

    }
    else{
       const tokendetails=results[0]
      if (tokendetails.Emailtoken === token) {
        db.query('UPDATE `clientadmin` SET `Emailverified`=? WHERE Email=?',[1,email],(err,result)=>{
          if(result)
          {
            return res.send(`
            <html>
            <body>
              <h1>Email Verified Successfully</h1>
              <p style="color: black;">All is set! You can now move to your dashboard.</p>
              <!-- You can add a button or link to navigate to the dashboard -->
              <a href="${process.env.CLIENT_URL}">Go to Dashboard</a>
            </body>
            </html>
          `);
          }
          if(err)
          {
            return res.status(401).json("Email verified Successfull");
          }
        }
        );
        
      } 
      else {
        return res.status(401).json( 'Invalid verification token');
      }
      
    }

  });
  
});





app.get('/api/ResendVerificationLink', (req, res) => {
  const email = req.query.Email;
  const verificationToken = uuidv4();

  sendVerificationEmailboolean(email, verificationToken, (error) => {
    if (error) {
      res.json({ success: false, message: 'Failed to send verification email' });
    } 
    else {
      db.query('UPDATE clientadmin SET Emailtoken= ? WHERE Email=?',[verificationToken,email],(error,result)=>{ 
        if(result)
        {
          console.log("DB Updated")
          res.json({ success: true, message: 'Verification link sent successfully' });
        }
       });
    }
  });
});














// get INspector List from scheduled INF26
app.get('/api/Get_Insp_List',(req,res)=>{

 
    
    const query='SELECT `inspector_list` FROM `inf_26` WHERE 1 ';
    db1.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        // Filter out empty values
        const filteredResults = results.filter((result) => {
          return result.inspector_list !== '[""]' && result.inspector_list !== null;
        });
    
        console.log("--------->", filteredResults);
        return res.json(filteredResults);
      }
    });
  });



// Get Leave Data For Inspection schedule from NExt Link
// app.get('/api/leaveData', (req, res) => {
//   const ref = Firebase_db.ref('/Leave/Leaveforleadknown/krishnannarayananpaplcorpcom');

//   const today = new Date();  // Get the current date
//   const nextTwoMonths = new Date();
//   nextTwoMonths.setMonth(today.getMonth() + 2);  // Set the date to two months from now

//   ref.once('value', (snapshot) => {
//     const data = snapshot.val();

//     // Use an object to group data by date and month
//     const groupedData = {};

//     Object.keys(data).forEach(personName => {
//       const from_personData = data[personName];

//       Object.keys(from_personData).forEach(year => {
//         const from_yearData = from_personData[year];

//         Object.keys(from_yearData).forEach(month => {
//           const from_monthData = from_yearData[month];

//           Object.keys(from_monthData).forEach(date => {
//             // Convert year, month, and date to a Date object for comparison
//             const currentDate = new Date(`${year}-${month}-${date}`);

//             // Check if the date is within the range of today to the next two months
//             if (currentDate >= today && currentDate <= nextTwoMonths) {
//               const dateString = currentDate.toISOString().split('T')[0];

//               if (!groupedData[dateString]) {
//                 groupedData[dateString] = {
//                   date: dateString,
//                   names: [],
//                 };
//               }

//               groupedData[dateString].names.push(personName);
//             }
//           });
//         });
//       });
//     });
//     // Convert the grouped data object to an array
//     const resultArray = Object.values(groupedData);

//     res.json(resultArray);
//   }, (errorObject) => {
//     console.error('The read failed: ' + errorObject.code);
//     res.status(500).send('Internal Server Error');
//   });
// });



app.post('/api/profileInsert',(req,res)=>{
  const {organization_name,address,pincode,state,country,contact,organization}=req.body;
  // console.log("server called",organization_name,address,pincode,state,country,contact,organization)


  db.query('INSERT INTO organization_profile(Organization_name,Address,Pincode,State,Country,Contact,Organization) VALUES (?,?,?,?,?,?,?)',[organization_name,address,pincode,state,country,contact,organization],(error,response)=>{
    if(error)
    {
      res.json("Error")
    }
    else{
      if(response)
      {
        res.json("Profile is uploaded")

      }
    }

  });
})


// Assuming your endpoint looks like '/api/Email_exists?Email=someemail@example.com'
app.get('/api/Email_exists', (req, res) => {
  const { Email } = req.query; // Use req.query to get query parameters
  console.log("server called", Email);

  const query = 'SELECT Email, Emailverified FROM clientadmin WHERE Email = ?';

  db.query(query, [Email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        console.log("Email exists:", results);
        return res.json(results);
      } else {
        console.log("Email does not exist");
        return res.json({ error: 'Email does not exist' });
      }
    }
  });
});
// sent_Password_reset_link















app.get('/api/sent_Password_reset_link', async (req, res) => {
  const { Email } = req.query;

  try {
    // Retrieve transporter data
    const transporterData = await TransporterData();

    // Create nodemailer transporter using retrieved data
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: transporterData.user,
        pass: transporterData.pass
      }
    });

    const resetToken = uuid.v4();
    // Update reset token in the database
    db.query('UPDATE `clientadmin` SET `Emailtoken`= ? WHERE `Email`=?', [resetToken, Email], (error, updateResult) => {
      if (updateResult) {
        const resetLink = process.env.CLEINT_URL + `/reset?token=${resetToken}`;
        console.log(Email, resetToken);

        const mailOptions = {
          from: 'paplsoft.itservice@gmail.com',
          to: Email,
          subject: 'Password Reset Request',
          html: `
            <p>Hello,</p>
            <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            <p>Click the following link to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>If the link doesn't work, copy and paste it into your browser's address bar.</p>
            <p>Thank you!</p>
          `
        };

        // Send the email using nodemailer transporter
        transporter.sendMail(mailOptions, (sendMailError, info) => {
          if (sendMailError) {
            console.error('Error sending email:', sendMailError);
            res.status(500).json({ error: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: 'Reset link sent to your mail. Please check it.' });
          }
        });
      } else {
        console.error('Error updating token in the database:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Error retrieving transporter data:', error);
    res.status(500).json({ error: 'Failed to retrieve transporter data' });
  }
});










// app.get('/api/sent_Password_reset_link', (req, res) => {
//   const { Email } = req.query;

//   db.query('SELECT App_password, Email FROM mail_automation WHERE Organization=?', ["papl"], (error, result) => {
//     if (result.length > 0) {
//       console.log("mailsetup data", result);

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: result[0].Email,
//           pass: result[0].App_password
//         }
//       });

//       const resetToken = uuid.v4();
//       db.query('UPDATE `clientadmin` SET `Emailtoken`= ? WHERE `Email`=?', [resetToken, Email], (error, updateResult) => {
//         if (updateResult) {
//           const resetLink = process.env.CLEINT_URL + `/reset?token=${resetToken}`;
//           console.log(Email, resetToken);

//           const mailOptions = {
//             from: 'paplsoft.itservice@gmail.com',
//             to: Email,
//             subject: 'Password Reset Request',
//             html: `
//               <p>Hello,</p>
//               <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
//               <p>Click the following link to reset your password:</p>
//               <a href="${resetLink}">${resetLink}</a>
//               <p>If the link doesn't work, copy and paste it into your browser's address bar.</p>
//               <p>Thank you!</p>
//             `
//           };

//           transporter.sendMail(mailOptions, (sendMailError, info) => {
//             if (sendMailError) {
//               console.error('Error sending email:', sendMailError);
//               res.status(500).json({ error: 'Error sending email' });
//             } else {
//               console.log('Email sent:', info.response);
//               res.status(200).json({ success: 'Reset link sent to your mail. Please check it.' });
//             }
//           });
//         } else {
//           console.error('Error updating token in the database:', error);
//           res.status(500).json({ error: 'Internal server error' });
//         }
//       });
//     } else {
//       console.log('No mail setup data found');
//       res.status(500).json({ error: 'No mail setup data found' });
//     }
//   });
// });

// Reset_Password
app.post('/api/Reset_Password', async (req, res) => {
  const { Password, token, Email } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(Password, 12);
console.log("password",hashedPassword)
console.log("token",token)
console.log("Email",Email)
    // Update the password in the database
    const query = 'UPDATE clientadmin SET Password = ? WHERE Email = ? AND Emailtoken = ?';
    db.query(query, [hashedPassword, Email, token], (err, results) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.affectedRows > 0) {
          console.log('Password updated successfully');
          db.query("UPDATE `clientadmin` SET `Emailtoken`=? WHERE `Email`=?",['Empty',Email]);
          return res.json({ success: 'Password updated successfully' });
        } else {
          console.log('Email does not exist or token is invalid');
          return res.json({ error: 'Email does not exist or Link is expired' });
        }
      }
    });
  } catch (hashError) {
    console.error('Error hashing password:', hashError);
    return res.status(500).json({ error: 'Internal server error' });
  }
});







app.get('/api/loginData',(req, res)=>{


  const query='SELECT Email,Username,Organization,Status,Role,Emailverified,Department FROM clientadmin';
  db.query(query,(err,results)=>{
    if(err)
    {
      // console.log("Error accoured",err);
      return res.status(500).json({ error: err });
    }
    else{
      // console.log(results)
      const arrayLength = results.length;
       Logineddata =[];
     
      
      // Iterate through the array
      for (let i = 0; i < arrayLength; i++) {


        // results[i].Password
         Logineddata[i] = results[i];


      
       
      }
      // console.log(Logineddata);
      res.json(Logineddata);


    }

  });

}
);

app.delete('/api/Role_Data_Delete', (req, res) => {
  const { organization, role } = req.body;

  // Ensure that the organization and department are provided in the request body
  if (!organization || !role) {
    return res.status(400).json({ error: 'Organization and department are required in the request body' });
  }

  db.query("DELETE FROM organization_role WHERE Organization=? AND Role=?", [organization, role], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } 
    else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});

app.delete('/api/Department_Data_Delete', (req, res) => {
  const { organization, department } = req.body;

  // Ensure that the organization and department are provided in the request body
  if (!organization || !department) {
    return res.status(400).json({ error: 'Organization and department are required in the request body' });
  }

  db.query("DELETE FROM organization_department WHERE Organization=? AND Department=?", [organization, department], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});


app.delete('/api/adminregister_login_delete',(req,res)=>{
const{email}=req.body;
// console.log(email)
db.query('DELETE FROM `clientadmin` WHERE `Email`= ? ',[email],(err,results)=>{
  if (err) {
  return res.status(500).json({ error: 'Internal server error' });
}
else{
  // console.log(results)
  return res.status(401).json({ error: 'Delete Successfully' });
}


});

});



app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT Email,Password,Organization,Status,Role,Username,Emailverified FROM clientadmin WHERE Email = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      // console.log("+++", err);
      console.log(err);

      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      // console.log("---", err);
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    else{
    const user = results[0];

    bcrypt.compare(password, user.Password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error('Bcrypt Compare Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!bcryptResult) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      try {
        const token = jwt.sign({ userId: username }, secretKey, {
          expiresIn: '1h',
        });

        

        const status = user.Status;
        const role = user.Role;
        const organization = user.Organization;
         let user_name="sam";
        const mail_status=user.Emailverified;

        // This is get the Inspector name From insp_data Database
        db1.query('SELECT inspector_name FROM insp_data WHERE emailid= ?  ',username,(err,result)=>{
          if(result)
          {
            // user_name=result[0].inspector_name;
            user_name=user.Username;

           
          }
          else{
            user_name=user.Username;
          }
          // console.log("Name from PAPL INSPECTION EMP",user_name)
          res.json({ token, status, role, organization,user_name,mail_status });
        })

        
      } 
      catch (error) {
        res.status(500).json({ error: 'Token creation failed' });
      }
    });
  }
  });
});



// get emp Profile data

app.get('/api/get_emp_data',(req,res)=>{
  const query='SELECT NAME,email_id,PSN_NO,designation,contact_no,date_of_joining,date_of_birth,dept FROM emp_data';
  db1.query(query,(err,results)=>{
    if(err)
    {
      console.log("Error accoured",err);
      return res.status(500).json({ error: err });
    }
    else{
      
      // console.log(results)
      const arrayLength = results.length;
       Logineddata =[];
     
      
      // Iterate through the array
      for (let i = 0; i < arrayLength; i++) {


        // results[i].Password
         Logineddata[i] = results[i];


      
       
      }
      console.log(Logineddata);
      res.json(Logineddata);


    }

  });

})
// update profiledata 
app.put('/api/update_profile',(req,res)=>{
  const {name ,email_id,PSN_NO,designation,contact_no,date_of_joining,date_of_birth,dept,existingemail}=req.body;

  db1.query('UPDATE emp_data SET NAME=? ,PSN_NO=?,designation=?,contact_no=?,email_id=?,date_of_joining=?,date_of_birth=?,dept=? WHERE email_id=? ',
  [name ,PSN_NO,designation,contact_no,email_id,date_of_joining,date_of_birth,dept,existingemail],(err,result)=>{

    if(err)
    {
      console.log("Error",err)
res.status(500).json({error:'internal server error'})
    }
    else{
      if(result.affectedRows===0)
      {
        console.log("Existing not found")
        res.status(404).json({error:'Existing data nit found'})
      }
      else{
        console.log("Update success")
        res.json({message:'Updated success'})

      }
    }
  })


 

  app.post('/api/add_profile_data', (req, res) => {
    const userData = req.body;
    console.log('Received Data in Backend:', userData);
  
    // Ensure `db.query` is defined correctly
    db.query('INSERT INTO emp_data SET ?', userData, (error, results) => {
      if (error) {
        console.error('MySQL insertion error:', error);
        return res.status(500).json({ error: 'Error adding user' });
      }
      console.log('User added to MySQL:', results);
      res.status(200).json({ message: 'User added successfully' });
    });
  });
  



 





  
 })

// Your delete route
app.delete('/api/delete_emp_data', (req, res) => {
  console.log("server called");

  const { email_id } = req.body;

  if (!email_id) {
    return res.status(400).json({ error: 'Email ID is required' });
  }

  // Assuming 'db1' is your database connection object
  db1.query('DELETE FROM emp_data WHERE email_id=?', [email_id], (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error(deleteErr);
      return res.status(500).json({ error: 'Error deleting user' });
    }

    return res.status(200).json({ message: 'User deleted successfully++++' });
  });
});

//inspector cv database view //

// app.put('', (req, res) => {
//   const query = 'SELECT email, pdf FROM pdf_cv'; 
//   db.query(query, (err, results) => {
//     if (err) {
//       console.log('Error executing MySQL query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(results);
//     }
//   });
// });


app.get('/api/inspectorCv', (req, res) => {
  db1.query('SELECT PSN_NO FROM pdf_cv', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const psnNumbers = results.map((result) => result.PSN_NO);
      res.json({ psnNumbers });
    }
  });
});


// inspector_cv_upload
// Assuming you have multer configured
app.post('/api/inspector_cv_upload', upload.single('pdf'), (req, res) => {
  const { psn } = req.body;
  const pdfBuffer = req.file.buffer;

  // Check if required values are present in the request body
  if (!psn || !pdfBuffer) {
    return res.status(400).json({ error: 'Missing required parameters (psn or pdf).' });
  }

  // Assuming you have a table named pdf_cv with columns pdf and PSN_NO
  // db1.query('INSERT INTO pdf_cv(pdf, PSN_NO) VALUES (?, ?)', [pdfBuffer, psn], (error, results) => {
  //   if (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       // Duplicate entry error (PSN_NO already exists)
  //       console.log("ER_DUP_ENTRY")
  //       return res.status(400).json({ error: 'PSN_NO already exists.' });
  //     } 
  //     else {
  //       console.error(error);
  //       return res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   } 
  //   else {
  //     return res.status(200).json({ message: 'Uploaded successfully' });
  //   }
  // });

  const query = `
  INSERT INTO pdf_cv (pdf, PSN_NO) 
  VALUES (?, ?) 
  ON DUPLICATE KEY UPDATE pdf = VALUES(pdf)
`;

db1.query(query, [pdfBuffer, psn], (error, results) => {
  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } else {
    return res.status(200).json({ message: 'Uploaded successfully' });
  }
});
});





 
 






// software admin login Details update 
app.put('/api/adminregister_login_update', (req, res) => {
  const {email,organization,role,lstatus,authenticator,username,emailverified,existingmail,department } = req.body;
  const verificationToken = uuidv4();
  
  const query = `UPDATE clientadmin SET Email = ?, Organization = ?, Role = ?, Status = ?, Authenticator = ?, Username = ?, Emailverified = ?, Emailtoken = ?, Department=? WHERE Email = ?`;
    db.query(query, [email, organization, role, lstatus,authenticator,username,emailverified,verificationToken,department,existingmail], (error, result) => {
      if (error) {
        
        const error_print =  error.errno;
        // console.log('Error inserting data:', error);      
      
      }
      else{
     
        
      sendVerificationEmail(userid, verificationToken);
      console.log("Verification token",verificationToken,email,result);
      }
    });
});



app.post('/api/InsertRoleData',(req,res)=>{
  const{Role,Organization}=req.body;

  const query="INSERT INTO organization_role (Organization, Role) VALUES (?, ?)";
  db.query(query,[Organization,Role],(error,result)=>{
    if (error) {
      const errorNumber = error.errno;

      // Check for duplicate entry error (error code 1062)
      if (errorNumber === 1062) {
        res.status(400).json({ message: " This data already exists." });
      } else {
        // Handle other database errors
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
   
    else{
      // console.log("Insert Succes")
      res.status(200).json({ message: "Insert Successful" });
    }

      });
    
});

app.post('/api/InsertDepartmentData', (req, res) => {
  const { Department, Organization } = req.body;

  // SQL query to insert data into the database
  const query = "INSERT INTO organization_department (Organization, Department) VALUES (?, ?)";

  // Execute the SQL query
  db.query(query, [Organization, Department], (error, result) => {
    if (error) {
      const errorNumber = error.errno;

      // Check for duplicate entry error (error code 1062)
      if (errorNumber === 1062) {
        res.status(400).json({ message: " This data already exists." });
      } else {
        // Handle other database errors
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      // Successful insertion
      res.status(200).json({ message: "Insert Successful" });
    }
  });
});



app.post('/api/InsertRoleData', (req, res) => {
  const { Role, Organization } = req.body;

  // SQL query to insert data into the database
  const query = "INSERT INTO organization_role (Organization, Role) VALUES (?, ?)";

  // Execute the SQL query using the connection pool
  db.query(query, [Organization, Role],  (error, result) => {
    if (error) {
      Console.log(error)
      const errorNumber = error.errno;

      // Check for duplicate entry error (error code 1062)
      if (errorNumber === 1062) {
        res.status(400).json({ message: " This data already exists." });
      } else {
        // Handle other database errors
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      // Successful insertion
      console.log("INsertjjjjjjjjjjjjjjjjj")
      res.status(200).json({ message: "Insert Successful" });
    }
  });
});





app.post('/api/adminregister', (req, res) => {
  const { userid, password, organization, role,status,authenticator,name,statusnum,department } = req.body;

  const verificationToken = uuidv4();

  const query = 'INSERT INTO clientadmin (Email, Password, Organization, Role,Status,Authenticator,Username,Emailverified,Emailtoken,Department) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)';
  bcrypt.hash(password, 12, (err, hash) => {
    if (err) {
      console.error('Bcrypt Hash Error:', err);
    } else {
      db.query(query, [userid, hash, organization, role, status,authenticator,name,statusnum,verificationToken,department], (error, result) => {
        if (error) {
          
          const error_print =  error.errno;
          // console.log('Error inserting data:',error );
          // typeof(error_print)

          if(1062==error_print){

            // console.log('Error inserting data++:', error_print);
          res.status(501).json({message:"Email Already exists"});
          }
          
        
        }
        else{
        res.status(200).json({ message: 'Data inserted successfully' });
        sendVerificationEmail(userid, verificationToken);
        // console.log("Verification token",verificationToken,userid);
        }
      });
    }
  });
});

app.get('/api/getRoleData', (req, res) => {
  const { organization } = req.query;
  

  const query = 'SELECT d.Department AS Department, r.Role AS Role, d.Organization AS Organization FROM organization_department d INNER JOIN organization_role r ON d.Organization = r.Organization WHERE d.Organization = ? ';

  db.query(query, [organization], (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    else if (results.length === 0) {
      console.error("No results found for organization:", organization);
      return res.status(401).json({ error: 'Invalid Organization Name' });
    } 
    else {
      const uniqueDepartments = new Set();
      const uniqueRoles = new Set();
      const uniqueOrganizations = new Set();

      const Department = [] ;
      const Role = [];
      const Organization = [];

      // Iterate through the array
      for (let i = 0; i < results.length; i++) {
        const data = results[i];

        // Check if the values are not already in the respective unique Sets
        if (!uniqueDepartments.has(data.Department)) {
          Department.push(data.Department);
          uniqueDepartments.add(data.Department);
        }

        if (!uniqueRoles.has(data.Role)) {
          Role.push(data.Role);
          uniqueRoles.add(data.Role);
        }

        if (!uniqueOrganizations.has(data.Organization)) {
          Organization.push(data.Organization);
          uniqueOrganizations.add(data.Organization);
        }
      }

      const result = {
        Department,
        Role,
        Organization
      };
      res.json(result);
    }
  });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    console.log("server called")

    if(workbook.SheetNames.length ==1){
    const sheet_name = workbook.SheetNames[0];
    const sheet_data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    const columns = Object.keys(sheet_data[0]);
    const values = sheet_data.map((row) => Object.values(row));



    const firstSubarrayLength = values[0].length;
    console.log("First Sub array",values[0])

    let flag_check_cell_is_empty=false;
    let string_find_Mistake_inCell;
    // Iterate through the array starting from the second subarray
    for (let i = 1; i < values.length; i++) {
        // Check if the current subarray's length is different from the first one
        if (values[i].length !== firstSubarrayLength) {
          //  console.log("Not a perfect matrix")
         flag_check_cell_is_empty=true;

         string_find_Mistake_inCell=values[i][0]+" "+values[i][1]+" "+values[i][2];
         
        }
    }

    if(flag_check_cell_is_empty){
    res.json({ message: "In the Excel file, certain cells are left unfilled. Please check this Row \n' "+string_find_Mistake_inCell+"'" });
    }
    else{

      let photo_index = -1;
      let drop_Drown_index = -1;
      let risk_Level_index = -1;
      let product_index = -1;
      let parts_index = -1;
      let description_index = -1;
      let reference_index = -1;
      let positive_MND_index=-1;
      let positive_ADJ_index=-1;
      let negative_MNT_index=-1;
      let negative_ADJ_index=-1;
      let emergency_Features_index=-1;
      let customer_Scope_index=-1;



      

      //  to find the columns index
     
      for (let i = 0; i < columns.length; i++) {
        
        const column = columns[i].trim().toLowerCase();
      
        
        switch (column) {
            case 'photo':
            case 'photos':
                photo_index = i;
                break;
            case 'drop down':
            case 'drop_down':
            case 'drop _ down':
            case 'dropdown':
                drop_Drown_index = i;
                break;
            case 'risk level':
            case 'risk_level':
            case 'risk _ level':
            case 'risklevel':
                risk_Level_index = i;
                break;
            case 'parts':
            case 'part':
                parts_index = i;
                break;
            case 'product':
            case 'products':
                product_index = i;
                break;
            case 'reference':
            case 'references':
                reference_index = i;
                break;
            case 'description':
            case 'descriptions':
                description_index = i;
                break;

                case 'positive mnt':
                  case 'positive_mnt':
                      positive_MND_index = i;
                      break;

                      case 'positive adj':
                  case 'positive_adj':
                      positive_ADJ_index = i;
                      break;
                      case 'negative mnt':
                        case 'negative_mnt':
                            negative_MNT_index = i;
                            break;


                            case 'negative adj':
                        case 'negative_adj':
                            negative_ADJ_index = i;
                            break;


                            case 'emergency feature':
                              case 'emergency_feature':
                                case 'emergency features':
                                  case 'emergency_features':

                                  emergency_Features_index = i;
                                  break;


                                  case 'customer scope':
                                    case 'customer_scope':
                                        customer_Scope_index = i;
                                        break;
            

            default:
                // Handle unknown column names
                break;
        }
    }
  
      let count_photo;
      let count_dropdown;
      let count_risklevel;
      let count_negative_MNT;
      let count_negative_ADJ;
      let check_innercell_equals=false;
      let cell_check_index_string_size='';
      let indexval; 

      console.log("index number",photo_index,drop_Drown_index,risk_Level_index,product_index,parts_index,description_index,positive_MND_index,positive_ADJ_index,negative_MNT_index,negative_ADJ_index,emergency_Features_index,customer_Scope_index)

      if(photo_index > -1 &&
       drop_Drown_index > -1 &&
       risk_Level_index > -1 &&
       product_index > -1 &&
       parts_index > -1 &&
       description_index > -1 && positive_MND_index>-1 &&  positive_ADJ_index >-1 &&  negative_MNT_index>-1 &&  negative_ADJ_index>-1 && emergency_Features_index>-1 && customer_Scope_index>-1 )
      {
         for(let k=0;k<values.length;k++)
      {
        
        const matche_for_photo = values[k][photo_index].match(/~/g);
        // If matches is null, return 0, otherwise return the length of matches
         count_photo = matche_for_photo ? matche_for_photo.length : 0;
         

         const matche_for_dropdown = values[k][drop_Drown_index].match(/~/g);
        // If matches is null, return 0, otherwise return the length of matches
        count_dropdown = matche_for_dropdown ? matche_for_dropdown.length : 0;
        


        const matche_for_risklevel = String(values[k][risk_Level_index]).match(/~/g);

        // If matches is null, return 0, otherwise return the length of matches
        count_risklevel = matche_for_risklevel ? matche_for_risklevel.length : 0;




        const match_for_negative_MND = String(values[k][negative_MNT_index]).match(/~/g);

        // If matches is null, return 0, otherwise return the length of matches
        count_negative_MNT = match_for_negative_MND ? match_for_negative_MND.length : 0;


        const match_for_negative_ADJ = String(values[k][negative_ADJ_index]).match(/~/g);

        // If matches is null, return 0, otherwise return the length of matches
        count_negative_ADJ = match_for_negative_ADJ ? match_for_negative_ADJ.length : 0;




        
         // Assuming count_photo, count_dropdown, and count_risklevel are already defined

         console.log("index value",)
          if (count_photo === count_dropdown && count_dropdown === count_risklevel &&  count_negative_ADJ == count_negative_MNT && count_negative_ADJ ==count_dropdown ) {
            console.log("All R equal");
           check_innercell_equals = true;

          } 
          else {
             check_innercell_equals = false;
             // If they are not all equal, determine which one is different
            if (count_photo !== count_dropdown && count_photo !== count_risklevel) {
             cell_check_index_string_size=" Photo "
             indexval=k;
            // Handle the case where count_photo is different
           } else if (count_dropdown !== count_photo && count_dropdown !== count_risklevel) {
            cell_check_index_string_size=" Dropdown "
            indexval=k;
           // Handle the case where count_dropdown is different
           } else if (count_risklevel !== count_photo && count_risklevel !== count_dropdown) {
           cell_check_index_string_size=" Risklevel "
           indexval=k;
           // Handle the case where count_risklevel is different
           } else if (count_negative_ADJ !== count_photo && count_negative_ADJ !== count_dropdown) {
            cell_check_index_string_size=" Negative ADJ "
            indexval=k;
            // Handle the case where count_risklevel is different
            } else if (count_negative_MNT !== count_photo && count_negative_MNT !== count_dropdown) {
              cell_check_index_string_size=" Negative MNT"
              indexval=k;
              // Handle the case where count_risklevel is different
              } 
          }

        }


      }
      else{
        res.json({ message: "The column title is not defined. "});

      }

      if(!check_innercell_equals)
      {
        console.log("Check some index missing "+indexval +" "+ product_index +" "+indexval + " "+parts_index+" "+indexval+""+description_index+" " +cell_check_index_string_size+" ");
        res.json({ message: "Check some index missing "+values[indexval][product_index]+" "+values[indexval][parts_index]+" "+values[indexval][description_index]+" " +cell_check_index_string_size+" "});
        
      }
      else{
        // insert query
        console.log("insert area");

        let sql = 'INSERT INTO `inspection_master`(`Product`, `Parts`, `Description`, `Reference`, `Risklevel`, `Photo`, `Dropdown`,`Positive_MNT`,`Positive_ADJ`,`Negative_MNT`,`Negative_ADJ`,`Emergency_Features`,`Customer_Scope`) VALUES ';
        for (let i = 0; i < values.length; i++) {
         const row = values[i];
         const emergency_boolean = (row[emergency_Features_index] === 'Y' || row[emergency_Features_index].toLowerCase() === 'yes' || row[emergency_Features_index] == 1) ? 1 : 0;
         const customer_scope_bool = (row[customer_Scope_index] === 'Y' || row[customer_Scope_index].toLowerCase() === 'yes' || row[customer_Scope_index] == 1) ? 1 : 0;
         



         sql += `('${row[product_index]}', '${row[parts_index]}', '${row[description_index]}', '${row[reference_index]}', '${row[risk_Level_index]}', '${row[photo_index]}', '${row[drop_Drown_index]}','${row[positive_MND_index]}','${row[positive_ADJ_index]}','${row[negative_MNT_index]}','${row[negative_ADJ_index]}','${emergency_boolean}','${customer_scope_bool}')`;
         if (i !== values.length - 1) {
         sql += ', ';
        }
      }
      db1.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            return res.status(500).json({ error: 'An error occurred while executing the database query.', details: error.message });
        } else {
            res.json({ message: "File merged into the database successfully." });
        }
    });
    
    
       
      }

    }

    }
    else{
      res.json({ message: "I am currently experiencing difficulty processing multiple sheets in Excel (need 1 sheet at a time)." });
    
    
    }
   
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(400).json({ message: 'Invalid file format' });
    }
});


//ping
app.get('/api/check_connectivity',(req,res)=>{
  res.json(true)
}
);
// app.get('/api/check_connectivity1', (req, res) => {
//   // Try to make a request to an external server to check connectivity (e.g., Google)
//   https.get('https://google.com', (response) => {
//     if (response.statusCode === 200) {
//       // If the response is successful (HTTP 200), then there's internet connectivity
//       res.json({ connected: true });
//     } else {
//       // If the status code is not 200, then assume no internet
//       res.json({ connected: false });
//     }
//   }).on('error', (e) => {
//     // If there's any error (e.g., no internet), then assume no internet
//     console.error('Error:', e);
//     res.json({ connected: false });
//   });
// });


//mail cc
app.get('/api/check_connectivity1', (req, res) => {
  https.get('https://google.com', (response) => {
    if (response.statusCode === 200) {
      res.json({ connected: true });
    } else {
      res.json({ connected: false });
    }
  }).on('error', (e) => {
    console.error('Connectivity Check Error:', e.message);
    res.json({ connected: false });
  });
});
app.get('/api/getdefaultcc',(req,res)=>{
  
  db1.query("SELECT mailid FROM default_cc WHERE 1",(err, result)=>{
    if(result!=null)
      {
        res.json(result)
      }
  })


})



// app.post('/api/syncOff', upload.single('image'), (req, res) => {
//   const { key,documentId, inspectorName, section, unitNo, title,  valueArray, checkpoint, NeedforReport, positive_MNT, positive_ADJ, Negative_MNT, Negative_ADJ, Emergency_Features, Customerscope,id_no,risk_level,functional_point,marks } = req.body;
// console.log('marks',marks);

// // Check if image exists in the request
// const image = req.file;
// const profileImagePath = image ? image.path : null;
// let imageData = null;

// const parsedPositiveMNT = parseFloat(positive_MNT);
// const parsedPositiveADJ = parseFloat(positive_ADJ);
// const parsedNegative_MNT=parseFloat(Negative_MNT)
// const parsedNegative_ADJ=parseFloat(Negative_ADJ)
// // console.log(Emergency_Features,Customerscope,checkpoint,NeedforReport)

// const parsedEmergencyFeatures = Emergency_Features === '1';
// const parsedCustomerScope = Customerscope === '1';
// const parsedCheckpoint = checkpoint === 'true';
// const parsedNeedforReport = NeedforReport === 'true';
// let recordPromises = [];


//    if (image) {
//      imageData = fs.readFileSync(image.path);
//    }


//    let record = [
//     documentId,
//     inspectorName,
//     unitNo,
//     title,
//     valueArray, // drop
//     parsedCheckpoint ? 1 : 0, // Convert boolean to 0 or 1
//     imageData, // Image paths/identifiers
//     parsedNeedforReport ? 1 : 0, // Convert boolean to 0 or 1
//     section,
//     parsedPositiveMNT,
//     parsedPositiveADJ,
//     // parsedNegative_MNT,
//     // parsedNegative_ADJ,
//     parsedEmergencyFeatures,
//     parsedCustomerScope,
//     id_no,
//     risk_level,
//     functional_point,
//     marks
//   ];

  







//   let promise = new Promise((resolve, reject) => {
//     const checkSql = `SELECT * FROM record_values WHERE document_id = ? AND section = ? AND inspector_name = ? AND unit_no = ? AND description = ? AND dropdown_option = ?`;
//     db1.query(checkSql, [documentId, section, inspectorName, unitNo,title, valueArray], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       if (result.length === 0) {
//         const insertSql = `INSERT INTO record_values (document_id, inspector_name, unit_no, description, dropdown_option, checked, img, needforReport, section, Positive_MNT, Positive_ADJ, Emergency_Features, Customer_Scope,id_no,risk_level,functional_point,marks) VALUES (?) `;
//         db1.query(insertSql, [record], (insertErr, insertResult) => {
//           if (insertErr) {
//             return reject(insertErr);
//           }
//           resolve("Data synchronization complete");
//         });
//       }
//        else {
//         resolve('Record already exists, skipping insertion.');
//       }
//     });
//   });

//   recordPromises.push(promise);


// Promise.all(recordPromises).then(results => {
//   // Assuming all operations are successful, return the key and a success message

//   console.log("result",results)
//   res.json({
//     message: results[0],
//     key: key}
    
//   );
// }).catch(err => {
//   console.error('Error during record handling:', err);
//   res.status(500).json({ message: 'Failed to synchronize data', error: err });
// });
// });


// getUnit_details
app.post('/api/syncOff', upload.single('image'), (req, res) => {
  const { key, documentId, inspectorName, section, unitNo, title, valueArray, checkpoint, NeedforReport, positive_MNT, positive_ADJ, Negative_MNT, Negative_ADJ, Emergency_Features, Customerscope, id_no, risk_level, functional_point, marks } = req.body;
  console.log('marks', marks);

  // Check if image exists in the request
  const image = req.file;
  const profileImagePath = image ? image.path : null;
  let imageData = null;

  const parsedPositiveMNT = parseFloat(positive_MNT);
  const parsedPositiveADJ = parseFloat(positive_ADJ);
  const parsedNegative_MNT = parseFloat(Negative_MNT);
  const parsedNegative_ADJ = parseFloat(Negative_ADJ);

  const parsedEmergencyFeatures = Emergency_Features === '1';
  const parsedCustomerScope = Customerscope === '1';
  const parsedCheckpoint = checkpoint === 'true';
  const parsedNeedforReport = NeedforReport === 'true';

  if (image) {
    imageData = fs.readFileSync(image.path);
  }

  let record = [
    documentId,
    inspectorName,
    unitNo,
    title,
    valueArray,
    parsedCheckpoint ? 1 : 0,
    imageData,
    parsedNeedforReport ? 1 : 0,
    section,
    parsedPositiveMNT,
    parsedPositiveADJ,
    parsedEmergencyFeatures,
    parsedCustomerScope,
    id_no,
    risk_level,
    functional_point,
    marks
  ];

  let promise = new Promise((resolve, reject) => {
    const checkSql = `SELECT * FROM record_values WHERE document_id = ? AND section = ? AND inspector_name = ? AND unit_no = ? AND description = ? AND dropdown_option = ?`;
    db1.query(checkSql, [documentId, section, inspectorName, unitNo, title, valueArray], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length > 0) {
        // Record exists, delete it first
        const deleteSql = `DELETE FROM record_values WHERE document_id = ? AND section = ? AND inspector_name = ? AND unit_no = ? AND description = ? AND dropdown_option = ?`;
        db1.query(deleteSql, [documentId, section, inspectorName, unitNo, title, valueArray], (deleteErr) => {
          if (deleteErr) {
            return reject(deleteErr);
          }
          // Proceed with insertion after deletion
          insertRecord();
        });
      } else {
        // No existing record, directly insert
        insertRecord();
      }

      function insertRecord() {
        const insertSql = `INSERT INTO record_values (document_id, inspector_name, unit_no, description, dropdown_option, checked, img, needforReport, section, Positive_MNT, Positive_ADJ, Emergency_Features, Customer_Scope, id_no, risk_level, functional_point, marks) VALUES (?) `;
        db1.query(insertSql, [record], (insertErr, insertResult) => {
          if (insertErr) {
            return reject(insertErr);
          }
          resolve("Data synchronization complete");
        });
      }
    });
  });

  recordPromises.push(promise);

  Promise.all(recordPromises).then(results => {
    // Assuming all operations are successful, return the key and a success message
    console.log("result", results);
    res.json({
      message: results[0],
      key: key
    });
  }).catch(err => {
    console.error('Error during record handling:', err);
    res.status(500).json({ message: 'Failed to synchronize data', error: err });
  });
});

app.get('/api/getUnit_details',(req,res)=>{
  const inspector_name = req.query.inspector_name; 
  const query = 'SELECT `document_id`, `contract_number`, `unit_no`, `inspector_name` ,`ReportComplete` ,`building_name` FROM `unit_details` where inspector_name=? ';
  db1.query(query,[inspector_name], (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    else {
     console.log("Unit Details",results)
      res.json(results);
    }
  });
}
);




// getUnit_details
app.get('/api/getUnit_details',(req,res)=>{
  const query = 'SELECT `document_id`, `contract_number`, `unit_no`, `inspector_name` ,`ReportComplete`,`building_name` FROM `unit_details` ';
  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    else {
     console.log("Unit Details",results)
      res.json(results);
    }
  });
}
);

// getChecklist_Record_Val_with_unit_checked
app.get('/api/getChecklist_Record_Val_with_unit_checked', (req, res) => {
  const { doc_id, unit_array } = req.query;
  const unitArr_for_img = unit_array.split(',');
  console.log("++++++++++++++++++")
  console.log("parse val",unitArr_for_img,doc_id)


  db1.query('SELECT marks, unit_no, description, dropdown_option, checked, img, needforReport,section FROM  record_values WHERE checked=? AND document_id = ?  AND unit_no IN (?)', [true, doc_id, unitArr_for_img], (error, result) => {
    if (error) {
      console.error('Error fetching record values:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'No record values found' });
    }

    const parsedResult = result.map(row => {
      // Check if the row has an image and it's checked
      if (row.img != null && row.checked) {
        const image = row.img.toString('base64');

        // Convert image buffer to base64 string
        // let imageData = Buffer.from(image).toString('base64');
        // imageData=`data:image/jpeg;base64,${imageData}`

        return {
          unit_no: row.unit_no,
          description: row.description,
          dropdown_option: row.dropdown_option,
          checked: row.checked,
          // img: imageData, // Sending image data as base64 string
          img:image,
          needforReport: row.needforReport,
          section: row.section
        };
      } else {
        // If no image or not checked, return the row as is
        return row;
      }
    });

    // console.log(parsedResult)
    // Send the parsed result as JSON
    return res.json(parsedResult);
  });
});

// get_unique_description_with_section_api
app.get('/api/get_unique_description_with_section_api', (req, res) => {
   

  const sql = 'SELECT DISTINCT `description`,`Parts` FROM `inspection_master` WHERE 1';
  db1.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching image from database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
     
    }
    else if (result.length === 0) {
      res.status(404).json({ error: ' not found' });
     
    }
    else{
      // console.log("rea",result)

      const groupedData = groupDescriptionsByParts(result);
      const formattedArray = convertToDesiredFormat(groupedData);
      return res.json(formattedArray) // Change this to the appropriate type for your images


    }    
  });
});
function groupDescriptionsByParts(data) {
  const partsMap = {};

  data.forEach(item => {
    // Normalize the parts value by trimming and converting to lower case
    const partsKey = item.Parts.trim().toLowerCase();

    if (!partsMap[partsKey]) {
      partsMap[partsKey] = [];
    }

    partsMap[partsKey].push(item.description);
  });

  return partsMap;
}
// Converting to the desired array format
function convertToDesiredFormat(partsMap) {
  return Object.entries(partsMap).map(([key, value]) => ({
    [key]: value
  }));
}




  

function transformData(input) {
  let finalArray = {};
  let partsMap = {};

  input.forEach(item => {
    let parts = item.Parts.toUpperCase();
    let description = item.Description.trim().toUpperCase();
    let dropdown = item.Dropdown.split('~').map(value => value.trim());

    if (!partsMap[parts]) {
      partsMap[parts] = { incrementValue: 1, values: {} };
    }

    let currentIncrementValue = partsMap[parts].incrementValue;

    if (!partsMap[parts].values[currentIncrementValue]) {
      partsMap[parts].values[currentIncrementValue] = {
        Description: description,
        Dropdown: {}
      };
    }

    dropdown.forEach((value, index) => {
      partsMap[parts].values[currentIncrementValue].Dropdown[index + 1] = value;
    });

    partsMap[parts].incrementValue++;
  });

  // Convert partsMap to finalArray
  Object.keys(partsMap).forEach(parts => {
    let values = partsMap[parts].values;
    finalArray[parts] = values;
  });

  return finalArray;
}
























app.get('/api/verify-email', (req, res) => {
  const { email, token } = req.query;


  const query='SELECT Emailtoken FROM clientadmin WHERE Email= ?';
  db.query(query, [email], (err, results) => {
    if(err)
    {
      // console.log("Verification status",error)
      return res.status(101).json("Email verification faild");

    }
    else{
       const tokendetails=results[0]
      if (tokendetails.Emailtoken === token) {
        db.query('UPDATE `clientadmin` SET `Emailverified`=? WHERE Email=?',[1,email],(err,result)=>{
          if(result)
          {
            return res.send(`
            <html>
            <body>
              <h1>Email Verified Successfully</h1>
              <p style="color: black;">All is set! You can now move to your dashboard.</p>
              <!-- You can add a button or link to navigate to the dashboard -->
              <a href="${process.env.CLIENT_URL}">Go to Dashboard</a>
                          </body>
            </html>
          `);
          }
          if(err)
          {
            return res.status(401).json("Email verified Successfull");
          }
        }
        );
        
      } 
      else {
        return res.status(401).json( 'Invalid verification token');
      }
      
    }

  });
  
});




















// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *











// Select dump usage
app.get('/api/getDumpUsage',(req,res)=>{

  
 
  const query = 'SELECT usage_dumb FROM `dumb_usage` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
     
    else {

    //  console.log("DUMP USAGE",results)
      res.json(results);
    }
  });
}
);
//  Insert dump usage
app.put('/api/addDump_Usage', (req, res) => {
  const { dump_usage } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO dumb_usage (usage_dumb) VALUES (?)';

  db1.query(query, [dump_usage], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});
// delete dump iusage
app.delete('/api/DumpUsage_Data_Delete', (req, res) => {
  const {  dumpusage } = req.body;

  // Ensure that the organization and department are provided in the request body
  if ( !dumpusage) {
    return res.status(400).json({ error: 'Dump_Usage is required in the request body' });
  }

  db1.query("DELETE FROM dumb_usage WHERE usage_dumb=? ", [dumpusage], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});



//  GET DUMP TYPE
app.get('/api/getDumpType',(req,res)=>{

  
 
  const query = 'SELECT type_dumb FROM `dumb_type` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);

//  Insert dump type
app.put('/api/addDump_Type', (req, res) => {
  const { dump_type } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO dumb_type (type_dumb) VALUES (?)';

  db1.query(query, [dump_type], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});

// delete dumb type
app.delete('/api/DumpType_Data_Delete', (req, res) => {
  const {  dumptype } = req.body;

 
  if ( !dumptype    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM dumb_type WHERE type_dumb=? ", [dumptype], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});


// Get home type
app.get('/api/getHomeType',(req,res)=>{

  
 
  const query = 'SELECT home_type FROM `home_type` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);

// insert home type 
app.put('/api/addHome_Type', (req, res) => {
  const { home_type } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO home_type (home_type) VALUES (?)';

  db1.query(query, [home_type], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});

// delete home type
app.delete('/api/HomeType_Data_Delete', (req, res) => {
  const {  hometype } = req.body;

 
  if ( !hometype    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM home_type WHERE home_type=? ", [hometype], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});

// getHomeUsage

app.get('/api/getHomeUsage',(req,res)=>{

  
 
  const query = 'SELECT home_usage FROM `home_usage` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);
// addHome_Usage


app.put('/api/addHome_Usage', (req, res) => {
  const { home_usage } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO home_usage (home_usage) VALUES (?)';

  db1.query(query, [home_usage], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});
// HomeUsage_Data_Delete

app.delete('/api/HomeUsage_Data_Delete', (req, res) => {
  const {  homeusage } = req.body;

 
  if ( !homeusage    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM home_usage WHERE home_usage=? ", [homeusage], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});
// get_Ins_Time_Data

app.get('/api/get_Ins_Time_Data',(req,res)=>{

  
 
  const query = 'SELECT time_shift FROM `inspection_time` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);


// addIns_time


app.put('/api/addIns_time', (req, res) => {
  const { ins_time } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO inspection_time (time_shift) VALUES (?)';

  db1.query(query, [ins_time], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});
// delete_Ins_time_Data1


app.delete('/api/delete_Ins_time_Data1', (req, res) => {
  const {  Ins_time } = req.body;

 
  if ( !Ins_time    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM inspection_time WHERE time_shift=? ", [Ins_time], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});


//  get_Ins_Time_Insp_Data


app.get('/api/get_Ins_Time_Insp_Data',(req,res)=>{

  
 
  const query = 'SELECT inspection_time FROM `inspection_time_ins` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);
//  add ins_time_insp


app.put('/api/ins_time_insp', (req, res) => {
  const { ins_time_insp } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO inspection_time_ins (inspection_time) VALUES (?)';

  db1.query(query, [ins_time_insp], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});


// delete_Ins_time_insp_Data1


app.delete('/api/delete_Ins_time_insp_Data1', (req, res) => {
  const {  Ins_time_insp } = req.body;

 
  if ( !Ins_time_insp    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM inspection_time_ins WHERE inspection_time=? ", [Ins_time_insp], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});
// get_OEM_Data


app.get('/api/get_OEM_Data',(req,res)=>{

  
 
  const query = 'SELECT oem_name FROM `oem_details` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);

// add oem_details

app.put('/api/oem_details', (req, res) => {
  const { oem_details } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO oem_details (oem_name) VALUES (?)';

  db1.query(query, [oem_details], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});


// delete_OEM_Data1


app.delete('/api/delete_OEM_Data1', (req, res) => {
  const {  OEM } = req.body;

 
  if ( !OEM    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM oem_details WHERE oem_name =? ", [OEM], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});

// get_Region_Details

app.get('/api/get_Region_Details',(req,res)=>{

  
 
  const query = 'SELECT region_name FROM `region_details` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);
// add region_details


app.put('/api/region_details', (req, res) => {
  const { region_details } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO region_details (region_name) VALUES (?)';

  db1.query(query, [region_details], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});
// delete_Region_Data1

app.delete('/api/delete_Region_Data1', (req, res) => {
  const {  Region } = req.body;

 
  if ( !Region    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM region_details WHERE region_name =? ", [Region], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});
// get_Travel_Acc_Details


app.get('/api/get_Travel_Acc_Details',(req,res)=>{

  
 
  const query = 'SELECT type_of FROM `travel_accomodation` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);

// addToTravel_Acc_Details



app.put('/api/addToTravel_Acc_Details', (req, res) => {
  const { Travel_Acc_details } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO travel_accomodation (type_of) VALUES (?)';

  db1.query(query, [Travel_Acc_details], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});
// delete_Travel_Acc_Data1

app.delete('/api/delete_Travel_Acc_Data1', (req, res) => {
  const {  Region } = req.body;
console.log("SErver********** ",Region)
 
  if ( !Region    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM travel_accomodation WHERE type_of = ? ", [Region], (err, result) => {
    if (err) {
      // console.log("err ",Region)
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        // console.log("Deletesucc ",Region)
        return res.json({ message: 'Delete Successful' });
      } else {
        // console.log("Not found ",Region)
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});

// get_Type_Ele_Details


app.get('/api/get_Type_Ele_Details',(req,res)=>{

  
 
  const query = 'SELECT type FROM `type_elevator` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);

// addToType_EleDetails

app.put('/api/addToType_EleDetails', (req, res) => {
  const { Travel_Acc_details } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO type_elevator (type) VALUES (?)';

  db1.query(query, [Travel_Acc_details], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});

// delete_Type_ele_Data1


app.delete('/api/delete_Type_ele_Data1', (req, res) => {
  const {  Region } = req.body;

 
  if ( !Region    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM type_elevator WHERE type =? ", [Region], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});

// get_Type_Bul_Details
app.get('/api/get_Type_Bul_Details',(req,res)=>{

  
 
  const query = 'SELECT building_name FROM `type_of_building` ';

  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
    
    else {

     console.log("DUMP Type",results)
      res.json(results);
    }
  });
}
);

// addToType_BulDetails
app.put('/api/addToType_BulDetails', (req, res) => {
  const { Travel_Acc_details } = req.body;
  console.log("Server called");

  const query = 'INSERT  INTO type_of_building (building_name) VALUES (?)';

  db1.query(query, [Travel_Acc_details], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(409).json({ error: 'Data already exists' });
      } else {
        res.json({ message: 'Data added successfully' });
      }
    }
  });
});

// delete_Type_Bul_Data1
app.delete('/api/delete_Type_Bul_Data1', (req, res) => {
  const {  Region } = req.body;

 
  if ( !Region    ) {
    return res.status(400).json({ error: 'Value is required in the request body' });
  }

  db1.query("DELETE FROM type_of_building WHERE building_name =? ", [Region], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ message: 'Delete Successful' });
      } else {
        return res.status(404).json({ error: 'Data not found for deletion' });
      }
    }
  });
});



































//apis for inf 26

// Define a route to fetch values from MySQL
app.get('/api/building_type', (req, res) => {
  const query = 'SELECT building_name FROM type_of_building';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.building_name);
    res.json(values);
  });
});
//vendor
app.get('/api/vendor', (req, res) => {
  const query = 'SELECT VENDOR_NAME FROM vendor_master';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.VENDOR_NAME);
    res.json(values);
  });
});


app.get('/api/region', (req, res) => {
    const query = 'SELECT region_name FROM region_details';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.region_name);
      res.json(values);
    });
  });

  app.get('/api/inspection_type', (req, res) => {
    const query = 'SELECT inspection_name FROM inspection_type';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.inspection_name);
      res.json(values);
    });
  });


  app.get('/api/oem', (req, res) => {
    const query = 'SELECT oem_name FROM oem_details';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.oem_name);
      res.json(values);
    });
  });

  app.get('/api/travel', (req, res) => {
    const query = 'SELECT type_of FROM travel_accomodation';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.type_of);
      res.json(values);
    });
  });
  
  




  app.get('/api/elevator_type', (req, res) => {
    const query = 'SELECT type FROM type_elevator';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.type);
      res.json(values);
    });
  });


  app.get('/api/elevator_usages', (req, res) => {
    const query = 'SELECT e_usage FROM elevator_usage';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.e_usage);
      res.json(values);
    });
  });

  //home drop dowm
  app.get('/api/home_type', (req, res) => {
    const query = 'SELECT home_type FROM home_type';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.home_type);
      res.json(values);
    });
  });
// Get Home USAGE FROM DB
app.get('/api/home_usages', (req, res) => {
    const query = 'SELECT home_usage FROM home_usage';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.home_usage);
      res.json(values);
    });
  });


  //dumb drop down
  app.get('/api/dumb_type', (req, res) => {
    const query = 'SELECT type_dumb FROM dumb_type';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.type_dumb);
      res.json(values);
    });
  });

  //rejection reason api
  app.get('/api/rejection', (req, res) => {
    const query = 'SELECT reject FROM rejects';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.reject);
      res.json(values);
    });
  });

// Get Dumb Usage from DB
  app.get('/api/dumb_usages', (req, res) => {
    const query = 'SELECT usage_dumb FROM dumb_usage';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.usage_dumb);
      res.json(values);
    });
  });


  //to fetch sections 
  app.get('/api/fetch_section', (req, res) => {
    const query = 'SELECT section_value FROM section';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.section_value);
      res.json(values);
    });
  });

  //fetch unit details
//   app.get('/api/fetch_units',(req,res)=>{
//     const encodedValue = req.query.encodedValue;
//     const query=`SELECT unit_no FROM unit_details WHERE document_id='${encodedValue}'`;
//     db1.query(query,(err,result)=>{
//       if (err) {
//         console.error('Error storeing values:', err);
//         res.status(500).json({ error: 'Error storing values' });
//       } else {
//         console.log('success:', result);

//         // // const data = result.map(row => row.unit_no); // Extracting unit_no from each row
//         // res.status(200).json(u_no);
        
//       }

//     })
// })

app.get('/api/fetch_units', (req, res) => {
  const encodedValue = req.query.encodedValue;
  const query = `SELECT unit_no FROM unit_details WHERE document_id='${encodedValue}'`;
  db1.query(query, (err, result) => {
      if (err) {
          console.error('Error storing values:', err);
          res.status(500).json({ error: 'Error storing values' });
      } else {
          console.log('success:', result);
          const unitNos = result.map(row => row.unit_no); // Extracting unit_no from each row
          res.status(200).json(unitNos);
      }
  });
});

//fetch report unit arrays for report
// app.get('/api/fetch_units_r', (req, res) => {
//   const encodedValue = req.query.encodedValue;
//   const query = `SELECT report_array FROM unit_details WHERE document_id='${encodedValue}'`;
//   db1.query(query, (err, result) => {
//       if (err) {
//           console.error('Error storing values:', err);
//           res.status(500).json({ error: 'Error storing values' });
//       } else {
//           console.log('success:', result);
//           // const unitNos = result.map(row => row.unit_no); // Extracting unit_no from each row
//           // console.log('report units',unitNos);

//           res.status(200).json(result);
//       }
//   });
// });

app.get('/api/fetch_units_r', (req, res) => {
  const encodedValue = req.query.encodedValue;
  const query = `SELECT report_array FROM unit_details WHERE document_id='${encodedValue}'`;
  db1.query(query, (err, result) => {
      if (err) {
          console.error('Error fetching report array:', err);
          res.status(500).json({ error: 'Error fetching report array' });
      } else {
          console.log('Success:', result);
          let reportArrays = [];
          if (result.length > 0 && result[0].report_array) {
              reportArrays = JSON.parse(result[0].report_array);
          }
          res.status(200).json(reportArrays);
      }
  });
});


//upload certificate
// API endpoint to handle file upload
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//       res.status(400).send('No file uploaded.');
//       return;
//   }

//   // Read the uploaded file
//   fs.readFile(req.file.path, (err, data) => {
//       if (err) {
//           console.error('Error reading file:', err);
//           res.status(500).send('Error reading file.');
//           return;
//       }

//       // Extract unit_no from request body
//       const unit_no = req.body.unit_no;

//       // Insert file data into MySQL along with unit_no
//       const sql = 'INSERT INTO files (name, data, unit_no) VALUES (?, ?, ?)';
//       db1.query(sql, [req.file.originalname, data, unit_no], (error, results, fields) => {
//           if (error) {
//               console.error('Error inserting file into database:', error);
//               res.status(500).send('Error inserting file into database.');
//               return;
//           }
//           console.log('File inserted into database:', results);
//           res.status(200).send('File uploaded and inserted into database.');
//       });
//   });
// });

  

app.get('/api/inspector', (req, res) => {




  const encodedValue = req.query.encodedValue;

  // First query to get location and oem details
  const firstQuery = `SELECT location, oem_details FROM inf_26 WHERE contract_number = '${encodedValue}'`;

  // Execute the first database query
  db1.query(firstQuery, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error (First Query)' });
      } else {
          const location = result[0].location;
          const oem = result[0].oem_details;


          // SELECT inspector_name, PAPL_DOJ FROM insp_data WHERE previous_employment = "${oem}" AND location_previousemp = "${location}" AND NOT DATE_ADD(PAPL_DOJ, INTERVAL 2 YEAR) <= NOW();
          // Second query based on the obtained oem value

          // SELECT inspector_name,PAPL_DOJ1 FROM insp_data WHERE (PAPL_DOJ1 IS NULL) OR (previous_employment = "${oem}" AND location_previousemp = "${location}" AND (PAPL_DOJ1 IS NOT NULL AND DATE_ADD(PAPL_DOJ1, INTERVAL 2 YEAR) <= NOW()));`;
          const secondQuery = `SELECT inspector_name, PSN,PAPL_DOJ FROM insp_data WHERE (previous_employment = "${oem}" AND location_previousemp = "${location}" AND DATE_ADD(PAPL_DOJ, INTERVAL 2 YEAR) <= NOW()) OR (previous_employment != "${oem}" OR location_previousemp != "${location}"); `;

          // Execute the second database query
          db1.query(secondQuery, (err, inspectorResult) => {
              if (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Internal Server Error (Second Query)' });
              } else {
                  // Extract data from the second query result
                  const values = inspectorResult.map(row => row.inspector_name +' - '+row.PSN);

                  // Send the response back to the client with a structured format
                
                  res.json(values);
              }
          });
      }
  });
  
});



  //inspection time
  app.get('/api/inspection_time', (req, res) => {
    const query = 'SELECT time_shift FROM inspection_time';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.time_shift);
      res.json(values);
    });
  });


  //inspection time for ins

  app.get('/api/inspection_time_ins', (req, res) => {
    const query = 'SELECT inspection_time FROM inspection_time_ins';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const values = results.map((row) => row.inspection_time);
      res.json(values);
    });
  });



  //inspector type api
  app.get('/api/inspector_type', (req, res) => {
    const query = 'SELECT inspector_type FROM inspector_type';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching values from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;l;
      }
  
      const values = results.map((row) => row.inspector_type);
      res.json(values);
    });
  });
  //signature
  app.get('/signature/:inspectorName', (req, res) => {
    const inspectorName = req.params.inspectorName;
  
    const query = "SELECT signature FROM signature WHERE inspector_name = ?";
    db1.query(query, [inspectorName], (err, results) => {
      if (err) {
        console.error('Error fetching signature:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.length > 0) {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(results[0].signature, 'binary');
        } else {
          res.status(404).json({ error: 'Signature not found' });
        }
      }
    });
  });
  // service_provider:string='';
  // no_of_machine_room:string='';
  // machine_room:string='';
  // type_of_motor:string='';
  // cabin_depth:string='';
  //store breif spec
  // app.post('/api/breif_spec_add', (req, res) => {
  // console.log('breif spec called');
  // const {service_provider,no_of_machine_room,machine_room,type_of_motor,cabin_depth,capacity,speed,maintained_by,manual_rescue,document_id,unit_no,inspector_name,oem,elevator_number,type_of_equipment,year_of_manufacture,type_of_usage,machine_location,controller_drive_type,controller_name_as_per_oem,type_of_operation,grouping_type,name_of_the_group,floor_details,openings,floor_designations,front_opening_floors,rear_opening_floors,non_stop_service_floors,emergency_stop_floors,rope_category,no_of_ropes_belts,rope_size,no_of_drive_sheave_grooves,ropes_wrap_details,type_of_roping,machine_type,kilo_watt,voltage,current_in_ampere,frequency,rpm,insulation_class,ingress_protection,no_of_poles,st_hr,serial_no,rope_dia,normal_speed,electrical_tripping_speed,mechanical_tripping_speed,cwt_governor_details,door_operator,cwt_rope_dia,cwt_normal_speed,cwt_electrical_tripping_speed,cwt_mechanical_tripping_speed,entrance_width,entrance_height,type_of_openings,cabin_width,cabin_height,no_of_car_operating_panels,car_indicator_type,multimedia_display,no_cabin_fans,type_of_cabin_fan,type_of_call_buttons,stop_button,service_cabinet,voice_announcement,handrail,cabin_bumper,auto_attendant,auto_independant,non_stop,fan_switch,hall_indicator_type,hall_laterns,arrival_chime,no_of_risers_at_main_lobby,no_of_risers_at_other_floors,hall_call_type_at_main_lobby,hall_call_type_at_all_floors,no_of_car_buffers,type_of_car_buffers,no_of_cwt_buffer,type_of_cwt_buffer,e_light,e_alarm,e_intercom,ard_operation,ard_audio,ard_visuals,fireman_operation,fireman_emerg_return,fireman_audio,fireman_visual,passenger_overload_operation,passenger_overload_visual,passenger_overload_audio,seismic_sensor_operation,battery}=req.body;
  // const query = 'INSERT INTO breif_spec(service_provider,no_of_machine_room,machine_room,type_of_motor,cabin_depth,capacity,speed,document_id,unit_no,inspector_name,oem,elevator_number,year_of_manufacture,machine_location,controller_driver_type,controller_name_as_per_oem,type_of_equipment,type_of_usage,type_of_operation,grouping_type,name_of_the_group,floor_stops,floor_opening,floor_designation,front_opening_floors,rear_opening_floors,service_floors,emergency_stop_floors,rope_category,number_of_rope_belt,rope_size,no_of_drive_sheave_grooves,ropes_wrap_details,type_of_roping,machine_type,motor_kilo_watt,motor_voltage,motor_current_in_ampere,motor_frequency,motor_rpm,motor_insulation_class,motor_ingress_protection,motor_no_of_poles,motor_st_hr,motor_serial_number,car_governor_rope_dia,car_governor_normal_speed,car_governor_electric_tripping_speed,car_governor_mechanical_tripping_speed,cwt_governor,cwt_governor_rope_dia,cwt_governor_normal_speed,cwt_governor_electrical_tripping_speed,cwt_governor_mechanical_tripping_speed,door_operator,entrance_height,entrance_width,entrance_type_of_opening,cabin_height,cabin_width,no_of_cop,car_indicator_type,multimedia_display,no_of_cabin_fans,type_of_cabin_fans,type_of_call_buttons,car_stop_button,car_service_cabinet,car_voice_announcement,car_handrail,car_cabin_bumper,car_auto_attendant,car_auto_independent,car_non_stop,car_fan_switch,hall_indicator_type,hall_lantems,hall_arrival_chime,no_of_risers_at_main_lobby,no_of_risers_at_other_floors,hall_call_type_at_main_lobby,hall_call_type_at_all_floors,no_of_car_buffers,type_of_car_buffers,no_of_counter_weight_buffer,type_of_cwt_buffer,e_light,e_alarm,e_intercom,ard_operation,ard_audio,ard_visual,fireman_operation,fer,fireman_audio,fireman_visual,manual_rescue,passenger_overload_operation,passenger_overload_visual,passenger_overload_audio,seismic_sensor_operation,maintained_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  
  //   db1.query(query, [service_provider,no_of_machine_room,machine_room,type_of_motor,cabin_depth,capacity,speed,document_id,unit_no,inspector_name,oem,elevator_number,year_of_manufacture,machine_location,controller_drive_type,controller_name_as_per_oem,type_of_equipment,type_of_usage,type_of_operation,grouping_type,name_of_the_group,floor_details,openings,floor_designations,front_opening_floors,rear_opening_floors,non_stop_service_floors,emergency_stop_floors,rope_category,no_of_ropes_belts,rope_size,no_of_drive_sheave_grooves,ropes_wrap_details,type_of_roping,machine_type,kilo_watt,voltage,current_in_ampere,frequency,rpm,insulation_class,ingress_protection,no_of_poles,st_hr,serial_no,rope_dia,normal_speed,electrical_tripping_speed,mechanical_tripping_speed,cwt_governor_details,cwt_rope_dia,cwt_normal_speed,cwt_electrical_tripping_speed,cwt_mechanical_tripping_speed,door_operator,entrance_height,entrance_width,type_of_openings,cabin_height,cabin_width,no_of_car_operating_panels,car_indicator_type,multimedia_display,no_cabin_fans,type_of_cabin_fan,type_of_call_buttons,stop_button,service_cabinet,voice_announcement,handrail,cabin_bumper,auto_attendant,auto_independant,non_stop,fan_switch,hall_indicator_type,hall_laterns,arrival_chime,no_of_risers_at_main_lobby,no_of_risers_at_other_floors,hall_call_type_at_main_lobby,hall_call_type_at_all_floors,no_of_car_buffers,type_of_car_buffers,no_of_cwt_buffer,type_of_cwt_buffer,e_light,e_alarm,e_intercom,ard_operation,ard_audio,ard_visuals,fireman_operation,fireman_emerg_return,fireman_audio,fireman_visual,manual_rescue,passenger_overload_operation,passenger_overload_visual,passenger_overload_audio,seismic_sensor_operation,maintained_by], (err, result) => {
  //     if (err) {
  //       console.error('Error storing values:', err);
  //       res.status(500).json(err);
  //     } else {
  //       console.log('success:', result);
  //       res.status(200).json({ message: 'data stored successfully successfully' });
  //     }
  //   });

  // });


  app.post('/api/breif_spec_add', (req, res) => {
    console.log('breif spec called');
    
    const {
      service_provider, no_of_machine_room, machine_room, type_of_motor, cabin_depth, capacity, speed, maintained_by, manual_rescue,
      document_id, unit_no, inspector_name, oem, elevator_number, type_of_equipment, year_of_manufacture, type_of_usage, machine_location,
      controller_drive_type, controller_name_as_per_oem, type_of_operation, grouping_type, name_of_the_group, floor_details, openings,
      floor_designations, front_opening_floors, rear_opening_floors, non_stop_service_floors, emergency_stop_floors, rope_category,
      no_of_ropes_belts, rope_size, no_of_drive_sheave_grooves, ropes_wrap_details, type_of_roping, machine_type, kilo_watt, voltage,
      current_in_ampere, frequency, rpm, insulation_class, ingress_protection, no_of_poles, st_hr, serial_no, rope_dia, normal_speed,
      electrical_tripping_speed, mechanical_tripping_speed, cwt_governor_details, door_operator, cwt_rope_dia, cwt_normal_speed,
      cwt_electrical_tripping_speed, cwt_mechanical_tripping_speed, entrance_width, entrance_height, type_of_openings, cabin_width,
      cabin_height, no_of_car_operating_panels, car_indicator_type, multimedia_display, no_cabin_fans, type_of_cabin_fan, type_of_call_buttons,
      stop_button, service_cabinet, voice_announcement, handrail, cabin_bumper, auto_attendant, auto_independant, non_stop, fan_switch,
      hall_indicator_type, hall_laterns, arrival_chime, no_of_risers_at_main_lobby, no_of_risers_at_other_floors, hall_call_type_at_main_lobby,
      hall_call_type_at_all_floors, no_of_car_buffers, type_of_car_buffers, no_of_cwt_buffer, type_of_cwt_buffer, e_light, e_alarm, e_intercom,
      ard_operation, ard_audio, ard_visuals, fireman_operation, fireman_emerg_return, fireman_audio, fireman_visual, passenger_overload_operation,
      passenger_overload_visual, passenger_overload_audio, seismic_sensor_operation
    } = req.body;
    console.log('door operator',door_operator);
    console.log('cwt ',cwt_governor_details);
    console.log('cwt rope',cwt_rope_dia);
    
    
    
  
    const checkQuery = 'SELECT * FROM breif_spec WHERE document_id = ? AND unit_no = ?';
    const deleteQuery = 'DELETE FROM breif_spec WHERE document_id = ? AND unit_no = ?';
    // const insertQuery = 'INSERT INTO breif_spec(service_provider, no_of_machine_room, machine_room, type_of_motor, cabin_depth, capacity, speed, document_id, unit_no, inspector_name, oem, elevator_number, year_of_manufacture, machine_location, controller_drive_type, controller_name_as_per_oem, type_of_equipment, type_of_usage, type_of_operation, grouping_type, name_of_the_group, floor_details, openings, floor_designations, front_opening_floors, rear_opening_floors, non_stop_service_floors, emergency_stop_floors, rope_category, no_of_ropes_belts, rope_size, no_of_drive_sheave_grooves, ropes_wrap_details, type_of_roping, machine_type, kilo_watt, voltage, current_in_ampere, frequency, rpm, insulation_class, ingress_protection, no_of_poles, st_hr, serial_no, rope_dia, normal_speed, electrical_tripping_speed, mechanical_tripping_speed, cwt_governor_details, door_operator, cwt_rope_dia, cwt_normal_speed, cwt_electrical_tripping_speed, cwt_mechanical_tripping_speed, entrance_width, entrance_height, type_of_openings, cabin_width, cabin_height, no_of_car_operating_panels, car_indicator_type, multimedia_display, no_cabin_fans, type_of_cabin_fan, type_of_call_buttons, stop_button, service_cabinet, voice_announcement, handrail, cabin_bumper, auto_attendant, auto_independant, non_stop, fan_switch, hall_indicator_type, hall_laterns, arrival_chime, no_of_risers_at_main_lobby, no_of_risers_at_other_floors, hall_call_type_at_main_lobby, hall_call_type_at_all_floors, no_of_car_buffers, type_of_car_buffers, no_of_cwt_buffer, type_of_cwt_buffer, e_light, e_alarm, e_intercom, ard_operation, ard_audio, ard_visuals, fireman_operation, fireman_emerg_return, fireman_audio, fireman_visual, manual_rescue, passenger_overload_operation, passenger_overload_visual, passenger_overload_audio, seismic_sensor_operation, maintained_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      const insertQuery = 'INSERT INTO breif_spec(door_operator,service_provider,no_of_machine_room,machine_room,type_of_motor,cabin_depth,capacity,speed,document_id,unit_no,inspector_name,oem,elevator_number,year_of_manufacture,machine_location,controller_driver_type,controller_name_as_per_oem,type_of_equipment,type_of_usage,type_of_operation,grouping_type,name_of_the_group,floor_stops,floor_opening,floor_designation,front_opening_floors,rear_opening_floors,service_floors,emergency_stop_floors,rope_category,number_of_rope_belt,rope_size,no_of_drive_sheave_grooves,ropes_wrap_details,type_of_roping,machine_type,motor_kilo_watt,motor_voltage,motor_current_in_ampere,motor_frequency,motor_rpm,motor_insulation_class,motor_ingress_protection,motor_no_of_poles,motor_st_hr,motor_serial_number,car_governor_rope_dia,car_governor_normal_speed,car_governor_electric_tripping_speed,car_governor_mechanical_tripping_speed,cwt_governor,cwt_governor_rope_dia,cwt_governor_normal_speed,cwt_governor_electrical_tripping_speed,cwt_governor_mechanical_tripping_speed,entrance_height,entrance_width,entrance_type_of_opening,cabin_height,cabin_width,no_of_cop,car_indicator_type,multimedia_display,no_of_cabin_fans,type_of_cabin_fans,type_of_call_buttons,car_stop_button,car_service_cabinet,car_voice_announcement,car_handrail,car_cabin_bumper,car_auto_attendant,car_auto_independent,car_non_stop,car_fan_switch,hall_indicator_type,hall_lantems,hall_arrival_chime,no_of_risers_at_main_lobby,no_of_risers_at_other_floors,hall_call_type_at_main_lobby,hall_call_type_at_all_floors,no_of_car_buffers,type_of_car_buffers,no_of_counter_weight_buffer,type_of_cwt_buffer,e_light,e_alarm,e_intercom,ard_operation,ard_audio,ard_visual,fireman_operation,fer,fireman_audio,fireman_visual,manual_rescue,passenger_overload_operation,passenger_overload_visual,passenger_overload_audio,seismic_sensor_operation,maintained_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    db1.query(checkQuery, [document_id, unit_no], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking existing records:', checkErr);
        return res.status(500).json(checkErr);
      }
      
      if (checkResult.length > 0) {
        db1.query(deleteQuery, [document_id, unit_no], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error('Error deleting existing record:', deleteErr);
            return res.status(500).json(deleteErr);
          }
  
          insertRecord();
        });
      } else {
        insertRecord();
      }
    });
  
    function insertRecord() {
      db1.query(insertQuery, [
       door_operator, service_provider, no_of_machine_room, machine_room, type_of_motor, cabin_depth, capacity, speed, document_id, unit_no, inspector_name,
        oem, elevator_number, year_of_manufacture, machine_location, controller_drive_type, controller_name_as_per_oem, type_of_equipment,
        type_of_usage, type_of_operation, grouping_type, name_of_the_group, floor_details, openings, floor_designations, front_opening_floors,
        rear_opening_floors, non_stop_service_floors, emergency_stop_floors, rope_category, no_of_ropes_belts, rope_size, no_of_drive_sheave_grooves,
        ropes_wrap_details, type_of_roping, machine_type, kilo_watt, voltage, current_in_ampere, frequency, rpm, insulation_class, ingress_protection,
        no_of_poles, st_hr, serial_no, rope_dia, normal_speed, electrical_tripping_speed, mechanical_tripping_speed, cwt_governor_details,
        cwt_rope_dia, cwt_normal_speed, cwt_electrical_tripping_speed, cwt_mechanical_tripping_speed, entrance_width, entrance_height, type_of_openings,
        cabin_width, cabin_height, no_of_car_operating_panels, car_indicator_type, multimedia_display, no_cabin_fans, type_of_cabin_fan, type_of_call_buttons,
        stop_button, service_cabinet, voice_announcement, handrail, cabin_bumper, auto_attendant, auto_independant, non_stop, fan_switch, hall_indicator_type,
        hall_laterns, arrival_chime, no_of_risers_at_main_lobby, no_of_risers_at_other_floors, hall_call_type_at_main_lobby, hall_call_type_at_all_floors,
        no_of_car_buffers, type_of_car_buffers, no_of_cwt_buffer, type_of_cwt_buffer, e_light, e_alarm, e_intercom, ard_operation, ard_audio, ard_visuals,
        fireman_operation, fireman_emerg_return, fireman_audio, fireman_visual, manual_rescue, passenger_overload_operation, passenger_overload_visual,
        passenger_overload_audio, seismic_sensor_operation, maintained_by
      ], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error inserting new record:', insertErr);
          return res.status(500).json(insertErr);
        }
  
        console.log('Record inserted successfully:', insertResult);
        res.status(200).json({ message: 'Data stored successfully' });
      });
    }
  });
  

  //breif spec unit details
  app.get('/api/check_record_exists', (req, res) => {
    const { document_id, unit_no } = req.query;
  
    const query = 'SELECT * FROM breif_spec WHERE document_id = ? AND unit_no = ?';
    db1.query(query, [document_id, unit_no], (error, results) => {
      if (error) {
        console.error('Error checking record existence:', error);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results.length > 0); // Return true if record exists, false otherwise
    });
  });

  app.get('/api/check_connectivity',(req,res)=>{
    res.json(true)
  }
  );  


  //certificate
  app.post('/api/generate-certificate', async (req, res) => {
    const htmlContent = req.body.htmlContent;
  
    try {
      const browser = await puppeteer.launch(); // Ensure this is within an async function
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ format: 'A4' });
  
      // Save PDF to MySQL database
      const sql = 'INSERT INTO pdf_documents (pdf_content) VALUES (?)';
      connection.query(sql, [pdfBuffer], (err, result) => {
        if (err) {
          console.error('Error saving PDF to MySQL:', err);
          res.status(500).json({ error: 'Failed to save PDF to database.' });
        } else {
          console.log('PDF saved to MySQL with ID:', result.insertId);
          res.status(200).json({ id: result.insertId });
        }
      });
  
      await browser.close();
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Failed to generate PDF.' });
    }
  });
  
  function savePDFToDatabase(pdfData) {
    const query = "INSERT INTO certificates (pdf_data) VALUES (?)";
    connection.query(query, [pdfData], (err, results) => {
      if (err) {
        console.error('Error saving PDF to database:', err);
      } else {
        console.log('PDF saved to database with ID:', results.insertId);
      }
    });
  }

  //store inf26 form
  app.post('/api/store_data', (req, res) => {
    const { contractNumber,region,location,checked_count,checked_items,unchecked_count,unchecked_items,total_items,elevator_values,home,dump,pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,total_units_schedule,balance_to_inspect,inspection_time,inspector_name,tpt6,tpt7,load_test,pmt,rope_condition,client_whatsapp_number,inspection_time_ins,schedule_from,schedule_to,customer_workorder_date, oem_details } = req.body;
    const query = 'INSERT INTO inf_26 (contract_number,region,location,checked_count,checked_items,unchecked_count,unchecked_items,total_items,elevator_values,home_elevator_values,dump_values,pincode,master_customer_name,customer_workorder_name,customer_name_as_per_work_order, project_name ,building_name,type_of_building,	type_of_inspection ,site_address, customer_contact_name,customer_contact_number,customer_contact_mailid ,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw ,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,total_units_schedule,balance_to_inspect,inspection_time,inspector_name,tpt6,tpt7,load_test,pmt,rope_condition,client_whatsapp_number,inspection_time_ins,schedule_from,schedule_to,customer_workorder_date,oem_details) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
  
    db1.query(query, [contractNumber,region,location,checked_count,JSON.stringify(checked_items),unchecked_count,JSON.stringify(unchecked_items),JSON.stringify(total_items),JSON.stringify(elevator_values),JSON.stringify(home),JSON.stringify(dump),pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,total_units_schedule,balance_to_inspect,inspection_time,inspector_name,tpt6,tpt7,load_test,pmt,rope_condition,client_whatsapp_number,inspection_time_ins,schedule_from,schedule_to,customer_workorder_date,oem_details], (err, result) => {
      if (err) {
        console.error('Error storeing values:', err);
        res.status(500).json({ error: 'Error storing values' });
      } else {
        console.log('success:', result);
        res.status(200).json({ message: 'data stored successfully successfully' });
      }
    });
  });

//api to store 
  app.post('/api/store_data1', (req, res) => {


    const {generated_date, contractNumber,region,location,checked_count,checked_items,unchecked_count,unchecked_items,total_items,elevator_values,home,dump,pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,total_units_schedule,balance_to_inspect,inspection_time,inspector_name,tpt6,tpt7,load_test,pmt,rope_condition,callback,balance,client_whatsapp_number,inspection_time_ins,schedule_from,schedule_to,customer_workorder_date, oem_details,car_parking_values,escalator_values,mw_values,travelator_values,job_type } = req.body;
    const format_date=new Date(generated_date);
    const generated_date1 = format_date.toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO inf_26 (generated_date,contract_number, region, location, elevator_values, home_elevator_values, dump_values, pincode, master_customer_name, customer_workorder_name, customer_name_as_per_work_order, project_name ,building_name, type_of_building,	type_of_inspection ,site_address, customer_contact_name, customer_contact_number,customer_contact_mailid ,total_number_of_units,no_of_elevator,no_of_stops_elevator, no_of_escalator, no_of_travelator, no_of_mw ,no_of_dw, no_of_stops_dw ,no_of_home_elevator, no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,inspection_time,tpt6,tpt7,load_test,pmt,rope_condition,callback,balance,client_whatsapp_number,customer_workorder_date,oem_details,car_parking_values,escalator_values,mw_values,travelator_values,job_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
  
    db1.query(query, [generated_date1,contractNumber,region,location,JSON.stringify(elevator_values),JSON.stringify(home),JSON.stringify(dump),pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,inspection_time,tpt6,tpt7,load_test,pmt,rope_condition,callback,balance,client_whatsapp_number,customer_workorder_date,oem_details,JSON.stringify(car_parking_values),JSON.stringify(escalator_values),JSON.stringify(mw_values),JSON.stringify(travelator_values),job_type], (err, result) => {
      if (err) {
        console.error('Error storeing values:', err);
        res.status(500).json({ error: 'Error storing values' });
      } else {
        console.log('success:', result);
        res.status(200).json({ message: 'data stored successfully successfully' });
      }
    });
  }); 
  

  //api for unit_details table
  app.put('/api/store_data11',(req,res)=>{
    const {unit_values,insp_name,  contract_number,document_id,building_name}=req.body;
    const query='UPDATE unit_details SET unit_no=?,building_name=? WHERE document_id=?';
    db1.query(query,[JSON.stringify(unit_values),building_name,document_id],(err,result)=>{
      if (err) {
        console.error('Error storeing values:', err);
        res.status(500).json({ error: 'Error storing values' });
      } else {
        console.log('success:', result.insertId);
        res.status(200).json('success');
      }

    })
  })
  //pending document
  app.get('/api/pending', (req, res) => {
    const name = req.query.encodedValue;
    console.log('inspector name is',name);
    const query = `SELECT * FROM unit_details where inspector_name='${name}'`; // Modify this query according to your table structure
    db1.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching unit details from database' });
        return;
      }
      res.json(results);
    });
  });
  //pending document
  app.get('/api/approval', (req, res) => {
    // const name = req.query.encodedValue;
    // console.log('inspector name is',name);
    const query = `SELECT id, contract, document_id,project_name, building_name, inspector_name,unit_name,report_id FROM report_files where report_status=? and reject=?`; // Modify this query according to your table structure
    db1.query(query,[0,0], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching unit details from database' });
        return;
      }
      res.json(results);
    });
  });
//update reject reson
app.put('/api/update_reject_reason', (req, res) => {
  const { documentId, unitName, rejectReason } = req.body;

  // Update reject_reason column in your SQL table
  db1.query('UPDATE report_files SET rejected_reason = ?,reject=? WHERE document_id = ? AND unit_name = ?', [rejectReason,1 ,documentId, unitName], (err, result) => {
    if (err) {
      console.error('Error updating reject reason:', err);
      res.status(500).json({ error: 'Error updating reject reason' });
    } else {
      console.log('Reject reason updated successfully');
      res.status(200).json({ success: true });
    }
  });
});
  //fetching approival
  app.put('/api/approve_report', (req, res) => {
    const { documentId, unitName } = req.body;
  
    // Update approve column in report_files table
    db1.query('UPDATE report_files SET report_status = 1 WHERE document_id = ? AND unit_name = ?', [documentId, unitName], (err, result) => {
      if (err) {
        console.error('Error approving report:', err);
        res.status(500).json({ error: 'Error approving report' });
      } else {
        console.log('Report approved successfully');
        res.status(200).json({ success: true });
      }
    });
  });


  app.get('/api/b_spec', (req, res) => {
    const document_id = req.query.encodedValue;
    const unit = req.query.encodedValue1

    // console.log('inspector name is',name);
    const query = `SELECT * FROM breif_spec where document_id='${document_id}' and unit_no='${unit}'`; // Modify this query according to your table structure
    db1.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching unit details from database' });
        return;
      }
      res.json(results);
    });
  });


  //breif spec unit details
  app.get('/api/b_spec_unit', (req, res) => {
    const document_id = req.query.encodedValue;
    // const unit = req.query.encodedValue1

    // console.log('inspector name is',name);
    const query = `SELECT * FROM unit_details where document_id='${document_id}'`; // Modify this query according to your table structure
    db1.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching unit details from database' });
        return;
      }
      res.json(results);
    });
  });

  //agreement page 
  // app.post('/api/store_data_agreement',(req,res)=>{
  //   const {check,name, contract_no,selfAssigned,salesProcess,head}=req.body;
  //   const query='INSERT INTO unit_details(contract_number,checks,inspector_name,selfAssigned,salesProcess,head) VALUES (?,?,?,?,?,?)';
  //   db1.query(query,[contract_no,check,name,selfAssigned,salesProcess,head],(err,result)=>{
  //     if (err) {
  //       console.error('Error storeing values:', err);
  //       res.status(500).json({ error: 'Error storing values' });
  //     } else {
  //       console.log('success:', result.insertId);
  //       res.status(200).json(result.insertId);
  //     }

  //   })
  // })

  app.post('/api/store_data_agreement',(req,res)=>{
    const {region,check,name, contract_no,selfAssigned,salesProcess,head,no_of_units,from_date,to_date,project_name,location}=req.body;
    const generatedDate1 = new Date(from_date).toISOString().slice(0, 10);  // Extracts date in YYYY-MM-DD format  
    const generatedDate2 = new Date(to_date).toISOString().slice(0, 10);  // Extracts date in YYYY-MM-DD format    
    const query='INSERT INTO unit_details(region,contract_number,checks,inspector_name,selfAssigned,salesProcess,head,no_of_units,from_date,to_date,project_name,location) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    db1.query(query,[region,contract_no,check,name,selfAssigned,salesProcess,head,no_of_units,generatedDate1,generatedDate2,project_name,location],(err,result)=>{
      if (err) {
        console.error('Error storeing values:', err);
        res.status(500).json({ error: 'Error storing values' });
      } else {
        console.log('success:', result.insertId);
        res.status(200).json(result.insertId);
      }

    })
  })
  //site risk assessment
  app.get('/api/risk-assessments', (req, res) => {
    const query = 'SELECT id,description, remarks FROM site_risk_assessment';
  
    db1.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching data from MySQL: ', error);
        res.status(500).json({ error: 'Error fetching data from MySQL' });
        return;
      }
      res.json(results);
    });
  });

  //sales when about V job
  app.post('/api/store_data2', (req, res) => {
    // const { contractNumber,region,location,elevator_values,home,dump,pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,inspection_time,tpt6,tpt7,load_test,pmt,rope_condition,client_whatsapp_number,customer_workorder_date, oem_details } = req.body;
    const { generated_date,contractNumber,region,location,checked_count,checked_items,unchecked_count,unchecked_items,total_items,elevator_values,home,dump,pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,total_units_schedule,balance_to_inspect,inspection_time,inspector_name,tpt6,tpt7,load_test,pmt,rope_condition,callback,balance,client_whatsapp_number,inspection_time_ins,schedule_from,schedule_to,customer_workorder_date, oem_details,car_parking_values,escalator_values,mw_values,travelator_values,job_type } = req.body;

    const query = 'INSERT INTO inf_26 (generated_date,contract_number, region, location, pincode, master_customer_name, customer_workorder_name, customer_name_as_per_work_order, project_name ,building_name, type_of_building,	type_of_inspection ,site_address, customer_contact_name, customer_contact_number,customer_contact_mailid ,travel_expenses_by,accomodation_by,	no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,inspection_time,tpt6,tpt7,load_test,pmt,rope_condition,callback,balance,client_whatsapp_number,customer_workorder_date,job_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
  
    db1.query(query, [generated_date,contractNumber,region,location,pincode,master_customer,work_order_no,customer_name_workorder,project_name,building_name,building_type,inspection_type_sync,site_address,customer_contact_name,customer_contact_number,customer_contact_mailid,travel_expenses_by,accomodation_by,no_of_visits_as_per_work_order,no_of_mandays_as_per_work_order,inspection_time,tpt6,tpt7,load_test,pmt,rope_condition,callback,balance,client_whatsapp_number,customer_workorder_date,job_type], (err, result) => {
      if (err) {
        console.error('Error storeing values:', err);
        res.status(500).json({ error: 'Error storing values' });
      } else {
        console.log('success:', result);
        res.status(200).json({ message: 'data stored successfully successfully' });
      }
    });
  });

   //inspection update for rest of details
   app.put('/api/update_data', (req, res) => {
    const {contractNumber,checked_count,checked_items,unchecked_count,unchecked_items,total_items,schedule_from,schedule_to,inspector_name,inspection_time_ins,total_units_schedule,balance_to_inspect,i_status,no_of_breakdays ,inspector_array } = req.body; // Assuming email is sent in the request body
  
    const query = 'UPDATE inf_26 SET checked_count = ?, checked_items=?, unchecked_count=?, unchecked_items=?,	total_items=?, inspection_time_ins=?, total_units_schedule=?, balance_to_inspect=?, schedule_from=?,schedule_to=?, inspector_list=? ,i_status=?, no_of_breakdays=?, inspector_array=? WHERE contract_number = ?';
  
    db1.query(query, [checked_count,JSON.stringify(checked_items),unchecked_count,JSON.stringify(unchecked_items),JSON.stringify(total_items),inspection_time_ins,total_units_schedule,balance_to_inspect,schedule_from,schedule_to,JSON.stringify(inspector_name),i_status,no_of_breakdays,JSON.stringify(inspector_array),contractNumber], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Name not found' });
        } else {
          res.json({ message: 'Email updated successfully' });
        }
      }
    });
  });
 
  //witness details update
  app.put('/api/update_data_w',(req,res)=>{
    const {witness_details,document_id}=req.body;
    const query = 'UPDATE unit_details SET witness_details=? WHERE document_id=?';
    db1.query(query,[JSON.stringify(witness_details),document_id],(err,result)=>{
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: ' not found' });
        } else {
          res.json({ message: 'witness updated successfully' });
        }
      }

    })
  })

  //closing meeting
  app.put('/api/update_data_close',(req,res)=>{
    const {witness_details,document_id}=req.body;
    console.log('witness details',witness_details);
    console.log('document id',document_id);
    const query = 'UPDATE unit_details SET closing_meeting=?,closing_flag=? WHERE document_id=?';
    db1.query(query,[JSON.stringify(witness_details),1,document_id],(err,result)=>{
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          console.log('error',err);
          res.status(404).json({ error: ' not found' });
        } else {
          res.json({ message: 'witness updated successfully' });
        }
      }

    })
  })

  //update feedback
  //closing meeting
  app.put('/api/update_data_feedback',(req,res)=>{
    const {rating,customer_details,options,document_id}=req.body;
    const query = 'UPDATE unit_details SET rating=?,customer_details=?,options=?,feed_back=? WHERE document_id=?';
    db1.query(query,[JSON.stringify(rating),JSON.stringify(customer_details),JSON.stringify(options),1,document_id],(err,result)=>{
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: ' not found' });
        } else {
          res.json({ message: 'witness updated successfully' });
        }
      }

    })
  })

  //site risk assessment update
  app.put('/api/update_data_s',(req,res)=>{
    const {risk,document_id}=req.body;
    const query = 'UPDATE unit_details SET risk=? WHERE document_id=?';
    db1.query(query,[JSON.stringify(risk),document_id],(err,result)=>{
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: ' not found' });
        } else {
          res.json({ message: 'site risk updated successfully' });
        }
      }

    })
  })
  app.post('/api/update-inf-26', (req, res) => {
    const { contractNumber, differenceInDays } = req.body;
  
    if (!contractNumber || differenceInDays === undefined) {
      return res.status(400).json({ error: 'Contract number or difference in days is missing.' });
    }
  
    const sql = `UPDATE inf_26 SET difference_in_days = ? WHERE contract_number = ?`;
  
    db1.query(sql, [differenceInDays, contractNumber], (err, result) => {
      if (err) {
        console.error('Error updating difference_in_days:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      console.log('Difference_in_days updated successfully');
      return res.status(200).json({ message: 'Difference_in_days updated successfully' });
    });
  });
  

  //p&e update
  app.put('/api/update_data1', (req, res) => {

    // elevator_values:elevator, 
    //   home:home_elevator, 
    //   dump:dump_elevator, 
    //   oem_details:this.oem_details_sync, 
    //   total_number_of_units:this.total_number_of_units, 
    //   no_of_elevator:no_of_elevator, 
    //   no_of_stops_elevator:no_of_stops_elevator, 
    //   no_of_escalator:no_of_escalator, 
    //   no_of_travelator:no_of_travelator, 
    //   no_of_mw:no_of_mw, 
    //   no_of_dw:no_of_dw, 
    //   no_of_stops_dw:no_of_stops_dw, 
    //   no_of_home_elevator:no_of_home_elevator, 
    //   no_of_stops_home_elevator:no_of_stops_home_elevator, 
    //   no_of_car_parking:no_of_car_parking, 
    //   car_parking_values:car_parking_values, 
    //   escalator_values:escalator_values, 
    //   mw_values:mw_values, 
    //   travelator_values:travelator_values, 

    const {contractNumber,elevator_values,home,dump,oem_details,total_number_of_units,no_of_elevator,no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw, no_of_stops_dw,no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,car_parking_values,escalator_values,mw_values,travelator_values,status } = req.body; // Assuming email is sent in the request body
  
    const query = 'UPDATE inf_26 SET 	oem_details = ?,total_number_of_units=?, no_of_elevator=?, no_of_stops_elevator=?, no_of_escalator=?, no_of_travelator=?, no_of_mw=?, no_of_dw=?, no_of_stops_dw=?, no_of_home_elevator=?, no_of_stops_home_elevator=?, no_of_car_parking=?,elevator_values=?, home_elevator_values=?, travelator_values=?, dump_values=?, car_parking_values=?,escalator_values=?, mw_values=?,status=? WHERE contract_number = ?';
  
    db1.query(query, [oem_details,total_number_of_units,no_of_elevator, no_of_stops_elevator,no_of_escalator,no_of_travelator,no_of_mw,no_of_dw,no_of_stops_dw, no_of_home_elevator,no_of_stops_home_elevator,no_of_car_parking,JSON.stringify(elevator_values),JSON.stringify(home),JSON.stringify(travelator_values),JSON.stringify(dump),JSON.stringify(car_parking_values),JSON.stringify(escalator_values),JSON.stringify(mw_values),status,contractNumber], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Name not found' });
        } else {
          res.json({ message: 'Email updated successfully' });
        }
      }
    });
  });




  

  app.get('/contract_no', (req, res) => {
    // const query = 'SELECT contract_number FROM inf_26 where i_status=0';
    const query = "SELECT contract_number  FROM inf_26 WHERE i_status = 0 AND (    (job_type = 'V' AND status = '1')    OR job_type <> 'V');"
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const names = results.map((row) => row.contract_number);
        res.json(names);
      }
    });
  });
  
  
  



  //select contract no for v jobs
  app.get('/contract_no1', (req, res) => {
    const query = 'SELECT contract_number FROM inf_26 where job_type="V" and status=0';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const names = results.map((row) => row.contract_number);
        res.json(names);
      }
    });
  });


  //get contract no corresponding details
  app.get('/details/:c_no', (req, res) => {
    const c_no = req.params.c_no;
    const query = 'SELECT * FROM inf_26 WHERE contract_number = ?';
  
    db1.query(query, [c_no], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.length === 0) {
          console.log(err);
          res.status(404).json({ error: 'Name not found'});
        } else {
          const details = results[0]; // Assuming there's only one row with the name
          res.json(details);
        }
      }
    });
  });

  


  
  app.get('/api/job_type', (req, res) => {
    const query = 'SELECT job_type FROM job_type';
  
    db1.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const names = results.map((row) => row.job_type);
        res.json(names);
      }
    });
  });



  app.get('/api/countRecords', (req, res) => {
    const { name } = req.query;
    console.log(name);
  
    // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
    // let sqlQuery = `SELECT COUNT(*) AS count FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=0 and i_rejected=0`;
    let sqlQuery = `SELECT COUNT(*) AS count FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ${db1.escape(`{"name": "${name}", "i_approved": 0,"i_rejected":0}`)})`;

  
    db1.query(sqlQuery, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching record count' });
      } else {
        const count = results[0].count;
        console.log(count);
        res.status(200).json(count);
      }
    });
  });

  // SELECT JSON_EXTRACT(inspector_array, '$[*].units') as units
  // FROM inf_26
  // WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}"}', '$') AND id = "${id}"

  //working query
    // SELECT JSON_EXTRACT(inspector_array, '$[0].units') as units
    // FROM inf_26
    // WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}"}', '$') AND id = "${id}"
 

//   app.get('/api/countRecords_u', (req, res) => {
//     const { name, id } = req.query;
//     console.log('id is ', id);

    
    

//     // Construct the SQL query with parameterized query to avoid SQL injection
//     let sqlQuery = `
//     SELECT JSON_EXTRACT(inspector_array, '$[0].units') as units
//     FROM inf_26
//     WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}"}', '$') AND id = "${id}"

   
    
    

//     `;

//     db1.query(sqlQuery, (error, results) => {
//         if (error) {
//             res.status(500).json({ error: 'Error fetching units value' });
//         } else {
//             const count = results.length > 0 ? results[0].units : null;
//             console.log('count is ', count);
//             res.status(200).json(count);
//         }
//     });
// });

app.get('/api/breif_spec_fetch',(req,res)=>{
  const {unit_no,document_id}=req.query;
  console.log('api',unit_no);
  console.log('document_id',document_id);
  const query = 'SELECT * FROM breif_spec WHERE unit_no = ? and document_id=?';
  
  db1.query(query, [unit_no,document_id], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 0) {
        console.log(err);
        res.status(404).json({ error: 'Name not found'});
      } else {
        const details = results[0]; // Assuming there's only one row with the name
        res.json(details);
      }
    }
  });

})

app.get('/api/countRecords_u', (req, res) => {
  const { name, id } = req.query;
  console.log('id is ', id);

  // Construct the SQL query with parameterized query to avoid SQL injection
  let sqlQuery = `
      SELECT inspector_array
      FROM inf_26
      WHERE id = ${id};
  `;

  db1.query(sqlQuery, (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Error fetching inspector_array' });
      } else {
          const inspectorArray = JSON.parse(results[0].inspector_array);
          const index = inspectorArray.findIndex(record => record.name === name);

          if (index !== -1) {
                                // res.status(200).json(index);


            let sqlQuery1 = `
            SELECT JSON_EXTRACT(inspector_array, '$[${index}].units') as units
            FROM inf_26
            WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}"}', '$') AND id = "${id}"
        
            `;
        
            db1.query(sqlQuery1, (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Error fetching units value' });
                } else {
                    const count = results.length > 0 ? results[0].units : null;
                    console.log('count is ', count);
                    res.status(200).json(count);
                }
            });

          } else {
              res.status(404).json({ error: 'Record not found' });
          }
      }
  });
});



  
  

  app.get('/api/countRecords1', (req, res) => {
    const { name } = req.query;
    console.log(name);
  
    // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
    // let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=0 and i_rejected=0`;
    let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ${db1.escape(`{"name": "${name}", "i_approved": 0,"i_rejected":0}`)})`;

  
    db1.query(sqlQuery, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching record count' });
      } else {
       
        res.status(200).json(results);
      }
    });
  });

  app.get('/api/countRecords2', (req, res) => {
    const { name } = req.query;
    console.log(name);
  
    // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
    // let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=1`;
    let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ${db1.escape(`{"name": "${name}", "i_approved": 1}`)})`;
  
    db1.query(sqlQuery, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching record count' });
      } else {
       
        res.status(200).json(results);
      }
    });
  });

  app.get('/api/countRecords22', (req, res) => {
    const { name } = req.query;
    console.log(name);
  
    // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
    // let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=1`;
    let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ${db1.escape(`{"name": "${name}", "i_approved": 1}`)}) and 	mailset_status=1`;
  
    db1.query(sqlQuery, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching record count' });
      } else {
       
        res.status(200).json(results);
      }
    });
  });

  //reschedule request 
  app.get('/api/countRecords3', (req, res) => {
    const { name } = req.query;
    console.log(name);
  
    // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
    let sqlQuery = `SELECT * FROM inf_26 WHERE i_rejected=1`;
  
    db1.query(sqlQuery, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching record count' });
      } else {
       
        res.status(200).json(results);
      }
    });
  });

  


  // app.get('/api/approveRecords', (req, res) => {
  //   const { id } = req.query;
  //   console.log('id is ',id);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   let sqlQuery = `UPDATE inf_26 SET i_approved = ? where id=?`;
  
  //   db1.query(sqlQuery,[1,id] ,(error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
       
  //       res.status(200).json(results);
  //     }
  //   });
  // });

  // app.put('/api/approveRecords', (req, res) => {
  //   const { name } = req.query;
  
  //   // Update i_approved to 1 where 'name' matches
  //   const updateQuery = `
  //     UPDATE inf_26
  //     SET inspector_array = JSON_SET(
  //       inspector_array,
  //       CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(inspector_array, 'one', ?, NULL, '$[*].name')), '].i_approved'),
  //       1
  //     )
  //     WHERE JSON_SEARCH(inspector_array, 'one', ?, NULL, '$[*].name') IS NOT NULL
  //   `;
  
  //   db1.query(updateQuery, [name, name], (error, results) => {
  //     if (error) {
  //       console.error('Error updating data:', error);
  //       res.status(500).json({ error: 'Error updating data' });
  //     } else {
  //       if (results.affectedRows > 0) {
  //         res.status(200).json({ message: 'i_approved updated successfully' });
  //       } else {
  //         res.status(404).json({ message: 'No matching data found for the given name' });
  //       }
  //     }
  //   });
  // });
  

  // app.put('/api/approveRecords', (req, res) => {
  //   const { name } = req.query;
  
  //   // Fetch the JSON array for the specific record based on 'name'
  //   const selectQuery = `SELECT inspector_array FROM inf_26 WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}" }')`;
  
  //   db1.query(selectQuery, (error, results) => {
  //     if (error) {
  //       console.error('Error fetching data:', error);
  //       res.status(500).json({ error: 'Error fetching data' });
  //     } else {
  //       if (results.length > 0) {
  //         let inspectorArray = JSON.parse(results[0].inspector_array);
  
  //         // Update the 'i_approved' field to 1 where 'name' matches
  //         inspectorArray = inspectorArray.map(inspector => {
  //           if (inspector.name === name) {
  //             inspector.i_approved = 1;
  //           }
  //           return inspector;
  //         });
  
  //         // Update the modified JSON array back into the database
  //         const updateQuery = `UPDATE inf_26 SET inspector_array = ? WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}" }')`;
  
  //         db1.query(updateQuery, [JSON.stringify(inspectorArray)], (error, results) => {
  //           if (error) {
  //             console.error('Error updating data:', error);
  //             res.status(500).json({ error: 'Error updating data' });
  //           } else {
  //             res.status(200).json({ message: 'i_approved updated successfully' });
  //           }
  //         });
  //       } else {
  //         res.status(404).json({ message: 'No matching data found for the given name' });
  //       }
  //     }
  //   });
  // });

  // app.put('/api/approveRecords', (req, res) => {
  //   const { id} = req.query;
  //   const { name } = req.query;
  //   console.log('id is ', id);
  
  //   let sqlQuery = 'UPDATE inf_26 SET i_approved = ? WHERE id = ?';
    
  
  //   // Use parameterized queries to prevent SQL injection
  //   db1.query(sqlQuery, (error, results) => {
  //     if (error) {
  //       console.error('Error updating record:', error);
  //       res.status(500).json({ error: 'Error updating record' });
  //     } else {
  //       res.status(200).json({ message: 'Record approved successfully' });
  //     }
  //   });
   

   
  // });

  app.put('/api/approveRecords', (req, res) => {
    const { id, reason, name } = req.query;
  
    // Construct the SQL query to retrieve the existing JSON data
    let selectQuery = 'SELECT name_reason, inspector_array FROM inf_26 WHERE id = ?';
  
    db1.query(selectQuery, [id], (selectError, selectResults) => {
      if (selectError) {
        console.error('Error retrieving record:', selectError);
        res.status(500).json({ error: 'Error retrieving record' });
      } else {
        let existingNameReason = selectResults[0].name_reason || '{}'; // Get existing name_reason data or initialize an empty object if none
        let existingInspectorArray = selectResults[0].inspector_array || '[]'; // Get existing inspector_array data or initialize an empty array if none
  
        try {
          // Parse the existing JSON strings
          let existingNameReasonObject = JSON.parse(existingNameReason);
          let inspectorArray = JSON.parse(existingInspectorArray);
  
          // Add a new key-value pair to the existing name_reason object
          existingNameReasonObject[name] = reason;
  
          // Convert the updated object back to a JSON string
          let updatedNameReason = JSON.stringify(existingNameReasonObject);
  
          // Find the element in the inspector_array that matches the provided name
          const foundIndex = inspectorArray.findIndex(item => item.name === name);
  
          if (foundIndex !== -1) {
            // Update the i_approved field to 1 for the found inspector
            inspectorArray[foundIndex].i_approved = 1;
  
            // Convert the modified array back to JSON
            const updatedInspectorArray = JSON.stringify(inspectorArray);
  
            // Construct the SQL query to update the record with the modified JSON strings
            let updateQuery = 'UPDATE inf_26 SET inspector_array = ? WHERE id = ?';
  
            // Use parameterized queries to prevent SQL injection
            db1.query(updateQuery, [updatedInspectorArray, id], (updateError, updateResults) => {
              if (updateError) {
                console.error('Error updating record:', updateError);
                res.status(500).json({ error: 'Error updating record' });
              } else {
                res.status(200).json({ message: 'Record approved successfully' });
              }
            });
          } else {
            res.status(404).json({ message: 'Record not found in inspector_array' });
          }
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).json({ error: 'Error parsing JSON' });
        }
      }
    });
 
  });
  

  // app.put('/api/approveRecords', (req, res) => {
  //   const { name } = req.query;
  //   console.log('name is ', name);
  
  //   // Retrieve the existing inspector_array from the database for the given name
  //   db1.query('SELECT inspector_array FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ?)', [`{"name": "${name}"}`], (error, results) => {
  //     if (error) {
  //       console.error('Error retrieving data:', error);
  //       res.status(500).json({ error: 'Error retrieving data' });
  //     } else {
  //       try {
  //         if (results.length > 0) {
  //           const inspectorArray = JSON.parse(results[0].inspector_array);
  
  //           // Find the element in the array that matches the provided name
  //           const foundIndex = inspectorArray.findIndex(item => item.name === name);
  
  //           if (foundIndex !== -1) {
  //             // Update the i_approved field to 1 for the found inspector
  //             inspectorArray[foundIndex].i_approved = 1;
  
  //             // Convert the modified array back to JSON
  //             const updatedInspectorArray = JSON.stringify(inspectorArray);
  
  //             // Update the table with the modified inspector_array
  //             db1.query(
  //               'UPDATE inf_26 SET inspector_array = ? WHERE JSON_CONTAINS(inspector_array, ?)',
  //               [updatedInspectorArray, `{"name": "${name}"}`],
  //               (updateError, updateResults) => {
  //                 if (updateError) {
  //                   console.error('Error updating record:', updateError);
  //                   res.status(500).json({ error: 'Error updating record' });
  //                 } else {
  //                   res.status(200).json({ message: 'Record approved successfully' });
  //                 }
  //               }
  //             );
  //           } else {
  //             res.status(404).json({ message: 'Record not found' });
  //           }
  //         } else {
  //           res.status(404).json({ message: 'Record not found' });
  //         }
  //       } catch (parseError) {
  //         console.error('Error parsing JSON:', parseError);
  //         res.status(500).json({ error: 'Error parsing JSON' });
  //       }
  //     }
  //   });
  // });
  


  // app.put('/api/approveRecords', (req, res) => {
  //   const { name } = req.query;
  //   console.log('name is ', name);
  
  //   // Retrieve the existing inspector_array from the database for the given name
  //   db1.query('SELECT inspector_array FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ?)', [`{"name": "${name}"}`], (error, results) => {
  //     if (error) {
  //       console.error('Error retrieving data:', error);
  //       res.status(500).json({ error: 'Error retrieving data' });
  //     } else {
  //       try {
  //         if (results.length > 0) {
  //           const inspectorArray = JSON.parse(results[0].inspector_array);
  
  //           // Find the element in the array that matches the provided name
  //           const foundIndex = inspectorArray.findIndex(item => item.name === name);
  
  //           if (foundIndex !== -1) {
  //             // Update the i_approved field to 1 for the found inspector
  //             inspectorArray[foundIndex].i_approved = 1;
  
  //             // Convert the modified array back to JSON
  //             const updatedInspectorArray = JSON.stringify(inspectorArray);
  
  //             // Update the table with the modified inspector_array
  //             db1.query(
  //               'UPDATE inf_26 SET inspector_array = ? WHERE JSON_CONTAINS(inspector_array, ?)',
  //               [updatedInspectorArray, `{"name": "${name}"}`],
  //               (updateError, updateResults) => {
  //                 if (updateError) {
  //                   console.error('Error updating record:', updateError);
  //                   res.status(500).json({ error: 'Error updating record' });
  //                 } else {
  //                   res.status(200).json({ message: 'Record approved successfully' });
  //                 }
  //               }
  //             );
  //           } else {
  //             res.status(404).json({ message: 'Record not found' });
  //           }
  //         } else {
  //           res.status(404).json({ message: 'Record not found' });
  //         }
  //       } catch (parseError) {
  //         console.error('Error parsing JSON:', parseError);
  //         res.status(500).json({ error: 'Error parsing JSON' });
  //       }
  //     }
  //   });
  // });
  
  



  //rejection reason //current working
  app.put('/api/approveRecords3', (req, res) => {
    const { id, reason, name } = req.query;
  
    // Construct the SQL query to retrieve the existing JSON data
    let selectQuery = 'SELECT name_reason, inspector_array FROM inf_26 WHERE id = ?';
  
    db1.query(selectQuery, [id], (selectError, selectResults) => {
      if (selectError) {
        console.error('Error retrieving record:', selectError);
        res.status(500).json({ error: 'Error retrieving record' });
      } else {
        let existingNameReason = selectResults[0].name_reason || '{}'; // Get existing name_reason data or initialize an empty object if none
        let existingInspectorArray = selectResults[0].inspector_array || '[]'; // Get existing inspector_array data or initialize an empty array if none
  
        try {
          // Parse the existing JSON strings
          let existingNameReasonObject = JSON.parse(existingNameReason);
          let inspectorArray = JSON.parse(existingInspectorArray);
  
          // Add a new key-value pair to the existing name_reason object
          existingNameReasonObject[name] = reason;
  
          // Convert the updated object back to a JSON string
          let updatedNameReason = JSON.stringify(existingNameReasonObject);
  
          // Find the element in the inspector_array that matches the provided name
          const foundIndex = inspectorArray.findIndex(item => item.name === name);
  
          if (foundIndex !== -1) {
            // Update the i_approved field to 1 for the found inspector
            inspectorArray[foundIndex].i_rejected = 1;
  
            // Convert the modified array back to JSON
            const updatedInspectorArray = JSON.stringify(inspectorArray);
  
            // Construct the SQL query to update the record with the modified JSON strings
            let updateQuery = 'UPDATE inf_26 SET reason = ?, name_reason = ?, inspector_array = ?,i_rejected=? WHERE id = ?';
  
            // Use parameterized queries to prevent SQL injection
            db1.query(updateQuery, [ reason, updatedNameReason, updatedInspectorArray,1, id], (updateError, updateResults) => {
              if (updateError) {
                console.error('Error updating record:', updateError);
                res.status(500).json({ error: 'Error updating record' });
              } else {
                res.status(200).json({ message: 'Record approved successfully' });
              }
            });
          } else {
            res.status(404).json({ message: 'Record not found in inspector_array' });
          }
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).json({ error: 'Error parsing JSON' });
        }
      }
    });
  });

  // app.put('/api/approveRecords3', (req, res) => {
  //   const { id, reason, name } = req.query;
  
  //   // Construct the SQL query to retrieve the existing JSON data
  //   let selectQuery = 'SELECT name_reason, inspector_array FROM inf_26 WHERE id = ?';
  
  //   db1.query(selectQuery, [id], (selectError, selectResults) => {
  //     if (selectError) {
  //       console.error('Error retrieving record:', selectError);
  //       res.status(500).json({ error: 'Error retrieving record' });
  //     } else {
  //       let existingNameReason = selectResults[0].name_reason || '{}'; // Get existing name_reason data or initialize an empty object if none
  //       let existingInspectorArray = selectResults[0].inspector_array || '[]'; // Get existing inspector_array data or initialize an empty array if none
  
  //       try {
  //         // Parse the existing JSON strings
  //         let existingNameReasonObject = JSON.parse(existingNameReason);
  //         let inspectorArray = JSON.parse(existingInspectorArray);
  
  //         // Add a new key-value pair to the existing name_reason object
  //         existingNameReasonObject[name] = reason;
  
  //         // Convert the updated object back to a JSON string
  //         let updatedNameReason = JSON.stringify(existingNameReasonObject);
  
  //         // Find the element in the inspector_array that matches the provided name
  //         const foundIndex = inspectorArray.findIndex(item => item.name === name);
  
  //         if (foundIndex !== -1) {
  //           // Update the i_approved field to 1 for the found inspector
  //           inspectorArray[foundIndex].i_rejected = 1;
  
  //           // Convert the modified array back to JSON
  //           const updatedInspectorArray = JSON.stringify(inspectorArray);
  
  //           // Construct the SQL query to update the record with the modified JSON strings
  //           let updateQuery = 'UPDATE inf_26 SET reason = ?, name_reason = ?, inspector_array = ? WHERE id = ?';
  
  //           // Use parameterized queries to prevent SQL injection
  //           db1.query(updateQuery, [ reason, updatedNameReason, updatedInspectorArray, id], (updateError, updateResults) => {
  //             if (updateError) {
  //               console.error('Error updating record:', updateError);
  //               res.status(500).json({ error: 'Error updating record' });
  //             } else {
  //               res.status(200).json({ message: 'Record approved successfully' });
  //             }
  //           });
  //         } else {
  //           res.status(404).json({ message: 'Record not found in inspector_array' });
  //         }
  //       } catch (parseError) {
  //         console.error('Error parsing JSON:', parseError);
  //         res.status(500).json({ error: 'Error parsing JSON' });
  //       }
  //     }
  //   });
  // });
  

  // app.get('/api/countRecords', (req, res) => {
  //   const { name } = req.query;
  //   console.log(name);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   let sqlQuery = `SELECT COUNT(*) AS count FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=0 and i_rejected=0`;
  
  //   db1.query(sqlQuery, (error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
  //       const count = results[0].count;
  //       console.log(count);
  //       res.status(200).json(count);
  //     }
  //   });
  // });

  // app.get('/api/countRecords1', (req, res) => {
  //   const { name } = req.query;
  //   console.log(name);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=0 and i_rejected=0`;
  
  //   db1.query(sqlQuery, (error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
       
  //       res.status(200).json(results);
  //     }
  //   });
  // });

  // app.get('/api/countRecords2', (req, res) => {
  //   const { name } = req.query;
  //   console.log(name);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=1`;
  
  //   db1.query(sqlQuery, (error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
       
  //       res.status(200).json(results);
  //     }
  //   });
  // });

  // app.get('/api/countRecords22', (req, res) => {
  //   const { name } = req.query;
  //   console.log(name);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   // let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_list, ${db1.escape(`"${name}"`)}) and i_approved=1`;
  //   let sqlQuery = `SELECT * FROM inf_26 WHERE JSON_CONTAINS(inspector_array, ${db1.escape(`{"name": "${name}", "i_approved": 1}`)}) and 	mailset_status=1`;
  
  //   db1.query(sqlQuery, (error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
       
  //       res.status(200).json(results);
  //     }
  //   });
  // });

  // //reschedule request 
  // app.get('/api/countRecords3', (req, res) => {
  //   const { name } = req.query;
  //   console.log(name);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   let sqlQuery = `SELECT * FROM inf_26 WHERE i_rejected=1`;
  
  //   db1.query(sqlQuery, (error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
       
  //       res.status(200).json(results);
  //     }
  //   });
  // });

  


  // app.get('/api/approveRecords', (req, res) => {
  //   const { id } = req.query;
  //   console.log('id is ',id);
  
  //   // Construct the SQL query to check if 'name' exists within 'inspector_like' JSON array
  //   let sqlQuery = `UPDATE inf_26 SET i_approved = ? where id=?`;
  
  //   db1.query(sqlQuery,[1,id] ,(error, results) => {
  //     if (error) {
  //       res.status(500).json({ error: 'Error fetching record count' });
  //     } else {
       
  //       res.status(200).json(results);
  //     }
  //   });
  // });

  // app.put('/api/approveRecords', (req, res) => {
  //   const { name } = req.query;
  
  //   // Update i_approved to 1 where 'name' matches
  //   const updateQuery = `
  //     UPDATE inf_26
  //     SET inspector_array = JSON_SET(
  //       inspector_array,
  //       CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(inspector_array, 'one', ?, NULL, '$[*].name')), '].i_approved'),
  //       1
  //     )
  //     WHERE JSON_SEARCH(inspector_array, 'one', ?, NULL, '$[*].name') IS NOT NULL
  //   `;
  
  //   db1.query(updateQuery, [name, name], (error, results) => {
  //     if (error) {
  //       console.error('Error updating data:', error);
  //       res.status(500).json({ error: 'Error updating data' });
  //     } else {
  //       if (results.affectedRows > 0) {
  //         res.status(200).json({ message: 'i_approved updated successfully' });
  //       } else {
  //         res.status(404).json({ message: 'No matching data found for the given name' });
  //       }
  //     }
  //   });
  // });
  

  // app.put('/api/approveRecords', (req, res) => {
  //   const { name } = req.query;
  
  //   // Fetch the JSON array for the specific record based on 'name'
  //   const selectQuery = `SELECT inspector_array FROM inf_26 WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}" }')`;
  
  //   db1.query(selectQuery, (error, results) => {
  //     if (error) {
  //       console.error('Error fetching data:', error);
  //       res.status(500).json({ error: 'Error fetching data' });
  //     } else {
  //       if (results.length > 0) {
  //         let inspectorArray = JSON.parse(results[0].inspector_array);
  
  //         // Update the 'i_approved' field to 1 where 'name' matches
  //         inspectorArray = inspectorArray.map(inspector => {
  //           if (inspector.name === name) {
  //             inspector.i_approved = 1;
  //           }
  //           return inspector;
  //         });
  
  //         // Update the modified JSON array back into the database
  //         const updateQuery = `UPDATE inf_26 SET inspector_array = ? WHERE JSON_CONTAINS(inspector_array, '{"name": "${name}" }')`;
  
  //         db1.query(updateQuery, [JSON.stringify(inspectorArray)], (error, results) => {
  //           if (error) {
  //             console.error('Error updating data:', error);
  //             res.status(500).json({ error: 'Error updating data' });
  //           } else {
  //             res.status(200).json({ message: 'i_approved updated successfully' });
  //           }
  //         });
  //       } else {
  //         res.status(404).json({ message: 'No matching data found for the given name' });
  //       }
  //     }
  //   });
  // });



  // app.put('/api/approveRecords', (req, res) => {
  //   const { id } = req.query;
  //   console.log('id is ', id);
  
  //   // Construct the SQL query with parameter placeholders
  //   let sqlQuery = 'UPDATE inf_26 SET i_approved = ? WHERE id = ?';
  
  //   // Use parameterized queries to prevent SQL injection
  //   db1.query(sqlQuery, [1, id], (error, results) => {
  //     if (error) {
  //       console.error('Error updating record:', error);
  //       res.status(500).json({ error: 'Error updating record' });
  //     } else {
  //       res.status(200).json({ message: 'Record approved successfully' });
  //     }
  //   });
    // const { name } = req.query;

    // // Update i_approved to 1 where 'name' matches
    // // const sqlQuery = `UPDATE inf_26 SET inspector_array = JSON_SET(inspector_array, '$[?].i_approved', 1) WHERE JSON_EXTRACT(inspector_array, '$[*].name') LIKE '%${name}%'`;
  
    // const sqlQuery = `UPDATE inf_26 SET inspector_array = JSON_SET(inspector_array, '$[?].i_approved', 1) WHERE JSON_UNQUOTE(JSON_EXTRACT(inspector_array, '$[?].name')) = ?`;

    // db1.query(sqlQuery,  [0, 0, name], (error, results) => {
    //   if (error) {
    //     console.error('Error updating data:', error);
    //     res.status(500).json({ error: 'Error updating data' });
    //   } else {
    //     if (results.affectedRows > 0) {
    //       console.log('approved successfull');
    //       res.status(200).json({ message: 'i_approved updated successfully' });
    //     } else {
    //       console.log('no matches');
    //       res.status(404).json({ message: 'No matching data found for the given name' });
    //     }
    //   }
    // });
  // });//update reschedule 
// API endpoint to update i_rejected column
app.post('/api/update_r_inf_26', (req, res) => {
  const { c_no, i_rejected } = req.body;

  // Update query
  const query = `UPDATE inf_26 SET i_rejected = ? WHERE contract_number = ?`;

  // Execute the query
  db1.query(query, [i_rejected, c_no], (err, result) => {
      if (err) {
          console.error('Error updating data:', err);
          res.status(500).json({ success: false, message: 'Error updating data' });
          return;
      }

      console.log('Data updated successfully');
      res.status(200).json({ success: true, message: 'Data updated successfully' });
  });
});
  

  // app.put('/api/approveRecords3', (req, res) => {
  //   const { id,reason,name } = req.query;
  //   const combine = {name:name,reason:reason};
  
  //   console.log('id is ', id);
  //   console.log('name is',combine);
  
  //   // Construct the SQL query with parameter placeholders
  //   let sqlQuery = 'UPDATE inf_26 SET i_rejected = ?,reason=?,name_reason=? WHERE id = ?';
  
  //   // Use parameterized queries to prevent SQL injection
  //   db1.query(sqlQuery, [1, reason,JSON.stringify(combine),id], (error, results) => {
  //     if (error) {
  //       console.error('Error updating record:', error);
  //       res.status(500).json({ error: 'Error updating record' });
  //     } else {
  //       res.status(200).json({ message: 'Record approved successfully' });
  //     }
  //   });
  // });


  // app.put('/api/approveRecords3', (req, res) => {
  //   const { id, reason, name } = req.query;
  
  //   // Construct the SQL query to retrieve the existing JSON data
  //   let selectQuery = 'SELECT name_reason FROM inf_26 WHERE id = ?';
  
  //   db1.query(selectQuery, [id], (selectError, selectResults) => {
  //     if (selectError) {
  //       console.error('Error retrieving record:', selectError);
  //       res.status(500).json({ error: 'Error retrieving record' });
  //     } else {
  //       let existingData = selectResults[0].name_reason || '{}'; // Get existing data or initialize an empty object if none
  
  //       // Parse the existing JSON string
  //       let existingObject = JSON.parse(existingData);
  
  //       // Add a new key-value pair to the existing object
  //       existingObject[name] = reason;
  
  //       // Convert the updated object back to a JSON string
  //       let updatedData = JSON.stringify(existingObject);
  
  //       // Construct the SQL query to update the record with the modified JSON string
  //       let updateQuery = 'UPDATE inf_26 SET i_rejected = ?, reason = ?, name_reason = ? WHERE id = ?';
  
  //       // Use parameterized queries to prevent SQL injection
  //       db1.query(updateQuery, [1, reason, updatedData, id], (updateError, updateResults) => {
  //         if (updateError) {
  //           console.error('Error updating record:', updateError);
  //           res.status(500).json({ error: 'Error updating record' });
  //         } else {
  //           res.status(200).json({ message: 'Record approved successfully' });
  //         }
  //       });
  //     }
  //   });
  // });
 



  app.delete('/api/inspection_delete', (req, res) => {
      
    // const {item} = req.body;
    // // console.log('id is',itemId);
    // console.log('item is',item);
    const items = req.query.items;
  
    // Delete the item from the 'inspection_master' table
    const inspectionSql = 'DELETE FROM inspection_master WHERE id = ?';
  
    db1.query(inspectionSql, [items], (err, result) => {
      if (err) {
        console.error('Error deleting item from inspection_master:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Item not found in inspection_master' });
      }
  
      return res.status(204).send();
    });
  });



  ////////////////server side code for pdf stored database and download and  view stored pdf ///////////////////////////////////////
// Endpoint to generate and store PDF
// app.post('/generate-pdf1', async (req, res) => {
//   const { content,Ordered_unit,name,contract,document_id,building_name } = req.body;
//   const Ordered_unit_str = Ordered_unit.join(',');  
//   console.log('document id is',document_id);

//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();
    
//     // Intercept requests to ensure images are handled
//     await page.setRequestInterception(true);
//     page.on('request', (request) => {
//       if (request.resourceType() === 'image') {
//         request.continue();
//       } else {
//         request.continue();
//       }
//     });

//     // Set content and wait for all images to load
//     await page.setContent(content, { waitUntil: 'domcontentloaded' });

//     // Wait for all images to load
//     await page.evaluate(async () => {
//       const images = Array.from(document.images);
//       await Promise.all(images.map(img => {
//         if (img.complete) return;
//         return new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//         });
//       }));
//     });

//     const pdfBuffer = await page.pdf({ format: 'A4', landscape: true });

//     await browser.close();

//     const pool = await connectToDatabase();
//     const connection = await pool.getConnection();
    

//     try {
//       const sql = 'INSERT INTO report_files(unit_name, document_id, file_data, building_name, contract, inspector_name) VALUES (?,?,?,?,?,?)';
//       const [result] = await connection.query(sql, [Ordered_unit_str,document_id,pdfBuffer,building_name,contract,name]);

//       const pdfId = result.insertId;
//       console.log('PDF stored in database with ID:', pdfId);
//       res.status(200).json({ id: pdfId });
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF');
//   }
// });




//unit details report no check 
app.get('/getUnitDetails/:document_id', (req, res) => {
  const documentId = req.params.document_id;

  // Query the unit_details table based on document_id
  db1.query('SELECT * FROM unit_details WHERE document_id = ?', [documentId], (error, results) => {
      if (error) {
          console.error('Error fetching unit details:', error);
          return res.status(500).json({ error: 'Error fetching unit details' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'No record found with the given document_id' });
      }

      // Return the result
      res.status(200).json({ success: true, data: results[0] });
  });
});

app.post('/generate-pdf1', async (req, res) => {
  const { content,Ordered_unit,name,contract,document_id,building_name,report_id } = req.body;
  const Ordered_unit_str = Ordered_unit.join(',');  
  console.log('document id is',document_id);
  const reportId = document_id+'/'+report_id;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Intercept requests to ensure images are handled
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        request.continue();
      } else {
        request.continue();
      }
    });

    // Set content and wait for all images to load
    await page.setContent(content, { waitUntil: 'domcontentloaded' });

    // Wait for all images to load
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
    });

 
    const pdfBuffer = await page.pdf({ format: 'A4', landscape: true });

    await browser.close();

    const pool = await connectToDatabase();
    const connection = await pool.getConnection();
    

    try {
      const sql = 'INSERT INTO report_files(report_id,unit_name, document_id, file_data, building_name, contract, inspector_name) VALUES (?,?,?,?,?,?,?)';
      const [result] = await connection.query(sql, [reportId,Ordered_unit_str,document_id,pdfBuffer,building_name,contract,name]);

      const pdfId = result.insertId;
      console.log('PDF stored in database with ID:', pdfId);
      res.status(200).json({ id: pdfId });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

// Endpoint to retrieve PDF by ID
// app.get('/get-pdf/:id', async (req, res) => {
//   const pdfId = req.params.id;

//   try {
//     const pool = await connectToDatabase();
//     const connection = await pool.getConnection();

//     try {
//       const sql = 'SELECT content FROM pdf_files WHERE id = ?';
//       const [rows] = await connection.query(sql, [pdfId]);

//       if (rows.length > 0) {
//         const pdfBuffer = rows[0].content;
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBuffer);
//       } else {
//         res.status(404).send('PDF not found');
//       }
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).send('Error fetching PDF');
//   }
// });

// app.get('/get-pdf/:id', async (req, res) => {
//   const pdfId = req.params.id;

//   try {
//     const pool = await connectToDatabase();
//     const connection = await pool.getConnection();

//     try {
//       const sql = 'SELECT content FROM pdf_files WHERE id = ?';
//       const [rows] = await connection.query(sql, [pdfId]);

//       if (rows.length > 0) {
//         const pdfBuffer = rows[0].content;
//         const fileName = `document_${pdfId}.pdf`; // Default filename suggestion
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
//         res.send(pdfBuffer);
//       } else {
//         res.status(404).send('PDF not found');
//       }
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).send('Error fetching PDF');
//   }
// });

// API endpoint to generate and save PDF
// app.post('/api/generate-certificate1', async (req, res) => {
//   const htmlContent = req.body.htmlContent;
//   const {unit,document_id,contract,building_name,inspector_name,project_name,region,location}=req.body;
//   // unit:this.unit,
//   // document_id:this.document_id,
//   // contract:this.contract,
//   // building_name:this.inf_26.building_name,
//   // inspector_name:name

//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();

//     // Intercept requests to ensure images are handled
//     await page.setRequestInterception(true);
//     page.on('request', (request) => {
//       if (request.resourceType() === 'image') {
//         request.continue();
//       } else {
//         request.continue();
//       }
//     });

//     // Set content and wait for all images to load
//     await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

//     // Wait for all images to load
//     await page.evaluate(async () => {
//       const images = Array.from(document.images);
//       await Promise.all(images.map(img => {
//         if (img.complete) return;
//         return new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//         });
//       }));
//     });

//     // Generate PDF
//     const pdfBuffer = await page.pdf({ format: 'A4' });

//     // Close Puppeteer browser
//     await browser.close();

//     // Save PDF to MySQL database
//     const pool = await connectToDatabase();
//     const connection = await pool.getConnection();
    
//   //   const insertQuery = 'INSERT INTO uploaded_files (file_data,inspector_name,building_name,unit_name,document_id,contract) VALUES (?,?,?,?,?,?)';
//   //   const [result] = await connection.query(insertQuery, [pdfBuffer,inspector_name,building_name,unit,document_id,contract]);
//   //   const insertId = result.insertId;
    
//   //   await connection.release();
//   //   await pool.end();

//   //   res.status(200).json({ id: insertId });
    
//   // } catch (error) {
//   //   console.error('Error generating PDF and saving to database:', error);
//   //   res.status(500).json({ error: 'Failed to generate PDF and save to database.' });
//   // }
//   try {
//     // Check if record exists
//     const selectSql = 'SELECT COUNT(*) AS count FROM uploaded_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
//     const [selectResult] = await connection.query(selectSql, [unit, document_id, building_name, contract, inspector_name]);
//     const count = selectResult[0].count;

//     if (count > 0) {
//       // If a record exists, delete it
//       const deleteSql = 'DELETE FROM uploaded_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
//       await connection.query(deleteSql, [unit, document_id, building_name, contract, inspector_name]);
//       console.log('Existing record deleted.');
//     }

//     // Insert new record
//     const insertSql = 'INSERT INTO uploaded_files (project_name,region,location,file_data, inspector_name, building_name, unit_name, document_id, contract) VALUES (?,?,?,?, ?, ?, ?, ?, ?)';
//     const [insertResult] = await connection.query(insertSql, [project_name,region,location,pdfBuffer, inspector_name, building_name, unit, document_id, contract]);
//     const insertId = insertResult.insertId;

//     res.status(200).json({ id: insertId });
//   } catch (error) {
//     console.error('Error querying or inserting into database:', error);
//     res.status(500).json({ error: 'Failed to query or insert into database.' });
//   } finally {
//     await connection.release();
//     await pool.end();
//   }

// } catch (error) {
//   console.error('Error generating PDF and saving to database:', error);
//   res.status(500).json({ error: 'Failed to generate PDF and save to database.' });
// }
// });


// Endpoint to retrieve PDF by ID
// app.get('/get-pdf1/:id', async (req, res) => {
//   const pdfId = req.params.id;

//   try {
//     const pool = await connectToDatabase();
//     const connection = await pool.getConnection();

//     try {
//       const sql = 'SELECT pdf_content FROM pdf_documents WHERE id = ?';
//       const [rows] = await connection.query(sql, [pdfId]);

//       if (rows.length > 0) {
//         const pdfBuffer = rows[0].pdf_content; // Make sure the column name matches
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'inline; filename=Certificate.pdf'); // Sets the default filename for the PDF
//         res.send(pdfBuffer);
//       } else {
//         res.status(404).send('PDF not found');
//       }
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).send('Error fetching PDF: ' + error.message); // Send detailed error message
//   }
// });

app.get('/api/saveFormData', (req, res) => {
  const formData = req.body;
  console.log('Form data received:', formData);
  // Add your logic to save form data to the database here

  res.status(200).send({ message: 'Form data saved successfully' });
});

// Endpoint to retrieve contract numbers from inf_26
// app.get('/api/getInf26Data', (req, res) => {
//   const contractNumber = req.query.contractNumber
//   const name = req.query.name
//   const query = 'SELECT contract_number,location,schedule_from,schedule_to,no_of_mandays_as_per_work_order,building_name,inspector_name,inspector_list,difference_in_days,customer_workorder_name,customer_workorder_date,no_of_breakdays,total_units_schedule FROM papl_inspection.inf_26  where contract_number=?'; // Selecting only contract_number
//   db.query(query,contractNumber, (err, results) => {

//     if (err) {
//       console.error('Error retrieving data from the database:', err);
//       return res.status(500).send({ message: 'Error retrieving data from the database' });
//     }
//     // const query = 'select signature from signature where'(bending)
//     console.log('Contract Numbers from inf_26:', results);
//     res.status(200).send(results);
//   });
// });
// Route to fetch data from inf_26 and signature based on inspector's name
app.get('/api/getInf26Data', (req, res) => {
  const { contractNumber, name } = req.query;
  console.log('contract no',contractNumber,name);

  // Query to fetch data from inf_26 table
  const query = `
    SELECT contract_number, location, schedule_from, schedule_to, no_of_mandays_as_per_work_order,
           building_name, inspector_name, inspector_list, difference_in_days, customer_workorder_name,
           customer_workorder_date, no_of_breakdays, total_units_schedule,inspector_array
    FROM papl_inspection.inf_26
    WHERE contract_number = ?`;

  db1.query(query, [contractNumber], (err, results) => {
    if (err) {
      console.error('Error retrieving data from the database:', err);
      return res.status(500).send({ message: 'Error retrieving data from the database' });
    }

    if (results.length === 0) {
      console.log('error is',contractNumber);
      return res.status(404).send({ message: 'Contract number not found' });
    }

    // Query to fetch signature based on inspector's name
    const querySignature = `
      SELECT signature
      FROM signature
      WHERE inspector_name = ?`;

    db1.query(querySignature, [name], (err, signatureResults) => {
      if (err) {
        console.error('Error retrieving signature from the database:', err);
        return res.status(500).send({ message: 'Error retrieving signature from the database' });
      }

      if (signatureResults.length === 0) {
        return res.status(404).send({ message: 'Signature not found for inspector name' });
      }

      const signature = signatureResults[0].signature.toString('base64'); // Convert signature to base64 string

      console.log('Signature:', signature);

      // Sending response with data and signature
      res.status(200).send({
        ...results[0], // Assuming results contains other data from inf_26
        signature: signature
      });
    });
  });
});


// Endpoint to generate and store PDF as blob in database
// app.post('/create_pdf', async (req, res) => {
//   const { content,building_name,contract_no,documentId,inspector_name } = req.body;


//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();

//     // Increase the default timeout for all navigation operations
//     page.setDefaultNavigationTimeout(160000); // 160 seconds

//     // Set content and wait for all images to load
//     await page.setContent(content, { waitUntil: 'domcontentloaded' });

//     // Wait for all images to load
//     await page.evaluate(async () => {
//       const images = Array.from(document.images);
//       await Promise.all(images.map(img => {
//         if (img.complete) return;
//         return new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//         });
//       }));
//     });

//     // Generate the PDF
//     const pdfBuffer = await page.pdf({ format: 'A4' });

//     await browser.close();

//     // Save PDF buffer to database as blob
//     const query = 'INSERT INTO pdf_storage (pdf_content,building_name,documentId,inspector_name,contract_no) VALUES (?,?,?,?,?)';
//     db1.query(query, [pdfBuffer,building_name,documentId,inspector_name,contract_no], (err, result) => {
//       if (err) {
//         console.error('Error saving PDF to database:', err);
//         res.status(500).send('Error saving PDF to database.');
//         return;
//       }
//       res.json({ id: result.insertId });
//     });
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF.');
//   }
// });

app.post('/create_pdf', async (req, res) => {
  const { content, building_name, contract_no, documentId, inspector_name } = req.body;

  try {
    // Launch puppeteer browser for PDF generation
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Increase the default timeout for all navigation operations
    page.setDefaultNavigationTimeout(160000); // 160 seconds

    // Set content and wait for all images to load
    await page.setContent(content, { waitUntil: 'domcontentloaded' });

    // Wait for all images to load
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
    });

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // Check if record already exists in the database
    const checkQuery = `
      SELECT * FROM pdf_storage 
      WHERE building_name = ? AND contract_no = ? AND documentId = ? AND inspector_name = ?
    `;

    db1.query(checkQuery, [building_name, contract_no, documentId, inspector_name], (err, results) => {
      if (err) {
        console.error('Error checking for existing record:', err);
        res.status(500).send('Error checking for existing record.');
        return;
      }

      if (results.length > 0) {
        // If record exists, delete the existing record
        const deleteQuery = `
          DELETE FROM pdf_storage 
          WHERE building_name = ? AND contract_no = ? AND documentId = ? AND inspector_name = ?
        `;
        db1.query(deleteQuery, [building_name, contract_no, documentId, inspector_name], (deleteErr) => {
          if (deleteErr) {
            console.error('Error deleting existing record:', deleteErr);
            res.status(500).send('Error deleting existing record.');
            return;
          }
        });
      }

      // Insert new record
      const insertQuery = `
        INSERT INTO pdf_storage (pdf_content, building_name, documentId, inspector_name, contract_no) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db1.query(insertQuery, [pdfBuffer, building_name, documentId, inspector_name, contract_no], (insertErr, result) => {
        if (insertErr) {
          console.error('Error inserting new PDF record:', insertErr);
          res.status(500).send('Error inserting new PDF record.');
          return;
        }
        res.json({ id: result.insertId });
      });
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF.');
  }
});




// Endpoint to retrieve PDF by ID
app.get('/get-pdf/:id', (req, res) => {
  const pdfId = req.params.id;

  const query = 'SELECT pdf_content FROM pdf_storage WHERE id = ?';
  db1.query(query, [pdfId], (err, results) => {
   
    if (err) {
      console.error('Error retrieving PDF:', err);
      res.status(500).send('Error retrieving PDF');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('PDF not found');
      return;
    }
    console.log('pdf retrive id:',pdfId)

    const pdfBuffer = results[0].pdf_content;

    // Set headers for PDF content
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline'); // Display PDF in browser

    // Send the PDF buffer as the response
    res.end(pdfBuffer, 'binary');
  });
});


// API to fetch data from pdf_storage

// app.get('/api/pdf-storage', (req, res) => {
//   const sqlQuery = 'SELECT * FROM pdf_storage';

//   db1.query(sqlQuery, (err, results) => {
//       if (err) {
//           console.error('Error fetching data from pdf_storage:', err);
//           res.status(500).json({ error: 'Failed to fetch data' });
//       } else {
//           res.status(200).json(results);
//       }
//   });
// });


// Endpoint to stream PDF files
// app.get('/api/pdf/:id', (req, res) => {
//   const id = req.params.id;
  
//   // Use db1 connection to query the database
//   db1.query('SELECT pdf_content FROM pdf_storage WHERE id = ?', [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching PDF:', err);
//       return res.status(500).send('Error fetching PDF');
//     }
    
//     if (results.length === 0) {
//       return res.status(404).send('Document not found');
//     }
    
//     const pdfContent = results[0].pdf_content;

//     // Set headers to serve the PDF
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

//     // Send the PDF content
//     res.send(pdfContent);
//   });
// });



// ////// API route to get inf  records for alan use////
// app.get('/api/sales', (req, res) => {
//   const query = 'SELECT * FROM inf_26';
//   db1.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error fetching data from database.');
//       return;
//     }
//     res.json(results);
//   });
// });

// Fetch records with i_status of 1
app.get('/api/inf-status-1', (req, res) => {
  const query = 'SELECT * FROM inf_26 WHERE i_status = 1 ORDER BY id DESC';  // Adjust table and field names as necessary

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    console.log('Status 1 Records:', result);  // Log the records with status 1 to the console
    res.json(result);  // Send records back in the response
  });
});

// Fetch records with i_status of 0
app.get('/api/inf-status-0', (req, res) => {
  const query = 'SELECT * FROM inf_26 WHERE i_status = 0';  // Adjust table and field names as necessary

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    console.log('Status 0 Records:', result);  // Log the records with status 0 to the console
    res.json(result);  // Send records back in the response
  });
});



// Define API endpoint to get counts of i_status 1 and 0
app.get('/api/get-inf-counts', (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN i_status = 1 THEN 1 ELSE 0 END) AS status1Count,
      SUM(CASE WHEN i_status = 0 THEN 1 ELSE 0 END) AS status0Count
    FROM inf_26
  `;

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    const { status1Count, status0Count } = result[0];
    console.log('Status 1 Count:', status1Count);  // Log the counts to the console
    console.log('Status 0 Count:', status0Count);

    res.json({ status1Count, status0Count });  // Send counts back in the response
  });
});



// Define API endpoint to get the sum of 'total_number_of_units'
app.get('/api/get-total-units-counts', (req, res) => {
  const query = 'SELECT SUM(total_number_of_units) AS totalUnits FROM inf_26';  // Query to sum `total_number_of_units`

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    const totalUnits = result[0].totalUnits;
    console.log('Total Number of Units:', totalUnits);  // Log the total units to the console

    res.json({ totalUnits: totalUnits });  // Send the sum back in the response
  });
});



//////////////// keyabstract pdf stored in db table name keyabstract_pdf///////////////
app.post('/api/keyabstract_store', async (req, res) => {
  const htmlContent = req.body.htmlContent;
  const { unit, document_id, contract, building_name, inspector_name } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set content and wait for all images to load
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Wait for all images to load
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close Puppeteer browser
    await browser.close();

    // Check if the record exists
    const checkQuery = `
      SELECT * FROM keyabstract_pdf 
      WHERE unit = ? AND document_id = ? AND contract = ?  AND inspector_name = ?
    `;
    const [existingData] = await db_promise.query(checkQuery, [unit, document_id, contract, building_name, inspector_name]);

    // If record exists, delete it
    if (existingData && existingData.length > 0) {
      const deleteQuery = `
        DELETE FROM keyabstract_pdf 
        WHERE unit = ? AND document_id = ? AND contract = ?  AND inspector_name = ?
      `;
      await db_promise.query(deleteQuery, [unit, document_id, contract, building_name, inspector_name]);
    }

    // Insert the new record
    const insertQuery = `
      INSERT INTO keyabstract_pdf 
      (pdf_data, unit, document_id, contract, building_name, inspector_name) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db_promise.query(insertQuery, [pdfBuffer, unit, document_id, contract, building_name, inspector_name]);

    // Set response headers to indicate a PDF file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf',
      'Content-Length': pdfBuffer.length,
    });

    // Send the PDF buffer as the response
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF and saving to database:', error);
    res.status(500).json({ error: 'Failed to generate PDF and save to database.' });
  }
});


// Fetch records with i_status of 1
app.get('/api/inf-status-1', (req, res) => {
  const query = 'SELECT * FROM inf_26 WHERE i_status = 1';  // Adjust table and field names as necessary

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    console.log('Status 1 Records:', result);  // Log the records with status 1 to the console
    res.json(result);  // Send records back in the response
  });
});

// Fetch records with i_status of 0
app.get('/api/inf-status-0', (req, res) => {
  const query = 'SELECT * FROM inf_26 WHERE i_status = 0';  // Adjust table and field names as necessary

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    console.log('Status 0 Records:', result);  // Log the records with status 0 to the console
    res.json(result);  // Send records back in the response
  });
});



// Define API endpoint to get counts of i_status 1 and 0
app.get('/api/get-inf-counts', (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN i_status = 1 THEN 1 ELSE 0 END) AS status1Count,
      SUM(CASE WHEN i_status = 0 THEN 1 ELSE 0 END) AS status0Count
    FROM inf_26
  `;

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    const { status1Count, status0Count } = result[0];
    console.log('Status 1 Count:', status1Count);  // Log the counts to the console
    console.log('Status 0 Count:', status0Count);

    res.json({ status1Count, status0Count });  // Send counts back in the response
  });
});



// Define API endpoint to get the sum of 'total_number_of_units'
app.get('/api/get-total-units-counts', (req, res) => {
  const query = 'SELECT SUM(total_number_of_units) AS totalUnits FROM inf_26';  // Query to sum `total_number_of_units`

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    const totalUnits = result[0].totalUnits;
    console.log('Total Number of Units:', totalUnits);  // Log the total units to the console

    res.json({ totalUnits: totalUnits });  // Send the sum back in the response
  });
});





// app.get('/api/getSignatureDetails/:inspectorName', (req, res) => {
//   const inspectorName = req.params.inspectorName;

//   const query = "SELECT signature FROM signature WHERE inspector_name = ?";
//   db1.query(query, [inspectorName], (err, results) => {
//     if (err) {
//       console.error('Error fetching signature:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       if (results.length > 0) {
//         res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//         res.end(results[0].signature, 'binary');
//       } else {
//         res.status(404).json({ error: 'Signature not found' });
//       }
//     }
//   });
// });

// Assuming you're using Express
// Endpoint to fetch user data, including BLOB image
app.get('/api/clientadmin', (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Fetch the user data from the database where the username matches
  const query = `SELECT Username, email, Password, Picture FROM clientadmin WHERE Username = ?`;

  db.query(query, [username], (error, results) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Error fetching data' });
    }

    if (results.length > 0) {
      const user = results[0];
      // Convert BLOB to base64 string
      if (user.Picture) {
        user.Picture = `data:image/jpeg;base64,${user.Picture.toString('base64')}`;
      }
      res.json(user);  // Send back the first match
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});


//////////////////////////////Manage account update API//////////////////////////////////////
// API to handle update with file upload
// app.put('/api/update-client', upload.single('picture'), (req, res) => {
//   const { Username, email, password } = req.body;
//   console.log('data is',req.body);
  
//   const picture = req.file ? req.file.buffer : null; // Get file buffer from multer

//   if (!Username || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // SQL query to update client data and store the picture as a BLOB
//   const query = `
//     UPDATE clientadmin
//     SET Email = ?, Password = ?, Picture = ?
//     WHERE Username = ?;
//   `;

//   db.query(query, [email, password, picture, Username], (err, results) => {
//     if (err) {
//       console.error('Error updating data:', err);
//       return res.status(500).json({ error: 'An error occurred while updating data' });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: 'No client found with the provided Username' });
//     }

//     res.json({ message: 'Client details updated successfully' });
//     console.log("password is", password, "email is", email, "Username is", Username);
//     console.log("picture is",picture)
//   });
// });



app.put('/api/update-client', upload.single('picture'), (req, res) => {
  const { Username, email, password } = req.body;
  let pictureData = null;

  if (req.file) {
    pictureData = fs.readFileSync(req.file.path); // Read the file data as a BLOB
  }

  // Validate input
  if (!Username && !email && !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password before storing it
  const saltRounds = 10; // You can adjust the salt rounds as per your requirement
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing the password:', err);
      console.log("hashed password is " , hashedPassword)
      return res.status(500).json({ message: 'Error processing password' });
    }

    // Insert or update user data including the picture BLOB
    const updateQuery = `
      UPDATE clientadmin 
      SET email = ?, Password = ?, Picture = ?
      WHERE Username = ?
    `;

    const params = [email, hashedPassword, pictureData, Username];

    db.query(updateQuery, params, (error, results) => {
      if (error) {                                 
        console.error('Error updating client:', error);
        return res.status(500).json({ message: 'Error updating client' });
      }

      res.json({ message: 'Client updated successfully', data: results });
     

    });
  });
});


////////////////////////////////////status one update query//////////////////////////////////////
 /////////// //////////////////////Update data for a specific contract//////////////////////////
// Handle PUT request at /api/update_inf
app.put('/api/update_inf', (req, res) => {
  console.log('Received update request with body:', req.body);
 
 

  // Destructure and extract required fields from request body
  const {
    contractNumber, region, location, elevator_values, home, dump, pincode,
    master_customer, work_order_no, customer_name_workorder, project_name,
    building_name, building_type,  inspection_type_sync, site_address, customer_contact_name,
    customer_contact_number, customer_contact_mailid, total_number_of_units, no_of_elevator,
    no_of_stops_elevator, no_of_escalator, no_of_travelator, no_of_mw, no_of_dw, no_of_stops_dw,
    no_of_home_elevator, no_of_stops_home_elevator, no_of_car_parking, travel_expenses_by, accomodation_by,
    no_of_visits_as_per_work_order, no_of_mandays_as_per_work_order, total_units_schedule, balance_to_inspect,
    inspection_time, inspector_name, tpt6, tpt7, load_test, pmt, rope_condition, callback, balance,
    client_whatsapp_number, inspection_time_ins, schedule_from, schedule_to, customer_workorder_date,
    oem_details, car_parking_values, escalator_values, mw_values, travelator_values, job_type
  } = req.body;

  // // Check if contract_number is provided
  // if (!contract_number) {
  //   return res.status(400).json({ error: 'Contract number is required' });
  // }

  // Correct SQL query
  const query = `
    UPDATE inf_26
    SET 
      region = ?, 
      location = ?, 
      elevator_values = ?, 
      home_elevator_values = ?, 
      dump_values = ?, 
      pincode = ?, 
      master_customer_name = ?, 
      customer_workorder_name = ?, 
      customer_name_as_per_work_order = ?, 
      project_name = ?, 
      building_name = ?, 
      type_of_building = ?, 
      type_of_inspection = ?, 
      site_address = ?, 
      customer_contact_name = ?, 
      customer_contact_number = ?, 
      customer_contact_mailid = ?, 
      total_number_of_units = ?, 
      no_of_elevator = ?, 
      no_of_stops_elevator = ?, 
      no_of_escalator = ?, 
      no_of_travelator = ?, 
      no_of_mw = ?, 
      no_of_dw = ?, 
      no_of_stops_dw = ?, 
      no_of_home_elevator = ?, 
      no_of_stops_home_elevator = ?, 
      no_of_car_parking = ?, 
      travel_expenses_by = ?, 
      accomodation_by = ?, 
      no_of_visits_as_per_work_order = ?, 
      no_of_mandays_as_per_work_order = ?, 
      total_units_schedule = ?, 
      balance_to_inspect = ?, 
      inspection_time = ?, 
      inspector_name = ?, 
      tpt6 = ?, 
      tpt7 = ?, 
      load_test = ?, 
      pmt = ?, 
      rope_condition = ?, 
      callback = ?, 
      balance = ?, 
      client_whatsapp_number = ?, 
      customer_workorder_date = ?, 
      oem_details = ?, 
      car_parking_values = ?, 
      escalator_values = ?, 
      mw_values = ?, 
      travelator_values = ?, 
      job_type = ?
    WHERE contract_number = ?
  `;

  // Construct the values array
  const values = [
    region, location, JSON.stringify(elevator_values),JSON.stringify(home),JSON.stringify(dump), pincode,
    master_customer, work_order_no, customer_name_workorder, project_name,
    building_name, building_type,inspection_type_sync, site_address, customer_contact_name,
    customer_contact_number, customer_contact_mailid, total_number_of_units, no_of_elevator,
    no_of_stops_elevator, no_of_escalator, no_of_travelator, no_of_mw, no_of_dw, no_of_stops_dw,
    no_of_home_elevator, no_of_stops_home_elevator, no_of_car_parking, travel_expenses_by, accomodation_by,
    no_of_visits_as_per_work_order, no_of_mandays_as_per_work_order, total_units_schedule, balance_to_inspect,
    inspection_time, inspector_name, tpt6, tpt7, load_test, pmt, rope_condition, callback, balance,
    client_whatsapp_number, customer_workorder_date,
    oem_details, car_parking_values, escalator_values, mw_values, travelator_values, job_type,
    contractNumber // Ensure this matches the field in the WHERE clause
  ];

  // // Log the query and values for debugging
  // console.log('Executing query:', query);
  // console.log('With values:', values);

  // Execute the query
  db1.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ error: 'Error updating data' });
    }

    console.log('Result:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    console.log('Data updated successfully:', req.body);
    res.status(200).json({ message: 'Data updated successfully' });
  });
});


//store location id
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}


// app.post('/api/store-lifts', (req, res) => {
//   const { lifts, location,site_location, building_name, pincode } = req.body;
//   const { latitude, longitude } = location;
//   const radius = 1; // 1km radius
//   // Check if the location is within the radius
//   db1.query(`SELECT * FROM lift_locations WHERE latitude IS NOT NULL AND longitude IS NOT NULL`, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const existingLifts = new Set();
//     let isWithinRadius = false;

//     result.forEach(record => {
//       const distance = calculateDistance(latitude, longitude, record.latitude, record.longitude);
//       if (distance <= radius && record.pincode === pincode &&record.location===site_location) {
//         isWithinRadius = true;
//         existingLifts.add(record.lift_name); // Store already inspected lifts
//       }
//     });

//     // Insert only new lifts (those not already inspected within the radius)
//     lifts.forEach(lift => {
//       if (!existingLifts.has(lift)) {
//         db1.query(
//           `INSERT INTO lift_locations (lift_name, latitude, longitude,location,building_name,pincode) VALUES (?,?,?,?, ?, ?)`,
//           [lift, latitude, longitude,site_location,building_name,pincode],
//           (err, result) => {
//             if (err) {
//               console.error('Error inserting lift:', err);
//               return res.status(500).json({ error: err.message });
//             }
//           }
//         );
//       }
//     });

//     return res.status(200).json({ message: 'Lifts stored successfully!' });
//   });
// });
app.post('/api/store-lifts', (req, res) => {
  const { lifts, location, site_location, building_name, pincode } = req.body;
  const { latitude, longitude } = location;
  const radius = 1; // 1km radius
  
  // Normalize input values (trim spaces and convert to lowercase)
  const normalizedSiteLocation = site_location.trim().toLowerCase();
  const normalizedBuildingName = building_name.trim().toLowerCase();
  const normalizedPincode = pincode.trim();

  // Check if the location is within the radius
  db1.query(`SELECT * FROM lift_locations WHERE latitude IS NOT NULL AND longitude IS NOT NULL`, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const existingLifts = new Set();
    let isWithinRadius = false;

    result.forEach(record => {
      // Normalize existing record values for comparison
      const normalizedRecordLocation = record.location.trim().toLowerCase();
      const normalizedRecordBuildingName = record.building_name.trim().toLowerCase();
      const normalizedRecordPincode = record.pincode.trim();
      const distance = calculateDistance(latitude, longitude, record.latitude, record.longitude);

      // Check for case-insensitive and space-insensitive matching
      if (distance <= radius && 
          normalizedRecordPincode === normalizedPincode && 
          normalizedRecordLocation === normalizedSiteLocation && 
          normalizedRecordBuildingName === normalizedBuildingName) {
        isWithinRadius = true;
        existingLifts.add(record.lift_name.trim().toLowerCase()); // Store already inspected lifts (case-insensitive)
      }
    });

    // Insert only new lifts (those not already inspected within the radius)
    lifts.forEach(lift => {
      const normalizedLift = lift.trim().toLowerCase();
      if (!existingLifts.has(normalizedLift)) {
        db1.query(
          `INSERT INTO lift_locations (lift_name, latitude, longitude, location, building_name, pincode) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [lift.trim(), latitude, longitude, site_location.trim(), building_name.trim(), pincode.trim()],
          (err, result) => {
            if (err) {
              console.error('Error inserting lift:', err);
              return res.status(500).json({ error: err.message });
            }
          }
        );
      }
    });

    return res.status(200).json({ message: 'Lifts stored successfully!' });
  });
});

// app.get('/api/get-lift-locations', (req, res) => {
//   db1.query(`SELECT lift_name, latitude, longitude, location AS site_location, building_name, pincode FROM lift_locations`, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     return res.status(200).json(result);
//   });
// });
app.get('/api/get-lift-locations', (req, res) => {
  db1.query('SELECT lift_name, latitude, longitude FROM lift_locations', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


//mugesh - krishnan dashboard








app.get('/api/fetch-unit-arrays', (req, res) => {
  const sqlQuery = 'SELECT unit_no FROM unit_details';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      console.log('Query results:', results); // Log the results
      res.json(results);
    }
  });
});




app.get('/api/get-rejected-count', (req, res) => {
  const query = 'SELECT SUM(i_rejected) AS total_rejected FROM inf_26';
  
  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rejected count:', err);
      return res.status(500).send('Server error');
    }
    res.json(results[0]); // Return the first result containing the sum
  });
});


app.get('/api/get-certificate-count', (req, res) => {
  
  const sqlQuery = 'SELECT * FROM uploaded_files';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});




app.get('/api/clientadmin', (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Fetch the user data from the database where the username matches
  const query = `SELECT Username, email, Password, Picture FROM clientadmin WHERE Username = ?`;

  db.query(query, [username], (error, results) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Error fetching data' });
    }

    if (results.length > 0) {
      const user = results[0];
      // Convert BLOB to base64 string
      if (user.Picture) {
        user.Picture = `data:image/jpeg;base64,${user.Picture.toString('base64')}`;
      }
      res.json(user);  // Send back the first match
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});




app.put('/api/update-client', upload.single('picture'), (req, res) => {
  const { Username, email, password } = req.body;
  let pictureData = null;

  if (req.file) {
    pictureData = fs.readFileSync(req.file.path); // Read the file data as a BLOB
  }

  // Validate input
  if (!Username && !email && !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password before storing it
  const saltRounds = 10; // You can adjust the salt rounds as per your requirement
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing the password:', err);
      console.log("hashed password is " , hashedPassword)
      return res.status(500).json({ message: 'Error processing password' });
    }

    // Insert or update user data including the picture BLOB
    const updateQuery = `
      UPDATE clientadmin 
      SET email = ?, Password = ?, Picture = ?
      WHERE Username = ?
    `;

    const params = [email, hashedPassword, pictureData, Username];

    db.query(updateQuery, params, (error, results) => {
      if (error) {                                 
        console.error('Error updating client:', error);
        return res.status(500).json({ message: 'Error updating client' });
      }

      res.json({ message: 'Client updated successfully', data: results });
     

    });
  });
});


app.get('/api/inspection-count-dash', (req, res) => {
  const sqlQuery = 'SELECT * FROM unit_details';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});



app.get('/api/inspector-name', (req, res) => {
  const sqlQuery = 'SELECT * FROM inspector_details';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/inspector-name-drop', (req, res) => {
  const query = 'SELECT inspector_name FROM inspector_details';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.inspector_name);
    console.log('1111',results);
    
    res.json(values);
  });
});


// app.get('/api/inspector-name-drop', (req, res) => {
//   const query = 'SELECT inspector_name FROM inspector_details'; // Select the correct column

//   db1.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching values from MySQL:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     // Assuming `inspector_details` is the column with inspector names
//     const values = results.map((row) => row.inspector_name);
//     res.json(values);
//   });
// });




app.get('/api/inspector-name-unit', (req, res) => {
  // const {inspector_name,from_date,to_date}=req.query;
  // console.log(inspector_name,from_date,to_date);
  

//  const sqlQuery = 'SELECT * FROM unit_details WHERE inspector_name=?';
const sqlQuery = `
    SELECT * FROM unit_details`;
    // FROM unit_details 
    // WHERE inspector_name = ? 
    // AND from_date >= ? 
    // AND to_date <= ?`;


 db1.query(sqlQuery,  (err, results) => {
      if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});


app.get('/api/certificate-analysispdf', (req, res) => {
  const sqlQuery = 'SELECT * FROM uploaded_files ';
  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});





// Endpoint to stream PDF files
app.get('/api/certificate-analysis-view/:id', (req, res) => {
  const id = req.params.id;
  
  db1.query('SELECT file_data FROM uploaded_files WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].file_data;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});

app.get('/api/inspector-name-certificate-drop', (req, res) => {
  const query = 'SELECT inspector_name FROM inspector_details';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.inspector_name);
    console.log('1111',results);
    
    res.json(values);
  });
});

app.get('/api/inspector-name-inspection-drop', (req, res) => {
  const query = 'SELECT inspector_name FROM inspector_details';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.inspector_name);
    console.log('1111',results);
    
    res.json(values);
  });
});


app.get('/api/region-drop', (req, res) => {
  const query = 'SELECT region_name FROM region_details';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.region_name);
    console.log('1111',results);
    
    res.json(values);
  });
});



// reportdashview

app.get('/api/report-dashpdf', (req, res) => {
  const encodedValue = req.query.encodedValue;

  const sqlQuery = 'SELECT id, contract, document_id, building_name, inspector_name,unit_name FROM report_files where contract=?';

  db1.query(sqlQuery,[encodedValue], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});



// Endpoint to stream PDF files
app.get('/api/reportdashdown/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT file_data FROM report_files WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].file_data;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});



// certificatedashview

app.get('/api/certificate-dashpdf', (req, res) => {
  const encodedValue = req.query.encodedValue;

  const sqlQuery = 'SELECT id, contract, document_id, building_name, inspector_name FROM uploaded_files where contract=?';

  db1.query(sqlQuery,[encodedValue], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});



// Endpoint to stream PDF files
app.get('/api/certificatedashdown/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT file_data FROM uploaded_files WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].file_data;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});


// wccdashview

app.get('/api/pdf-storage', (req, res) => {
  const encodedValue = req.query.encodedValue;

  const sqlQuery = 'SELECT * FROM pdf_storage where contract_no=?';

  db1.query(sqlQuery,[encodedValue], (err, results) => {
      if (err) {
          console.error('Error fetching data from pdf_storage:', err);
          res.status(500).json({ error: 'Failed to fetch data' });
      } else {
          res.status(200).json(results);
      }
  });
});


// Endpoint to stream PDF files
app.get('/api/pdf/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT pdf_content FROM pdf_storage WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].pdf_content;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});







// keyabstractdashview

app.get('/api/keyabstract-dashpdf', (req, res) => {
  const encodedValue = req.query.encodedValue;

  const sqlQuery = 'SELECT * FROM keyabstract_pdf where contract=?';

  db1.query(sqlQuery,[encodedValue], (err, results) => {
      if (err) {
          console.error('Error fetching data from keyabstract_pdf:', err);
          res.status(500).json({ error: 'Failed to fetch data' });
      } else {
          res.status(200).json(results);
      }
  });
});


// Endpoint to stream PDF files
app.get('/api/keyabstractdashdown/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT pdf_data FROM keyabstract_pdf WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].pdf_data;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});

//from sabari
app.get('/api/get_desccount',(request,response)=>{

 
  db1.query('SELECT Parts, COUNT(Description) AS description_count FROM inspection_master GROUP BY Parts',  (error, result) => {


    if( result)
    {
     return response.json(result)
    }
  });

})

//prasanna


app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
  const pdfFile = req.file;

  if (!pdfFile) {
    return res.status(400).send('No file uploaded');
  }

  const fileSizeInBytes = pdfFile.size;
  console.log(`File size: ${fileSizeInBytes} bytes`);

  if (!fs.existsSync(pdfFile.path)) {
    return res.status(400).send('Uploaded file does not exist');
  }

  // Read the uploaded file
  fs.readFile(pdfFile.path, (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading the uploaded file');
    }

    // Extract additional data from the request body
    const { inspector_name, building_name, unit_name, document_id, report_id, contract,customer_mail,customer_mobile ,customer_name,project_name} = req.body;
    console.log('customer mobile',customer_mobile);
    
    const Order_unit_str = Array.isArray(unit_name) ? unit_name.join(', ') : unit_name;

    // Check if a record with the same values already exists
    const selectSql = `
      SELECT COUNT(*) AS count FROM report_files 
      WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?`;
    
    db1.query(selectSql, [Order_unit_str, document_id, building_name, contract, inspector_name], (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error checking existing record:', selectErr);
        return res.status(500).json({ error: 'Error checking existing record.' });
      }

      const count = selectResult[0].count;

      // Function to insert the new record
      function insertNewRecord() {
        const insertSql = `
          INSERT INTO report_files 
          (inspector_name, building_name, unit_name, document_id, report_id, file_data, uploaded_at, contract,customer_mobile,customer_mail,customer_name,project_name) 
          VALUES (?, ?, ?, ?, ?, ?, NOW(), ?,?,?,?,?)`;

        const values = [inspector_name, building_name, Order_unit_str, document_id, report_id, data, contract,customer_mobile,customer_mail,customer_name,project_name];

        db1.query(insertSql, values, (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error storing PDF in the database:', insertErr);
            return res.status(500).send('Error storing PDF in the database');
          }

          console.log('PDF stored successfully, size:', fileSizeInBytes);
          res.json({ message: 'PDF stored successfully', insertId: insertResult.insertId });
        });
      }

      if (count > 0) {
        // If a record exists, delete it first
        const deleteSql = `
          DELETE FROM report_files 
          WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ? AND reject=?`;
        
        db1.query(deleteSql, [Order_unit_str, document_id, building_name, contract, inspector_name,0], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error('Error deleting existing record:', deleteErr);
            return res.status(500).json({ error: 'Error deleting existing record.' });
          }

          console.log('Existing record deleted.');
          // Insert the new record after deletion
          insertNewRecord();
        });
      } else {
        // If no record exists, insert the new one directly
        insertNewRecord();
      }
    });
  });
});




//////////////retrive the stored report in database/////////////////
app.get('/reports/:id', (req, res) => {
  const pdfId = req.params.id;

  // Update this SQL to match your actual table structure
  const sql = 'SELECT file_data FROM report_files WHERE id = ?'; 

  db1.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error retrieving PDF from the database:', err);
      return res.status(500).send('Error retrieving PDF');
    }

    if (result.length > 0) {
      res.contentType('application/pdf');
      res.send(result[0].file_data);  // Ensure this matches the column name
    } else {
      res.status(404).send('PDF not found');
    }
  });
});

app.post('/api/generate-certificate1', async (req, res) => {
  const htmlContent = req.body.htmlContent;
  const { unit, document_id, contract, building_name, inspector_name ,project_name,region,location} = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Intercept requests to ensure images are handled
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        request.continue();
      } else {
        request.continue();
      }
    });

    // Set content and wait for all images to load
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Wait for all images to load
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close Puppeteer browser
    await browser.close();

    // Save PDF to MySQL database
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    try {
      // Check if record exists
      const selectSql = 'SELECT COUNT(*) AS count FROM uploaded_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
      const [selectResult] = await connection.query(selectSql, [unit, document_id, building_name, contract, inspector_name]);
      const count = selectResult[0].count;

      if (count > 0) {
        // If a record exists, delete it
        const deleteSql = 'DELETE FROM uploaded_files WHERE unit_name = ? AND document_id = ? AND building_name = ? AND contract = ? AND inspector_name = ?';
        await connection.query(deleteSql, [unit, document_id, building_name, contract, inspector_name]);
        console.log('Existing record deleted.');
      }

      // Insert new record
      const insertSql = 'INSERT INTO uploaded_files (project_name,region,location,file_data, inspector_name, building_name, unit_name, document_id, contract) VALUES (?,?,?,?, ?, ?, ?, ?, ?)';
      const [insertResult] = await connection.query(insertSql, [project_name,region,location,pdfBuffer, inspector_name, building_name, unit, document_id, contract]);
      const insertId = insertResult.insertId;

      // Respond with the PDF buffer
      res.status(200).send(pdfBuffer);
    } catch (error) {
      console.error('Error querying or inserting into database:', error);
      res.status(500).json({ error: 'Failed to query or insert into database.' });
    } finally {
      await connection.release();
      await pool.end();
    }
  } catch (error) {
    console.error('Error generating PDF and saving to database:', error);
    res.status(500).json({ error: 'Failed to generate PDF and save to database.' });
  }
});



// Endpoint to retrieve PDF by ID
app.get('/get-pdf1/:id', async (req, res) => {
  const pdfId = req.params.id;

  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    try {
      const sql = 'SELECT pdf_content FROM pdf_documents WHERE id = ?';
      const [rows] = await connection.query(sql, [pdfId]);

      if (rows.length > 0) {
        const pdfBuffer = rows[0].pdf_content; // Make sure the column name matches
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=Certificate.pdf'); // Sets the default filename for the PDF
        res.send(pdfBuffer);
      } else {
        res.status(404).send('PDF not found');
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Error fetching PDF: ' + error.message); // Send detailed error message
  }
});


//prasanna shutdown
// app.post('/api/shutdown_pdf', (req, res) => {
//   const { content, building_name, contract_no, documentId, inspector_name } = req.body;

//   if (!content) {
//     return res.status(400).json({ message: 'No HTML content provided' });
//   }

//   // Generate PDF from HTML content using html-pdf
//   const options = { format: 'portrait' }; // PDF generation options
//   pdf.create(content, options).toBuffer((err, buffer) => {
//     if (err) {
//       console.error('Error generating PDF:', err);
//       return res.status(500).json({ message: 'Error generating PDF' });
//     }

//     // Extract file data and other information
//     const fileData = buffer;  // The PDF buffer generated from HTML
//     const uploadTime = new Date();

//     // SQL query to insert the PDF along with additional data fields into the database
//     const query = `
//       INSERT INTO shutdown_notice (shutdown_pdf, building_name, contract_no, document_id, inspector_name, upload_time)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     // Store the PDF and additional fields (building_name, contract_no, documentId, inspector_name)
//     db1.query(query, [fileData, building_name, contract_no, documentId, inspector_name, uploadTime], (err, result) => {
//       if (err) {
//         console.error('Error storing file in database:', err);
//         return res.status(500).json({ message: 'Error storing PDF in database' });
//       }

//       // Respond with success message and the inserted ID
//       return res.status(200).json({ message: 'PDF generated and uploaded successfully', id: result.insertId });
//     });
//   });
// });



// app.post('/api/shutdown_pdf', (req, res) => {
//   const { content, building_name, contract_no, documentId, inspector_name } = req.body;

//   if (!content) {
//     return res.status(400).json({ message: 'No HTML content provided' });
//   }

//   // Generate PDF from HTML content using html-pdf
//   const options = { format: 'portrait' }; // PDF generation options
//   pdf.create(content, options).toBuffer((err, buffer) => {
//     if (err) {
//       console.error('Error generating PDF:', err);
//       return res.status(500).json({ message: 'Error generating PDF' });
//     }

//     // Extract file data and other information
//     const fileData = buffer; // The PDF buffer generated from HTML
//     const uploadTime = new Date();

//     // SQL query to check if a record with the same key fields exists
//     const checkQuery = `
//       SELECT COUNT(*) AS count FROM shutdown_notice 
//       WHERE building_name = ? AND contract_no = ? AND document_id = ? AND inspector_name = ?
//     `;

//     // Perform the check for an existing record
//     db1.query(checkQuery, [building_name, contract_no, documentId, inspector_name], (checkErr, checkResult) => {
//       if (checkErr) {
//         console.error('Error checking for existing record:', checkErr);
//         return res.status(500).json({ message: 'Error checking for existing record' });
//       }

//       const recordCount = checkResult[0].count;

//       if (recordCount > 0) {
//         // If a record exists, delete the old one before inserting the new PDF
//         const deleteQuery = `
//           DELETE FROM shutdown_notice 
//           WHERE building_name = ? AND contract_no = ? AND document_id = ? AND inspector_name = ?
//         `;

//         db1.query(deleteQuery, [building_name, contract_no, documentId, inspector_name], (deleteErr, deleteResult) => {
//           if (deleteErr) {
//             console.error('Error deleting existing record:', deleteErr);
//             return res.status(500).json({ message: 'Error deleting existing record' });
//           }

//           console.log('Existing record deleted');
//           // Insert the new record after deleting the old one
//           insertNewRecord();
//         });
//       } else {
//         // If no record exists, insert the new one directly
//         insertNewRecord();
//       }

//       function insertNewRecord() {
//         // SQL query to insert the PDF and additional fields into the database
//         const insertQuery = `
//           INSERT INTO shutdown_notice 
//           (shutdown_pdf, building_name, contract_no, document_id, inspector_name, upload_time)
//           VALUES (?, ?, ?, ?, ?, ?)
//         `;

//         db1.query(insertQuery, [fileData, building_name, contract_no, documentId, inspector_name, uploadTime], (insertErr, insertResult) => {
//           if (insertErr) {
//             console.error('Error storing file in database:', insertErr);
//             return res.status(500).json({ message: 'Error storing PDF in database' });
//           }

//           console.log('PDF stored successfully, inserted ID:', insertResult.insertId);
//           // Respond with success message and the inserted ID
//           return res.status(200).json({ message: 'PDF generated and uploaded successfully', id: insertResult.insertId });
//         });
//       }
//     });
//   });
// });


app.post('/api/shutdown_pdf', async (req, res) => {
  const { content, building_name, contract_no, documentId, inspector_name } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'No HTML content provided' });
  }

  try {
    // Launch Puppeteer browser
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
    const page = await browser.newPage();

    // Set HTML content for the page
    await page.setContent(content);

    // Generate PDF
    const buffer = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();

    const uploadTime = new Date();

    // SQL query to check if a record with the same key fields exists
    const checkQuery = `
      SELECT COUNT(*) AS count FROM shutdown_notice 
      WHERE building_name = ? AND contract_no = ? AND document_id = ? AND inspector_name = ?
    `;

    // Perform the check for an existing record
    db1.query(checkQuery, [building_name, contract_no, documentId, inspector_name], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking for existing record:', checkErr);
        return res.status(500).json({ message: 'Error checking for existing record' });
      }

      const recordCount = checkResult[0].count;

      if (recordCount > 0) {
        // If a record exists, delete the old one before inserting the new PDF
        const deleteQuery = `
          DELETE FROM shutdown_notice 
          WHERE building_name = ? AND contract_no = ? AND document_id = ? AND inspector_name = ?
        `;

        db1.query(deleteQuery, [building_name, contract_no, documentId, inspector_name], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error('Error deleting existing record:', deleteErr);
            return res.status(500).json({ message: 'Error deleting existing record' });
          }

          console.log('Existing record deleted');
          // Insert the new record after deleting the old one
          insertNewRecord(buffer);
        });
      } else {
        // If no record exists, insert the new one directly
        insertNewRecord(buffer);
      }

      function insertNewRecord(fileData) {
        // SQL query to insert the PDF and additional fields into the database
        const insertQuery = `
          INSERT INTO shutdown_notice 
          (shutdown_pdf, building_name, contract_no, document_id, inspector_name, upload_time)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db1.query(insertQuery, [fileData, building_name, contract_no, documentId, inspector_name, uploadTime], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error storing file in database:', insertErr);
            return res.status(500).json({ message: 'Error storing PDF in database' });
          }

          console.log('PDF stored successfully, inserted ID:', insertResult.insertId);
          // Respond with success message and the inserted ID
          return res.status(200).json({ message: 'PDF generated and uploaded successfully', id: insertResult.insertId });
        });
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ message: 'Error generating PDF' });
  }
});
// Route to retrieve the PDF from the database
app.get('/api/view_shutdown_pdf/:id', (req, res) => {
  const pdfId = req.params.id;

  const query = 'SELECT shutdown_pdf FROM shutdown_notice WHERE id = ?';
  db1.query(query, [pdfId], (err, result) => {
    if (err) {
      console.error('Error retrieving PDF from database:', err);
      return res.status(500).json({ message: 'Error retrieving PDF' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Send the PDF as a response with the correct headers
    const fileData = result[0].shutdown_pdf;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="shutdown_notice.pdf"');
    res.send(fileData); // Send the PDF buffer directly to the client
  });
});


//prabu excel
db2.query(`
  CREATE TABLE IF NOT EXISTS excel_upload_metadata (
      id INT AUTO_INCREMENT PRIMARY KEY,
      last_sub_product_id INT NOT NULL,
      table_name VARCHAR(255) NOT NULL,
      file_data LONGBLOB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
      console.error("Error creating metadata table:", err);
  }
});






app.post('/api/upload-excel', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const lastSubProductId = req.body.lastSubProductId;

  if (!req.file) {
      return res.status(400).send("No file uploaded.");
  }

  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  if (rows.length === 0) {
      return res.status(400).send("No data found in the uploaded file.");
  }

  const tableName = `excel_data_${lastSubProductId}`;

  // Step 1: Drop the table if it exists
  const dropTableSQL = `DROP TABLE IF EXISTS ${tableName}`;
  db2.query(dropTableSQL, (err) => {
      if (err) {
          console.error("Error dropping existing table:", err);
          return res.status(500).send("Failed to drop existing table");
      }

      // Step 2: Create a new table
      let createTableSQL = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY`;
      Object.keys(rows[0]).forEach((col) => {
          createTableSQL += `, \`${col}\` VARCHAR(255)`;
      });
      createTableSQL += ");";

      db2.query(createTableSQL, (err) => {
          if (err) {
              console.error("Error creating table:", err);
              return res.status(500).send("Table creation failed");
          }

          // Step 3: Insert rows into the new table
          const insertPromises = rows.map((row) => {
              const columns = Object.keys(row).map((col) => `\`${col}\``).join(', ');
              const placeholders = Object.values(row).map(() => '?').join(', ');
              const insertSQL = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

              return new Promise((resolve, reject) => {
                  db2.query(insertSQL, Object.values(row), (err) => {
                      if (err) {
                          console.error("Error inserting data:", err);
                          return reject(err);
                      }
                      resolve();
                  });
              });
          });

          Promise.all(insertPromises)
              .then(() => {
                  const fileData = fs.readFileSync(filePath);

                  // Step 4: Delete existing metadata for this `lastSubProductId`
                  const deleteMetadataSQL = "DELETE FROM excel_upload_metadata WHERE last_sub_product_id = ?";
                  db2.query(deleteMetadataSQL, [lastSubProductId], (err) => {
                      if (err) {
                          console.error("Error deleting metadata:", err);
                          return res.status(500).send("Metadata deletion failed");
                      }

                      // Step 5: Insert new metadata
                      const metadataSQL = "INSERT INTO excel_upload_metadata (last_sub_product_id, table_name, file_data) VALUES (?, ?, ?)";
                      db2.query(metadataSQL, [lastSubProductId, tableName, fileData], (err) => {
                          if (err) {
                              console.error("Error updating metadata:", err);
                              return res.status(500).send("Metadata update failed");
                          }

                          fs.unlink(filePath, (err) => {
                              if (err) console.error("Error deleting file:", err);
                          });
                          res.send("File uploaded, data inserted, and metadata updated successfully.");
                      });
                  });
              })
              .catch((err) => {
                  console.error("Error inserting rows:", err);
                  res.status(500).send("Data insertion failed");
              });
      });
  });
});

app.get('/api/last-sub-product-master', (req, res) => {
  const sql = 'SELECT * FROM last_sub_product_master'; // Adjust this query if necessary
  db2.query(sql, (err, results) => {
      if (err) {
          console.error("Error retrieving last sub product master:", err);
          return res.status(500).send("Error retrieving data");
      }
      res.json(results);
  });
});

// Get excel upload metadata
app.get('/api/excel-upload-metadata', (req, res) => {
  const sql = 'SELECT * FROM excel_upload_metadata'; // Adjust this query if necessary
  db2.query(sql, (err, results) => {
      if (err) {
          console.error("Error retrieving excel upload metadata:", err);
          return res.status(500).send("Error retrieving data");
      }
      res.json(results);
  });
});

// Update upload metadata
app.put('/api/excel-upload-metadata/:id', (req, res) => {
  const { id } = req.params;
  const { lastSubProductId, tableName } = req.body;

  const sql = `UPDATE excel_upload_metadata SET last_sub_product_id = ?, table_name = ? WHERE id = ?`;
  db2.query(sql, [lastSubProductId, tableName, id], (err) => {
      if (err) {
          console.error("Error updating metadata:", err);
          return res.status(500).send("Error updating metadata");
      }
      res.send("Metadata updated successfully.");
  });
});

// Delete upload metadata
app.delete('/api/excel-upload-metadata/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM excel_upload_metadata WHERE id = ?`;
  db2.query(sql, [id], (err) => {
      if (err) {
          console.error("Error deleting metadata:", err);
          return res.status(500).send("Error deleting metadata");
      }
      res.send("Metadata deleted successfully.");
  });
});





app.post('/api/get-phone-numbers', (req, res) => {
  const inspectors = req.body;
  const conditions = inspectors.map(inspector => `(name = '${inspector.name}' AND inspector_code = '${inspector.code}')`);
  const query = `SELECT name,email, phone_number FROM inspectors WHERE ${conditions.join(' OR ')}`;

  db1.query(query, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.json(results);
    }
  });
});



//inspection master crud
app.post('/api/organization', (req, res) => {
  const { organization_name } = req.body;
  const query = 'INSERT INTO organization_master (organization_name) VALUES (?)';
  db2.query(query, [organization_name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Organization created' });
  });
});

app.get('/api/organization', (req, res) => {
  db2.query('SELECT * FROM organization_master', (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Print the error to the console for debugging
      return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
    res.json(results);
  });
});


app.put('/api/organization/:id', (req, res) => {
  const { id } = req.params;
  const { organization_name } = req.body;
  const query = 'UPDATE organization_master SET organization_name = ? WHERE id = ?';
  db2.query(query, [organization_name, id], (err, result) => {
    if (err){
      console.log('error is',err);
      
      return res.status(500).json({ error: err.message });

    } 
    res.json({ message: 'Organization updated' });
  });
});

app.delete('/api/organization/:id', (req, res) => {
  const { id } = req.params;
  db2.query('DELETE FROM organization_master WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Organization deleted' });
  });
});

// Type Master API
app.post('/api/type', (req, res) => {
  const { type_name, organization_id } = req.body;
  const query = 'INSERT INTO type_master (type_name, organization_id) VALUES (?, ?)';
  db2.query(query, [type_name, organization_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Type created' });
  });
});

app.get('/api/type', (req, res) => {
  db2.query('SELECT * FROM type_master', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/type/:id', (req, res) => {
  const { id } = req.params;
  const { type_name, organization_id } = req.body;
  const query = 'UPDATE type_master SET type_name = ?, organization_id = ? WHERE id = ?';
  db2.query(query, [type_name, organization_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Type updated' });
  });
});

app.delete('/api/type/:id', (req, res) => {
  const { id } = req.params;
  db2.query('DELETE FROM type_master WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Type deleted' });
  });
});

// Product Master API
app.post('/api/product', (req, res) => {
  const { product_name, type_id } = req.body;
  const query = 'INSERT INTO product_master (product_name, type_id) VALUES (?, ?)';
  db2.query(query, [product_name, type_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Product created' });
  });
});

app.get('/api/product', (req, res) => {
  db2.query('SELECT * FROM product_master', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/product/:id', (req, res) => {
  const { id } = req.params;
  const { product_name, type_id } = req.body;
  const query = 'UPDATE product_master SET product_name = ?, type_id = ? WHERE id = ?';
  db2.query(query, [product_name, type_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product updated' });
  });
});

app.delete('/api/product/:id', (req, res) => {
  const { id } = req.params;
  db2.query('DELETE FROM product_master WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product deleted' });
  });
});

// Sub Product Master API
app.post('/api/subproduct', (req, res) => {
  const { sub_product_name, product_id } = req.body;
  const query = 'INSERT INTO sub_product_master (sub_product_name, product_id) VALUES (?, ?)';
  db2.query(query, [sub_product_name, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Sub Product created' });
  });
});

app.get('/api/subproduct', (req, res) => {
  db2.query('SELECT * FROM sub_product_master', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/subproduct/:id', (req, res) => {
  const { id } = req.params;
  const { sub_product_name, product_id } = req.body;
  const query = 'UPDATE sub_product_master SET sub_product_name = ?, product_id = ? WHERE id = ?';
  db2.query(query, [sub_product_name, product_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Sub Product updated' });
  });
});

app.delete('/api/subproduct/:id', (req, res) => {
  const { id } = req.params;
  db2.query('DELETE FROM sub_product_master WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Sub Product deleted' });
  });
});

// Last Sub Product Master API
app.post('/api/lastsubproduct', (req, res) => {
  const { last_sub_product_name, sub_product_id } = req.body;
  const query = 'INSERT INTO last_sub_product_master (last_sub_product_name, sub_product_id) VALUES (?, ?)';
  db2.query(query, [last_sub_product_name, sub_product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Last Sub Product created' });
  });
});

app.get('/api/lastsubproduct', (req, res) => {
  db2.query('SELECT * FROM last_sub_product_master', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/lastsubproduct/:id', (req, res) => {
  const { id } = req.params;
  const { last_sub_product_name, sub_product_id } = req.body;
  const query = 'UPDATE last_sub_product_master SET last_sub_product_name = ?, sub_product_id = ? WHERE id = ?';
  db2.query(query, [last_sub_product_name, sub_product_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Last Sub Product updated' });
  });
});

app.delete('/api/lastsubproduct/:id', (req, res) => {
  const { id } = req.params;
  db2.query('DELETE FROM last_sub_product_master WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Last Sub Product deleted' });
  });
});

// Excel Upload Metadata API
app.post('/api/excelmetadata', (req, res) => {
  const { metadata } = req.body; // assuming metadata is an object
  const query = 'INSERT INTO excel_upload_metadata (metadata) VALUES (?)';
  db2.query(query, [JSON.stringify(metadata)], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Excel Metadata created' });
  });
});

app.get('/api/excelmetadata', (req, res) => {
  db2.query('SELECT * FROM excel_upload_metadata', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/excelmetadata/:id', (req, res) => {
  const { id } = req.params;
  const { metadata } = req.body; // assuming metadata is an object
  const query = 'UPDATE excel_upload_metadata SET metadata = ? WHERE id = ?';
  db2.query(query, [JSON.stringify(metadata), id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Excel Metadata updated' });
  });
});

app.delete('/api/excelmetadata/:id', (req, res) => {
  const { id } = req.params;
  db2.query('DELETE FROM excel_upload_metadata WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Excel Metadata deleted' });
  });
});



app.get('/api/reports_fetch', async (req, res) => {
  try {
    const [rows] = await db_promise.execute('SELECT * FROM report_files');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving records');
  }
});

app.post('/api/reports/send-whatsapp/:documentId', async (req, res) => {
  const { documentId } = req.params;
  try {
    const [rows] = await db_promise.execute(
      'SELECT customer_mobile, file_data FROM report_files WHERE document_id = ?',
      [documentId]
    );
    if (rows.length === 0) {
      return res.status(404).send('Record not found');
    }

    const { customer_mobile, file_data } = rows[0];
    const pdfBase64 = Buffer.from(file_data, 'binary').toString('base64');

    const message = await client.messages.create({
      body: 'Hello, here is the inspection report you requested.',
      from: twilioPhoneNumber1,
      to: `whatsapp:+${customer_mobile}`,
      // mediaUrl: `data:application/pdf;base64,${pdfBase64}`
    });

    console.log('WhatsApp message sent:', message.sid);
    res.send('WhatsApp message sent successfully');
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).send('Failed to send WhatsApp message');
  }
});

//send mail
app.post('/send-email', async (req, res) => {
  const { documentId, clientContactName, projectName } = req.body; // Expecting documentId, clientContactName, and projectName in request body

  try {
    // Fetch file data and email addresses based on documentId
    const [rows] = await db1.promise().execute(
      `SELECT customer_mail, file_data FROM report_files WHERE document_id = ?`,
      [documentId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No document found with that ID.' });
    }

    const { customer_mail, file_data } = rows[0];

    // Handle multiple email addresses separated by commas
    const recipients = customer_mail.split(',').map(email => email.trim());

    // Get transporter credentials
    const transporterData = await TransporterData();

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: transporterData.user,
        pass: transporterData.pass,
      },
    });

    // Custom email message
    const emailContent = `
      Dear Sir/Madam,<br><br>
      Greetings from PAPL!!!<br><br>
      Kind attention ${clientContactName}. <br><br>
      Please find attached the Lift inspection detailed report of ${projectName}. Kindly share these with the Vendor and ensure all snags in the report are addressed.<br><br>
      Closeout report from the Vendor may be shared with us on priority.<br><br>
      Regards,<br>
      PAPL Team
    `;

    // Send email
    const mailOptions = {
      from: transporterData.user,
      to: recipients, // Sends email to all addresses
      subject: 'Inspection Report',
      html: emailContent, // Custom email HTML body
      attachments: [
        {
          filename: 'report.pdf',
          content: file_data,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully to all recipients.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});


// app.post('/send-email', async (req, res) => {
//   const { documentId } = req.body; // Expecting documentId in request body

//   try {
//     // Create an array to store the attachments
//     const attachments = [];

//     // Fetch PDFs from multiple tables based on documentId

//     // 1. Fetch from report_files
//     const [reportRows] = await db1.promise().execute(
//       `SELECT customer_mail, file_data FROM report_files WHERE document_id = ?`,
//       [documentId]
//     );

//     if (reportRows.length > 0) {
//       const { customer_mail, file_data } = reportRows[0];
//       attachments.push({
//         filename: 'report.pdf', // You can adjust this filename as needed
//         content: file_data,
//         contentType: 'application/pdf',
//       });
//     } else {
//       return res.status(404).json({ message: 'No document found in report_files.' });
//     }

//     // 2. Fetch from uploaded_files
//     const [uploadedFilesRows] = await db1.promise().execute(
//       `SELECT file_data FROM uploaded_files WHERE document_id = ?`,
//       [documentId]
//     );

//     for (const row of uploadedFilesRows) {
//       attachments.push({
//         filename: 'uploaded_file.pdf', // Change to a unique name or derive from data
//         content: row.file_data,
//         contentType: 'application/pdf',
//       });
//     }

//     // 3. Fetch from shutdown_notice
//     const [shutdownNoticeRows] = await db1.promise().execute(
//       `SELECT shutdown_pdf AS file_data FROM shutdown_notice WHERE document_id = ?`,
//       [documentId]
//     );

//     for (const row of shutdownNoticeRows) {
//       attachments.push({
//         filename: 'shutdown_notice.pdf', // Change to a unique name or derive from data
//         content: row.file_data,
//         contentType: 'application/pdf',
//       });
//     }

//     // 4. Fetch from keyabstract_pdf
//     const [keyAbstractRows] = await db1.promise().execute(
//       `SELECT pdf_data AS file_data FROM keyabstract_pdf WHERE document_id = ?`,
//       [documentId]
//     );

//     for (const row of keyAbstractRows) {
//       attachments.push({
//         filename: 'keyabstract.pdf', // Change to a unique name or derive from data
//         content: row.file_data,
//         contentType: 'application/pdf',
//       });
//     }

//     // 5. Fetch from pdf_storage
//     const [pdfStorageRows] = await db1.promise().execute(
//       `SELECT pdf_content AS file_data FROM pdf_storage WHERE documentId = ?`,
//       [documentId]
//     );

//     for (const row of pdfStorageRows) {
//       attachments.push({
//         filename: 'pdf_storage.pdf', // Change to a unique name or derive from data
//         content: row.file_data,
//         contentType: 'application/pdf',
//       });
//     }

//     // Ensure at least one attachment was found
//     if (attachments.length === 0) {
//       return res.status(404).json({ message: 'No PDFs found for the given document ID.' });
//     }

//     // Get transporter credentials
//     const transporterData = await TransporterData();

//     // Nodemailer configuration
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // Use your email provider
//       auth: {
//         user: transporterData.user, // Email from the transporter data
//         pass: transporterData.pass, // App password from the transporter data
//       },
//     });

//     // Send email
//     const mailOptions = {
//       from: transporterData.user, // Sender address
//       to: reportRows[0].customer_mail, // Recipient address from the first query
//       subject: 'Inspection Report', // Subject line
//       text: 'Hello, here are the inspection reports you requested.', // Plain text body
//       attachments: attachments, // Attach all fetched PDFs
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully.' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ message: 'Error sending email.', error: error.message });
//   }
// });


app.get('/api/record-values', (req, res) => {
  const { section, document_id, unit_no, inspector_name, description } = req.query;

  // SQL query to get the records from 'record_values'
  const sqlQuery = `
    SELECT * FROM record_values
    WHERE description = ? 
    AND section = ? 
    AND unit_no = ? 
    AND inspector_name = ? 
    AND document_id = ?
  `;

  // Query the database with parameters
  db1.query(sqlQuery, [description, section, unit_no, inspector_name, document_id], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send('Database error');
    }

    // Convert 'img' buffer to base64 string if it exists
    result.forEach(record => {
      if (record.img) {
        // Convert the Buffer to Base64 string
        const imgBase64 = record.img.toString('base64');
        // Append the proper image format (assuming JPEG in this example)
        record.img = `data:image/jpeg;base64,${imgBase64}`;
      }
    });

    // Send the modified records back to the frontend
    res.json(result); 
  });
});





//////////////////crud admin dashboard  prasanna////////////////

// ! oem_details to fetch,update,delete,add details to the db

// Fetch user data

app.get("/oems", (req, res) => {
  db1.query("SELECT * FROM oem_details", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving users");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/oems", (req, res) => {
  const { oem_name, oem_location } = req.body;
  db1.query(
    "INSERT INTO oem_details (oem_name,oem_location) VALUES (?, ?)",
    [oem_name, oem_location],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding user" });
      } else {
        res.status(201).send({ message: "User added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/oems/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM oem_details WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting user" });
      } else {
        res.status(200).send({ message: "User deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/oems/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for OEM:", id, updatedData);

  // Update the OEM in the database (replace this with your database update logic)
  db1.query(
    "UPDATE oem_details SET oem_name = ?, oem_location = ? WHERE id = ?",
    [updatedData.oem_name, updatedData.oem_location, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating OEM");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("OEM not found");
      }
      res.json({ message: "OEM Updated successfully" }); // Send the updated result back
    }
  );
});



// ! inspection_time to fetch,update,delete,add details to the db

app.get("/inspectionTime", (req, res) => {
  db1.query("SELECT * FROM inspection_time", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving users");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/inspectionTime", (req, res) => {
  const { time_shift } = req.body;
  db1.query(
    "INSERT INTO inspection_time (time_shift) VALUES (?)",
    [time_shift],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding user" });
      } else {
        res.status(201).send({ message: "User added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/inspectionTime/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM inspection_time WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting user" });
      } else {
        res.status(200).send({ message: "User deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/inspectionTime/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for OEM:", id, updatedData);

  // Update the OEM in the database (replace this with your database update logic)
  db1.query(
    "UPDATE inspection_time SET time_shift = ? WHERE id = ?",
    [updatedData.time_shift, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating OEM");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("OEM not found");
      }
      res.json({ message: "Inspection Time Updated successfully" }); // Send the updated result back
    }
  );
});





// ! inspector_type to fetch,update,delete,add details to the db

// Fetch user data

app.get("/inspectorType", (req, res) => {
  db1.query("SELECT * FROM inspector_type", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Inspector Type");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/inspectorType", (req, res) => {
  const { inspector_type } = req.body;
  db1.query(
    "INSERT INTO inspector_type (inspector_type) VALUES (?)",
    [inspector_type],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding Inspector Type" });
      } else {
        res.status(201).send({ message: "Inspector Type added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/inspectorType/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM inspector_type WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting Inspector Type" });
      } else {
        res
          .status(200)
          .send({ message: "Inspector Type deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/inspectorType/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for Inspector Type:", id, updatedData);

  // Update the OEM in the database (replace this with your database update logic)
  db1.query(
    "UPDATE inspector_type SET inspector_type = ? WHERE id = ?",
    [updatedData.inspector_type, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Inspector Type");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Inspector Type not found");
      }
      res.json({ message: "Inspector Type Updated successfully" }); // Send the updated result back
    }
  );
});



// ! travel_accom to fetch,update,delete,add details to the db

// Fetch user data

app.get("/travelAccomodation", (req, res) => {
  db1.query("SELECT * FROM travel_accomodation", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Travel Accomodation");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/travelAccomodation", (req, res) => {
  const { type_of } = req.body;
  db1.query(
    "INSERT INTO travel_accomodation (type_of) VALUES (?)",
    [type_of],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding Travel Accomodation" });
      } else {
        res
          .status(201)
          .send({ message: "Travel Accomodation added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/travelAccomodation/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM travel_accomodation WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting Travel Accomodation" });
      } else {
        res
          .status(200)
          .send({ message: "Travel Accomodation deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/travelAccomodation/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for Travel Accomodation:", id, updatedData);

  // Update the OEM in the database (replace this with your database update logic)
  db1.query(
    "UPDATE travel_accomodation SET type_of = ? WHERE id = ?",
    [updatedData.type_of, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Travel Accomodation");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Travel Accomodation not found");
      }
      res.json({ message: "Travel Accomodation Updated successfully" }); // Send the updated result back
    }
  );
});



// ! inspection_time_shift to fetch,update,delete,add details to the db

// Fetch user data

app.get("/inspectionTimeShift", (req, res) => {
  db1.query("SELECT * FROM inspection_time_ins", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Inspection Time Shift");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/inspectionTimeShift", (req, res) => {
  const { inspection_time } = req.body;
  db1.query(
    "INSERT INTO inspection_time_ins (inspection_time) VALUES (?)",
    [inspection_time],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding Inspection Time Shift" });
      } else {
        res
          .status(201)
          .send({ message: "Inspection Time Shift added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/inspectionTimeShift/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM inspection_time_ins WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting Inspection Time" });
      } else {
        res
          .status(200)
          .send({ message: "Inspection Time deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/inspectionTimeShift/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for Inspection Time Shift:", id, updatedData);

  // Update the inspection_time in the database
  db1.query(
    "UPDATE inspection_time_ins SET inspection_time = ? WHERE id = ?",
    [updatedData.inspection_time, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Inspection Time Shift");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Inspection Time Shift not found");
      }
      res.json({ message: "Inspection Time Shift Updated successfully" }); // Send the updated result back
    }
  );
});



// ! inspection_type to fetch,update,delete,add details to the db

// Fetch user data

app.get("/inspectionType", (req, res) => {
  db1.query("SELECT * FROM inspection_type", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Inspection Type");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/inspectionType", (req, res) => {
  const { inspection_name } = req.body;
  db1.query(
    "INSERT INTO inspection_type (inspection_name) VALUES (?)",
    [inspection_name],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding Inspection Type" });
      } else {
        res.status(201).send({ message: "Inspection Type added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/inspectionType/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM inspection_type WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting Inspection Type" });
      } else {
        res
          .status(200)
          .send({ message: "Inspection Type deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/inspectionType/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for Inspection Type :", id, updatedData);

  // Update the inspection_time in the database
  db1.query(
    "UPDATE inspection_type SET inspection_name = ? WHERE id = ?",
    [updatedData.inspection_name, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Inspection Type");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Inspection Type not found");
      }
      res.json({ message: "Inspection Type Updated successfully" }); // Send the updated result back
    }
  );
});



// ! type_of_building to fetch,update,delete,add details to the db

// Fetch user data

app.get("/typeOfBuilding", (req, res) => {
  db1.query("SELECT * FROM type_of_building", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Type of Building");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/typeOfBuilding", (req, res) => {
  const { building_name } = req.body;
  db1.query(
    "INSERT INTO type_of_building (building_name) VALUES (?)",
    [building_name],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding Type of Building" });
      } else {
        res
          .status(201)
          .send({ message: "Type of Building added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/typeOfBuilding/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM type_of_building WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting Type of Building" });
      } else {
        res
          .status(200)
          .send({ message: "Type of Building deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/typeOfBuilding/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for Type of Building :", id, updatedData);

  // Update the inspection_time in the database
  db1.query(
    "UPDATE type_of_building SET building_name = ? WHERE id = ?",
    [updatedData.building_name, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Type of Building");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Type of Building not found");
      }
      res.json({ message: "Type of Building Updated successfully" }); // Send the updated result back
    }
  );
});


// ! region_details to fetch,update,delete,add details to the db

// Fetch user data

app.get("/regionDetails", (req, res) => {
  db1.query("SELECT * FROM region_details", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Region Details");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/regionDetails", (req, res) => {
  const { region_name } = req.body;
  db1.query(
    "INSERT INTO region_details (region_name) VALUES (?)",
    [region_name],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding Region Details" });
      } else {
        res.status(201).send({ message: "Region Details added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/regionDetails/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM region_details WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting Region Details" });
      } else {
        res
          .status(200)
          .send({ message: "Region Details deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/regionDetails/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Received update for Region Details :", id, updatedData);

  // Update the inspection_time in the database
  db1.query(
    "UPDATE region_details SET region_name = ? WHERE id = ?",
    [updatedData.region_name, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating Region Details");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Region Details not found");
      }
      res.json({ message: "Region Details Updated successfully" }); // Send the updated result back
    }
  );
});


// vendor_masters to fetch,update,delete,add details to the db

// Fetch user data

app.get("/vendors", (req, res) => {
  db1.query("SELECT * FROM vendor_master", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving users");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/vendors", (req, res) => {
  const { vendor_name, alias } = req.body;
  db1.query(
    "INSERT INTO vendor_master (vendor_name,alias) VALUES (?, ?)",
    [vendor_name, alias],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log error message
        res.status(500).send({ message: "Error adding user" });
      } else {
        res.status(201).send({ message: "User added successfully" });
      }
    }
  );
});

// Delete user data

app.delete("/vendors/:id", (req, res) => {
  const userId = req.params.id;
  db1.query(
    "DELETE FROM vendor_master WHERE id = ? ",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting user" });
      } else {
        res.status(200).send({ message: "User deleted successfully" });
      }
    }
  );
});

// Update user data

app.put("/vendors/:id", (req, res) => {
  const userId = req.params.id;
  const { vendor_name, alias } = req.body;

  if (!userId || !vendor_name || !alias) {
    return res.status(400).json({ message: "Invalid data" });
  }

  db1.query(
    "UPDATE vendor_master SET vendor_name = ?, alias = ? WHERE id = ?",
    [vendor_name, alias, userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating user" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});


app.post('/api/insp_check_list_ADD', (req, res) => {
    
  const {  description,
    dropdown,
   parts,
    photo,
    product,
   reference,
   Risklevel,
    functional_point,
    Emergency_Features,
    Customer_Scope,
    MNT_ADJ,
    marks,
    security,
    dropdown_count,
    INF30_Key_Abstract_S_No} = req.body;
console.log(dropdown,
parts,
 photo,
 product,
reference,
Risklevel,
functional_point,
Emergency_Features,
Customer_Scope,
MNT_ADJ,
marks,
security,
dropdown_count,
INF30_Key_Abstract_S_No 
)

  // Construct the SQL query with parameter placeholders
  let sqlQuery ='INSERT INTO inspection_master(Product, Parts, Description, Reference, Risklevel, Photo, dropdown,functional_point,Emergency_Features,Customer_Scope,MNT_ADJ,marks,security,dropdown_count, INF30_Key_Abstract_S_No) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)' ;

  // Use parameterized queries to prevent SQL injection
  db1.query(sqlQuery, [product,parts,description,reference,Risklevel,photo,dropdown,functional_point,Emergency_Features,Customer_Scope,MNT_ADJ,marks,security,dropdown_count,INF30_Key_Abstract_S_No], (error, results) => {
    if (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Error updating record' });
    } else {
      res.status(200).json({ message: 'Record insert successfully' });
    }
  });
});







app.put('/api/insp_check_list_update', (req, res) => {
  console.log("Route hit");
  console.log("Request Body:", req.body);

  const {
    description,
    dropdown,
    parts,
    photo,
    product,
    reference,
    Risklevel,
    functional_point,
    Emergency_Features,
    Customer_Scope,
    MNT_ADJ,
    marks,
    security,
    dropdown_count,
    INF30_Key_Abstract_S_No
  } = req.body;

  // SQL query
  const sqlQuery = `
    UPDATE inspection_master 
    SET 
      Product = ?, 
      Parts = ?, 
      Description = ?, 
      Reference = ?, 
      Risklevel = ?, 
      Photo = ?, 
      Dropdown = ?, 
      functional_point = ?, 
      Emergency_Features = ?, 
      Customer_Scope = ?, 
      MNT_ADJ = ?, 
      marks = ?, 
      security = ?, 
      dropdown_count = ?,
      INF30_Key_Abstract_S_No  = ? 
    WHERE 
      Description = ?`;

  console.log("Update Query:", sqlQuery);

  // Execute the query
  db1.query(
    sqlQuery,
    [
      product,
      parts,
      description,
      reference,
      Risklevel,
      photo,
      dropdown,
      functional_point,
      Emergency_Features,
      Customer_Scope,
      MNT_ADJ,
      marks,
      security,
      dropdown_count,
      description,
      INF30_Key_Abstract_S_No// WHERE clause value
    ],
    (error, result) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({
          error: 'Internal Server Error',
          message: error.message
        });
      }

      if (result.affectedRows === 0) {
        console.log('No rows affected');
        return res.status(404).json({ error: 'Existing data not found' });
      }

      console.log('Update success');
      res.json({ message: 'Updated successfully' });
    }
  );
});


// Define the API route to get inspection data
app.get('/inspection-master-list', (req, res) => {
  // Query the `inspection_master` table to fetch all data
  db1.query('SELECT * FROM inspection_master', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    // Send the results as a response
    res.json(results);
  });
});


// Define the API route to get the count of records in the inspection_master table
app.get('/inspection-master-count', (req, res) => {
  // Query the `inspection_master` table to get the count of rows
  db1.query('SELECT COUNT(*) AS count FROM inspection_master', (err, results) => {
    if (err) {
      console.error('Error querying the database for count:', err);
      res.status(500).send('Error fetching count');
      return;
    }

    // Send the count as a response
    res.json({
      count: results[0].count  // Return the count value
    });
  });
});


// Add new inspection (POST request)
app.post('/inspection-master', (req, res) => {
  const { Product, Parts, Description, Reference, Risklevel, Photo, Dropdown, functional_point, Emergency_Features, Customer_Scope, MNT_ADJ, marks, security, dropdown_count, INF30_Key_Abstract_S_No } = req.body;

  const query = `INSERT INTO inspection_master (Product, Parts, Description, Reference, Risklevel, Photo, Dropdown, functional_point, Emergency_Features, Customer_Scope, MNT_ADJ, marks, security, dropdown_count, INF30_Key_Abstract_S_No)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db1.query(query, [Product, Parts, Description, Reference, Risklevel, Photo, Dropdown, functional_point, Emergency_Features, Customer_Scope, MNT_ADJ, marks, security, dropdown_count, INF30_Key_Abstract_S_No], (err, results) => {
    if (err) {
      console.error('Error inserting item:', err);
      return res.status(500).json({ message: 'Error inserting item' });
    }
    res.status(201).json({ message: 'Item added successfully', id: results.insertId });
  });
});

// Update inspection (PUT request)
app.put('/inspection-master/:id', (req, res) => {
  const { id } = req.params;
  const { Product, Parts, Description, Reference, Risklevel, Photo, Dropdown, functional_point, MNT_ADJ, marks, security, dropdown_count, INF30_Key_Abstract_S_No } = req.body;
  console.log('body',req.body);
  const Emergency_Features = parseInt(req.body.Emergency_Features, 10); // Convert to integer
const Customer_Scope = parseInt(req.body.Customer_Scope, 10); // Convert to integer
console.log('emergency',Emergency_Features);
console.log('cus',Customer_Scope);



  

  const query = `UPDATE inspection_master SET
    Product = ?, Parts = ?, Description = ?, Reference = ?, Risklevel = ?, Photo = ?, Dropdown = ?, functional_point = ?, Emergency_Features = ?, Customer_Scope = ?, MNT_ADJ = ?, marks = ?, security = ?, dropdown_count = ?, INF30_Key_Abstract_S_No = ?
    WHERE id = ?`;

  db1.query(query, [Product, Parts, Description, Reference, Risklevel, Photo, Dropdown, functional_point, Emergency_Features, Customer_Scope, MNT_ADJ, marks, security, dropdown_count, INF30_Key_Abstract_S_No, id], (err, results) => {
    if (err) {
      console.error('Error updating item:', err);
      return res.status(500).json({ message: 'Error updating item' });
    }

    if (results.affectedRows > 0) {
      res.json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});


// DELETE route for deleting an item
app.delete('/inspection-master/:id', (req, res) => {
  const { id } = req.params; // Get the id from the URL parameter

  // SQL query to delete the item based on the id
  const query = `DELETE FROM inspection_master WHERE id = ?`;

  // Execute the query
  db1.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows > 0) {
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});


// API endpoint to fetch all data from inf_26, unit_details, and breif_spec
app.get('/api/msf24', (req, res) => {
  
  // Updated SQL query to join inf_26, unit_details, and breif_spec
  const sqlQuery = `
      SELECT inf.*, unit.*, spec.*
      FROM inf_26 AS inf
      INNER JOIN unit_details AS unit ON inf.contract_number = unit.contract_number
      LEFT JOIN breif_spec AS spec ON inf.id = spec.document_id  -- Adjust this as per actual columns
  `;

  db1.query(sqlQuery, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Error retrieving data' });
          return;
      }

      // Check if results are found
      if (results.length > 0) {
          console.log('Fetched data:', results);
          res.json({ data: results });
      } else {
          console.log('No data found.');
          res.json({ data: [] });
      }
  });
});


// ! signature to fetch,update,delete,add details to the db

app.get("/signature", (req, res) => {
  db1.query("SELECT * FROM signature", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving Signature");
    } else {
      // Convert BLOB to base64 string for each signature
      results.forEach((row) => {
        if (row.signature) {
          row.signature = row.signature.toString("base64"); // Convert BLOB to base64
        }
      });
      res.json(results);
    }
  });
});

// Add user data
app.post("/signature", upload2.single("signature"), (req, res) => {
  const { inspector_name } = req.body;
  const signatureImage = req.file?.buffer; // The image file in buffer format
  console.log('signature',signatureImage);
  

  db1.query(
    "INSERT INTO signature (inspector_name, signature) VALUES (?, ?)",
    [inspector_name, signatureImage],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).send({ message: "Error adding Signature" });
      } else {
        res.status(201).send({ message: "Signature added successfully" });
      }
    }
  );
});

// Update user data
app.put("/signature/:id", upload2.single("signature"), (req, res) => {
  const { id } = req.params;
  const { inspector_name } = req.body;
  const signatureImage = req.file ? req.file.buffer : null; // The image file in buffer format if it exists

  const query = signatureImage
    ? "UPDATE signature SET inspector_name = ?, signature = ? WHERE id = ?"
    : "UPDATE signature SET inspector_name = ? WHERE id = ?";

  const params = signatureImage
    ? [inspector_name, signatureImage, id]
    : [inspector_name, id];

  db1.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating Signature");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Signature not found");
    }
    res.json({ message: "Signature updated successfully" });
  });
});

// Delete user data
app.delete("/signature/:id", (req, res) => {
  const userId = req.params.id;
  db1.query("DELETE FROM signature WHERE id = ? ", [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting Signature" });
    } else {
      res.status(200).send({ message: "Signature deleted successfully" });
    }
  });
});




// Fetch a specific employee by ID
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM emp_data WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching employee');
        } else {
            res.json(result);
        }
    });
});

// Add a new employee
app.post('/employees', (req, res) => {
    const { NAME, email_id, PSN_NO, designation, contact_no, date_of_joining, date_of_birth, dept } = req.body;
    const sql = 'INSERT INTO emp_data (NAME, email_id, PSN_NO, designation, contact_no, date_of_joining, date_of_birth, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [NAME, email_id, PSN_NO, designation, contact_no, date_of_joining, date_of_birth, dept], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding employee');
        } else {
            res.status(201).send('Employee added successfully');
        }
    });
});

// Update an employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { NAME, email_id, PSN_NO, designation, contact_no, date_of_joining, date_of_birth, dept } = req.body;
    const sql = 'UPDATE emp_data SET NAME = ?, email_id = ?, PSN_NO = ?, designation = ?, contact_no = ?, date_of_joining = ?, date_of_birth = ?, dept = ? WHERE id = ?';
    db.query(sql, [NAME, email_id, PSN_NO, designation, contact_no, date_of_joining, date_of_birth, dept, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating employee');
        } else {
            res.send('Employee updated successfully');
        }
    });
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM emp_data WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting employee');
        } else {
            res.send('Employee deleted successfully');
        }
    });
});



// API endpoint to fetch all records from the pdf_cv table
app.get('/api/pdf-cv', (req, res) => {
  const sql = 'SELECT increment_id, PSN_NO, pdf FROM pdf_cv';  // Query to select records from pdf_cv table

  db1.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    } else {
      console.log('Fetched data from pdf_cv table:', results);  // Print the fetched data in the console
      res.json({ data: results });  // Return the data in the required format: { data: [...] }
    }
  });
});

app.get('/api/cv_pdf/:psn_no', (req, res) => {
  const { psn_no } = req.params;
  console.log(`Fetching PDF for PSN_NO: ${psn_no}`);

  const query = 'SELECT pdf FROM pdf_cv WHERE PSN_NO = ?';

  db1.query(query, [psn_no], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching file');
    }

    if (results.length > 0) {
      const fileBuffer = results[0].pdf;
      console.log('Fetched PDF buffer length:', fileBuffer.length); // Log the length of the PDF buffer

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
      res.send(fileBuffer);
    } else {
      console.error('PDF not found for PSN_NO:', psn_no);
      res.status(404).send('File not found');
    }
  });
});








app.post('/api/pdf-cv', upload.single('cvFile'), (req, res) => {
  const { PSN_NO } = req.body;  // Extract PSN_NO from form data
  const cvFile = req.file;      // Extract the uploaded file

  if (!PSN_NO || !cvFile) {
    return res.status(400).send('PSN_NO and CV file are required.');
  }

  // Read the file from disk as a buffer
  const filePath = path.join(__dirname, cvFile.path);
  const fileBuffer = fs.readFileSync(filePath);

  console.log('File buffer size:', fileBuffer.length); // Should now work

  // Insert the user data (PSN_NO and the binary file data) into the database
  const query = 'INSERT INTO pdf_cv (PSN_NO, pdf) VALUES (?, ?)';
  db1.query(query, [PSN_NO, fileBuffer], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).send('Error inserting data into the database.');
    }

    // Send success response
    res.status(200).send({
      message: 'User added successfully',
      data: { PSN_NO,pdf }
    });
  });
});

app.put('/api/pdf-cv/:increment_id', upload.single('pdf'), (req, res) => {
  const increment_id = req.params.increment_id; // Get the increment_id from the URL
  const PSN_NO = req.body.PSN_NO;  // Get PSN_NO from form data
  const pdf = req.file;            // Get the uploaded file

  // Check if the PDF file is uploaded
  if (!pdf) {
    return res.status(400).send('No file uploaded');
  }

  // Check if PSN_NO is provided
  if (!PSN_NO) {
    return res.status(400).send('PSN_NO is required');
  }

  // SQL query to update the user in the pdf_cv table
  const query = `
    UPDATE pdf_cv
    SET PSN_NO = ?, pdf = ?
    WHERE increment_id = ?
  `;

  // Reading the file as a buffer (since pdf column is a longblob)
  const pdfBuffer = fs.readFileSync(pdf.path);  // Read the file content

  // Execute the SQL query
  db1.query(query, [PSN_NO, pdfBuffer, increment_id], (err, results) => {
    if (err) {
      console.error('Error during the update query:', err);
      return res.status(500).send('Error updating user');
    }

    // Check if any rows were affected (user found and updated)
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    // Respond back with a success message
    res.status(200).json({ message: 'User updated successfully' });  });
});


app.delete('/api/pdf-cv/:increment_id', (req, res) => {
  const increment_id = req.params.increment_id;

  const query = 'DELETE FROM pdf_cv WHERE increment_id = ?';

  db1.query(query, [increment_id], (err, results) => {
    if (err) {
      console.error('Error during deletion:', err);
      return res.status(500).send('Error deleting user');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    console.log(`User with increment_id ${increment_id} deleted successfully.`);
   // Respond back with a success message
   res.status(200).json({ message: 'User deleted successfully' });  });
  });



  // ! default to fetch,update,delete,add details to the db

// Fetch user mail id

app.get("/default", (req, res) => {
  db1.query("SELECT * FROM default_cc", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving mail id");
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: "No mail ids found" });
      } else {
        res.json(results);
      }
    }
  });
});

// Add user mail id

app.post("/default", (req, res) => {
  const { mailid } = req.body;
  if (!mailid || typeof mailid !== "string") {
    return res.status(400).send({ message: "Invalid mail id" });
  }

  db1.query(
    "INSERT INTO default_cc (mailid) VALUES (?)",
    [mailid],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).send({ message: "Error adding mail id" });
      } else {
        res.status(201).send({ message: "Mail id added successfully" });
      }
    }
  );
});

// Delete user mail id

app.delete("/default/:s_no", (req, res) => {
  const s_no = req.params.s_no; // Fix variable name
  db1.query("DELETE FROM default_cc WHERE s_no = ?", [s_no], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting mail id" });
    } else if (results.affectedRows === 0) {
      res.status(404).send({ message: "Mail id not found" });
    } else {
      res.status(200).send({ message: "Mail id deleted successfully" });
    }
  });
});

// Update user mail id

app.put("/default/:s_no", (req, res) => {
  const { s_no } = req.params; // Fix variable name
  const { mailid } = req.body;

  if (!mailid || typeof mailid !== "string") {
    return res.status(400).send({ message: "Invalid mail id" });
  }

  db1.query(
    "UPDATE default_cc SET mailid = ? WHERE s_no = ?",
    [mailid, s_no],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating mail id");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Mail id not found");
      }
      res.json({ message: "Mail id updated successfully" });
    }
  );
});




// Get all departments
app.get('/api/organization_department', (req, res) => {
  const query = 'SELECT * FROM organization_department';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }
    console.log('Data fetched from the table:', results); // Log the data
    res.json(results); // Send data to the client
  });
});

// Add a new department
app.post('/api/organization_department', (req, res) => {
  const { Department, Organization } = req.body;

  if (!Department || !Organization) {
    console.log('Missing required fields: Department or Organization');
    return res.status(400).json({ error: 'Department and Organization are required' });
  }

  const query = 'INSERT INTO organization_department (Department, Organization) VALUES (?, ?)';
  db.query(query, [Department, Organization], (err, result) => {
    if (err) {
      console.error('Error adding department:', err);
      return res.status(500).json({ error: 'Error adding department' });
    }
    console.log('Department added successfully:', result);
    res.status(201).json({ message: 'Department added successfully', department: { Department, Organization } });
  });
});


app.put('/api/organization_department', (req, res) => {
  let { id, Department, Organization } = req.body;

  // Log the data to verify it's correct
  console.log('Updating department with ID:', id);
  console.log('Department:', Department, 'Organization:', Organization);

  // Trim any leading or trailing spaces
  Department = Department.trim();
  Organization = Organization.trim();

  // Ensure the required fields are provided
  if (!id || !Department || !Organization) {
    return res.status(400).json({ error: 'ID, Department, and Organization are required' });
  }

  // Log after trimming
  console.log('Trimmed values:', { Department, Organization });

  // Update query: Update Organization based on id
  const query = 'UPDATE organization_department SET Department = ?, Organization = ? WHERE id = ?';

  db.query(query, [Department, Organization, id], (err, result) => {
    if (err) {
      console.error('Error updating department:', err);
      return res.status(500).json({ error: 'Error updating department' });
    }

    // Log the query result to check how many rows were affected
    console.log('Query result:', result);

    // Check if any rows were affected (if no rows were updated)
    if (result.affectedRows === 0) {
      console.log('No department found with the given ID');
      return res.status(404).json({ error: 'Department not found' });
    }

    // If update was successful
    console.log('Department updated successfully:', result);
    res.status(200).json({ message: 'Department updated successfully' });
  });
});


app.delete('/api/organization_department', (req, res) => {
  const { id } = req.body;  // Assuming the request body contains the department's id.

  console.log('Deleting department with id:', id);

  // Check if the 'id' is provided
  if (!id) {
    return res.status(400).json({ error: 'Department id is required' });
  }

  // The query now deletes based on the department 'id'.
  const query = 'DELETE FROM organization_department WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting department:', err);
      return res.status(500).json({ error: 'Error deleting department' });
    }

    if (result.affectedRows === 0) {
      console.log('Department not found for deletion');
      return res.status(404).json({ error: 'Department not found' });
    }

    console.log('Department deleted successfully:', result);
    res.status(200).json({ message: 'Department deleted successfully' });
  });
});




// Get all organization roles
app.get('/api/organization_role', (req, res) => {
  const query = 'SELECT * FROM organization_role';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return res.status(500).json({ error: 'Error fetching roles' });
    }
    res.json(result);  // Send roles back to the client
  });
});

// Add a new organization role
app.post('/api/organization_role', (req, res) => {
  const { Role, Organization } = req.body;
  
  if (!Role || !Organization) {
    return res.status(400).json({ error: 'Role and Organization are required' });
  }

  const query = 'INSERT INTO organization_role (Role, Organization) VALUES (?, ?)';
  db.query(query, [Role, Organization], (err, result) => {
    if (err) {
      console.error('Error adding role:', err);
      return res.status(500).json({ error: 'Error adding role' });
    }
    res.status(201).json({ message: 'Role added successfully' });
  });
});

// Update an existing organization role
app.put('/api/organization_role', (req, res) => {
  const { id, Role, Organization } = req.body;

  if (!id || !Role || !Organization) {
    return res.status(400).json({ error: 'ID, Role, and Organization are required' });
  }

  const query = 'UPDATE organization_role SET Role = ?, Organization = ? WHERE id = ?';
  db.query(query, [Role, Organization, id], (err, result) => {
    if (err) {
      console.error('Error updating role:', err);
      return res.status(500).json({ error: 'Error updating role' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role updated successfully' });
  });
});

// Delete an organization role
app.delete('/api/organization_role', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const query = 'DELETE FROM organization_role WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting role:', err);
      return res.status(500).json({ error: 'Error deleting role' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  });
});




// & mail response to fetch, add, update and delete from the database

// fetch the data from the user

app.get("/mailResponse", (req, res) => {
  db1.query(
    "SELECT id,contract_number,project_name, building_name, schedule_from,schedule_to, client_approval_status FROM inf_26",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving mail response");
      } else {
        res.json(results);
      }
    }
  );
});
// Update user data

app.put("/mailResponse/:id", (req, res) => {
  const { id } = req.params;
  const { client_approval_status } = req.body;

  console.log(
    `Updating status for ID: ${id}, with status: ${client_approval_status}`
  );

  const updatedStatus = client_approval_status === 1 ? 1 : 0;
  console.log("status", updatedStatus);
  console.log("status1", client_approval_status);

  db1.query(
    "UPDATE inf_26 SET client_approval_status = ? WHERE id = ?",
    [client_approval_status, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating client approval status");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Record not found");
      }
      res.json(results); // Send the updated result back
    }
  );
});




// & employee data to fetch,update,delete,add details to the db

// Fetch user data

app.get("/employeeData", (req, res) => {
  db1.query("SELECT * FROM emp_data", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving employee data");
    } else {
      res.json(results);
    }
  });
});

// Add user data

app.post("/employeeData", (req, res) => {
  const {
    NAME,
    PSN_NO,
    designation,
    contact_no,
    email_id,
    date_of_joining,
    date_of_birth,
    dept,
  } = req.body;

  // Validate input
  if (!NAME || !PSN_NO || !designation || !contact_no || !email_id) {
    return res.status(400).send({ message: "Invalid input. Required fields are missing." });
  }

  // Insert into database
  db1.query(
    "INSERT INTO emp_data (NAME, PSN_NO, designation, contact_no, email_id, date_of_joining, date_of_birth, dept) VALUES (?,?,?,?,?,?,?,?)",
    [
      NAME,
      PSN_NO,
      designation,
      contact_no,
      email_id,
      date_of_joining,
      date_of_birth,
      dept,
    ],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).send({ message: "Error adding employee data", error: err.message });
      } else {
        res.status(201).send({ message: "Employee data added successfully", data: results });
      }
    }
  );
});


// Delete user data

app.delete("/employeeData/:PSN_NO", (req, res) => {
  const userId = req.params.PSN_NO;
  db1.query(
    "DELETE FROM emp_data WHERE PSN_NO = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting employee data" });
      } else {
        res.status(200).send({ message: "Employee data deleted successfully" });
      }
    }
  );
});

// Update user data

// Update user data
app.put("/employeeData/:PSN_NO", (req, res) => {
  const { PSN_NO } = req.params;
  const updatedData = req.body;
  console.log("Received update for PSN_NO:", PSN_NO, updatedData);

  db1.query(
    "UPDATE emp_data SET NAME = ?, designation = ?, contact_no = ?, email_id = ?, date_of_joining = ?, date_of_birth = ?, dept = ? WHERE PSN_NO = ?",
    [
      updatedData.NAME,
      updatedData.designation,
      updatedData.contact_no,
      updatedData.email_id,
      updatedData.date_of_joining,
      updatedData.date_of_birth,
      updatedData.dept,
      PSN_NO,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating employee data");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Employee data not found");
      }
      res.json({ message: "Employee data updated successfully" }); // Send the updated result back
    }
  );
});






















































// mugesh-----------------------------------------------


//spec_crud_api

  // type_of_cabin_fan

  // app.get('/api/items', (req, res) => {
  //   const sql = 'SELECT id, type_of_cabin_fan FROM type_of_cabin_fan'; // Replace 'your_table' with your actual table name
  //   db1.query(sql, (err, results) => {
  //     if (err) throw err;
  //     res.json(results);
  //   });
  // });

  app.get('/api/items', (req, res) => {
    const sql = 'SELECT id, type_of_cabin_fan FROM type_of_cabin_fan';

    db1.query(sql, (err, results) => {
        if (err) {
            console.error("Database query error:", err.message); // Log detailed error message to the console
            res.status(500).json({ error: "Internal Server Error" }); // Send a 500 status with an error message
            return;
        }
        res.json(results);
    });
});


  app.post('/api/items', (req, res) => {
    const newItem = req.body.type_of_cabin_fan;
    db1.query('INSERT INTO type_of_cabin_fan(type_of_cabin_fan) values (?) ', newItem, (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...newItem });
      console.log(result,'result');
    });
  });
  
  
  app.put('/api/items_update', (req, res) => {
    const { id,type_of_cabin_fan } = req.body;
    console.log("called, server value",id,type_of_cabin_fan);
    db1.query('UPDATE type_of_cabin_fan SET type_of_cabin_fan= ? WHERE id = ?', [type_of_cabin_fan, id], (err, result) => {
      if (err) throw err;
      res.json({ id, ...type_of_cabin_fan });
    });
  });


  app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db1.query('DELETE FROM type_of_cabin_fan WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Item deleted successfully' });
    });
  });
  

  // handrail

  app.get('/api/items1', (req, res) => {
    const sql = 'SELECT id, handrail FROM handrail'; // Replace 'your_table' with your actual table name
    db1.query(sql, (err, results) => {
      // console.log("result",results);
      if (err) throw err;
      res.json(results);
    });
  });

 
  app.post('/api/items1', (req, res) => {
    const newItem1 = req.body.handrail;
    db1.query('INSERT INTO handrail(handrail) values (?) ', newItem1, (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...newItem1 });
      console.log(result,'result');
    });
  });

  app.put('/api/items_update1', (req, res) => {
    const { id,handrail } = req.body;
    // console.log("called, server value",id,handrail);
    db1.query('UPDATE handrail SET handrail= ? WHERE id = ?', [handrail, id], (err, result) => {
      if (err) throw err;
      res.json({ id, ...handrail });
    });
  });


app.delete('/api/items1/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM handrail WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


 // type_of_equipment
 app.get('/api/equipment', (req, res) => {
  const sql = 'SELECT id, equipment_name FROM type_of_equipment'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/equipment/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_equipment WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/equipment', (req, res) => {
  const newItem2 = req.body.equipment_name;
  db1.query('INSERT INTO type_of_equipment(equipment_name) values (?) ', newItem2, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newItem2 });
    console.log(result,'result');
  });
});

app.put('/api/equipment', (req, res) => {
  const { id,equipment_name } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_equipment SET equipment_name= ? WHERE id = ?', [equipment_name, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...equipment_name });
  });
});


// type_of_usage
app.get('/api/usage', (req, res) => {
  const sql = 'SELECT id, type_of_usage FROM type_of_usage'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/usage/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_usage WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/usage', (req, res) => {
  const newusage = req.body.type_of_usage;
  db1.query('INSERT INTO type_of_usage(type_of_usage) values (?) ', newusage, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newusage });
    console.log(result,'result');
  });
});

app.put('/api/usage', (req, res) => {
  const { id,type_of_usage } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_usage SET type_of_usage= ? WHERE id = ?', [type_of_usage, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_usage });
  });
});



// machine_location

app.get('/api/location', (req, res) => {
  const sql = 'SELECT id, machine_location FROM machine_location'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/location/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM machine_location WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/location', (req, res) => {
  const newlocation = req.body.machine_location;
  db1.query('INSERT INTO machine_location(machine_location) values (?) ', newlocation, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newlocation });
    console.log(result,'result');
  });
});

app.put('/api/location', (req, res) => {
  const { id,machine_location } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE machine_location SET machine_location= ? WHERE id = ?', [machine_location, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...machine_location });
  });
});


// no_machine_room

app.get('/api/no_machine_room', (req, res) => {
  const sql = 'SELECT id, machine_room FROM machine_room'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deleteroom/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM machine_room WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addmachine', (req, res) => {
  const newroom = req.body;
  db1.query('INSERT INTO machine_room(machine_room) values (?) ', newroom.machine_room, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newroom });
    console.log(result,'result');
  });
});

app.put('/api/updateroom', (req, res) => {
  const { id,machine_room } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE machine_room SET machine_room= ? WHERE id = ?', [machine_room, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...machine_room });
  });
});



//machine_room

app.get('/api/getmachine', (req, res) => {
  const sql = 'SELECT id, machineroomnew FROM machineroomnew'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletemroom/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM machineroomnew WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addmachineroom', (req, res) => {
  const newmroom = req.body;
  db1.query('INSERT INTO machineroomnew(machineroomnew) values (?) ', newmroom.machineroomnew, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newmroom });
    console.log(result,'result');
  });
});

app.put('/api/updatemroom', (req, res) => {
  const { id,machineroomnew } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE machineroomnew SET machineroomnew= ? WHERE id = ?', [machineroomnew, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...machineroomnew });
  });
});


// controller_drive_type

app.get('/api/getcontroller', (req, res) => {
  const sql = 'SELECT id, controller_drive_type FROM controller_drive_type'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletecontroller/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM controller_drive_type WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addcontroller', (req, res) => {
  const new_controller_drive_type = req.body;
  db1.query('INSERT INTO controller_drive_type(controller_drive_type) values (?) ', new_controller_drive_type.controller_drive_type, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...new_controller_drive_type });
    console.log(result,'result');
  });
});

app.put('/api/updatecontroller', (req, res) => {
  const { id,controller_drive_type } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE controller_drive_type SET controller_drive_type= ? WHERE id = ?', [controller_drive_type, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...controller_drive_type });
  });
});



// type_of_operation

app.get('/api/getoperation', (req, res) => {
  const sql = 'SELECT id, type_of_operation FROM type_of_operation'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deleteoperation/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_operation WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addoperation', (req, res) => {
  const newopeation = req.body;
  db1.query('INSERT INTO type_of_operation(type_of_operation) values (?) ', newopeation.type_of_operation, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newopeation });
    console.log(result,'result');
  });
});

app.put('/api/updateoperation', (req, res) => {
  const { id,type_of_operation } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_operation SET type_of_operation= ? WHERE id = ?', [type_of_operation, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_operation });
  });
});


// grouping_type

app.get('/api/getgroup', (req, res) => {
  const sql = 'SELECT id, grouping_type FROM grouping_type'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletegroup/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM grouping_type WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addgroup', (req, res) => {
  const newgroup = req.body;
  db1.query('INSERT INTO grouping_type(grouping_type) values (?) ', newgroup.grouping_type, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newgroup });
    console.log(result,'result');
  });
});

app.put('/api/updategroup', (req, res) => {
  const { id,grouping_type } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE grouping_type SET grouping_type= ? WHERE id = ?', [grouping_type, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...grouping_type });
  });
});


// traction_category

app.get('/api/gettraction', (req, res) => {
  const sql = 'SELECT id, traction_category FROM traction_category'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletetraction/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM traction_category WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addtraction', (req, res) => {
  const newtraction = req.body;
  db1.query('INSERT INTO traction_category(traction_category) values (?) ', newtraction.traction_category, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newtraction });
    console.log(result,'result');
  });
});

app.put('/api/updatetraction', (req, res) => {
  const { id,traction_category } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE traction_category SET traction_category= ? WHERE id = ?', [traction_category, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...traction_category });
  });
});


// rope_wrap_details

app.get('/api/getwrap', (req, res) => {
  const sql = 'SELECT id, rope_wrap_details FROM rope_wrap_details'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletewrap/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM rope_wrap_details WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addwrap', (req, res) => {
  const newwrap = req.body;
  db1.query('INSERT INTO rope_wrap_details(rope_wrap_details) values (?) ', newwrap.rope_wrap_details, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newwrap });
    console.log(result,'result');
  });
});

app.put('/api/updatewrap', (req, res) => {
  const { id,rope_wrap_details } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE rope_wrap_details SET rope_wrap_details= ? WHERE id = ?', [rope_wrap_details, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...rope_wrap_details });
  });
});


// machine_type

app.get('/api/gettype', (req, res) => {
  const sql = 'SELECT id, machine_type FROM machine_type'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletetype/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM machine_type WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addtype', (req, res) => {
  const newtype = req.body;
  db1.query('INSERT INTO machine_type(machine_type) values (?) ', newtype.machine_type, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newtype });
    console.log(result,'result');
  });
});

app.put('/api/updatetype', (req, res) => {
  const { id,machine_type } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE machine_type SET machine_type= ? WHERE id = ?', [machine_type, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...machine_type });
  });
});


// type_of_roping

app.get('/api/getrope', (req, res) => {
  const sql = 'SELECT id, type_of_roping FROM type_of_roping'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deleterope/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_roping WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addrope', (req, res) => {
  const newrope = req.body;
  db1.query('INSERT INTO type_of_roping(type_of_roping) values (?) ', newrope.type_of_roping, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newrope });
    console.log(result,'result');
  });
});

app.put('/api/updaterope', (req, res) => {
  const { id,type_of_roping } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_roping SET type_of_roping= ? WHERE id = ?', [type_of_roping, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_roping });
  });
});


// type_of_motor

app.get('/api/getmotor', (req, res) => {
  const sql = 'SELECT id, type_of_motor FROM type_of_motor'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletemotor/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_motor WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addmotor', (req, res) => {
  const newmotor = req.body;
  db1.query('INSERT INTO type_of_motor(type_of_motor) values (?) ', newmotor.type_of_motor, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newmotor });
    console.log(result,'result');
  });
});

app.put('/api/updatemotor', (req, res) => {
  const { id,type_of_motor } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_motor SET type_of_motor= ? WHERE id = ?', [type_of_motor, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_motor });
  });
});


// door_operator

app.get('/api/getdoor', (req, res) => {
  const sql = 'SELECT id, door_operator FROM door_operator'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletedoor/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM door_operator WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/adddoor', (req, res) => {
  const newdoor = req.body;
  db1.query('INSERT INTO door_operator(door_operator) values (?) ', newdoor.door_operator, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newdoor });
    console.log(result,'result');
  });
});

app.put('/api/updatedoor', (req, res) => {
  const { id,door_operator } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE door_operator SET door_operator= ? WHERE id = ?', [door_operator, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...door_operator });
  });
});



// type_of_openings

app.get('/api/getopen', (req, res) => {
  const sql = 'SELECT id, type_of_openings FROM type_of_openings'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deleteopen/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_openings WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addopen', (req, res) => {
  const newopen = req.body;
  db1.query('INSERT INTO type_of_openings(type_of_openings) values (?) ', newopen.type_of_openings, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newopen });
    console.log(result,'result');
  });
});

app.put('/api/updateopen', (req, res) => {
  const { id,type_of_openings } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_openings SET type_of_openings= ? WHERE id = ?', [type_of_openings, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_openings });
  });
});



// car_operating_panels

app.get('/api/getcar', (req, res) => {
  const sql = 'SELECT id, car_operating_panels FROM car_operating_panels'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletecar/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM car_operating_panels WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addcar', (req, res) => {
  const newcar = req.body;
  db1.query('INSERT INTO car_operating_panels(car_operating_panels) values (?) ', newcar.car_operating_panels, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newcar });
    console.log(result,'result');
  });
});

app.put('/api/updatecar', (req, res) => {
  const { id,car_operating_panels } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE car_operating_panels SET car_operating_panels= ? WHERE id = ?', [car_operating_panels, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...car_operating_panels });
  });
});


// car_indicator_type

app.get('/api/getindicator', (req, res) => {
  const sql = 'SELECT id, car_indicator_type FROM car_indicator_type'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deleteindicator/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM car_indicator_type WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addindicator', (req, res) => {
  const newindicator = req.body;
  db1.query('INSERT INTO car_indicator_type(car_indicator_type) values (?) ', newindicator.car_indicator_type, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newindicator });
    console.log(result,'result');
  });
});

app.put('/api/updateindicator', (req, res) => {
  const { id,car_indicator_type } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE car_indicator_type SET car_indicator_type= ? WHERE id = ?', [car_indicator_type, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...car_indicator_type });
  });
});


// multimedia_display

app.get('/api/getdisplay', (req, res) => {
  const sql = 'SELECT id, multimedia_display FROM multimedia_display'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletedisplay/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM multimedia_display WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/adddisplay', (req, res) => {
  const newdisplay = req.body;
  db1.query('INSERT INTO multimedia_display(multimedia_display) values (?)', [newdisplay.multimedia_display], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newdisplay });
    console.log(result, 'result');
  });
});

app.put('/api/updatedisplay', (req, res) => {
  const { id,multimedia_display } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE multimedia_display SET multimedia_display= ? WHERE id = ?', [multimedia_display, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...multimedia_display });
  });
});


// cabin_fans

app.get('/api/getfan', (req, res) => {
  const sql = 'SELECT id, cabin_fans FROM cabin_fans'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletefan/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM cabin_fans WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addfan', (req, res) => {
  const newfan = req.body;
  db1.query('INSERT INTO cabin_fans(cabin_fans) values (?)', [newfan.cabin_fans], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newfan });
    console.log(result, 'result');
  });
});

app.put('/api/updatefan', (req, res) => {
  const { id,cabin_fans } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE cabin_fans SET cabin_fans= ? WHERE id = ?', [cabin_fans, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...cabin_fans });
  });
});


// type_of_call_buttons

app.get('/api/getcall', (req, res) => {
  const sql = 'SELECT id, type_of_call_buttons FROM type_of_call_buttons'; // Replace 'your_table' with your actual table name
  db1.query(sql, (err, results) => {
    // console.log("result",results);
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/deletecall/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_call_buttons WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});

app.post('/api/addcall', (req, res) => {
  const newcall = req.body;
  db1.query('INSERT INTO type_of_call_buttons(type_of_call_buttons) values (?)', [newcall.type_of_call_buttons], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newcall });
    console.log(result, 'result');
  });
});

app.put('/api/updatecall', (req, res) => {
  const { id,type_of_call_buttons } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_call_buttons SET type_of_call_buttons= ? WHERE id = ?', [type_of_call_buttons, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_call_buttons });
  });
});

// stop_button

app.get('/api/getstop',(req, res)=>{
  const sql ='SELECT id, stop_button FROM stop_button';
  db1.query(sql,(err,results1)=>{
    if(err) throw err;
    res.json(results1);
  });
});


app.post('/api/addstop',(req,res)=>{
  const newstop = req.body;
  db1.query('INSERT INTO stop_button(stop_button) values(?)',[newstop.stop_button],(err,result)=>{
    if(err) throw err;
    res.json({id: result.insertId, ...newstop});
    console.log(result,'result');
  });
});

app.put('/api/updatestop', (req, res) => {
  const { id,stop_button } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE stop_button SET stop_button= ? WHERE id = ?', [stop_button, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...stop_button });
  });
});

app.delete('/api/deletestop/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM stop_button WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// service_cabinet

app.get('/api/getcabinet',(req,res)=>{
  const sql='SELECT id,service_cabinet from service_cabinet';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addcabinet',(req,res)=>{
  const newcabinet=req.body;
  db1.query('insert into service_cabinet (service_cabinet) values(?)',[newcabinet.service_cabinet],(err,result)=>{
    if(err) throw err;
    res.json({id: result.insertId, ...newcabinet});
    console.log(result,'result');
  })
})

app.put('/api/updatecabinet',(req,res)=>{
  const {id,service_cabinet}=req.body
  db1.query('update service_cabinet set service_cabinet=? where id=?',[service_cabinet,id],(err,result)=>{
    if(err)throw err;
    res.json({id, ...service_cabinet})
  });
});

app.delete('/api/deletecabinet/:id',(req, res)=>{
  const {id} =req.params;
  db1.query('delete from service_cabinet where id= ?', [id], (err,result) => {
    if(err) throw err;
    res.json({message: 'deleted'});

  });
});


// voice_announcement

app.get('/api/getvoice',(req,res)=>{
  const sql= 'select id, voice_announcement from voice_announcement';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addvoice',(req,res)=>{
  const newvoice=req.body;
  db1.query('insert into voice_announcement (voice_announcement) values(?)',[newvoice.voice_announcement],(err,result)=>{
    if(err) throw err;
    res.json({id: result.insertId, ...newvoice});
    console.log(result,'result');
  })
})

app.put('/api/updatevoice', (req, res) => {
  const { id,voice_announcement } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE voice_announcement SET voice_announcement= ? WHERE id = ?', [voice_announcement, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...voice_announcement });
  });
});

app.delete('/api/deletevoice/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM voice_announcement WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// cabin_bumper

app.get('/api/getbumper',(req,res)=>{
  const sql= 'select id, cabin_bumper from cabin_bumper';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addbumper',(req,res)=>{
  const newbumper=req.body;
  db1.query('insert into cabin_bumper (cabin_bumper) values(?)',[newbumper.cabin_bumper],(err,result)=>{
    if(err) throw err;
    res.json({id: result.insertId, ...newbumper});
    console.log(result,'result');
  });
});

app.put('/api/updatebumper', (req, res) => {
  const { id,cabin_bumper } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE cabin_bumper SET cabin_bumper= ? WHERE id = ?', [cabin_bumper, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...cabin_bumper });
  });
});

app.delete('/api/deletebumper/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM cabin_bumper WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// auto_attendant
app.get('/api/getattendant',(req,res)=>{
  const sql='select id, auto_attendant from auto_attendant';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addattendant', (req, res) => {
  const newattendant = req.body;
  db1.query('INSERT INTO auto_attendant(auto_attendant) values (?)', [newattendant.auto_attendant], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newattendant });
    console.log(result, 'result');
  });
});

app.put('/api/updateattendant', (req, res) => {
  const { id,auto_attendant } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE auto_attendant SET auto_attendant= ? WHERE id = ?', [auto_attendant, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...auto_attendant });
  });
});

app.delete('/api/deleteattendant/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM auto_attendant WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// auto_independant

app.get('/api/getindependant',(req,res)=>{
  const sql='select id, auto_independant from auto_independant';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addindependant', (req, res) => {
  const newindependant = req.body;
  db1.query('INSERT INTO auto_independant(auto_independant) values (?)', [newindependant.auto_independant], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newindependant });
    console.log(result, 'result');
  });
});

app.put('/api/updateindependant', (req, res) => {
  const { id,auto_independant } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE auto_independant SET auto_independant= ? WHERE id = ?', [auto_independant, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...auto_independant });
  });
});

app.delete('/api/deleteindependant/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM auto_independant WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// non_stop

app.get('/api/getnon',(req,res)=>{
  const sql='select id, non_stop from non_stop';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addnon', (req, res) => {
  const newnon = req.body;
  db1.query('INSERT INTO non_stop(non_stop) values (?)', [newnon.non_stop], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newnon });
    console.log(result, 'result');
  });
});

app.put('/api/updatenon', (req, res) => {
  const { id,non_stop } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE non_stop SET non_stop= ? WHERE id = ?', [non_stop, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...non_stop });
  });
});

app.delete('/api/deletenon/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM non_stop WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// fan_switch

app.get('/api/getswitch',(req,res)=>{
  const sql='select id, fan_switch from fan_switch';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addswitch', (req, res) => {
  const newswitch = req.body;
  db1.query('INSERT INTO fan_switch(fan_switch) values (?)', [newswitch.fan_switch], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newswitch });
    console.log(result, 'result');
  });
});

app.put('/api/updateswitch', (req, res) => {
  const { id,fan_switch } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE fan_switch SET fan_switch= ? WHERE id = ?', [fan_switch, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...fan_switch });
  });
});

app.delete('/api/deleteswitch/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM fan_switch WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// hall_indicator_type

app.get('/api/gethall',(req,res)=>{
  const sql='select id, hall_indicator_type from hall_indicator_type';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addhall', (req, res) => {
  const newhall = req.body;
  db1.query('INSERT INTO hall_indicator_type(hall_indicator_type) values (?)', [newhall.hall_indicator_type], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newhall });
    console.log(result, 'result');
  });
});

app.put('/api/updatehall', (req, res) => {
  const { id,hall_indicator_type } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE hall_indicator_type SET hall_indicator_type= ? WHERE id = ?', [hall_indicator_type, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...hall_indicator_type });
  });
});

app.delete('/api/deletehall/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM hall_indicator_type WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// hall_laterns

app.get('/api/getlaterns',(req,res)=>{
  const sql='select id, hall_laterns from hall_laterns';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addlaterns', (req, res) => {
  const newlaterns = req.body;
  db1.query('INSERT INTO hall_laterns(hall_laterns) values (?)', [newlaterns.hall_laterns], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newlaterns });
    console.log(result, 'result');
  });
});

app.put('/api/updatelaterns', (req, res) => {
  const { id,hall_laterns } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE hall_laterns SET hall_laterns= ? WHERE id = ?', [hall_laterns, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...hall_laterns });
  });
});

app.delete('/api/deletelaterns/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM hall_laterns WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// arrival_chime

app.get('/api/getchime',(req,res)=>{
  const sql='select id, arrival_chime from arrival_chime';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addchime', (req, res) => {
  const newchime = req.body;
  db1.query('INSERT INTO arrival_chime(arrival_chime) values (?)', [newchime.arrival_chime], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newchime });
    console.log(result, 'result');
  });
});

app.put('/api/updatechime', (req, res) => {
  const { id,arrival_chime } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE arrival_chime SET arrival_chime= ? WHERE id = ?', [arrival_chime, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...arrival_chime });
  });
});

app.delete('/api/deletechime/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM arrival_chime WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// no_of_risers_at_main_lobby

app.get('/api/getrisers',(req,res)=>{
  const sql='select id, risers_at_main_lobby from risers_at_main_lobby';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addrisers', (req, res) => {
  const newrisers = req.body;
  db1.query('INSERT INTO risers_at_main_lobby(risers_at_main_lobby) values (?)', [newrisers.no_of_risers_at_main_lobby], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newrisers });
    console.log(result, 'result');
  });
});

app.put('/api/updaterisers', (req, res) => {
  const { id,no_of_risers_at_main_lobby } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE risers_at_main_lobby SET risers_at_main_lobby= ? WHERE id = ?', [no_of_risers_at_main_lobby, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...no_of_risers_at_main_lobby });
  });
});

app.delete('/api/deleterisers/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM risers_at_main_lobby WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// no_of_risers_at_other_floors

app.get('/api/getother',(req,res)=>{
  const sql='select id, risers_at_other_floors from risers_at_other_floors';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addother', (req, res) => {
  const newother = req.body;
  db1.query('INSERT INTO risers_at_other_floors(risers_at_other_floors) values (?)', [newother.no_of_risers_at_other_floors], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newother });
    console.log(result, 'result');
  });
});

app.put('/api/updateother', (req, res) => {
  const { id,no_of_risers_at_other_floors } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE risers_at_other_floors SET risers_at_other_floors= ? WHERE id = ?', [no_of_risers_at_other_floors, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...no_of_risers_at_other_floors });
  });
});

app.delete('/api/deleteother/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM risers_at_other_floors WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// hall_call_type_at_main_lobby

app.get('/api/getlobby',(req,res)=>{
  const sql='select id, hall_call_type_at_main_lobby from hall_call_type_at_main_lobby';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addlobby', (req, res) => {
  const newlobby = req.body;
  db1.query('INSERT INTO hall_call_type_at_main_lobby(hall_call_type_at_main_lobby) values (?)', [newlobby.hall_call_type_at_main_lobby], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newlobby });
    console.log(result, 'result');
  });
});

app.put('/api/updatelobby', (req, res) => {
  const { id,hall_call_type_at_main_lobby } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE hall_call_type_at_main_lobby SET hall_call_type_at_main_lobby= ? WHERE id = ?', [hall_call_type_at_main_lobby, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...hall_call_type_at_main_lobby });
  });
});

app.delete('/api/deletelobby/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM hall_call_type_at_main_lobby WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// hall_call_type_at_all_floors

app.get('/api/getfloors',(req,res)=>{
  const sql='select id, hall_call_type_at_all_floors from hall_call_type_at_all_floors';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addfloors', (req, res) => {
  const newfloors = req.body;
  db1.query('INSERT INTO hall_call_type_at_all_floors(hall_call_type_at_all_floors) values (?)', [newfloors.hall_call_type_at_all_floors], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newfloors });
    console.log(result, 'result');
  });
});

app.put('/api/updatefloors', (req, res) => {
  const { id,hall_call_type_at_all_floors } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE hall_call_type_at_all_floors SET hall_call_type_at_all_floors= ? WHERE id = ?', [hall_call_type_at_all_floors, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...hall_call_type_at_all_floors });
  });
});

app.delete('/api/deletefloors/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM hall_call_type_at_all_floors WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// no_of_car_buffers

app.get('/api/getbuffers',(req,res)=>{
  const sql='select id, no_of_car_buffers from no_of_car_buffers';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addbuffers', (req, res) => {
  const newbuffers = req.body;
  db1.query('INSERT INTO no_of_car_buffers(no_of_car_buffers) values (?)', [newbuffers.no_of_car_buffers], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newbuffers });
    console.log(result, 'result');
  });
});

app.put('/api/updatebuffers', (req, res) => {
  const { id,no_of_car_buffers } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE no_of_car_buffers SET no_of_car_buffers= ? WHERE id = ?', [no_of_car_buffers, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...no_of_car_buffers });
  });
});

app.delete('/api/deletebuffers/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM no_of_car_buffers WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// type_of_car_buffers

app.get('/api/gettypebuffers',(req,res)=>{
  const sql='select id, type_of_car_buffers from type_of_car_buffers';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addtypebuffers', (req, res) => {
  const newtypebuffers = req.body;
  db1.query('INSERT INTO type_of_car_buffers(type_of_car_buffers) values (?)', [newtypebuffers.type_of_car_buffers], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newtypebuffers });
    console.log(result, 'result');
  });
});

app.put('/api/updatetypebuffers', (req, res) => {
  const { id,type_of_car_buffers } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_car_buffers SET type_of_car_buffers= ? WHERE id = ?', [type_of_car_buffers, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_car_buffers });
  });
});

app.delete('/api/deletetypebuffers/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_car_buffers WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// no_of_cwt_buffer

app.get('/api/getcwtbuffer',(req,res)=>{
  const sql='select id, no_of_cwt_buffer from no_of_cwt_buffer';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addcwtbuffer', (req, res) => {
  const newcwtbuffer = req.body;
  db1.query('INSERT INTO no_of_cwt_buffer(no_of_cwt_buffer) values (?)', [newcwtbuffer.no_of_cwt_buffer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newcwtbuffer });
    console.log(result, 'result');
  });
});

app.put('/api/updatecwtbuffer', (req, res) => {
  const { id,no_of_cwt_buffer } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE no_of_cwt_buffer SET no_of_cwt_buffer= ? WHERE id = ?', [no_of_cwt_buffer, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...no_of_cwt_buffer });
  });
});

app.delete('/api/deletecwtbuffer/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM no_of_cwt_buffer WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// type_of_cwt_buffer

app.get('/api/gettypecwtbuffer',(req,res)=>{
  const sql='select id, type_of_cwt_buffer from type_of_cwt_buffer';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addtypecwtbuffer', (req, res) => {
  const newtypecwtbuffer = req.body;
  db1.query('INSERT INTO type_of_cwt_buffer(type_of_cwt_buffer) values (?)', [newtypecwtbuffer.type_of_cwt_buffer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newtypecwtbuffer });
    console.log(result, 'result');
  });
});

app.put('/api/updatetypecwtbuffer', (req, res) => {
  const { id,type_of_cwt_buffer } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE type_of_cwt_buffer SET type_of_cwt_buffer= ? WHERE id = ?', [type_of_cwt_buffer, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...type_of_cwt_buffer });
  });
});

app.delete('/api/deletetypecwtbuffer/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM type_of_cwt_buffer WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// manual_rescue

app.get('/api/getrescue',(req,res)=>{
  const sql='select id, manual_rescue from manual_rescue';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addrescue', (req, res) => {
  const newrescue = req.body;
  db1.query('INSERT INTO manual_rescue(manual_rescue) values (?)', [newrescue.manual_rescue], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newrescue });
    console.log(result, 'result');
  });
});

app.put('/api/updaterescue', (req, res) => {
  const { id,manual_rescue } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE manual_rescue SET manual_rescue= ? WHERE id = ?', [manual_rescue, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...manual_rescue });
  });
});

app.delete('/api/deleterescue/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM manual_rescue WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// e_light

app.get('/api/getlight',(req,res)=>{
  const sql='select id, e_light from e_light';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addlight', (req, res) => {
  const newlight = req.body;
  db1.query('INSERT INTO e_light(e_light) values (?)', [newlight.e_light], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newlight });
    console.log(result, 'result');
  });
});

app.put('/api/updatelight', (req, res) => {
  const { id,e_light } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE e_light SET e_light= ? WHERE id = ?', [e_light, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...e_light });
  });
});

app.delete('/api/deletelight/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM e_light WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// e_light

app.get('/api/getalarm',(req,res)=>{
  const sql='select id, e_alram from e_alram';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addalarm', (req, res) => {
  const newalarm = req.body;
  db1.query('INSERT INTO e_alram(e_alram) values (?)', [newalarm.e_alarm], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newalarm });
    console.log(result, 'result');
  });
});

app.put('/api/updatealarm', (req, res) => {
  const { id,e_alarm } = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE e_alram SET e_alram= ? WHERE id = ?', [e_alarm, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...e_alarm });
  });
});

app.delete('/api/deletealarm/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM e_alram WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// e_intercom

app.get('/api/getintercom',(req,res)=>{
  const sql='select id, e_intercom from e_intercom';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addintercom', (req, res) => {
  const newintercom = req.body;
  db1.query('INSERT INTO e_intercom(e_intercom) values (?)', [newintercom.e_intercom], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newintercom });
    console.log(result, 'result');
  });
});

app.put('/api/updateintercom', (req, res) => {
  const { id,e_intercom} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE e_intercom SET e_intercom = ? WHERE id = ?', [e_intercom, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...e_intercom });
  });
});

app.delete('/api/deleteintercom/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM e_intercom WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// ard_operation

app.get('/api/getard',(req,res)=>{
  const sql='select id, ard_operation from ard_operation';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addard', (req, res) => {
  const neward = req.body;
  db1.query('INSERT INTO ard_operation(ard_operation) values (?)', [neward.ard_operation], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...neward });
    console.log(result, 'result');
  });
});

app.put('/api/updateard', (req, res) => {
  const { id,ard_operation} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE ard_operation SET ard_operation = ? WHERE id = ?', [ard_operation, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...ard_operation });
  });
});

app.delete('/api/deleteard/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM ard_operation WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});


// ard_audio

app.get('/api/getardaudio',(req,res)=>{
  const sql='select id, ard_audio from ard_audio';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addardaudio', (req, res) => {
  const newardaudio = req.body;
  db1.query('INSERT INTO ard_audio(ard_audio) values (?)', [newardaudio.ard_audio], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newardaudio });
    console.log(result, 'result');
  });
});

app.put('/api/updateardaudio', (req, res) => {
  const { id,ard_audio} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE ard_audio SET ard_audio = ? WHERE id = ?', [ard_audio, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...ard_audio });
  });
});

app.delete('/api/deleteardaudio/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM ard_audio WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});




// ard_visuals

app.get('/api/getardvisuals',(req,res)=>{
  const sql='select id, ard_visuals from ard_visuals';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addardvisuals', (req, res) => {
  const newardvisuals = req.body;
  db1.query('INSERT INTO ard_visuals(ard_visuals) values (?)', [newardvisuals.ard_visuals], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newardvisuals });
    console.log(result, 'result');
  });
});

app.put('/api/updateardvisuals', (req, res) => {
  const { id,ard_visuals} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE ard_visuals SET ard_visuals = ? WHERE id = ?', [ard_visuals, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...ard_visuals });
  });
});

app.delete('/api/deleteardvisuals/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM ard_visuals WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// fireman_operation

app.get('/api/getfireman',(req,res)=>{
  const sql='select id, fireman_operation from fireman_operation';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addfireman', (req, res) => {
  const newfireman = req.body;
  db1.query('INSERT INTO fireman_operation(fireman_operation) values (?)', [newfireman.fireman_operation], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newfireman });
    console.log(result, 'result');
  });
});

app.put('/api/updatefireman', (req, res) => {
  const { id,fireman_operation} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE fireman_operation SET fireman_operation = ? WHERE id = ?', [fireman_operation, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...fireman_operation });
  });
});

app.delete('/api/deletefireman/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM fireman_operation WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});




// fireman_emerg_return

app.get('/api/getemerg',(req,res)=>{
  const sql='select id, fireman_emerg_return from fireman_emerg_return';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addemerg', (req, res) => {
  const newemerg = req.body;
  db1.query('INSERT INTO fireman_emerg_return(fireman_emerg_return) values (?)', [newemerg.fireman_emerg_return], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newemerg });
    console.log(result, 'result');
  });
});

app.put('/api/updateemerg', (req, res) => {
  const { id,fireman_emerg_return} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE fireman_emerg_return SET fireman_emerg_return = ? WHERE id = ?', [fireman_emerg_return, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...fireman_emerg_return });
  });
});

app.delete('/api/deleteemerg/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM fireman_emerg_return WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// fireman_audio

app.get('/api/getfiremanaudio',(req,res)=>{
  const sql='select id, fireman_audio from fireman_audio';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addfiremanaudio', (req, res) => {
  const newfiremanaudio = req.body;
  db1.query('INSERT INTO fireman_audio(fireman_audio) values (?)', [newfiremanaudio.fireman_audio], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newfiremanaudio });
    console.log(result, 'result');
  });
});

app.put('/api/updatefiremanaudio', (req, res) => {
  const { id,fireman_audio} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE fireman_audio SET fireman_audio = ? WHERE id = ?', [fireman_audio, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...fireman_audio });
  });
});

app.delete('/api/deletefiremanaudio/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM fireman_audio WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});




// fireman_visual

app.get('/api/getfiremanvisual',(req,res)=>{
  const sql='select id, fireman_visual from fireman_visual';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addfiremanvisual', (req, res) => {
  const newfiremanvisual = req.body;
  db1.query('INSERT INTO fireman_visual(fireman_visual) values (?)', [newfiremanvisual.fireman_visual], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newfiremanvisual });
    console.log(result, 'result');
  });
});

app.put('/api/updatefiremanvisual', (req, res) => {
  const { id,fireman_visual} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE fireman_visual SET fireman_visual = ? WHERE id = ?', [fireman_visual, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...fireman_visual });
  });
});

app.delete('/api/deletefiremanvisual/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM fireman_visual WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// passenger_overload_operation

app.get('/api/getpassenger',(req,res)=>{
  const sql='select id, passenger_overload_operation from passenger_overload_operation';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addpassenger', (req, res) => {
  const newpassenger = req.body;
  db1.query('INSERT INTO passenger_overload_operation(passenger_overload_operation) values (?)', [newpassenger.passenger_overload_operation], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newpassenger });
    console.log(result, 'result');
  });
});

app.put('/api/updatepassenger', (req, res) => {
  const { id,passenger_overload_operation} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE passenger_overload_operation SET passenger_overload_operation = ? WHERE id = ?', [passenger_overload_operation, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...passenger_overload_operation });
  });
});

app.delete('/api/deletepassenger/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM passenger_overload_operation WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// passenger_overload_visual

app.get('/api/getvisual',(req,res)=>{
  const sql='select id, passenger_overload_visual from passenger_overload_visual';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addvisual', (req, res) => {
  const newvisual = req.body;
  db1.query('INSERT INTO passenger_overload_visual(passenger_overload_visual) values (?)', [newvisual.passenger_overload_visual], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newvisual });
    console.log(result, 'result');
  });
});

app.put('/api/updatevisual', (req, res) => {
  const { id,passenger_overload_visual} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE passenger_overload_visual SET passenger_overload_visual = ? WHERE id = ?', [passenger_overload_visual, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...passenger_overload_visual });
  });
});

app.delete('/api/deletevisual/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM passenger_overload_visual WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});






// passenger_overload_audio

app.get('/api/getaudio',(req,res)=>{
  const sql='select id, passenger_overload_audio from passenger_overload_audio';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addaudio', (req, res) => {
  const newaudio = req.body;
  db1.query('INSERT INTO passenger_overload_audio(passenger_overload_audio) values (?)', [newaudio.passenger_overload_audio], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newaudio });
    console.log(result, 'result');
  });
});

app.put('/api/updateaudio', (req, res) => {
  const { id,passenger_overload_audio} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE passenger_overload_audio SET passenger_overload_audio = ? WHERE id = ?', [passenger_overload_audio, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...passenger_overload_audio });
  });
});

app.delete('/api/deleteaudio/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM passenger_overload_audio WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});













// seismic_sensor_operation

app.get('/api/getsensor',(req,res)=>{
  const sql='select id, seismic_sensor_operation from seismic_sensor_operation';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addsensor', (req, res) => {
  const newsensor = req.body;
  db1.query('INSERT INTO seismic_sensor_operation(seismic_sensor_operation) values (?)', [newsensor.seismic_sensor_operation], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newsensor });
    console.log(result, 'result');
  });
});

app.put('/api/updatesensor', (req, res) => {
  const { id,seismic_sensor_operation} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE seismic_sensor_operation SET seismic_sensor_operation = ? WHERE id = ?', [seismic_sensor_operation, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...seismic_sensor_operation });
  });
});

app.delete('/api/deletesensor/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM seismic_sensor_operation WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});



// vendor master

app.get('/api/getvendor',(req,res)=>{
  const sql='select id, vendor_name from vendor_master';
  db1.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result)
  });
});

app.post('/api/addvendor', (req, res) => {
  const newvendor = req.body;
  db1.query('INSERT INTO vendor_master(vendor_name) values (?)', [newvendor.vendor_name], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newvendor });
    console.log(result, 'result');
  });
});

app.put('/api/updatevendor', (req, res) => {
  const { id,vendor_name} = req.body;
  // console.log("called, server value",id,handrail);
  db1.query('UPDATE vendor_master SET vendor_name = ? WHERE id = ?', [vendor_name, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...vendor_name });
  });
});

app.delete('/api/deletevendor/:id', (req, res) => {
  const { id } = req.params;
  db1.query('DELETE FROM vendor_master WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Item deleted successfully' });
  });
});








 
//spec dropdown api

app.get('/api/type_equipment', (req, res) => {
  const query = 'SELECT equipment_name FROM type_of_equipment';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.equipment_name);
    res.json(values);
  });
});

app.get('/api/type_usage', (req, res) => {
  const query = 'SELECT type_of_usage FROM type_of_usage';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_usage);
    res.json(values);
  });
});

app.get('/api/machine_location', (req, res) => {
  const query = 'SELECT machine_location FROM machine_location';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.machine_location);
    res.json(values);
  });
});


app.get('/api/machine_room', (req, res) => {
  const query = 'SELECT machine_room FROM machine_room';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.machine_room);
    res.json(values);
  });
});

app.get('/api/machine_room_new', (req, res) => {
  const query = 'SELECT machineroomnew FROM machineroomnew';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.machineroomnew);
    res.json(values);
  });
});

app.get('/api/controller_drive_type', (req, res) => {
  const query = 'SELECT controller_drive_type FROM controller_drive_type';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.controller_drive_type);
    res.json(values);
  });
});


app.get('/api/type_of_operation', (req, res) => {
  const query = 'SELECT type_of_operation  FROM type_of_operation';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_operation);
    res.json(values);
  });
});

app.get('/api/grouping_type', (req, res) => {
  const query = 'SELECT grouping_type  FROM grouping_type';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.grouping_type);
    res.json(values);
  });
});


app.get('/api/traction_category', (req, res) => {
  const query = 'SELECT traction_category  FROM traction_category';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.traction_category);
    res.json(values);
  });
});

app.get('/api/rope_wrap_details', (req, res) => {
  const query = 'SELECT rope_wrap_details  FROM rope_wrap_details';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.rope_wrap_details);
    res.json(values);
  });
});


app.get('/api/type_of_roping', (req, res) => {
  const query = 'SELECT type_of_roping  FROM type_of_roping';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_roping);
    res.json(values);
  });
});

app.get('/api/machine_type', (req, res) => {
  const query = 'SELECT machine_type  FROM machine_type';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.machine_type);
    res.json(values);
  });
});

app.get('/api/type_of_motor', (req, res) => {
  const query = 'SELECT type_of_motor  FROM type_of_motor';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_motor);
    res.json(values);
  });
});


app.get('/api/door_operator', (req, res) => {
  const query = 'SELECT door_operator  FROM door_operator';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.door_operator);
    res.json(values);
  });
});

app.get('/api/type_of_opening', (req, res) => {
  const query = 'SELECT type_of_openings  FROM type_of_openings';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_openings);
    res.json(values);
  });
});

app.get('/api/car_operating_panels', (req, res) => {
  const query = 'SELECT car_operating_panels  FROM car_operating_panels';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.car_operating_panels);
    res.json(values);
  });
});

app.get('/api/car_indicator_type', (req, res) => {
  const query = 'SELECT car_indicator_type  FROM car_indicator_type';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.car_indicator_type);
    res.json(values);
  });
});

app.get('/api/multimedia_display', (req, res) => {
  const query = 'SELECT multimedia_display  FROM multimedia_display';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.multimedia_display);
    res.json(values);
  });
});


app.get('/api/cabin_fans', (req, res) => {
  const query = 'SELECT cabin_fans  FROM cabin_fans';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.cabin_fans);
    res.json(values);
  });
});

app.get('/api/type_of_cabin_fan', (req, res) => {
  const query = 'SELECT type_of_cabin_fan  FROM type_of_cabin_fan';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_cabin_fan);
    res.json(values);
  });
});

app.get('/api/type_of_call_buttons', (req, res) => {
  const query = 'SELECT type_of_call_buttons  FROM type_of_call_buttons';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_call_buttons);
    res.json(values);
  });
});


app.get('/api/stop_button', (req, res) => {
  const query = 'SELECT stop_button  FROM stop_button';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.stop_button);
    res.json(values);
  });
});

app.get('/api/service_cabinet', (req, res) => {
  const query = 'SELECT service_cabinet  FROM service_cabinet';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.service_cabinet);
    res.json(values);
  });
});

app.get('/api/voice_announcement', (req, res) => {
  const query = 'SELECT voice_announcement  FROM voice_announcement';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.voice_announcement);
    res.json(values);
  });
});

app.get('/api/handrail', (req, res) => {
  const query = 'SELECT handrail  FROM handrail';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.handrail);
    res.json(values);
  });
});


app.get('/api/cabin_bumper', (req, res) => {
  const query = 'SELECT cabin_bumper  FROM cabin_bumper';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.cabin_bumper);
    res.json(values);
  });
});



app.get('/api/auto_attendant', (req, res) => {
  const query = 'SELECT auto_attendant  FROM auto_attendant';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.auto_attendant);
    res.json(values);
  });
});

app.get('/api/auto_independant', (req, res) => {
  const query = 'SELECT auto_independant  FROM auto_independant';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.auto_independant);
    res.json(values);
  });
});

app.get('/api/non_stop', (req, res) => {
  const query = 'SELECT non_stop  FROM non_stop';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.non_stop);
    res.json(values);
  });
});

app.get('/api/fan_switch', (req, res) => {
  const query = 'SELECT fan_switch  FROM fan_switch';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.fan_switch);
    res.json(values);
  });
});

app.get('/api/hall_indicator_type', (req, res) => {
  const query = 'SELECT hall_indicator_type  FROM hall_indicator_type';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.hall_indicator_type);
    res.json(values);
  });
});

app.get('/api/hall_laterns', (req, res) => {
  const query = 'SELECT hall_laterns  FROM hall_laterns';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.hall_laterns);
    res.json(values);
  });
});


app.get('/api/arrival_chime', (req, res) => {
  const query = 'SELECT arrival_chime  FROM arrival_chime';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.arrival_chime);
    res.json(values);
  });
});


app.get('/api/risers_at_main_lobby', (req, res) => {
  const query = 'SELECT risers_at_main_lobby  FROM risers_at_main_lobby';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.risers_at_main_lobby);
    res.json(values);
  });
});

app.get('/api/risers_at_other_floors', (req, res) => {
  const query = 'SELECT risers_at_other_floors  FROM risers_at_other_floors';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.risers_at_other_floors);
    res.json(values);
  });
});


app.get('/api/hall_call_type_at_main_lobby', (req, res) => {
  const query = 'SELECT hall_call_type_at_main_lobby  FROM hall_call_type_at_main_lobby';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.hall_call_type_at_main_lobby);
    res.json(values);
  });
});


app.get('/api/hall_call_type_at_all_floors', (req, res) => {
  const query = 'SELECT hall_call_type_at_all_floors  FROM hall_call_type_at_all_floors';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.hall_call_type_at_all_floors);
    res.json(values);
  });
});


app.get('/api/no_of_car_buffers', (req, res) => {
  const query = 'SELECT no_of_car_buffers  FROM no_of_car_buffers';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.no_of_car_buffers);
    res.json(values);
  });
});

app.get('/api/type_of_car_buffers', (req, res) => {
  const query = 'SELECT type_of_car_buffers  FROM type_of_car_buffers';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_car_buffers);
    res.json(values);
  });
});

app.get('/api/no_of_cwt_buffer', (req, res) => {
  const query = 'SELECT no_of_cwt_buffer  FROM no_of_cwt_buffer';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.no_of_cwt_buffer);
    res.json(values);
  });
});

app.get('/api/type_of_cwt_buffer', (req, res) => {
  const query = 'SELECT type_of_cwt_buffer  FROM type_of_cwt_buffer';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.type_of_cwt_buffer);
    res.json(values);
  });
});

app.get('/api/manual_rescue', (req, res) => {
  const query = 'SELECT manual_rescue  FROM manual_rescue';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.manual_rescue);
    res.json(values);
  });
});

app.get('/api/e_light', (req, res) => {
  const query = 'SELECT e_light  FROM e_light';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.e_light);
    res.json(values);
  });
});

app.get('/api/e_alarm', (req, res) => {
  const query = 'SELECT e_alram  FROM e_alram';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.e_alram);
    res.json(values);
  });
});

app.get('/api/e_intercom', (req, res) => {
  const query = 'SELECT e_intercom  FROM e_intercom';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.e_intercom);
    res.json(values);
  });
});

app.get('/api/ard_operation', (req, res) => {
  const query = 'SELECT ard_operation  FROM ard_operation';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.ard_operation);
    res.json(values);
  });
});

app.get('/api/ard_audio', (req, res) => {
  const query = 'SELECT ard_audio  FROM ard_audio';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.ard_audio);
    res.json(values);
  });
});


app.get('/api/ard_visuals', (req, res) => {
  const query = 'SELECT ard_visuals  FROM ard_visuals';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.ard_visuals);
    res.json(values);
  });
});

app.get('/api/fireman_operation', (req, res) => {
  const query = 'SELECT fireman_operation  FROM fireman_operation';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.fireman_operation);
    res.json(values);
  });
});


app.get('/api/fireman_emerg_return', (req, res) => {
  const query = 'SELECT fireman_emerg_return  FROM fireman_emerg_return';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.fireman_emerg_return);
    res.json(values);
  });
});


app.get('/api/fireman_audio', (req, res) => {
  const query = 'SELECT fireman_audio  FROM fireman_audio';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.fireman_audio);
    res.json(values);
  });
});

app.get('/api/fireman_visual', (req, res) => {
  const query = 'SELECT fireman_visual  FROM fireman_visual';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.fireman_visual);
    res.json(values);
  });
});

app.get('/api/passenger_overload_operation', (req, res) => {
  const query = 'SELECT passenger_overload_operation  FROM passenger_overload_operation';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.passenger_overload_operation);
    res.json(values);
  });
});

app.get('/api/passenger_overload_visual', (req, res) => {
  const query = 'SELECT passenger_overload_visual  FROM passenger_overload_visual';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.passenger_overload_visual);
    res.json(values);
  });
});


app.get('/api/passenger_overload_audio', (req, res) => {
  const query = 'SELECT passenger_overload_audio  FROM passenger_overload_audio';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.passenger_overload_audio);
    res.json(values);
  });
});


app.get('/api/seismic_sensor_operation', (req, res) => {
  const query = 'SELECT seismic_sensor_operation  FROM seismic_sensor_operation';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching values from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const values = results.map((row) => row.seismic_sensor_operation);
    res.json(values);
  });
});















app.get('/api/get-approval-count', (req, res) => {
  const sqlQuery = 'SELECT COUNT(*) AS count FROM report_files WHERE report_status = 0 AND reject = 0';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results[0]); // Send only the count
    }
  });
});



app.get('/api/get-emp-count', (req, res) => {
  
  const sqlQuery = 'SELECT * FROM emp_data';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});




app.get('/api/get-login-count', (req, res) => {
  
  const sqlQuery = 'SELECT * FROM clientadmin';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});





app.get('/api/approval-reporta', (req, res) => {
  const sqlQuery = 'SELECT id, contract, document_id, unit_name, inspector_name, building_name,report_id FROM report_files WHERE report_status = 1';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', sqlQuery, 'Error:', err); // Add detailed logs
      res.status(500).send('Server Error');
    } else {
      console.log('Fetched data:', results); // Log the fetched results
      res.json(results);
    }
  });
});



// Endpoint to stream PDF files
app.get('/api/reportapprovalpdf/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT file_data FROM report_files WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].file_data;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});



app.get('/api/get-approval-report-count', (req, res) => {
  const sqlQuery = 'SELECT COUNT(*) AS count FROM report_files WHERE report_status = 1';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results[0]); // Send only the count
    }
  });
});




app.get('/api/nonapproval-reporta', (req, res) => {
  const sqlQuery = 'SELECT id, contract, document_id, unit_name, inspector_name, building_name, rejected_reason FROM report_files WHERE reject = 1';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', sqlQuery, 'Error:', err); // Add detailed logs
      res.status(500).send('Server Error');
    } else {
      console.log('Fetched data:', results); // Log the fetched results
      res.json(results);
    }
  });
});



// Endpoint to stream PDF files
app.get('/api/reportnonapprovalpdf/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT file_data FROM report_files WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].file_data;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${id}.pdf"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});



app.get('/api/get-nonapproval-report-count', (req, res) => {
  const sqlQuery = 'SELECT COUNT(*) AS count FROM report_files WHERE reject = 1';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results[0]); // Send only the count
    }
  });
});



app.get('/api/feedbackdash', (req, res) => {
  const sqlQuery = 'SELECT * FROM unit_details WHERE feed_back = 1';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', sqlQuery, 'Error:', err);
      res.status(500).send('Server Error');
      return;
    }

    console.log('Fetched data:', results);

    const processedResults = results.map((record) => {
      let ratingCounts = [];
      let formattedOptions = '';

      try {
        // Parse the rating JSON string
        const ratingArray = JSON.parse(record.rating);
        ratingCounts = ratingArray.map(row => row.filter(num => num === 1).length);
      } catch (error) {
        console.error('Error parsing rating JSON for record:', record, 'Error:', error);
      }

      try {
        // Parse and format the options JSON
        const optionsObj = JSON.parse(record.options);
        formattedOptions = Object.values(optionsObj)
          .filter(value => typeof value === 'string' && value.trim() !== '') // Filter non-empty strings
          .join('\n'); // Join the values with newlines
      } catch (error) {
        console.error('Error parsing options JSON for record:', record, 'Error:', error);
      }

      return {
        ...record,
        ratingCounts,      // Include rating counts
        formattedOptions,  // Include formatted options
      };
    });

    console.log('Processed data:', processedResults);
    res.json(processedResults);
  });
});



app.get('/api/get-feedback-count', (req, res) => {
  const sqlQuery = 'SELECT COUNT(*) AS count FROM unit_details WHERE feed_back = 1';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results[0]); // Send only the count
    }
  });
});






app.get('/api/get-spec-count', (req, res) => {
  const sqlQuery = 'SELECT COUNT(unit_no) AS count FROM breif_spec WHERE unit_no IS NOT NULL AND unit_no != ""'; // Count non-null unit_no

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json({ count: results[0].count }); // Send the count in a response
    }
  });
});












app.get('/api/feedbackquestion', (req, res) => {
  const sqlQuery = 'SELECT * FROM feedback_question';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', sqlQuery, 'Error:', err); // Add detailed logs
      res.status(500).send('Server Error');
    } else {
      console.log('Fetched data:', results); // Log the fetched results
      res.json(results);
    }
  });
});


// spec-pdf-api

app.get('/api/specpdf', (req, res) => {
  const sqlQuery = 'SELECT * FROM breif_spec';

  db1.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});



//excel download and upload by mugesh
app.post('/upload-excel-report', upload1.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Destructure values from req.body
  const { projectName, buildingNO, place, documentidForUrl, unit_name, inspector_name, report_id, contract_no } = req.body;

  // Ensure unit_name is an array and join it into a comma-separated string
  const Order_unit_str = Array.isArray(unit_name) ? unit_name.join(', ') : unit_name;

  const fileData = req.file.buffer;

  // Step 1: Check if a file with the same identifiers already exists
  const checkQuery = `
    SELECT id 
    FROM excel_files 
    WHERE documentidForUrl = ? AND Order_unit_str = ? AND contract_no = ? AND report_id = ? AND buildingNO = ?
  `;

  db1.execute(checkQuery, [documentidForUrl, Order_unit_str, contract_no, report_id, buildingNO], (checkErr, results) => {
    if (checkErr) {
      console.error('Error checking for existing file:', checkErr);
      return res.status(500).send('Error checking for existing file.');
    }

    if (results.length > 0) {
      const existingFileId = results[0].id;

      // Step 2: Delete the existing file
      const deleteQuery = 'DELETE FROM excel_files WHERE id = ?';

      db1.execute(deleteQuery, [existingFileId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error deleting existing file:', deleteErr);
          return res.status(500).send('Error deleting existing file.');
        }

        console.log(`Existing file with ID ${existingFileId} deleted.`);
        insertNewFile(); // Call the function to insert the new file
      });
    } else {
      insertNewFile(); // No existing file, insert the new file directly
    }
  });

  // Step 3: Insert the new file into the database
  function insertNewFile() {
    const insertQuery = `
      INSERT INTO excel_files 
      (projectName, buildingNO, place, documentidForUrl, Order_unit_str, inspector_name, report_id, contract_no, file_data) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db1.execute(insertQuery, [projectName, buildingNO, place, documentidForUrl, Order_unit_str, inspector_name, report_id, contract_no, fileData], (insertErr) => {
      if (insertErr) {
        console.error('Error inserting new file:', insertErr);
        return res.status(500).send('Error inserting new file.');
      }

      res.json('File uploaded and stored successfully, replacing the old one if it existed.');
    });
  }
});



// Endpoint to stream the file from the database
app.get('/api/excelview/:id', (req, res) => {
  const id = req.params.id;

  // Query the database to fetch the file data by ID
  db1.query('SELECT file_data FROM excel_files WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching file:', err);
      return res.status(500).send('Error fetching file');
    }

    if (results.length === 0) {
      return res.status(404).send('File not found');
    }

    const fileData = results[0].file_data;

    // Set the headers to serve the file (set MIME type based on your file type)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `inline; filename="${id}.xlsx"`);

    // Send the file content to the client
    res.send(fileData);
  });
});



app.get('/api/excel-report-dash', (req, res) => {
  const encodedValue = req.query.encodeValue;
  console.log('val', encodedValue);


  const sqlQuery = 'SELECT * FROM excel_files where contract_no=?';

  db1.query(sqlQuery, [encodedValue], (err, results) => {
    if (err) {
      console.error('Error executing query:', sqlQuery, 'Error:', err); // Add detailed logs
      res.status(500).send('Server Error');
    } else {
      console.log('Fetched data:', results); // Log the fetched results
      res.json(results);
    }
  });
});


app.get('/api/excel-reportins', (req, res) => {
 

  const sqlQuery = 'SELECT * FROM excel_files';

  db1.query(sqlQuery,  (err, results) => {
    if (err) {
      console.error('Error executing query:', sqlQuery, 'Error:', err); // Add detailed logs
      res.status(500).send('Server Error');
    } else {
      console.log('Fetched data:', results); // Log the fetched results
      res.json(results);
    }
  });
});































 

////server.js////-prasanna
// API endpoint to update unit_no for a specific document_id at index 0 of the array
app.put('/api/update-unit-details', (req, res) => {
  const { document_id, new_unit_no } = req.body;

  // Validate input
  if (!document_id || !new_unit_no) {
    return res.status(400).json({ error: 'Missing required fields: document_id and new_unit_no' });
  }

  // SQL query to update only the first index (0) of the unit_no array
  const query = `
    UPDATE unit_details 
    SET unit_no = JSON_SET(unit_no, '$[0]', ?)
    WHERE document_id = ?`;

  db1.query(query, [new_unit_no, document_id], (err, result) => {
    if (err) {
      console.error('Error updating unit_no:', err);
      return res.status(500).json({ error: 'Error updating unit_no in the database' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Document ID not found' });
    }

    // After the update, query the updated unit_no for logging purposes
    const fetchUpdatedQuery = `
      SELECT unit_no 
      FROM unit_details 
      WHERE document_id = ?`;

    db1.query(fetchUpdatedQuery, [document_id], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error('Error fetching updated unit_no:', fetchErr);
        return res.status(500).json({ error: 'Error fetching updated unit_no' });
      }

      // Log the updated unit_no to the console
      console.log('Updated unit_no:', fetchResult[0].unit_no);

      // Send response back to the client
      res.status(200).json({ message: 'Unit number updated successfully', updated_unit_no: fetchResult[0].unit_no });
    });
  });
});



// app.get('/api/get-inf-active-counts', (req, res) => {
//   const query = `
//     SELECT
//       SUM(CASE WHEN i_status = 1 AND 
//         (MONTH(schedule_from) = MONTH(CURDATE()) AND YEAR(schedule_from) = YEAR(CURDATE())) OR
//         (MONTH(schedule_to) = MONTH(CURDATE()) AND YEAR(schedule_to) = YEAR(CURDATE()))
//       THEN 1 ELSE 0 END) AS activestatus1Count
//     FROM inf_26
//   `;


//   db1.query(query, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).send('Server Error');
//     }

//     const { activestatus1Count } = result[0];
//     console.log('Active Status 1 Count (last 30 days):', activestatus1Count);  // Log the count to the console
//     res.json({ activestatus1Count });  // Send count back in the response
//   });
// });








app.get('/api/get-inf-active-counts', (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN i_status = 1 AND 
        ((MONTH(schedule_from) = MONTH(CURDATE()) AND YEAR(schedule_from) = YEAR(CURDATE())) OR
        (MONTH(schedule_to) = MONTH(CURDATE()) AND YEAR(schedule_to) = YEAR(CURDATE())))
      THEN 1 ELSE 0 END) AS activestatus1Count
    FROM inf_26
  `;

  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server Error');
    }

    const { activestatus1Count } = result[0];
    console.log('Active Status 1 Count (last month):', activestatus1Count);  // Log the count to the console
    res.json({ activestatus1Count });  // Send count back in the response
  });
});

//map
app.get('/api/lift-locations', (req, res) => {
  const query = `SELECT id, lift_name, latitude, longitude, location, building_name, pincode FROM lift_locations`;

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Database query error' });
    }

    res.json(results);
  });
});


//mail notification
app.post('/api/send-email-notification', async (req, res) => {
  const { to, subject, message ,cc} = req.body;
  console.log('cc',cc);
  

  try {
    const transporterData = await TransporterData();

    // Nodemailer configuration using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: transporterData.user,
        pass: transporterData.pass,
      },
    });

    const mailOptions = {
      from: transporterData.user,    // Sender's email address
      to: to.join(','),                        // Recipient's email address
      subject: subject,              // Email subject
      text: message,   
      cc: cc.join(','),  // Join the CC emails as a comma-separated string
      // Email body (plain text)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Return success response
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    // Return error response
    res.status(500).json({ success: false, error: error.message, details: error });
  }
});


//mail id for approval
// Example backend code (Node.js)
app.get('/api/get-email-addresses', (req, res) => {
  db1.query('SELECT email FROM approval_mail', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    // Extract email addresses and send them as the response
    const emails = results.map(result => result.email);
    console.log('emails',emails);
    
    res.json({ success: true, emails: emails });
  });
});

//default cc for approval
// API to get default CC emails
app.get('/api/get-default-cc', (req, res) => {
  db1.query('SELECT email FROM approval_cc_mails', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    // Extract email addresses and send them as the response
    const ccEmails = results.map(result => result.email);
    res.json({ success: true, ccEmails: ccEmails });
  });
});


app.post('/api/get-email-addresses-inspectors', (req, res) => {
  const inspectors = req.body;
  const conditions = inspectors.map(inspector => `(name = '${inspector.name}' AND inspector_code = '${inspector.code}')`);
  const query = `SELECT name, email FROM inspectors WHERE ${conditions.join(' OR ')}`;

  db1.query(query, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.json(results); // Send the email addresses
    }
  });
});


app.get('/api/fetch_certificate', (req, res) => {
  const query = 'SELECT * FROM uploaded_files';

  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from uploaded_files:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(results); // Return the results as JSON
  });
});

app.post('/report_image', upload.single('file'), (req, res) => {
  // Check if the file is present in the request
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
    const { inspector_name, document_id, contract_no, project_name, building_name, unit_name } = req.body;
    const Order_unit_str = Array.isArray(unit_name) ? unit_name.join(', ') : unit_name;

  // Log the file data for debugging
  console.log('File data:', req.file);

  // Handle the file, e.g., save it to MySQL database
  // If you need to save the file path to the database, you can do so here
  // Example:
  const filePath = req.file.path;
  const fileName = req.file.filename;
  console.log("file is ",fileName)
  
  // Your MySQL logic to save the file information (if needed)
  const sql = "INSERT INTO report_image (file_name, zip_file,inspector_name, document_id, contract_no, project_name, building_name, unit_name) VALUES (?,?,?,?,?,?,?,?)";
  db1.query(sql, [fileName, fs.readFileSync(filePath),inspector_name, document_id, contract_no, project_name,project_name, Order_unit_str], (err, result) => {
    if (err) {
      console.log('err',err);
      
      return res.status(500).json({ error: 'Error saving file to database' });
    }
    res.status(200).json({ message: 'File uploaded and saved to database successfully' });
  });
});


/////////////report images for dashboard////////////
app.get('/api/download_report_image/:id', (req, res) => {
  const id = req.params.id;
  
  // Use db1 connection to query the database
  db1.query('SELECT zip_file FROM report_image WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching PDF:', err);
      return res.status(500).send('Error fetching PDF');
    }
    
    if (results.length === 0) {
      return res.status(404).send('Document not found');
    }
    
    const pdfContent = results[0].zip_file;

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${id}.zip"`);

    // Send the PDF content
    res.send(pdfContent);
  });
});

// API endpoint to get report images
app.get('/get-report-images', (req, res) => {
  const query = 'SELECT id,file_name,inspector_name, document_id, contract_no, project_name, building_name, unit_name FROM report_image'; // Query to select all images from the report_image table
  db1.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching images:', err);
      res.status(500).send('Error fetching images.');
      return;
    }

    // Send the images data back as JSON
    res.json(results);
  });
});


//reshedule request
app.put('/api/update_data_reschedule', (req, res) => {
  const {contractNumber,checked_count,checked_items,unchecked_count,unchecked_items,total_items,schedule_from,schedule_to,inspector_name,inspection_time_ins,total_units_schedule,balance_to_inspect,i_status,no_of_breakdays ,inspector_array,i_rejected } = req.body; // Assuming email is sent in the request body

  const query = 'UPDATE inf_26 SET checked_count = ?, checked_items=?, unchecked_count=?, unchecked_items=?,	total_items=?, inspection_time_ins=?, total_units_schedule=?, balance_to_inspect=?, schedule_from=?,schedule_to=?, inspector_list=? ,i_status=?, no_of_breakdays=?, inspector_array=?,i_rejected=? WHERE contract_number = ?';

  db1.query(query, [checked_count,JSON.stringify(checked_items),unchecked_count,JSON.stringify(unchecked_items),JSON.stringify(total_items),inspection_time_ins,total_units_schedule,balance_to_inspect,schedule_from,schedule_to,JSON.stringify(inspector_name),i_status,no_of_breakdays,JSON.stringify(inspector_array),i_rejected,contractNumber], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Name not found' });
      } else {
        res.json({ message: 'Email updated successfully' });
      }
    }
  });
});




// Get all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT id, email, created_at FROM approval_mail';
  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error fetching users');
    }
    
    // Log the result to the console
    console.log('Fetched users:', result);

    // Send the retrieved users as JSON
    res.status(200).json(result);
  });
});

app.post('/api/add_mail_insp', (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Prepare the query to insert the new user
  const query = 'INSERT INTO approval_mail (email, created_at) VALUES (?, NOW())';

  // Execute the query
  db1.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).send('Error adding user');
    }

    // Send a success message with the email that was added
    console.log(`User with email ${email} added successfully.`);
    return res.status(200).send({ message: `User with email ${email} has been added successfully.`, email });
  });
});

app.put('/api/update_mail_insp', async (req, res) => {
  const { email, originalEmail } = req.body; // Get email and originalEmail from request body

  if (!email || !originalEmail) {
    return res.status(400).json({ error: 'Email and originalEmail are required' });
  }

  try {
    // Ensure that we are updating the correct user based on the originalEmail
    const query = 'UPDATE approval_mail SET email = ? WHERE email = ?';
    const values = [email, originalEmail];

    db1.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Failed to update user email' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User email updated successfully' });
    });
  } catch (err) {
    console.error('Error in update-user route:', err);
    res.status(500).json({ error: 'Failed to update user email' });
  }
});




app.delete('/api/delete_mail_insp/:id', (req, res) => {
  const { id } = req.params; // Get user ID from the URL parameter

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const query = 'DELETE FROM approval_mail WHERE id = ?';
    const values = [id];

    db1.query(query, values, (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: 'Failed to delete user' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    });
  } catch (err) {
    console.error('Error in delete-user route:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});



// Get all users
app.get('/api/users_cc', (req, res) => {
  const query = 'SELECT id, email, created_at FROM approval_cc_mails';
  db1.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error fetching users');
    }
    
    // Log the result to the console
    console.log('Fetched users:', result);

    // Send the retrieved users as JSON
    res.status(200).json(result);
  });
});

app.post('/api/add_mail_cc', (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Prepare the query to insert the new user
  const query = 'INSERT INTO approval_cc_mails (email, created_at) VALUES (?, NOW())';

  // Execute the query
  db1.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).send('Error adding user');
    }

    // Send a success message with the email that was added
    console.log(`User with email ${email} added successfully.`);
    return res.status(200).send({ message: `User with email ${email} has been added successfully.`, email });
  });
});

app.put('/api/update_mail_cc', async (req, res) => {
  const { email, originalEmail } = req.body; // Get email and originalEmail from request body

  if (!email || !originalEmail) {
    return res.status(400).json({ error: 'Email and originalEmail are required' });
  }

  try {
    // Ensure that we are updating the correct user based on the originalEmail
    const query = 'UPDATE approval_cc_mails SET email = ? WHERE email = ?';
    const values = [email, originalEmail];

    db1.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Failed to update user email' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User email updated successfully' });
    });
  } catch (err) {
    console.error('Error in update-user route:', err);
    res.status(500).json({ error: 'Failed to update user email' });
  }
});




app.delete('/api/delete_mail_cc/:id', (req, res) => {
  const { id } = req.params; // Get user ID from the URL parameter

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const query = 'DELETE FROM approval_cc_mails WHERE id = ?';
    const values = [id];

    db1.query(query, values, (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: 'Failed to delete user' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    });
  } catch (err) {
    console.error('Error in delete-user route:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});











app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('DB Host:', dbHost);
console.log('DB User:', dbUser);
console.log('Server URL:', serverUrl);
console.log('Client URL:', clientUrl);

});