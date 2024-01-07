import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

// constant time for ms in a day
const DAY_IN_MS = 86_400_000;

export async function checkSubScription() {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValidSubscription =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValidSubscription;
}
