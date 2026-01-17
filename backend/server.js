    // backend/server.js
    // This Node.js Express server now handles a simple contact form submission.

    // Load environment variables (dotenv) is included for future use, not critical for this simple form.
    require('dotenv').config();
    const express = require('express');
    const cors = require('cors'); // Required for cross-origin requests from frontend

    // Initialize Express app
    const app = express();
    const port = process.env.PORT || 3001; // Backend will run on port 3001

    // Middleware to enable CORS for cross-origin requests from the frontend
    // This allows your React app (e.g., on port 5173) to send requests to this backend (on port 3001).
    app.use(cors());
    // Middleware to parse JSON request bodies sent from the frontend
    app.use(express.json());

    /**
     * POST /contact endpoint
     * This route handles contact form submissions from the frontend.
     * It expects JSON data with 'email' and 'message' fields.
     */
    app.post('/contact', (req, res) => {
        const { email, message } = req.body; // Extract data from the request body

        // Basic server-side validation for demonstration
        if (!email || !message) {
            // If email or message is missing, send a 400 Bad Request response
            return res.status(400).json({ success: false, message: "Email and message are required." });
        }

        // In a real-world application, here you would:
        // 1. Sanitize input data (prevent XSS, injection attacks).
        // 2. Save the data to a database (e.g., MongoDB, PostgreSQL, Firestore).
        // 3. Send an email notification (e.g., using Nodemailer, SendGrid).
        // 4. Integrate with a CRM system.

        // For now, we'll just log the received data to the backend console.
        console.log(`\n--- New Contact Form Submission ---`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        console.log(`-----------------------------------\n`);

        // Send a success response back to the frontend.
        // The frontend will use this 'success: true' and 'message' to update its UI.
        res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
    });

    /**
     * GET / (Root endpoint)
     * A simple health check or welcome message for the backend.
     * You can visit http://localhost:3001 in your browser to see this.
     */
    app.get('/', (req, res) => {
        res.send('JR Tech Solutions Backend is running. Ready to receive POST requests at /contact.');
    });

    // Start the Express server and listen for incoming requests on the specified port.
    app.listen(port, () => {
        console.log(`Backend server running on http://localhost:${port}`);
    });
    