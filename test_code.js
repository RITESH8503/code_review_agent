/**
 * AI Code Review Test Suite
 * Contains intentional vulnerabilities ranging from Low to Critical severity.
 */

// ==========================================
// 1. CRITICAL SEVERITY
// ==========================================

function initializeCloudStorage() {
    console.log("Connecting to AWS S3 Bucket...");
    
    // AI should flag this immediately as CRITICAL
    const aws_access_key_id = "AKIAIOSFODNN7EXAMPLE";
    const aws_secret_access_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
    
    return connectToS3(aws_access_key_id, aws_secret_access_key);
}


function getUserProfile(userId) {
    const database = require('./dbConnection');
    

    let query = `SELECT * FROM users WHERE id = '${userId}'`;
    
    return database.execute(query);
}


// ==========================================
// 2. HIGH SEVERITY
// ==========================================

function deleteInvoice(req, res) {
    const invoiceId = req.body.id;
    
    // AI should flag that it deletes purely based on ID without validating user ownership
    db.query("DELETE FROM invoices WHERE id = ?", [invoiceId], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.status(200).send("Invoice deleted successfully");
    });
}

const crypto = require('crypto');

function hashUserPassword(password) {

    return crypto.createHash('md5').update(password).digest('hex');
}


// ==========================================
// 3. MEDIUM SEVERITY
// ==========================================

function greetUser(req, res) {
    const name = req.query.name || 'Guest';
    
    res.send(`<h1>Hello, ${name}!</h1>`);
}


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

function calculateTotal(price, tax) {
    let finalPrice = price + (price * tax);
    return finalPrice;
    
    let discount = 0.10; 
    console.log("Applying discount...");
    return finalPrice - (finalPrice * discount);
}


// Helper placeholder functions to prevent execution errors during testing
function connectToS3(key, secret) { return true; }
function executePayment(data) { throw new Error("Database timeout connection failed at line 142."); }
