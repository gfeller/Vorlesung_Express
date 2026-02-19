import path from 'path';
const __dirname = import.meta.dirname;

export const ROOT = path.resolve(__dirname);

export const PATHS = {
    root: ROOT,
    public: path.join(ROOT, 'public'),
    views: path.join(ROOT, 'views'),
};
