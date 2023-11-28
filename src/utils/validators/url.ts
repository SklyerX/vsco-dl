import { z } from "zod";

export const UrlValidator = z.object({
  url: z
    .string()
    .url()
    .regex(/^https:\/\/vsco\.co\/\w+\/?\/gallery$/, "URL"),
});
