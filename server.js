require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Zyte API configuration
const ZYTE_API_URL = 'https://api.zyte.com/v1/extract';
const ZYTE_API_KEY = process.env.ZYTE_API_KEY;

// Helper function to make Zyte API requests
async function makeZyteRequest(url, extractType) {
    try {
        console.log('Making request to Zyte API:', {
            url,
            extractType,
            apiKey: ZYTE_API_KEY ? 'Present' : 'Missing'
        });

        const response = await axios.post(
            ZYTE_API_URL,
            {
                url: url,
                ...extractType
            },
            {
                auth: {
                    username: ZYTE_API_KEY,
                    password: ''
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'gzip,deflate'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Zyte API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });
        throw error;
    }
}

// MCP Endpoints
app.post('/mcp/unblocker', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        console.log('Unblocker request received for URL:', url);
        const result = await makeZyteRequest(url, { browserHtml: true });
        res.json({ html: result.browserHtml });
    } catch (error) {
        console.error('Unblocker endpoint error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch URL',
            details: error.message
        });
    }
});

app.post('/mcp/article', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const result = await makeZyteRequest(url, { article: true });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to extract article' });
    }
});

app.post('/mcp/product', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const result = await makeZyteRequest(url, { product: true });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to extract product' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 