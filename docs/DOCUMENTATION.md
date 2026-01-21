# RAG System Documentation Index

Welcome to the RAG System documentation. This index provides organized access to all available documentation resources.

## 📚 Documentation Resources

### API Integration Guides

#### [JavaScript Client Guide](./JAVASCRIPT_CLIENT_GUIDE.md)
Comprehensive guide for integrating with the Flow Controller API using JavaScript fetch:
- Base API configuration and authentication
- Core API methods (send message, get dialog, message trace, cancel message)
- Frontend integration examples (React, Vanilla JS, Browser wrappers)
- Advanced usage patterns (retry logic, caching, TypeScript definitions)
- Error handling best practices
- Production-ready code patterns

#### [Frontend Table Generator Documentation](./FRONTEND_TABLE_GENERATOR_DOCS.md)
Documentation for the automatic React Admin component generation:
- Overview of the table generation system
- Automatic field type handling and component mapping
- Special treatment of date fields (createdAt inclusion)
- Example generated components
- Customization options and regeneration process
- Field selection logic

### System Documentation

#### [Process Documentation (Russian)](./PROCESS_RU.md)
Detailed technical documentation covering:
- System architecture and components
- Message processing flow
- LLM integration and prompting
- Database schema and models
- API endpoints and controllers
- Development workflows and best practices

## 🚀 Getting Started

### Quick Links
- **API Base URL**: `http://localhost:3000/api`
- **Authentication**: API key via `x-api-key` header
- **Frontend**: React Admin dashboard auto-generated from Prisma schema

### Key Features
- **Automatic Code Generation**: Prisma schema → REST API → React Admin components
- **Smart Field Handling**: Automatic component selection based on field types
- **Built-in Date Display**: createdAt fields automatically included in tables
- **Comprehensive API Client**: Ready-to-use JavaScript integration examples

## 🛠️ Development Resources

### Prisma Generator
The custom `prisma-generator-nestjs-dto` creates:
- DTO classes with validation
- REST controllers
- React Admin components
- Database entities

### Code Generation Commands
```bash
# Regenerate all components after schema changes
cd backend
npx prisma generate
```

## 📖 Learning Path

1. **Beginner**: Start with [JavaScript Client Guide](./JAVASCRIPT_CLIENT_GUIDE.md) for API integration
2. **Intermediate**: Review [Frontend Table Generator Documentation](./FRONTEND_TABLE_GENERATOR_DOCS.md) for UI components
3. **Advanced**: Study [Process Documentation](./PROCESS_RU.md) for system architecture

## 🆘 Support

For issues and questions:
- Check the troubleshooting sections in respective guides
- Review the process documentation for architectural understanding
- Examine generated code examples for implementation patterns

---
*Last updated: January 2026*