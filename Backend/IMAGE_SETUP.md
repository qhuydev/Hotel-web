# Image serving & testing (Backend)

Quick notes to get images working locally and to test premium-only content:

1. Static serving
   - The server now serves files from `uploads/` at `/uploads/*` and from `public/` at `/images/*`.

2. Sample data
   - If the `rooms` collection is empty, the API will return two sample rooms (`/api/rooms`) that use `/images/anh4.jpg` as placeholders.

3. Adding real images
   - Upload images to `uploads/rooms/` (create the folder if missing) or put them in `public/images/`.
   - Save image paths in a Room document as `/uploads/rooms/your-file.jpg` or `/images/your-file.jpg`.

4. Premium content
   - Rooms have `premiumImages` and `premiumInfo`. These fields are only shown in the frontend when the logged-in user has `isPremium: true`.

5. Testing
   - Start backend (default port 8017). Open the frontend and visit `/rooms/1` or `/rooms/2` to see sample rooms.
   - To test premium behavior, set the user's `isPremium` to `true` in the database or create a user and update the field in MongoDB. After sign in, premium images/info will be displayed.
