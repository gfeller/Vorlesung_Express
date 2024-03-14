/*
import dotenv from "dotenv";



dotenv.config({ path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}`});
(async () =>{
    const app = (await import('./app')).app;

    const hostname = '127.0.0.1';
    const port = 3001;
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
})();

*/