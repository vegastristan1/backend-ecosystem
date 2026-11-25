import type { Guide } from './types'

/**
 * Guide for README curriculum step 15: how an application and its
 * dependencies are packaged consistently. Not a journey step — linked
 * from the backend-application guide (learn next) instead.
 */
export const containersGuide: Guide = {
  id: 'containers',
  name: 'Containers and runtime packaging',
  category: 'delivery',
  tags: [
    'containers',
    'container',
    'docker',
    'image',
    'container image',
    'registry',
    'packaging',
    'runtime',
    'environment variables',
    'layers',
    'oci',
    'dev vs prod',
    'works on my machine',
  ],
  status: 'review',
  concept:
    'A container packages an application together with the libraries and settings it needs, so it runs the same way on a developer’s laptop, a test server, and production. The package is a container image — an immutable template — and a container is one running instance of that template.',
  problemSolved:
    'It explains how an application is prepared to run outside a developer’s machine: what goes into an image, how a running container differs from the image, and why the same package behaves consistently everywhere instead of "works on my machine".',
  position:
    'It sits between writing the code and releasing it: once the backend application works locally, its code and dependencies are baked into an image, and that image is what every later step — CI/CD, cloud hosting, orchestration — moves around and runs.',
  howItWorks: [
    {
      id: 'environment-problem',
      title: 'The environment problem',
      explanation:
        'The application runs on your laptop because your machine has the right language version, libraries, and configuration. A teammate’s machine, or the server, may differ slightly — and the app breaks in ways no test caught.',
      visualState: 'environment-mismatch',
    },
    {
      id: 'image-built',
      title: 'The image is built',
      explanation:
        'A build recipe (a Dockerfile) describes the base system, the dependencies to install, and the application code to copy in. Building it produces an immutable container image: the app plus everything it needs, frozen as one file.',
      visualState: 'image-built',
    },
    {
      id: 'container-runs',
      title: 'A container runs the image',
      explanation:
        'Starting a container creates a running instance from the image. The process sees the packaged environment — same libraries, same settings — regardless of what is installed on the host machine.',
      visualState: 'container-running',
    },
    {
      id: 'config-injected',
      title: 'Configuration is injected at runtime',
      explanation:
        'The image stays the same everywhere; environment-specific values — database URL, API keys, log level — are passed in as environment variables when the container starts, so one image works in development and production.',
      visualState: 'config-injected',
    },
    {
      id: 'image-shipped',
      title: 'The image is stored in a registry',
      explanation:
        'The finished image is pushed to a registry (a versioned image store). Any environment pulls that exact image, so what runs in production is byte-for-byte what was built and tested.',
      visualState: 'image-registry',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'From code on a laptop to a running container',
    description:
      'Follow one place-order API build: the image is built once, configured per environment, and run anywhere.',
    fallback:
      'Code + dependencies + base system → build recipe (Dockerfile) → immutable container image → push to registry → pull on any host → start a container with environment variables injected → the place-order API runs with the same packaged environment everywhere.',
    steps: [
      {
        id: 'build-step',
        title: 'Build the image',
        explanation:
          'The build recipe assembles the application, its dependencies, and a base system into one immutable image.',
        visualState: 'image-built',
      },
      {
        id: 'run-step',
        title: 'Run a container',
        explanation:
          'A container is a running instance of the image; it sees the packaged environment on any host machine.',
        visualState: 'container-running',
      },
      {
        id: 'configure-step',
        title: 'Configure and ship',
        explanation:
          'Environment variables configure the run, and the registry stores the image so every environment pulls the same build.',
        visualState: 'image-registry',
      },
    ],
  },
  example: {
    scenario:
      'The team wants the place-order API to run identically on three machines without installing anything by hand.',
    request:
      'build → orders-api:1.4.2 image → push to registry → run with DB_URL and PORT as environment variables → the API listens on the container’s port',
    outcome:
      'All three machines run the same image with only their environment variables differing — no manual dependency installs, and a rollback is just running the previous image tag again.',
  },
  benefits: [
    'The same package runs on a laptop, a test server, and production — eliminating "works on my machine" failures.',
    'Dependencies are baked in at build time, so deploys do not install libraries on the fly.',
    'One image, many configurations: environment variables separate code from environment-specific values.',
    'Images are versioned by tag, which makes releases and rollbacks explicit and repeatable.',
  ],
  tradeoffs: [
    'Image size and build time add up — unoptimized images carry unused files and slow every pull.',
    'Secrets must still be injected carefully: anything baked into the image ships to every host that pulls it.',
    'A container adds a runtime layer to debug — logs and processes live inside it, not directly on the host.',
    'Containers isolate processes, not data by themselves — storage, networking, and secrets need their own decisions.',
  ],
  alternatives: [
    'Deploy directly onto a prepared server with a process manager (systemd, pm2)',
    'A virtual machine for full OS-level isolation at a higher cost',
    'A language-level package environment (venv, node_modules) without OS packaging',
    'A Platform-as-a-Service buildpack that packages the app for you',
  ],
  prerequisites: ['backend-application'],
  relatedGuides: ['backend-application', 'database'],
  learnNext: ['deployment'],
  aliases: [
    'container',
    'containers',
    'docker',
    'docker image',
    'container image',
    'image',
    'images',
    'registry',
    'docker hub',
    'dockerfile',
    'packaging',
    'runtime packaging',
    'virtual machine vs container',
    'works on my machine',
    'layers',
    'oci',
    'containerization',
  ],
  searchProblems: [
    'Why does my app work on my machine but not on the server?',
    'What is a container image and how is it built?',
    'What is the difference between a container and a virtual machine?',
    'How do environment variables get into a container?',
    'How do I package my application for deployment?',
    'What is a container registry?',
    'Why are container images versioned with tags?',
    'How do containers make deployments consistent?',
  ],
  sources: [
    {
      title: 'What is a container?',
      url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/',
      publisher: 'Docker',
      accessedAt: '2026-11-25',
    },
    {
      title: 'What is an image?',
      url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/',
      publisher: 'Docker',
      accessedAt: '2026-11-25',
    },
    {
      title: 'Container image specification',
      url: 'https://github.com/opencontainers/image-spec',
      publisher: 'Open Container Initiative',
      accessedAt: '2026-11-25',
    },
    {
      title: 'What are containers?',
      url: 'https://cloud.google.com/learn/what-are-containers',
      publisher: 'Google Cloud',
      accessedAt: '2026-11-25',
    },
    {
      title: 'Build best practices',
      url: 'https://docs.docker.com/build/building/best-practices/',
      publisher: 'Docker',
      accessedAt: '2026-11-25',
    },
  ],
  lastReviewed: '2026-11-25',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 17 guide 1 content review completed; sources are Docker and Google Cloud documentation plus the OCI image spec. Revisit with the next scheduled review.',
  },
}
