# Backup and Recovery Standard (TOPTIK)

This document defines the operational backup standard for source code, deployment state, and Supabase data.

## 1) Recovery Objectives

- **RPO (data loss window):** up to 24 hours (target), stricter for release days.
- **RTO (restore window):** up to 60 minutes to restore a known-good production version.

## 2) Backup Layers

### Layer A — Source Control (Git)

- All meaningful milestones must be committed to `dev` and pushed to `origin`.
- Every pre-release checkpoint gets:
  - an **annotated tag** (`backup/YYYY-MM-DD-HHMM`),
  - a **backup branch** (`backup/YYYY-MM-DD`).
- Weekly offline bundle:
  - `git bundle create toptik-full-backup-<timestamp>.bundle --all`
  - verify with `git bundle verify`.

### Layer B — Runtime Configuration

- Environment variables are never committed.
- `.env.example` must list required variables.
- Vercel env values should be exported and reviewed before release changes.

### Layer C — Database and Storage (Supabase)

- Schema is versioned by SQL migrations under `supabase/migrations`.
- Before structural DB changes:
  - export schema backup,
  - export data backup for affected tables,
  - confirm storage bucket policy snapshot.
- After migrations:
  - run smoke read/write tests,
  - validate RLS behavior.

## 3) Release Gate (No Shortcuts)

Before any production deployment:

1. `npm run lint` passes.
2. `npm run build` passes.
3. Checkpoint commit pushed to remote.
4. Backup tag + backup branch pushed.
5. Offline bundle generated and checksum recorded.
6. Rollback target commit hash documented.

## 4) Rollback Procedure

1. Identify rollback commit/tag (`backup/...`).
2. Redeploy from that commit.
3. If data regression occurred:
   - restore DB from latest validated backup,
   - re-apply only safe migrations.
4. Run smoke tests:
   - homepage,
   - carousel,
   - admin,
   - key APIs.

## 5) Periodic Maintenance

- Weekly: backup drill restore in non-prod.
- Monthly: validate that all secrets still rotate properly.
- Monthly: verify CI still blocks broken builds.

## 6) Required Audit Log Per Backup

Record:

- date/time,
- branch,
- commit hash,
- tag/branch backup names,
- bundle file name + SHA256,
- lint/build result.
