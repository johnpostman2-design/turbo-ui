# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-03-03

### Added

- Stabilization plan and Spec Kit integration (constitution, root spec, plan, tasks).
- Script `scripts/gen-theme-css.cjs`: generates `src/styles/theme-vars.css` from `tokens.json` (Single Source of Truth).
- `npm run gen:theme` and prebuild/prebuild-storybook hooks for theme generation.
- Button: styles moved to `button.css` with CSS variables from tokens; no inline styles for design.
- Button: `aria-disabled` and `aria-busy` for accessibility.
- Documentation: project structure and release discipline in `specs/001-turbo-ui-root-spec/quickstart.md`.

### Changed

- `src/styles/theme.css`: removed hardcoded hex/rgba/px; now imports `theme-vars.css` and uses variables only.
- Button component: refactored to use CSS classes instead of inline styles; optional `--btn-width` for loading layout stability only.

### Fixed

- Token duplication: design values no longer duplicated between `tokens.json` and `theme.css`.
