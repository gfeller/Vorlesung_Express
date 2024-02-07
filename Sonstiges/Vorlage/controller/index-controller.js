export class IndexController {
    index(req, res) {
        res.render("index", {data: "Hello World"});
    };
}

export const indexController = new IndexController();
