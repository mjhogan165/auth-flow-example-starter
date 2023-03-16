import { z } from "zod";

export const intParseableString = z.string().refine((s) => {
  try {
    parseInt(s);
    return true;
  } catch {
    return false;
  }
});
