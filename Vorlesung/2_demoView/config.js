import path from 'path';

const __dirname = import.meta.dirname;

export const ROOT = path.resolve(path.dirname(process.argv[1]));
export const ConfigRoot = path.resolve(__dirname);

export const PATHS = {
    root: ROOT,
    data: (dbName) => path.join(ROOT, 'data', dbName),
    public: path.join(ROOT, 'public'),
    views: path.join(ROOT, 'views'),
    viewsDefault: path.join(ConfigRoot, 'views'),
};
