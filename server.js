const http = require("http");
const fs = require("fs");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  fs.readFile('data.xml', 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Помилка сервера");
    } else {
      const filteredData = filterXMLData(data);
      res.writeHead(200, { 'Content-Type': 'application/xml' });
      res.end(filteredData);
    }
  });
};

function filterXMLData(xmlData) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    const xmlResult = new XMLSerializer().serializeToString(xmlDoc);

    return xmlResult;
  } catch (err) {
    console.error('Помилка при обробці XML:', err);
    return xmlData;
  }
}
const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Сервер працює за адресою http://${host}:${port}`);
});
