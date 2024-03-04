import { z } from "zod";

const OrderSchema = z.object({
    name: z.string().min(3),
    customer: z.string().min(10).optional()
});

const result = OrderSchema.safeParse({ name: "Mi" });
console.log(result.error);

