const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'db4free.net', // O endereço da conexão (localhost).
    user     : 'admin_tsi',     // O nome de usuário do banco.
    password : 'admin@123',        // A senha do banco.
    database : 'qrmove'   // O nome do seu database.
  });

  // Iniciando o app.
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

app.post('/descricao', function (req, res) {
    const { idQRCode } = req.body; // Assuming the QR code data is sent in the request body.

    if (!idQRCode) {
        res.status(400).send('Bad Request: QR code data missing.');
        return;
    }

    connection.query(
        `SELECT descricao FROM Sala s join QRCode q WHERE q.idQRCode = ? and q.idSala = s.idSala`,
        [idQRCode],
        function (error, results, fields) {
            if (error) {
                console.error(error);

                // Return an error response with an 'error' property
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (results.length > 0) {
                res.send(results);
            } else {
                res.status(404).json({ error: 'QR Code not found.' });
            }
        }
    );
});

// Iniciando o servidor.
app.listen(3000, () => {
    console.log('Vai no navegador e entra em http://192.168.53.109:3000/descricao pra ver os usuários cadastrados.');
   });
   

