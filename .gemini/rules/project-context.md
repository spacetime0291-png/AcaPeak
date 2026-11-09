# AI Workspace Rule: Auto-Update Codebase Summary

Whenever you add, modify, or delete any components, files, data schemas, or question files in this workspace:
1. Ensure the code adheres to KaTeX double-escape in JSON strings and the 5-question batch rule.
2. Before finishing your response or task, run:
   ```bash
   node scripts/generate_summary.mjs
   ```
   (or `npm run summary`) to regenerate `PROJECT_CONTEXT.md`.
3. In any new chat session, read `PROJECT_CONTEXT.md` first to obtain full context at minimal token cost.
