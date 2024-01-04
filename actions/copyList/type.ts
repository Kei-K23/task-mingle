import { z } from "zod";
import { CopyListSchema } from "./schema";
import { List } from "@prisma/client";

import type { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnType = ActionState<InputType, List>;
