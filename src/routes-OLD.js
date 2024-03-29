const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'db4free.net/', // O endereço da conexão (localhost).
    user     : 'admin_tsi',     // O nome de usuário do banco.
    password : 'admin@123',        // A senha do banco.
    database : 'qrmove'   // O nome do seu database.
  });

  // Iniciando o app.
const app = express();

// Criando uma rota GET que retorna os dados da tabela usuários.
app.get('/idQRCode', function (req, res) {
    // Conectando ao banco.
    connection.getConnection(function (err, connection) {
        if (err) {
            // Handle error, send an error response, or throw an exception
            res.status(500).send('Internal Server Error');
            return;
        }

        // Executando a query MySQL (selecionar todos os dados da tabela usuário).
        //const idQRCode = req.params.idQRCode;
        
        // connection.query(`SELECT descricao FROM Sala s JOIN QRCode q WHERE q.idQRCode = ${idQRCode} and q.idSala = s.idSala`, function (error, results, fields) {
        //     // Liberar a conexão, pois já terminamos de usar.
        //     connection.release();

        //     // Caso ocorra algum erro, não irá executar corretamente.
        //     if (error) {
        //         // Handle error, send an error response, or throw an exception
        //         res.status(500).send('Internal Server Error');
        //         return;
        //     }

        connection.query(`SELECT descricao from Sala`, function (error, results, fields) {
            // Liberar a conexão, pois já terminamos de usar.
            connection.release();

            // Caso ocorra algum erro, não irá executar corretamente.
            if (error) {
                // Handle error, send an error response, or throw an exception
                res.status(500).send('Internal Server Error');
                return;
            }

            // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
            res.send(results);
        });
    });
});


// Iniciando o servidor.
app.listen(3306, () => {
    console.log('Vai no navegador e entra em http://sql10.freemysqlhosting.net:3306/biruliro pra ver os usuários cadastrados.');
   });
   

