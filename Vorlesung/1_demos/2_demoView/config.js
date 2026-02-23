import path from 'path';

const __dirname = import.meta.dirname;

export const ROOT = path.resolve("");
export const ConfigRoot = path.resolve(__dirname);

export const PATHS = {
    root: ROOT,
    data: (dbName) => path.join(ROOT, 'data', dbName),
    public: path.join(ROOT, 'public'),
    publicDefault: path.join(ConfigRoot, 'public'),
    views: path.join(ROOT, 'views'),
    viewsDefault: path.join(ConfigRoot, 'views'),
};
