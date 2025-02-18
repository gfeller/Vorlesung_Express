import express from 'express';
const app = express();
const router = express.Router();


const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, hostname, (error) => {
    if(error){
        console.error(error);
    }
    else {
        console.log(`Server running at http://${hostname}:${port}/`);
    }
});