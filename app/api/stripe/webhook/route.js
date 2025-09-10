import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabaseClient';

// 🟡 TODO: Add your Stripe secret key and webhook secret
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_xxx', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_xxx';

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session) {
  const userId = session.metadata?.supabase_user_id;
  
  if (!userId) {
    console.error('No user ID in session metadata');
    return;
  }

  // Update user profile
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'active',
      subscription_plan: 'professional',
    })
    .eq('id', userId);

  console.log('Checkout session completed for user:', userId);
}

async function handleSubscriptionUpdate(subscription) {
  const userId = subscription.metadata?.supabase_user_id;
  
  if (!userId) return;

  const subscriptionData = {
    user_id: userId,
    stripe_customer_id: subscription.customer,
    stripe_subscription_id: subscription.id,
    plan: subscription.items.data[0]?.price.nickname || 'professional',
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  };

  // Upsert subscription record
  await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id',
    });

  // Update profile
  await supabase
    .from('profiles')
    .update({
      subscription_status: subscription.status,
      subscription_plan: subscriptionData.plan,
    })
    .eq('id', userId);
}

async function handleSubscriptionDeleted(subscription) {
  const userId = subscription.metadata?.supabase_user_id;
  
  if (!userId) return;

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  // Update profile
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'inactive',
      subscription_plan: null,
    })
    .eq('id', userId);
}

async function handlePaymentSucceeded(invoice) {
  console.log('Payment succeeded for invoice:', invoice.id);
  // 🟡 TODO: Send confirmation email
}

async function handlePaymentFailed(invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  // 🟡 TODO: Send payment failed email and update subscription status
}