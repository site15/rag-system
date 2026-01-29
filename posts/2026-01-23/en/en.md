# [2026-01-23] My RAG System: How I Built a RAG for My Business Card Website in 8 Days

**TL;DR:**
In 8 days of part-time work, I built a RAG system using NestJS + PostgreSQL (pgvector) that processes ~11,000 document chunks.
The first version responded in about 4 minutes; after optimization, it took 40-60 seconds.
The main takeaway: RAG isn't "vector search + LLM," but rather data preparation, context filtering, and careful handling of prompts.

---

## Why I did this

The main goal of the project was to **create a RAG system** that could answer questions based on my knowledge and experience. This allowed me to understand real-world work with large volumes of documents.

The RAG system was integrated with my business card website [site15.ru](https://site15.ru). There, I showcase and describe some of my projects from the last 10 years: downloads, stars, views, npm libraries, group counters, posts, and karma on Habr and dev.to.

Technically, it's implemented like this: site15.ru frontend → site15.ru backend → rag-system server. The backend passes a special API key, which at least partially protects the site from unnecessary requests.

![API key entry form on the admin frontend, demonstrating access protection](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/api-key.png?raw=true)

Thus, site15.ru acts as a demo and interface for interacting with RAG.

[Chat frontend on site15.ru, example of a RAG request and response](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/chat.png?raw=true)

---

## Why RAG turned out to be more complicated than it seemed

At the start, the project looked simple:

> RAG = vector search + LLM

In practice, it turned out that most of the time was spent on:

- data preparation and segmentation,
- context filtering,
- generating and matching prompts.

The first version of the system did everything sequentially and responded in **about 4 minutes** even to a simple question.

---

## System Architecture

```
Data Sources (Telegram messages, articles, portfolios, resumes)
↓
Backend (NestJS)
├─ LLM module
├─ PostgreSQL + pgvector
├─ RxJS asynchronous pipeline
├─ Dialog Manager
└─ API controller for site15.ru
↓
RAG Components
├─ Question Transformer
├─ Document and Section Filtering
├─ Vector Search
└─ Prompt Generation
↓
LLM Providers
(OpenAI / Groq / Ollama)
```

![Swagger documentation from the backend, demonstrating the API for RAG](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/swagger.png?raw=true)

---

## Choosing a Stack

**Backend - NestJS**
I constantly write backends in NestJS, so the choice was obvious.

![Main file nestjs](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/nestjs.png?raw=true)

**Frontend - React Admin**
I needed an admin panel to manage data and prompts.

![List of Embedding Documents](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/embedding-list.png?raw=true)

![Embedding Document](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/embedding-item.png?raw=true)

**PostgreSQL + pgvector**
One system for regular data and vectors - simpler and more reliable than separate storage.

![Database Tables](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/db-tables.png?raw=true)

**Multiple LLM Providers**
Support for different providers allows you to use free limits and easily switch if needed.

![List of Neural Networks](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/llm-list.png?raw=true)

---

## Key Architectural Decision: Hierarchical Filtering

The main idea is to **not send everything to LLM**.
Request processing pipeline:

```
User request (frontend site15.ru)
↓
Backend site15.ru
↓
RAG server: query normalization
↓
Metadata filtering (11,000 → ~500)
↓
Section/header filtering (500 → ~200)
↓
Vector search (200 → 5–10)
↓
One optimized request in LLM
```

![Request/response pipeline visualization in the admin panel or architecture diagram](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/admin-messages.png?raw=true)

This significantly reduced the amount of data sent in LLM, and speed up responses.

---

## The biggest technical challenge

Creating metadata for 11,005 document chunks.
The cloud didn't allow for processing everything at once; I had to run it locally through LM Studio with the `qwen2.5-7b-instruct` model - it took 2 days on an RTX 2060 SUPER.

![LM Studio](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/lm-studio.png?raw=true)

---

## Why the first version was slow

**First version:** 8 intermediate prompts, consecutive LLM calls → ~4 minutes per response.

**After optimization:** 4 coordinated prompts, some stages are parallel, asynchronous queue on RxJS → 40–60 seconds.

---

## Prompts and Errors

Prompts turned out to be the most challenging aspect. Examples:

**Context Leak**

```
User: "Tell me about NestJS"
LLM: "NestJS is a great framework. By the way, I have a Telegram bot for coffee..."
```

**Instruction Conflict**

```
Prompt 1: Be brief
Prompt 2: Provide detailed examples
```

Conclusion: Fewer, but consistent prompts are better.

---

## Using AI in Development

About 70% of the code was written with the help of AI assistants, but without my architectural editing and debugging, it wouldn't have worked.

![AI-generated code](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/llm-code.png?raw=true)

---

## Security

- Checking the authorized IP address,
- Checking the API key for requests from the site15.ru backend.

The project is not production-ready, but this allows us to at least somewhat protect the main site from unnecessary requests.

![AuthGuard - IP / API key verification in the admin panel](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/auth-guard.png?raw=true)

---

## Deployment

- RAG server on a separate VPS,
- `docker-compose` for PostgreSQL and Ollama,
- backend via `pm2`,
- integration with site15.ru.

![Docker-compose](https://github.com/site15/rag-system/blob/main/posts/2026-01-23/ru/images/docker-compose.png?raw=true)

---

## Current status

Experimental project, not MVP, not production-ready.
Site15.ru serves as an interface for demonstrating RAG and project statistics.

---

## Future Plans

- Writing user scenario tests (checking response and pipeline correctness).
- Refactoring the LLM module to NestJS style.
- Adding analytics: processing time, number of LLM calls, token consumption.
- Automating deployment via Docker/Kubernetes.
- Improving accuracy and speed by optimizing context filtering.

---

## Conclusions

RAG is a complex engineering process: data preparation, context filtering, and careful prompt handling are more important than the LLM itself.

In 8 days of part-time work, I was able to assemble a working system, integrate it with site15.ru, and gain real-world experience with RAG.

---

## Links

[https://github.com/site15/rag-system](https://github.com/site15/rag-system) - Project repository
[https://site15.ru](https://site15.ru) - My business card website with support chat

#rag #ai #nestjs #postgresql #pgvector #llm #site15 #react
