

# Temporarily Bypass Admin Guard for Testing

## What
Temporarily modify `AdminGuard` to skip the role check, allowing any authenticated user to access the admin portal at `/admin`.

## Changes

### `src/components/admin/AdminGuard.tsx`
- Remove the `if (!isAdmin)` redirect block (lines 30-32)
- This lets any logged-in user through to the admin pages
- The auth check (`if (!user)`) stays so you still need to be logged in

## Important
This is a **temporary testing bypass**. After you finish reviewing the admin portal, we must restore the guard to prevent unauthorized access.

