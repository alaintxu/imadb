# IMA DB - Improvement Recommendations

## Speed Optimizations

### Critical Issues

- [x] **Hardcoded LIMIT 3 in database query** (`src/lib/imas/imas.ts:89`)
  - `getIMAs` has `Limit 3` which will return only 3 results in production
  - Likely a debug artifact that should be removed

- [ ] **N+1 query pattern in IMACard component** (`src/components/ima/IMACard/IMACard.tsx:24-26`)
  - Each card makes a separate API call for the villain set image
  - For a list of 20 IMA cards, this creates 20 sequential requests
  - **Fix**: Pre-fetch villain data in the parent component or batch fetch all sets needed

- [x] **Async map in React render** (`src/components/ima/IMAList.tsx:22`)
  - `imas.map(async ima => ...)` creates promises in JSX which won't render correctly
  - This is a bug that may cause undefined behavior

### High Priority

- [ ] **Add caching headers to API routes** (`src/app/api/*/route.ts`)
  - No `Cache-Control` headers on responses
  - Add `Cache-Control: public, max-age=300, stale-while-revalidate=600` for static data

- [ ] **Parallelize CDN fetches** (`src/lib/jsdelivr/cards.ts:49-56`)
  - `fetchAllCards` loops sequentially through languages and packs
  - Use `Promise.all()` to fetch translations in parallel

- [ ] **Remove Redux Toolkit** (`src/store/`)
  - App uses both Redux Toolkit and React Query for data fetching
  - React Query alone is sufficient; Redux adds ~30KB bundle overhead
  - If state management is only for UI, use Zustand (3KB) or React Context

### Medium Priority

- [ ] **Replace Moment.js with date-fns** (`package.json`)
  - Moment.js is 67KB+ minified
  - date-fns tree-shakes to ~2KB for basic operations
  - Alternative: native `Intl.DateTimeFormat` for simple formatting

- [x] **Optimize images** (`next.config.ts`)
  - Consider using `next/image` with proper `sizes` prop
  - Add blur placeholders for lazy-loaded images
  - Configure image formats: `formats: ['image/avif', 'image/webp']`

- [ ] **Add database indexes** (requires DB migration)
  - Index on `imas.villain_code` for filtering
  - Index on `imas.author_username` for author queries
  - Composite index on `ima_related_sets(ima_id, set_code)`
  - Composite index on `ima_tag_assignments(ima_id, tag_code)`

- [ ] **Optimize subqueries** (`src/lib/imas/imas.ts:25-46`)
  - Current: Correlated subqueries in SELECT clause run for each row
  - Consider: Use LEFT JOINs with DISTINCT ON or aggregate functions

## Bundle Size & Performance

- [ ] **Code splitting**
  - Add `dynamic()` imports for heavy components (IMAForm, IMAForm)
  - Admin routes should be lazy-loaded

- [ ] **Remove unused dependencies**
  - Check if all react-icons are used
  - Consider `lucide-react` or `radix-ui` for smaller icon bundles

## Architecture Recommendations

### Data Fetching
- [ ] **Consolidate data fetching patterns**
  - Server Components should fetch data directly (no client-side API calls)
  - Use `use()` hook from React 19 correctly (already imported but used incorrectly)

### API Design
- [ ] **Add pagination to IMAs endpoint** (`src/app/api/imas/route.ts`)
  - Current endpoint returns all filtered results
  - Add `page` and `limit` query params with sensible defaults

- [ ] **Add response caching**
  - Implement SWR (Stale-While-Revalidate) pattern at API level
  - Consider Redis for caching frequently accessed data

### Database
- [x] **Add connection pooling configuration**
  - Neon serverless driver handles this, but verify settings for production

- [ ] **Denormalize for read performance**
  - Store `villain_name` directly on `imas` table if frequently accessed
  - Consider materialized views for complex queries

## DX Improvements

- [x] **Add database migrations** (e.g., Prisma, Drizzle)
  - Schema changes should be version controlled

- [ ] **Add database seeding script**
  - For development environment setup

- [ ] **Improve error messages in API routes**
  - Add structured error responses with error codes
  - Add request validation (e.g., zod)

- [ ] **Add integration tests**
  - Test API routes with MSW or actual database

## Future Considerations

- [ ] **Internationalization (i18n)**
  - App currently hardcoded to Spanish (`cardSetNameByLanguage(..., "es")`)
  - Consider next-intl or next-i18next for proper i18n

- [ ] **Add rate limiting** to admin endpoints
  - Scrapping endpoints should be protected

- [ ] **Consider SWR for client-side caching**
  - Provides built-in revalidation and deduplication
  - Works well with React Query's `staleTime` config

- [ ] **Image CDN**
  - Replace picsum.photos with actual Marvel Champions card images
  - Consider Cloudinary or imgix for optimization
