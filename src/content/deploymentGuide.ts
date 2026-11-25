import type { Guide } from './types'

/**
 * Guide for README curriculum step 16: how code changes are built and
 * released. Not a journey step — linked from the containers guide
 * (learn next) instead.
 */
export const deploymentGuide: Guide = {
  id: 'deployment',
  name: 'Deployment and CI/CD',
  category: 'delivery',
  tags: [
    'ci/cd',
    'continuous integration',
    'continuous delivery',
    'pipeline',
    'deployment',
    'release',
    'github actions',
    'gitlab ci',
    'jenkins',
    'azure devops',
    'automation',
    'build',
    'tests',
    'rollback',
    'staging',
  ],
  status: 'review',
  concept:
    'CI/CD is the automated path from a code change to running software. A pipeline picks up every change, builds it, runs the tests, and — if everything passes — releases it to an environment, so deploying is a repeatable routine instead of a manual event.',
  problemSolved:
    'It explains how code changes get built and released: what a pipeline does step by step, why teams automate testing and deployment, and what protects production when a release goes wrong.',
  position:
    'It sits after packaging and before hosting: once the application ships as a container image, the pipeline is the conveyor that tests that image and moves it into an environment — the same conveyor runs in development, staging, and production.',
  howItWorks: [
    {
      id: 'change-committed',
      title: 'A change triggers the pipeline',
      explanation:
        'A push or merged pull request starts the pipeline automatically. Because every change follows the same path, releasing is routine rather than a special occasion someone performs by hand.',
      visualState: 'change-committed',
    },
    {
      id: 'build-and-test',
      title: 'The pipeline builds and tests',
      explanation:
        'The pipeline installs dependencies, compiles the code, and runs the test suite — unit, integration, and end-to-end checks. A failing test stops the pipeline here, before anything reaches users.',
      visualState: 'tests-running',
    },
    {
      id: 'artifact-built',
      title: 'A versioned artifact is produced',
      explanation:
        'With tests green, the pipeline builds the deployable artifact — for containerized apps, an image tagged with the commit or version. What was tested is exactly what will ship.',
      visualState: 'artifact-built',
    },
    {
      id: 'staged-deploy',
      title: 'The artifact is deployed to a staging environment',
      explanation:
        'The new version lands on a staging or preview environment first, where it can be smoke-tested or reviewed without touching the live users.',
      visualState: 'deployed-staging',
    },
    {
      id: 'release-or-rollback',
      title: 'Promote to production — or roll back',
      explanation:
        'If the release checks pass, the same artifact is promoted to production. If something fails after release, the team rolls back to the previous version — the old artifact still exists, so recovery is running it again.',
      visualState: 'released-or-rolled-back',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'From commit to production through one pipeline',
    description:
      'Follow one merged change: the pipeline tests it, builds the artifact, deploys to staging, and promotes the same artifact to production.',
    fallback:
      'Push or merge → pipeline triggers → build + tests run (failure stops here, production untouched) → versioned image built → deploy to staging → checks pass → the same image promotes to production → checks fail after release → roll back to the previous image.',
    steps: [
      {
        id: 'ci-step',
        title: 'Build and test',
        explanation:
          'Every change runs through the same automated build and test steps; a failure blocks the release.',
        visualState: 'tests-running',
      },
      {
        id: 'artifact-step',
        title: 'Build the artifact',
        explanation:
          'A green pipeline produces one versioned artifact — the exact bytes that every environment will run.',
        visualState: 'artifact-built',
      },
      {
        id: 'cd-step',
        title: 'Deploy or roll back',
        explanation:
          'The artifact goes staging → production; a failed check at any point stops promotion or triggers a rollback.',
        visualState: 'released-or-rolled-back',
      },
    ],
  },
  example: {
    scenario:
      'A developer merges a fix for the place-order service into the main branch.',
    request:
      'merge → pipeline runs tests → builds orders-api image tagged with the commit → deploys to staging → staging checks pass → promote the same tag to production',
    outcome:
      'Production runs the tested image within minutes, and nobody ran a deploy by hand. If a test had failed, the pipeline would have stopped at the test step and production would keep running the previous version.',
  },
  benefits: [
    'Deploys become repeatable: the same pipeline runs the same steps for every change, on every machine.',
    'Broken changes are caught by tests before they reach users, not by users afterwards.',
    'Releases can happen many times a day because releasing is automated instead of an event.',
    'Rollback is quick — the previous artifact still exists, so reverting is re-running a known-good version.',
  ],
  tradeoffs: [
    'A flaky test or slow pipeline blocks every change until it is fixed — the pipeline is only as trustworthy as its tests.',
    'Setting up and maintaining pipelines, runners, and secrets is real operational work.',
    'Automation can hide what is actually happening: a green pipeline still needs readable logs.',
    'Deploying often requires environments and database migrations that behave consistently everywhere.',
  ],
  alternatives: [
    'Manual deploys from a checklist — simple at first, error-prone at frequency',
    'Deploy-on-tag with a scripted release instead of a full CI/CD pipeline',
    'Platform-native pipelines (Vercel, Heroku) that build and deploy for you',
    'GitOps, where the pipeline applies changes declared in a repository',
  ],
  prerequisites: ['containers'],
  relatedGuides: ['containers', 'backend-application'],
  learnNext: ['cloud'],
  aliases: [
    'ci/cd',
    'cicd',
    'ci cd',
    'continuous integration',
    'continuous delivery',
    'continuous deployment',
    'pipeline',
    'build pipeline',
    'deployment pipeline',
    'github actions',
    'gitlab ci',
    'jenkins',
    'azure devops',
    'release pipeline',
    'automation',
    'cd',
  ],
  searchProblems: [
    'How do I automate deploying my application?',
    'What is CI/CD and how does a pipeline work?',
    'What is the difference between continuous integration and continuous delivery?',
    'Why does every merge to main trigger a build?',
    'Should I use GitHub Actions, GitLab CI, or Jenkins?',
    'How do teams release many times a day without breaking things?',
    'How do I roll back a bad release quickly?',
    'Where should tests run before production?',
  ],
  sources: [
    {
      title: 'GitHub Actions documentation',
      url: 'https://docs.github.com/en/actions',
      publisher: 'GitHub',
      accessedAt: '2026-11-25',
    },
    {
      title: 'GitLab CI/CD documentation',
      url: 'https://docs.gitlab.com/ci/',
      publisher: 'GitLab',
      accessedAt: '2026-11-25',
    },
    {
      title: 'Jenkins documentation',
      url: 'https://www.jenkins.io/doc/',
      publisher: 'Jenkins',
      accessedAt: '2026-11-25',
    },
    {
      title: 'What is Azure DevOps?',
      url: 'https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops',
      publisher: 'Microsoft',
      accessedAt: '2026-11-25',
    },
    {
      title: 'What is CI/CD?',
      url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd',
      publisher: 'Red Hat',
      accessedAt: '2026-11-25',
    },
  ],
  lastReviewed: '2026-11-25',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 17 guide 2 content review completed; sources are GitHub, GitLab, Jenkins, Microsoft, and Red Hat documentation. Revisit with the next scheduled review.',
  },
}
