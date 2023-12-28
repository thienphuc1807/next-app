import { z } from "zod";

// data validation
export const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});
