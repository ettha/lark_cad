const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const lark = require("@larksuiteoapi/node-sdk");

dotenv.config();

const app = express();
const PORT = 3000;

// Allow requests from your frontend
app.use(cors());

// Create Lark API client
const client = new lark.Client({
    appId: process.env.LARK_APP_ID,
    appSecret: process.env.LARK_APP_SECRET,
    domain: lark.Domain.Lark
});

// Test Lark connection
app.get("/test-lark", async (req, res) => {
    try {
        const response = await client.drive.file.list({
            params: {
                page_size: 10
            }
        });

        console.log("Lark connection successful!");
        console.log(response);

        res.json({
            success: true,
            message: "Lark connection works!",
            data: response.data
        });

    } catch (error) {
        console.error("Lark connection failed:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Lark connection failed.",
            error: error.message
        });
    }
});

// List files
app.get("/documents", async (req, res) => {
    try {
        const response = await client.drive.file.list({
            params: {
                folder_token: process.env.LARK_FOLDER_TOKEN,
                page_size: 200
            }
        });

        const files = response.data.files || [];

        res.json(files);

    } catch (error) {
        console.error("Could not retrieve files:");
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

