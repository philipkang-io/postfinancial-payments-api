# PostFinancial Solutions - Payment API

Example API endpoints that provide a hands-on element for the "Meet Agent Mode" course. The course teaches you how to modernize a legacy API using Postman Agent Mode. Follow Poe Stmanaut's journey as she transforms an undocumented, untested payment API into a production-ready service with automated testing, comprehensive documentation, and CI/CD integration.

---

## 🚀 Quick Start

### Prerequisites

Install these before starting course:
- **Node.js 18+** and npm
- **Git**
- **Postman Desktop App** (v10.18+)
- **VS Code** (or your preferred editor)

### Setup (5 minutes)

```bash
cd postfinancial-payments-api
npm install
cp .env.example .env
npm run dev
curl http://localhost:3000/health
```

### Connect Postman

1. Open **Postman Desktop**
2. Create a new workspace: "PostFinancial Modernization"
3. Enable **Agent Mode** in settings
4. Grant **File System Access** to the project folder
5. You're ready to start Lesson 1! 🎉

---

## 💻 API Overview

The PostFinancial Payment API includes:

### Endpoints (20+)
- **Payments** (6 endpoints): Create, confirm, cancel, status, list
- **Refunds** (5 endpoints): Create, approve, reject, get, list
- **Customers** (6 endpoints): CRUD operations, payment history
- **Webhooks** (3 endpoints): Receive events, list, get details
- **Health** (1 endpoint): Service health check

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Data**: In-memory store (for demo simplicity)
- **Testing**: Postman + Newman
- **CI/CD**: GitHub Actions (examples provided)

### Domain Objects
- Payment (with status: pending, processing, completed, failed, cancelled)
- Refund (with status: pending, approved, rejected, completed)
- Customer (with address, payment history)
- WebhookEvent (for async notifications)

---

## 📁 Repository Structure

```
postfinancial-payments-api/
├── src/                          # Application source code
│   ├── server.ts                 # Express server
│   ├── routes/                   # API route handlers
│   │   ├── payments.ts
│   │   ├── refunds.ts
│   │   ├── customers.ts
│   │   └── webhooks.ts
│   ├── types/                    # TypeScript definitions
│   └── data/                     # In-memory data store      
```

---

## 🛠️ Troubleshooting

### Common Issues

**Issue**: Agent Mode can't see files  
**Solution**: Check file system access in Postman Settings → Agent Mode

**Issue**: Server won't start  
**Solution**: Check that port 3000 is available, try `npm install` again

**Issue**: Tests failing  
**Expected!** The API uses in-memory storage, so data resets on restart

**Issue**: Newman not found  
**Solution**: Install globally: `npm install -g newman`

See individual phase guides for phase-specific troubleshooting.

---

## 📚 Additional Resources

### Postman Learning
- [Agent Mode Documentation](https://learning.postman.com/docs/agent-mode/)
- [Postman Learning Center](https://learning.postman.com/)
- [Postman Blog](https://blog.postman.com/)

### API Best Practices
- [OpenAPI Specification](https://spec.openapis.org/)
- [REST API Tutorial](https://restfulapi.net/)
- [API Design Patterns](https://swagger.io/resources/articles/best-practices-in-api-design/)

### CI/CD Integration
- [Newman Documentation](https://www.npmjs.com/package/newman)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Postman CLI](https://learning.postman.com/docs/postman-cli/postman-cli-overview/)

---

## 💡 Tips for Success

1. **Follow the lessons in order** - Each builds on the previous
2. **Take your time** - Understanding is more important than speed
3. **Experiment** - Try different prompts and approaches
4. **Review the output** - Don't blindly accept generated content
5. **Adapt to your needs** - Apply concepts to your own APIs
6. **Ask questions** - Use the support channels
7. **Share your experience** - Help others learn

---

## 🤝 Contributing

Found an issue or have an improvement?
- Report bugs: Create an issue with [BUG] prefix
- Suggest enhancements: Create an issue with [ENHANCEMENT] prefix
- Share your experience: Post in discussions

---

## 📧 Support & Feedback

**Course Questions**: learning@postfinancial.com  
**Technical Issues**: support@postfinancial.com  
**Agent Mode Feedback**: agent-mode-feedback@postman.com

---

## 📜 License

This course material is provided for educational purposes.  
© 2024 PostFinancial Solutions (Fictional Company for Educational Use)

---