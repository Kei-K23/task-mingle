import { z } from "zod";
import { RedirectStripeSchema } from "./schema";

import type { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RedirectStripeSchema>;
export type ReturnType = ActionState<InputType, string>;
