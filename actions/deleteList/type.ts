import { z } from "zod";
import { DeleteListSchema } from "./schema";
import { List } from "@prisma/client";

import type { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
