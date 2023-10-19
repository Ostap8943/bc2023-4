const http = require("http");
const fs = require("fs");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  // Читаємо вміст XML файлу
  fs.readFile('data.xml', 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Помилка сервера");
    } else {
      // Обробка та фільтрація даних з XML
      const filteredData = filterXMLData(data);

      // Відправляємо відповідь клієнту
      res.writeHead(200, { 'Content-Type': 'application/xml' });
      res.end(filteredData);
    }
  });
};

function filterXMLData(xmlData) {
  // Опрацювання та фільтрація XML-даних
  // Додайте ваш код тут

  return xmlData; // Покищо повертаємо незмінений XML
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Сервер працює за адресою http://${host}:${port}`);
});
