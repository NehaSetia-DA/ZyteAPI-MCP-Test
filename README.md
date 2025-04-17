# Zyte MCP Server

A Node.js server that integrates with the Zyte API to provide three main functionalities:
- Unblocker: Extract HTML content from any URL
- Article Extractor: Get structured article data
- Product Extractor: Extract product information

## Features

- Modern web interface for easy interaction
- Three distinct endpoints for different extraction types
- Error handling and logging
- Responsive design
- Real-time results display

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Zyte API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zyte-mcp-server.git
cd zyte-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
touch .env
```

4. Add your Zyte API key to the `.env` file:
```
ZYTE_API_KEY=your_api_key_here
```

## Usage

1. Start the server:
```bash
node server.js
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Use the web interface to:
   - Enter URLs for extraction
   - Choose the type of extraction (Unblocker, Article, or Product)
   - View the results in real-time

## API Endpoints

### Unblocker
```
POST /mcp/unblocker
Body: { "url": "https://example.com" }
```

### Article Extractor
```
POST /mcp/article
Body: { "url": "https://example.com/article" }
```

### Product Extractor
```
POST /mcp/product
Body: { "url": "https://example.com/product" }
```

## Example Responses

### Unblocker Response
```json
{
  "url": "https://example.com",
  "statusCode": 200,
  "html": "<html>...</html>"
}
```

### Article Response
```json
{
  "url": "https://example.com/article",
  "statusCode": 200,
  "article": {
    "headline": "Article Title",
    "description": "Article description",
    "articleBody": "Full article content",
    "mainImage": { "url": "https://example.com/image.jpg" },
    "datePublishedRaw": "2024-04-17"
  }
}
```

### Product Response
```json
{
  "url": "https://example.com/product",
  "statusCode": 200,
  "product": {
    "name": "Product Name",
    "price": "99.99",
    "currency": "USD",
    "description": "Product description",
    "mainImage": { "url": "https://example.com/image.jpg" },
    "sku": "ABC123",
    "availability": "InStock"
  }
}
```

## Error Handling

The server handles various types of errors:
- Authentication errors (401)
- Certificate issues (421)
- Invalid URLs
- Network errors

All errors are logged and returned with appropriate status codes and messages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Zyte API](https://www.zyte.com/) for providing the extraction services
- [Express.js](https://expressjs.com/) for the web server framework
- [Bootstrap](https://getbootstrap.com/) for the UI components 