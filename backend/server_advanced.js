const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const lark = require("@larksuiteoapi/node-sdk");

dotenv.config();

const app = express();
const PORT = 3000;


// Allow requests from your GitHub Pages site
app.use(cors());


// Create Lark client
const client = new lark.Client({
    appId: process.env.LARK_APP_ID,
    appSecret: process.env.LARK_APP_SECRET,
    domain: lark.Domain.Lark
});


// API endpoint for your webpage
app.get("/documents", async (req, res) => {

    try {

        const response = await client.drive.file.list({
            params: {
                folder_token: process.env.LARK_FOLDER_TOKEN,
                page_size: 200
            }
        });

        const files = response.data.files || [];

        const documents = files.map(file => ({
            name: file.name,
            url: file.url,
            type: file.type,
            token: file.token
        }));

        res.json(documents);

    } catch (error) {

        console.error("Lark API error:");
        console.error(error);

        res.status(500).json({
            error: "Could not retrieve documents from Lark."
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});