import dotenv from "dotenv";

(async () => {
    // load config-file
    dotenv.config({path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}`});

    // load app with current config
    const app = (await import('./app.js')).app;

    const hostname = '127.0.0.1';
    const port = 3001;
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
})() // https://github.com/wclr/ts-node-dev/issues/265
