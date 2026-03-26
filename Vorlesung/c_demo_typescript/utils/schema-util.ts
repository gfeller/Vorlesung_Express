import {z} from 'zod';
import {HttpError} from './http-error';

export class SchemaUtil {
    static parse<T>(schema: z.ZodType<T>, data: unknown): T | false{
        const result = schema.safeParse(data);
        if (!result.success) {
            return false;
        }
        return result.data;
    }

    static parseOrThrow<T>(schema: z.ZodType<T>, data: unknown): T {
        const result = schema.safeParse(data);
        if (!result.success) {
            throw new HttpError(400,  result.error, "schema_validation_error");
        }
        return result.data;
    }
}
