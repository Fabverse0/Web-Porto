export const PORTFOLIO_DATA = {
  developer: {
    name: "Muhammad Fabian Rizky",
    brandName: "Fab.Dev",
    title: "Backend Software Engineer",
    subtitle: "Node.js & TypeScript • Microservices • Scalar OpenAPI Specs",
    bio: "I am Fabian, a 3rd-semester informatics student at UPN \"Veteran\" Jakarta with a strong interest in backend development and system design. I am always eager to learn, solve problems, and contribute to real-world development projects.",
    email: "mfabian.rizky@gmail.com",
    location: "Jakarta, Indonesia / Remote",
    status: "OPERATIONAL",
    pingMs: 12,
    github: "https://github.com/Fabverse0",
    linkedin: "https://www.linkedin.com/in/fabianrizky",
    twitter: "https://github.com/Fabverse0",
    resumeUrl: "/Fabian_CV.pdf",
    stats: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Avg Latency", value: "<15ms" },
      { label: "Completed Projects", value: "18+" },
      { label: "OpenAPI Specs", value: "100% Scalar" }
    ]
  },

  skills: [
    { name: "TypeScript", category: "Languages", icon: "FileCode", level: "Expert", percentage: 95, brandColor: "#3178C6", slug: "typescript", featured: true },
    { name: "Node.js / Express", category: "Languages", icon: "Server", level: "Expert", percentage: 96, brandColor: "#339933", slug: "nodedotjs", featured: true },
    { name: "PostgreSQL", category: "Databases", icon: "Database", level: "Expert", percentage: 92, brandColor: "#4169E1", slug: "postgresql", featured: true },
    { name: "Redis", category: "Databases", icon: "Zap", level: "Expert", percentage: 90, brandColor: "#DC382D", slug: "redis", featured: true },
    { name: "Scalar & OpenAPI 3.0", category: "API & Messaging", icon: "Globe", level: "Expert", percentage: 94, brandColor: "#2563EB", slug: "openapiinitiative", featured: true },
    { name: "WebSockets & Socket.io", category: "API & Messaging", icon: "MessageSquare", level: "Expert", percentage: 90, brandColor: "#010101", slug: "socketdotio", featured: true },
    { name: "Go (Golang)", category: "Languages", icon: "Code", level: "Advanced", percentage: 85, brandColor: "#00ADD8", slug: "go", featured: true },
    { name: "Python / FastAPI", category: "Languages", icon: "Terminal", level: "Advanced", percentage: 88, brandColor: "#3776AB", slug: "python", featured: false },
    { name: "ClickHouse", category: "Databases", icon: "HardDrive", level: "Intermediate", percentage: 78, brandColor: "#FFCC00", slug: "clickhouse", featured: false },
    { name: "MongoDB", category: "Databases", icon: "Database", level: "Advanced", percentage: 86, brandColor: "#47A248", slug: "mongodb", featured: false },
    { name: "Apache Kafka", category: "API & Messaging", icon: "Layers", level: "Advanced", percentage: 84, brandColor: "#E0234E", slug: "apachekafka", featured: true },
    { name: "RabbitMQ", category: "API & Messaging", icon: "MessageSquare", level: "Advanced", percentage: 82, brandColor: "#FF6600", slug: "rabbitmq", featured: false },
    { name: "gRPC & Protocol Buffers", category: "API & Messaging", icon: "Cpu", level: "Intermediate", percentage: 76, brandColor: "#2DA6B0", slug: "grpc", featured: false },
    { name: "Docker & Containerization", category: "Cloud & DevOps", icon: "Box", level: "Expert", percentage: 92, brandColor: "#2496ED", slug: "docker", featured: true },
    { name: "Kubernetes (k8s)", category: "Cloud & DevOps", icon: "Cloud", level: "Intermediate", percentage: 78, brandColor: "#326CE5", slug: "kubernetes", featured: false },
    { name: "AWS (S3, EC2, Lambda)", category: "Cloud & DevOps", icon: "CloudRain", level: "Advanced", percentage: 85, brandColor: "#FF9900", slug: "amazonaws", featured: true },
    { name: "CI/CD (GitHub Actions)", category: "Cloud & DevOps", icon: "GitBranch", level: "Advanced", percentage: 87, brandColor: "#2088FF", slug: "githubactions", featured: false }
  ],

  projects: [
    {
      id: "distributed-chat-engine",
      title: "Real-time Distributed Chat & Webhook Gateway",
      shortDesc: "Horizontal WebSocket pub/sub event cluster handling 50k active socket connections with exponential backoff webhook retries.",
      category: "Microservices",
      featured: true,
      tags: ["Node.js", "TypeScript", "WebSockets", "Redis Pub/Sub", "RabbitMQ", "Scalar"],
      metrics: {
        throughput: "50,000 Sockets",
        latency: "<5 ms Fanout",
        uptime: "99.98%",
        reliability: "Exponential Retry"
      },
      openApiSpec: {
        openapi: "3.0.0",
        info: {
          title: "Distributed Chat & Webhook Gateway",
          version: "1.0.0",
          description: "High-concurrency webhook & pub/sub message dispatch pipeline for Node.js / TypeScript microservices."
        },
        servers: [{ url: "https://api.dev/v1" }],
        paths: {
          "/webhooks/dispatch": {
            post: {
              summary: "Dispatch Signed Webhook Event",
              description: "Publishes webhook payload to distributed RabbitMQ queues.",
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        event_type: { type: "string", example: "message.created" },
                        channel_id: { type: "string", example: "ch_7721" },
                        payload: { type: "object", example: { sender: "fabian", text: "Hello WebSocket Gateway" } }
                      }
                    }
                  }
                }
              },
              responses: {
                "202": {
                  description: "Webhook Queued",
                  content: {
                    "application/json": {
                      example: {
                        status: "202 ACCEPTED",
                        delivery_id: "dlv_001923",
                        queued_consumers: 4
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      architectureDiagram: [
        { step: 1, title: "WebSocket Node.js Cluster", desc: "Sticky sessions load balanced across Express / WebSocket instances." },
        { step: 2, title: "Redis Pub/Sub Backplane", desc: "Cross-server message broadcasting for multi-node socket sync." },
        { step: 3, title: "RabbitMQ Event Queue", desc: "Dead Letter Queue (DLQ) & retry exponential backoff handler." },
        { step: 4, title: "Webhook Consumer Pool", desc: "Concurrent Node.js HTTP workers dispatching signed HMAC webhooks." }
      ],
      apiEndpoint: {
        method: "POST",
        path: "/api/v1/webhooks/dispatch",
        curl: `curl -X POST https://api.dev/v1/webhooks/dispatch \\
  -H "X-Signature-256: sha256=a1b2c3d4..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "message.created",
    "channel_id": "ch_7721",
    "payload": { "sender": "fabian", "text": "Hello WebSocket Gateway" }
  }'`,
        sampleResponse: `{
  "status": "202 ACCEPTED",
  "delivery_id": "dlv_001923",
  "queued_consumers": 4,
  "timestamp": "2026-08-10T23:30:05Z"
}`
      },
      githubUrl: "https://github.com/Fabverse0",
      demoUrl: "https://chat-gateway.dev"
    },

    {
      id: "pay-settle-api",
      title: "High-Throughput Payment & Settlement API",
      shortDesc: "Distributed payment processing engine with sub-10ms settlement, idempotency locks, and multi-region database replication.",
      category: "Fintech & API",
      featured: true,
      tags: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Kafka", "Scalar"],
      metrics: {
        throughput: "12,500 TPS",
        latency: "7.8 ms (p99)",
        uptime: "99.999%",
        reliability: "Zero Data Loss"
      },
      openApiSpec: {
        openapi: "3.0.0",
        info: {
          title: "High-Throughput Payment API",
          version: "1.0.0",
          description: "Production payment processing engine supporting sub-10ms transaction settlement."
        },
        servers: [{ url: "https://api.dev/v1" }],
        paths: {
          "/payments/settle": {
            post: {
              summary: "Process & Settle Payment",
              description: "Idempotent payment settlement endpoint.",
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["idempotency_key", "amount", "currency", "destination_account"],
                      properties: {
                        idempotency_key: { type: "string", example: "idemp_99218312" },
                        amount: { type: "integer", example: 4950 },
                        currency: { type: "USD", example: "USD" },
                        destination_account: { type: "string", example: "acc_881923" }
                      }
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Transaction Settled Successfully",
                  content: {
                    "application/json": {
                      example: {
                        status: "200 OK",
                        data: {
                          transaction_id: "tx_992104812",
                          settled_at: "2026-08-10T23:30:00Z",
                          amount: 4950,
                          currency: "USD",
                          status: "COMPLETED",
                          latency_ms: 7.8
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      architectureDiagram: [
        { step: 1, title: "API Gateway (Nginx / Express)", desc: "TLS termination, rate limiting, and Bearer token JWT authentication filter." },
        { step: 2, title: "Redis Idempotency Layer", desc: "Atomic Distributed Lock (`SETNX`) checking request idempotency key." },
        { step: 3, title: "TypeScript Worker Pool", desc: "Concurrent worker queue processing ACID transaction logic." },
        { step: 4, title: "Kafka Event Stream", desc: "Asynchronous publish to `payment-events` topic for ledger accounting." },
        { step: 5, title: "PostgreSQL Master/Replica", desc: "Read/Write split with row-level pessimistic locking for balance update." }
      ],
      apiEndpoint: {
        method: "POST",
        path: "/api/v1/payments/settle",
        curl: `curl -X POST https://api.dev/v1/payments/settle \\
  -H "Authorization: Bearer sk_live_8912783a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "idempotency_key": "idemp_99218312",
    "amount": 4950,
    "currency": "USD",
    "destination_account": "acc_881923"
  }'`,
        sampleResponse: `{
  "status": "200 OK",
  "data": {
    "transaction_id": "tx_992104812",
    "settled_at": "2026-08-10T23:30:00Z",
    "amount": 4950,
    "currency": "USD",
    "status": "COMPLETED",
    "latency_ms": 7.8
  }
}`
      },
      githubUrl: "https://github.com/Fabverse0",
      demoUrl: "https://api-demo.dev/v1/docs"
    },

    {
      id: "log-analytics-pipeline",
      title: "Log Aggregation & Analytics Pipeline Engine",
      shortDesc: "High-volume telemetry log ingestion pipeline compressing structured JSON logs into ClickHouse for instant sub-second SQL analytics.",
      category: "Data Engineering",
      featured: true,
      tags: ["Node.js", "FastAPI", "ClickHouse", "ElasticSearch", "Scalar"],
      metrics: {
        throughput: "50 GB/day",
        latency: "<95 ms Query",
        uptime: "99.95%",
        reliability: "85% Compression"
      },
      openApiSpec: {
        openapi: "3.0.0",
        info: {
          title: "Log Analytics Pipeline API",
          version: "1.0.0",
          description: "Sub-second analytical queries over compressed ClickHouse telemetry data."
        },
        servers: [{ url: "https://api.dev/v1" }],
        paths: {
          "/analytics/query": {
            get: {
              summary: "Execute Analytics Query",
              parameters: [
                { name: "metric", in: "query", schema: { type: "string", example: "latency" } },
                { name: "window", in: "query", schema: { type: "string", example: "5m" } }
              ],
              responses: {
                "200": {
                  description: "Analytics Aggregation Output",
                  content: {
                    "application/json": {
                      example: {
                        metric: "latency",
                        window: "5m",
                        p50: 11.2,
                        p95: 24.8,
                        p99: 45.1,
                        total_requests: 1450200
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      architectureDiagram: [
        { step: 1, title: "Vector Agent Collector", desc: "Log scraping from 100+ container nodes in JSON format." },
        { step: 2, title: "Kafka Buffer Topic", desc: "Handling sudden log spikes without dropping audit telemetry." },
        { step: 3, title: "Node.js Ingestion Worker", desc: "Schema validation & batch transformation into columnar tuples." },
        { step: 4, title: "ClickHouse Columnar Storage", desc: "ZSTD compression storing billions of rows with instant aggregation." }
      ],
      apiEndpoint: {
        method: "GET",
        path: "/api/v1/analytics/query?metric=latency&window=5m",
        curl: `curl -X GET "https://api.dev/v1/analytics/query?metric=latency&window=5m" \\
  -H "Authorization: Bearer sk_analytics_99"`,
        sampleResponse: `{
  "metric": "latency",
  "window": "5m",
  "p50": 11.2,
  "p95": 24.8,
  "p99": 45.1,
  "total_requests": 1450200
}`
      },
      githubUrl: "https://github.com/Fabverse0",
      demoUrl: "https://analytics-demo.dev"
    }
  ],

  experiences: [
    {
      role: "Backend Software Engineer",
      company: "Fab.Dev Systems & Consulting",
      period: "2023 - Present",
      location: "Remote / Indonesia",
      description: "Architecting high-throughput microservices, PostgreSQL database performance tuning, distributed Redis caching, and Scalar OpenAPI 3.0 documentation for scalable web applications.",
      impactMetrics: [
        { label: "SLA Uptime", value: "99.99%" },
        { label: "Latency Reduction", value: "35% Faster" },
        { label: "Data Scalability", value: "10M+ Records" },
        { label: "Test Coverage", value: "90% Vitest" }
      ],
      architectureMilestones: [
        "Architected real-time WebSocket pub/sub fanout cluster handling 50k concurrent socket connections.",
        "Implemented atomic distributed locking (SETNX) in Redis & RabbitMQ dead-letter queues to prevent payment race conditions.",
        "Designed sub-second telemetry log analytics pipeline using ClickHouse JSON column compression.",
        "Authored interactive Scalar OpenAPI 3.0 specs with automated multi-language client code generators."
      ],
      techStack: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Kafka", "Docker", "Scalar"]
    },
    {
      role: "Software Engineering Intern",
      company: "CloudLab Studio",
      period: "2022 - 2023",
      location: "Indonesia",
      description: "Built developer CLI automation tools in TypeScript, optimized relational SQL database queries, and authored comprehensive Scalar API documentation.",
      impactMetrics: [
        { label: "CLI Usage", value: "2,500+ Tool Calls" },
        { label: "SQL Query Opt", value: "4x Speedup" },
        { label: "API Specs", value: "100% Scalar" }
      ],
      architectureMilestones: [
        "Created custom Node.js CLI script for automated OpenAPI schema validation during pre-commit git hooks.",
        "Refactored PostgreSQL index strategies reducing B-tree lookup overhead by 60%.",
        "Wrote 40+ interactive API reference endpoints using Scalar React UI."
      ],
      techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Scalar", "Git"]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science / Information Systems",
      institution: "State University of Technology",
      period: "2020 - 2024",
      highlights: "Focused on Operating Systems, Database Management Systems (DBMS), Networking Protocols, and Distributed Algorithms."
    }
  ],

  terminalCommands: {
    help: `Available Commands:
  - help         : Show list of available commands
  - bio          : Display backend developer profile & background
  - skills       : List technical stack & core competencies
  - projects     : View highlight backend architecture projects
  - cv           : Download / view Fabian's Backend Engineer Resume PDF
  - contact      : Show direct contact channels & email
  - ping         : Measure simulated live network latency to backend API
  - sudo         : Execute administrative action
  - matrix       : Trigger digital rain animation effect
  - clear        : Clear terminal console screen`,

    bio: `Backend Software Engineer specializing in Node.js / TypeScript REST/WebSocket APIs, high-throughput microservices, and database tuning. Focused on building reliable, self-healing server architectures documented via Scalar OpenAPI.`,

    skills: `LANGUAGES:    TypeScript, Node.js / Express, Go, Python, SQL, Bash
DATABASES:    PostgreSQL, Redis, ClickHouse, MongoDB
API/MESSAGING: REST, WebSockets, Scalar & OpenAPI 3.0, Apache Kafka, RabbitMQ
DEVOPS:       Docker, Kubernetes, AWS, GitHub Actions, Nginx`,

    projects: `HIGHLIGHT PROJECTS:
1. Real-time Distributed Chat & Webhook Gateway [Node.js | WebSockets | Scalar]
2. High-Throughput Payment & Settlement API [TypeScript | PostgreSQL | Scalar]
3. Log Aggregation & Analytics Pipeline Engine [Node.js | ClickHouse | Scalar]
Click "View Architecture & Scalar API Specs" in project cards below!`,

    cv: `[HTTP GET 200 OK] Initiating download for Fabian_CV.pdf...
Content-Type: application/pdf (1.2 MB)
Transfer progress: [====================================>] 100%
Download complete! Opening /Fabian_CV.pdf...`,

    contact: `DIRECT CONTACT:
Developer : Muhammad Fabian Rizky (Fab.Dev)
Email     : mfabian.rizky@gmail.com
GitHub    : https://github.com/Fabverse0
LinkedIn  : https://www.linkedin.com/in/fabianrizky
Status    : Open for Full-time, Freelance, & Internship opportunities.`,

    sudo: `[SECURITY ALERT] Nice try! Access denied. Permission requires hiring Fabian for root privileges 😉`,

    ping: `PING api.dev (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=11.8 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=12.2 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=10.9 ms
--- api.dev ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, min/avg/max = 10.9/11.6/12.2 ms`
  }
};
