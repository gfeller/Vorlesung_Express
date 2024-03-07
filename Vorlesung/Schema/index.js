import { z } from "zod";

const OrderSchema = z.object({
    name: z.string().min(3),
    customer: z.string().min(10).optional()
});

const result = OrderSchema.safeParse({ name: "Mi", hobby: "Wandern " });
console.log(result.data, result.error?.issues);

