import express from 'express';
const app = express();
const port = 80;

app.use(express.static('docs'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});