/**
 * AI Code Review Test Suite
 * Contains intentional vulnerabilities ranging from Low to Critical severity.
 */

// ==========================================
// 1. CRITICAL SEVERITY
// ==========================================

// Category: Hardcoded Secrets & Credentials
function initializeCloudStorage() {
    console.log("Connecting to AWS S3 Bucket...");
    
    // AI should flag this immediately as CRITICAL
    const aws_access_key_id = "AKIAIOSFODNN7EXAMPLE";
    const aws_secret_access_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
    
    return connectToS3(aws_access_key_id, aws_secret_access_key);
}

// Category: Injection (SQL Injection)
function getUserProfile(userId) {
    const database = require('./dbConnection');
    
    // AI should catch the direct string concatenation vulnerable to SQLi
    let query = `SELECT * FROM users WHERE id = '${userId}'`;
    
    return database.execute(query);
}


// ==========================================
// 2. HIGH SEVERITY
// ==========================================

// Category: Broken Authentication / Insecure Direct Object References (IDOR)
function deleteInvoice(req, res) {
    const invoiceId = req.body.id;
    
    // AI should flag that it deletes purely based on ID without validating user ownership
    db.query("DELETE FROM invoices WHERE id = ?", [invoiceId], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.status(200).send("Invoice deleted successfully");
    });
}

// Category: Cryptographic Failures
const crypto = require('crypto');

function hashUserPassword(password) {
    // AI should flag the use of MD5 for passwords as high risk
    return crypto.createHash('md5').update(password).digest('hex');
}


// ==========================================
// 3. MEDIUM SEVERITY
// ==========================================

// Category: Cross-Site Scripting (XSS)
function greetUser(req, res) {
    const name = req.query.name || 'Guest';
    
    // AI should flag rendering unsanitized user input directly into HTML
    res.send(`<h1>Hello, ${name}!</h1>`);
}

// Category: Security Misconfiguration
function processPayment(req, res) {
    try {
        executePayment(req.body);
    } catch (error) {
        // AI should flag exposing full stack traces to the end user
        res.status(500).json({ 
            success: false, 
            message: "Payment Failed", 
            debugInfo: error.stack 
        });
    }
}


// ==========================================
// 4. LOW SEVERITY / CODE SMELL
// ==========================================

// Category: Dead Code & Redundant Assignments
function calculateTotal(price, tax) {
    let finalPrice = price + (price * tax);
    return finalPrice;
    
    // AI should flag this entire section as unreachable code
    let discount = 0.10; 
    console.log("Applying discount...");
    return finalPrice - (finalPrice * discount);
}


// Helper placeholder functions to prevent execution errors during testing
function connectToS3(key, secret) { return true; }
function executePayment(data) { throw new Error("Database timeout connection failed at line 142."); }
