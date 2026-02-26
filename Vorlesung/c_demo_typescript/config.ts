import {StringValue} from "ms";
import jwt from "jsonwebtoken";

const jwtSecret = "48s3MMZxAI9gSorqtQ6A8gZjOVl1hpmD"

const expiresIn : StringValue = "1d";
const algorithm :  jwt.Algorithm = "HS256"

export const CONFIG = {
    sha_secret: "pCI1xYXIEtr79otsF6XaUI6t",
    jwt_secret : jwtSecret,
    jwt_sign : {expiresIn: expiresIn, audience: "self", issuer: "pizza"},
    jwt_validate :  {secret: jwtSecret, audience: "self", issuer: "pizza", algorithms: [algorithm]},
};
