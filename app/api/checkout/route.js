import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabaseClient';

// 🟡 TODO: Add your Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_xxx', {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const { priceId, userId, email } = await request.json();

    // Verify user is authenticated
    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    // Check if customer already exists in Stripe
    let customer;
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (profile?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    } else {
      // Create new Stripe customer
      customer = await stripe.customers.create({
        email,
        metadata: {
          supabase_user_id: userId,
        },
      });

      // Save customer ID to profile
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', userId);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || 'price_default_47_monthly', // 🟡 TODO: Replace with actual price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      subscription_data: {
        metadata: {
          supabase_user_id: userId,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Get subscription status
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    // Get subscription from database
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      return NextResponse.json(
        { subscription: null, active: false }
      );
    }

    return NextResponse.json({
      subscription,
      active: subscription?.status === 'active',
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to get subscription' },
      { status: 500 }
    );
  }
}