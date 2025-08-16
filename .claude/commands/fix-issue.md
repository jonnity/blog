Find and fix issue #$ARGUMENTS. Follow these steps:

1. **FIRST** check if issue is open: `gh issue view $ARGUMENTS --json state -q .state` (must be "OPEN")
2. **SECOND** checkout the main branch and pull all latest updates
3. **IMMEDIATELY** create branch: `git checkout -b fix-issue-$ARGUMENTS` (DO THIS BEFORE ANY OTHER WORK!)
4. Now read issue details: `gh issue view $ARGUMENTS` to understand the issue
5. Locate the relevant code in our codebase
6. Implement a solution that addresses the root cause
7. Add appropriate tests if needed
8. Commit changes with proper commit message after formatting with `npm run format`
9. Push the branch and create a PR using `gh pr create`
10. Prepare a concise PR description explaining the fix. The PR should include `Closes #$ARGUMENTS` or `Fixes #$ARGUMENTS`

**CRITICAL**: Always create the branch (step 2) immediately after confirming the issue is open. This prevents accidental commits to main branch.
