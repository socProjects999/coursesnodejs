require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = path.resolve(__dirname, process.env.STATIC_DIR || './client');

// Middleware
app.use(express.static(STATIC_DIR));
app.use(express.json());

// Serve main landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

// Serve course pages
app.get('/courses/course1', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'courses', 'course1.html'));
});

app.get('/courses/course2', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'courses', 'course2.html'));
});

app.get('/courses/course3', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'courses', 'course3.html'));
});

// Serve success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'success.html'));
});

// Serve cancel page
app.get('/cancel', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'cancel.html'));
});

// Serve Stripe publishable key
app.get('/config', (req, res) => {
    res.json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});

// Create Stripe checkout session
app.post('/create-checkout-session/:pid', async (req, res) => {
    try {
        const priceId = req.params.pid;
        
        // Map course IDs to actual Stripe price IDs
        const priceIdMap = {
            'course1': process.env.COURSE1_PRICE_ID,
            'course2': process.env.COURSE2_PRICE_ID,
            'course3': process.env.COURSE3_PRICE_ID
        };

        const actualPriceId = priceIdMap[priceId] || priceId;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: actualPriceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Static files served from: ${STATIC_DIR}`);
});
