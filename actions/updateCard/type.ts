import { z } from "zod";
import { UpdateCardSchema } from "./schema";
import { Card } from "@prisma/client";

import type { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
