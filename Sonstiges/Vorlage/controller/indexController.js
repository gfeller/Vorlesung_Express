export class IndexController {
    index(req, res) {
        res.render("index", {data: "Hello World", dark: true});
    };
}

export const indexController = new IndexController();
