import { z } from "zod";
import { UpdateListOrderSchema } from "./schema";
import { List } from "@prisma/client";

import type { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
