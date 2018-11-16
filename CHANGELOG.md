# Changelog
All notable changes to this project will be documented in this file.
This file is a modified copy from the CHANGELOG.md in the [Keep a Changelog Repository](https://github.com/olivierlacan/keep-a-changelog)
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- There are no unreleased changes right now!

## [1.0.2] - 2018-11-16
### Added
- This CHANGELOG file
- An extra @match case so that incident pages have their URL matched regardless of whether they were opened in a new tab or in the current tab.
  This way, whatever userscript manager the user is using (i.e. Tampermonkey or Greasemonkey) should now show when this script is running on the current page.
### Changed
- A spelling mistake.

## [1.0.1] - 2018-10-18
### Removed
- Old debug code that was still active.
### Fixed
- Problematic code that would cause the script to fail on a ServiceNow incident page with less than six comments.

## 1.0.0 - 2018-10-18
### Added
- All code from pre-release development.
### Changed
 - Version numbering from messy pre-release development to match [Semantic Versioning](http://semver.org/).

[Unreleased]: https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/compare/master...unstable
[1.0.2]: https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/compare/1.0.0...1.0.1