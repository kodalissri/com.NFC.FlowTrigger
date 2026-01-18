# Contributing to NFC Flow Trigger

Thank you for your interest in contributing to the NFC Flow Trigger app for Homey Pro!

## Development Setup

### Prerequisites
- Node.js 18 or higher
- Homey Pro device or access to Homey Cloud
- Git

### Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/homey-nfc-flow-trigger.git
   cd homey-nfc-flow-trigger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Homey CLI**
   ```bash
   npm install -g homey
   ```

4. **Build the app**
   ```bash
   homey app build
   ```

5. **Run the app on your Homey**
   ```bash
   homey app run
   ```

## Making Changes

### Branch Naming
- `feature/` - New features (e.g., `feature/add-nfc-encryption`)
- `fix/` - Bug fixes (e.g., `fix/webhook-timeout`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/api-structure`)

### Commit Messages
Follow the Conventional Commits specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for NDEF formatted tags
fix: resolve webhook timeout issue
docs: update setup instructions for iOS
```

### Code Style
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add comments for complex logic
- Keep functions small and focused

### Testing Your Changes

Before submitting a PR, ensure:

1. **App builds successfully**
   ```bash
   homey app build
   ```

2. **App validates without errors**
   ```bash
   homey app validate
   ```

3. **Test on actual Homey device**
   ```bash
   homey app run
   ```

4. **Test with real NFC tags**
   - Write test URLs to NFC tags
   - Verify flows trigger correctly
   - Check settings page functionality

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**
   - Use the PR template
   - Provide clear description of changes
   - Link any related issues
   - Add screenshots if applicable

5. **Wait for review**
   - Address any feedback
   - Make requested changes
   - Keep the PR updated

## Release Process

Releases are automated via GitHub Actions. Only maintainers can trigger releases.

### How Releases Work

1. **Trigger Release Workflow**
   - Go to Actions → Release and Publish
   - Click "Run workflow"
   - Select version type (patch/minor/major)
   - Enter changelog description
   - Click "Run workflow"

2. **Automated Process**
   - Version is bumped in `package.json` and `.homeycompose/app.json`
   - Changelog is updated with your description
   - `.homeychangelog.json` is created/updated for Homey App Store
   - App is built and validated
   - Changes are committed and tagged
   - App is published to Homey App Store
   - GitHub release is created

### Version Guidelines

- **Patch** (1.0.x) - Bug fixes, small improvements
- **Minor** (1.x.0) - New features, non-breaking changes
- **Major** (x.0.0) - Breaking changes, major redesigns

## GitHub Actions

### Workflows

1. **validate.yml** - Runs on every PR and push
   - Installs dependencies
   - Builds the app
   - Validates the app
   - Runs linting (if configured)

2. **release.yml** - Manual workflow for releases
   - Bumps version
   - Updates changelog
   - Publishes to Homey App Store
   - Creates GitHub release

### Required Secrets

To use the automated publishing, set up these secrets in your repository:

- `HOMEY_TOKEN` - Your Homey authentication token
  - Get it from: https://tools.developer.homey.app/tools/tokens

## Getting Help

- **Issues** - Report bugs or request features via GitHub Issues
- **Discussions** - Ask questions in GitHub Discussions
- **Homey Community** - Join the Homey Community Forum

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
