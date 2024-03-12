import { z } from "zod";


export const createBlogSchema = z.object({
  title: z.string({ required_error: 'Please select a Title' }),
  imageUrl: z.any().optional(),
  description: z.string({ required_error: 'Please select Description' }),
  type: z.string({ required_error: 'Please select a Category' }),
  tags: z.string({ required_error: 'Please provide some tags' }).transform(value => value.toLowerCase()),
});