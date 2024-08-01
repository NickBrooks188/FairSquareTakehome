## Running locally
1. Clone this repository.

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Create a __.env.local__ file inside the frontend directory with NEXT_PUBLIC_POSTMARK_SERVER_TOKEN set to your Postmark server token.

4. Run the project:
    ```bash
   npm run dev
   ```
   It will run on localhost:3000 by default.

## Database Schema (not currently implemented)
<img src='https://jello-bucket.s3.us-west-1.amazonaws.com/FairSquareSchema.png'>

## Important files
### Main page
   frontend/app/page.tsx
### "Database"
   frontend/app/redux/db.ts
### Other state management files
   frontend/app/redux
