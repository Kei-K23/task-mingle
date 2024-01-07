"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";

import { createSafeAction } from "@/lib/create-safe-action";
import { RedirectStripeSchema } from "./schema";
import { absolutePath } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const settingUrl = absolutePath(`/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      url = stripSession.url;
    } else {
      const stripSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "TaskMingle Pro",
                description: "Unlimited boards for your usage",
              },
              unit_amount: 100,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripSession.url || "";
    }
  } catch (e) {
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return {
    data: url,
  };
}

export const redirectStripe = createSafeAction(RedirectStripeSchema, handler);
