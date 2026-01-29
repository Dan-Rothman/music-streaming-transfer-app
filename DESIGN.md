*Design Document*

Version 1.1

January 27, 2026

# Table of Contents

1. Executive Summary

2. Project Overview

3. User Stories & Use Cases

4. System Architecture

5. Technology Stack

6. User Interface Design

7. Authentication & Security

8. Core Features & Functionality

9. API Integration Strategy

10. Data Flow

11. Error Handling & Edge Cases

12. Development Phases

13. Testing Strategy

14. Deployment & Hosting

15. Future Enhancements

16. User Documentation Requirements

17. Appendices

# 1. Executive Summary

The Music Streaming Transfer Application is a free, client-side web
application that enables users to transfer songs, playlists, and
favorites between different music streaming services. The application
addresses the common pain point of users who switch streaming platforms
or maintain multiple accounts and need to migrate their music libraries.

## Key Features

-   Dual-pane interface for simultaneous viewing of two streaming
    service accounts

-   Drag-and-select functionality for choosing songs and playlists to
    transfer

-   Intelligent duplicate detection and handling

-   Missing track resolution with search and manual replacement options

-   Progress tracking with cancel capability for large transfers

-   OAuth-based secure authentication

-   No backend infrastructure required - fully client-side operation

-   Cross-platform compatibility via web browser

## Target Users

-   Users migrating from one streaming service to another

-   Users consolidating multiple streaming accounts

-   Friends sharing playlists in bulk

-   Music enthusiasts managing libraries across platforms

## Technical Approach

The application will be built as a static web application hosted on
GitHub Pages, using React for the frontend framework. All API
interactions will occur directly from the user\'s browser to the
respective streaming services, ensuring privacy and eliminating the need
for backend infrastructure. Users will provide their own API
credentials, which will be stored locally in their browser.

# 2. Project Overview

## 2.1 Problem Statement

Music streaming users face significant friction when switching platforms
or sharing music libraries. Currently, users must either manually
recreate playlists song-by-song or use paid third-party services with
monthly subscriptions. There is no free, open-source solution that gives
users full control over their data and transfer process.

## 2.2 Solution Overview

This application provides a free, browser-based solution that empowers
users to manage their music library migrations independently. By
leveraging client-side OAuth and direct API calls, the application
maintains user privacy while providing a polished, file-transfer-style
interface familiar to most computer users.

## 2.3 Project Goals

-   Provide a completely free solution with no hosting costs

-   Ensure user data privacy by avoiding backend storage

-   Create an intuitive, familiar user interface

-   Support initial integration with Spotify and Qobuz

-   Design architecture to easily accommodate additional streaming
    services

-   Minimize user technical knowledge requirements

-   Handle large library transfers efficiently

## 2.4 Non-Goals

-   Real-time synchronization between services

-   Audio file storage or conversion

-   User account management or social features

-   Mobile app development (initial release)

-   Persistent session storage across browser sessions

# 3. User Stories & Use Cases

## 3.1 Primary User Stories

### User Story 1: Platform Migration

As a music listener switching from Spotify to Qobuz, I want to transfer
all my liked songs and playlists so that I can continue enjoying my
music collection on my new platform without manually recreating
everything.

### User Story 2: Playlist Sharing

As a music enthusiast, I want to share my curated playlists with friends
who use different streaming services so that we can discover music
together without platform limitations.

### User Story 3: Account Consolidation

As someone with multiple streaming service subscriptions, I want to
consolidate my favorite songs from different services into one primary
account so that I can simplify my music management.

## 3.2 Detailed Use Case: Complete Library Transfer

1. User navigates to the application URL in their web browser

2. User clicks \"Setup Credentials\" and follows the guide to create
    Spotify and Qobuz API credentials

3. User enters their Spotify Client ID and Secret, which are saved to
    browser localStorage

4. User enters their Qobuz credentials, which are also saved locally

5. User clicks \"Connect to Spotify\" and completes OAuth login

6. User clicks \"Connect to Qobuz\" and completes OAuth login

7. Left pane displays Spotify library with \"Liked Songs\" and all
    playlists

8. Right pane displays Qobuz library

9. User clicks \"Liked Songs\" on the Spotify side to view all songs

10. User selects all songs using Ctrl+A keyboard shortcut

11. User clicks \"Transfer Selected\" button

12. Dialog appears asking destination: \"New Playlist\" or \"Favorites\"

13. User selects \"Favorites\" and confirms

14. Progress bar appears showing \"Transferring 1,247 songs\"

15. Application detects 3 songs not available on Qobuz

16. Missing tracks panel opens, showing unmatched songs

17. User clicks on first missing track, search interface appears

18. User searches for alternative version and selects replacement

18. User marks remaining missing tracks as \"Skip\"

19. Transfer completes, showing \"1,245 songs transferred, 2 skipped\"

20. User refreshes Qobuz pane to see newly favorited songs

## 3.3 Detailed Use Case: Multi-Search Additive Selection

This use case demonstrates how users can build complex selections by combining multiple search queries, with each "Select All" operation adding to the existing selection rather than replacing it.

1. User connects to Spotify and views their library of 500 songs

2. User wants to transfer all songs from two specific playlists: "Chill Vibes" and "Workout Mix"

3. User types "Chill Vibes" in the search bar

4. Search filters the library to show 25 songs in the "Chill Vibes" playlist

5. User clicks "Select All" button

6. Status shows "25 songs selected"

7. User clears the search box and types "Workout Mix"

8. Search filters the library to show 18 songs in the "Workout Mix" playlist

9. User clicks "Select All" button again

10. Status now shows "43 songs selected" (25 + 18)

11. Previous "Chill Vibes" selections remain selected even though they're not currently visible in the filtered view

12. User can continue searching and selecting more songs, with each "Select All" adding to the cumulative selection

13. User initiates transfer with all 43 accumulated songs

This additive selection behavior allows users to build complex selections across multiple search queries without losing previously selected songs. The "Deselect All" button clears the entire selection regardless of current filter.

# 4. System Architecture

## 4.1 Architecture Overview

The application follows a pure client-side architecture with no backend
infrastructure. All authentication, data processing, and API
interactions occur directly in the user\'s browser. This architecture
ensures user privacy, eliminates hosting costs, and simplifies
deployment.

## 4.2 Architecture Diagram

[Text representation of architecture flow:]

    ┌─────────────────────────────────────────────────┐
    │           User's Web Browser (React App)         │
    ├─────────────────────────────────────────────────┤
    │                                                  │
    │  ┌──────────────┐         ┌──────────────┐     │
    │  │   Left Pane  │         │  Right Pane  │     │
    │  │  (Service A) │         │ (Service B)  │     │
    │  └──────┬───────┘         └──────┬───────┘     │
    │         │                        │              │
    │  ┌──────▼────────────────────────▼───────┐     │
    │  │    Transfer Management Component     │     │
    │  └──────────────┬───────────────────────┘     │
    │                 │                              │
    │  ┌──────────────▼───────────────────────┐     │
    │  │   API Integration Layer              │     │
    │  └──┬───────────────────────────────┬───┘     │
    │     │                               │          │
    └─────┼───────────────────────────────┼──────────┘
          │                               │
          │                               │
    ┌─────▼──────┐              ┌────────▼─────┐
    │  Spotify   │              │    Qobuz     │
    │    API     │              │     API      │
    └────────────┘              └──────────────┘

## 4.3 Component Architecture

-   UI Layer: React components for dual-pane interface, authentication
    flows, and transfer management

-   State Management: React Context or Zustand for managing
    authentication tokens, library data, and transfer state

-   API Integration Layer: Service-specific adapters that abstract API
    differences and provide unified interfaces

-   Transfer Engine: Core logic for matching songs, handling duplicates,
    and orchestrating transfers

-   Storage Layer: Browser localStorage for API credentials and
    sessionStorage for temporary session data

## 4.4 Data Flow

All data flows unidirectionally from the user\'s browser to external
APIs and back. No data is transmitted to any intermediate servers. The
application state is maintained entirely in browser memory during the
session, with only API credentials persisting in localStorage.

# 5. Technology Stack

## 5.1 Frontend Framework

### React 18+

-   Large ecosystem with extensive documentation

-   Strong community support for troubleshooting

-   Excellent performance with virtual DOM

-   Hooks API for clean state management

-   Wide availability of component libraries

## 5.2 Build Tool

### Vite

-   Extremely fast development server with hot module replacement

-   Optimized production builds

-   Simple configuration

-   Native ES modules support

-   Built-in TypeScript support (if needed later)

## 5.3 Styling

### Tailwind CSS

-   Utility-first approach speeds up development

-   Built-in dark mode support

-   Minimal CSS bundle size with tree-shaking

-   Responsive design utilities

-   No CSS naming conflicts

## 5.4 State Management

### Zustand or React Context

Initial implementation will use React Context for simplicity. If state
management complexity increases, migration to Zustand will be
straightforward due to its minimal boilerplate and excellent TypeScript
support.

## 5.5 HTTP Client

### Axios

-   Automatic request/response transformation

-   Interceptors for adding auth headers

-   Request cancellation support

-   Better error handling than fetch

-   Automatic JSON parsing

## 5.6 UI Components (Optional)

### Headless UI or Radix UI

For complex components like modals, dropdowns, and dialogs, a headless
component library provides accessibility and behavior while allowing
full styling control with Tailwind.

## 5.7 Hosting

### GitHub Pages (Primary)

-   Completely free for public repositories

-   Automatic deployment via GitHub Actions

-   Custom domain support

-   HTTPS by default

-   High availability and CDN distribution

### Alternative Options:

-   Netlify: More features (serverless functions if needed), generous
    free tier

-   Vercel: Excellent performance, preview deployments for PRs

-   Cloudflare Pages: Global CDN, unlimited bandwidth

# 6. User Interface Design

## 6.1 Design Philosophy

The interface is modeled after file transfer applications (like
FileZilla, WinSCP) that users are already familiar with. This dual-pane
design clearly shows source and destination, making the transfer process
intuitive. The dark mode aesthetic provides a modern, professional
appearance while reducing eye strain during extended use.

## 6.2 Layout Structure

### Top Bar (Fixed)

-   Application logo and title

-   Credentials setup button

-   Help/documentation link

-   Version number

### Main Content Area (Split 50/50)

Left Pane:

-   Service selector dropdown (Spotify, Qobuz, etc.)

-   Authentication status indicator

-   Connect/Disconnect button

-   Search/filter bar

-   Library tree view (Liked Songs, Playlists)

-   Song list with multi-select capability

-   Selection counter (e.g., \"247 songs selected\")

Right Pane:

Mirror layout of left pane for destination service

### Center Divider

-   Draggable to resize panes

-   Transfer button (appears when selection is made)

-   Transfer direction indicator arrow

### Bottom Bar (Fixed)

-   Transfer progress bar (when active)

-   Status messages

-   Statistics (songs transferred, time remaining)

## 6.3 Component Specifications

### Song List Component

-   Columns: Checkbox, Song Title, Artist, Album, Duration

-   Sortable by any column

-   Filter option: Filter by artist, album, title, or other metadata

-   Multi-select with Ctrl+Click, Shift+Click

-   Select All (Ctrl+A) / Deselect All (Ctrl+D)

-   Clicking off the screen or application should NOT deselect any
    selected songs

-   Right-click context menu

-   Keyboard navigation (arrow keys)

-   Visual feedback for selection (highlighted rows)

-   Loading skeleton for async data

### Playlist Tree Component

-   Expandable/collapsible folders

-   Icons for different content types (liked songs, playlists)

-   Song count badges

-   Drag-and-drop support for future enhancements

-   Filter/search functionality

### Transfer Dialog Component

-   Destination selection: New Playlist, Existing Playlist, or Favorites

-   Playlist name input (for new playlists)

-   Duplicate handling options: Skip, Replace, Keep Both, or Review Each
    (case by case)

-   Transfer summary: \"X songs to be transferred\"

-   Cancel and Confirm buttons

### Missing Tracks Panel

-   List of unmatched songs with original details

-   Search interface for each track

-   Match confidence indicator

-   Manual selection of alternatives

-   Skip option

-   Batch actions (Skip All, Auto-match All)

## 6.4 Keyboard Shortcuts

-   Ctrl+A: Select all songs in current filtered view (respects filters,
    ignores pagination)

-   Ctrl+D: Deselect all songs (respects filters, ignores pagination)

-   Ctrl+F: Focus search bar

-   Ctrl+T: Initiate transfer (when selection exists)

-   Escape: Cancel current operation or close dialog

-   Space: Toggle selection of focused item

-   Arrow keys: Navigate list

-   Shift+Arrow keys: Expand selection from currently selected song

-   Enter: Confirm dialog or expand playlist

## 6.5 Responsive Considerations

While the initial release targets desktop users, the layout will use
responsive breakpoints to ensure the application remains functional on
tablets. Mobile support may be added in future releases with a stacked
layout instead of side-by-side panes.

# 7. Authentication & Security

## 7.1 OAuth Flow

The application uses OAuth 2.0 for secure authentication with streaming
services. This ensures users never enter their streaming service
passwords into the application, and access can be revoked at any time
through the streaming service\'s account settings.

## 7.2 Spotify OAuth Implementation

1. User provides Spotify Client ID and Secret (obtained from Spotify Developer Dashboard)
2. Application redirects user to Spotify authorization URL
3. User logs in to Spotify and grants permissions
4. Spotify redirects back to application with authorization code
5. Application exchanges code for access token and refresh token
6. Access token stored in sessionStorage (expires with browser tab)
7. Refresh token stored in sessionStorage for automatic token renewal

### Required Scopes:

-   user-library-read: Read liked songs

-   user-library-modify: Add songs to liked songs

-   playlist-read-private: Read user playlists

-   playlist-modify-private: Modify private playlists

-   playlist-modify-public: Modify public playlists

## 7.3 Qobuz Authentication Implementation

Qobuz API details will be finalized during development. The adapter will
be implemented to match the standard interface, abstracting any
differences from the core application logic.

## 7.4 Credential Storage

### localStorage (Persistent):

-   Spotify Client ID and Secret

-   Qobuz API credentials

-   User preferences (theme, default settings)

### sessionStorage (Session-only):

-   OAuth access tokens

-   OAuth refresh tokens

-   Current library data cache

-   Transfer state (if in progress)

## 7.5 Security Considerations

-   Never store passwords - only OAuth tokens

-   Use HTTPS for all API requests

-   Implement CORS properly to prevent unauthorized access

-   Clear session data on logout or browser close

-   Validate API responses to prevent injection attacks

-   Rate limiting for API calls to prevent abuse

-   Warning dialog before closing browser with transfer in progress

## 7.6 Token Refresh Strategy

Access tokens typically expire after 1 hour. The application will
implement automatic token refresh using refresh tokens. If a refresh
fails, the user will be prompted to re-authenticate. This process will
be transparent during transfers to prevent interruption.

# 8. Core Features & Functionality

## 8.1 Library Display

### Feature: Display User Library

Upon successful authentication, the application fetches and displays:

-   Liked/Favorited Songs: All songs the user has marked as favorites

-   User-Created Playlists: All playlists created or followed by the
    user

-   Playlist Contents: Songs within each playlist (loaded on demand)

-   Metadata: Song title, artist, album, duration, album art thumbnail

Technical Implementation:

-   Pagination for large libraries (load 50 songs at a time)

-   Lazy loading for playlist contents

-   Caching to minimize API calls

-   Virtual scrolling for performance with thousands of songs

## 8.2 Song Selection

### Multi-Selection Methods:

-   Click individual checkboxes

-   Ctrl+Click for non-contiguous selection

-   Shift+Click for range selection

-   Ctrl+A to select all visible songs

-   Click playlist to select all songs in playlist

-   Filter + Select All to select filtered results (additive - adds to existing selection rather than replacing)

Selection Rules:

-   Select All is additive: selecting all songs in a filtered view adds them to the existing selection rather than replacing it, allowing users to build complex selections across multiple search queries

-   Can only select from one pane at a time

-   Selecting from opposite pane displays a warning: \"This application
    only supports one-way transfers. Selecting songs or playlists on
    this side will clear the selections on the other side. Do you want
    to proceed?\" with No (highlighted, larger font, leftmost) and Yes
    options

-   Visual feedback (highlighted rows, selection counter)

-   Selection persists when navigating between playlists

-   Clear selection button always visible when items selected

## 8.3 Transfer Process

### Step 1: Initiate Transfer

User clicks \"Transfer Selected\" button. Dialog appears with options:

-   Create New Playlist: User enters playlist name and optional
    description

-   Add to Existing Playlist: Dropdown list of destination playlists

-   Add to Favorites: Transfer to liked/favorited songs

-   Duplicate Handling: Dropdown with Skip/Replace/Keep Both/Review Each

### Step 2: Song Matching

The application attempts to match songs using this priority:

1. ISRC (International Standard Recording Code) - exact match
2. Artist + Track Title + Album - exact match
3. Artist + Track Title - fuzzy match with similarity threshold
4. Manual search - if no automatic match found

### Step 3: Handle Missing Tracks

If songs cannot be matched automatically, the Missing Tracks Panel
appears with a search interface for each unmatched song. User options:

-   Search with pre-filled artist and title

-   Manually select alternative version from search results

-   Mark as \"Skip\" to exclude from transfer

-   Use \"Auto-match\" to accept closest fuzzy match

### Step 4: Execute Transfer

Transfer executes in batches with progress updates:

-   Batch size: 50 songs per API request (service dependent)

-   Progress bar updates in real-time

-   Estimated time remaining calculation

-   Cancel button to abort transfer

-   Error handling with retry mechanism

-   Success/failure notification upon completion

## 8.4 Duplicate Detection

### Detection Methods:

-   Check if song already exists in destination playlist/favorites

-   Match by ISRC if available

-   Match by artist + title + album combination

-   Flag potential duplicates with confidence score

### User Options:

-   Skip Duplicates: Exclude existing songs from transfer

-   Keep Both: Transfer anyway (useful for different versions)

-   Replace: Remove existing and add new (advanced feature)

-   Review Each: Pause transfer to decide per duplicate on a
    case-by-case basis

## 8.5 Progress Tracking

### Real-time Updates:

-   Progress bar: X of Y songs transferred

-   Percentage complete

-   Estimated time remaining

-   Current operation (e.g., \"Matching songs\...\" or \"Adding to
    playlist\...\")

-   Transfer speed (songs per minute)

-   Pause/Resume functionality (if supported by APIs)

-   Cancel button with confirmation

### Transfer Log:

-   List of successfully transferred songs

-   List of skipped songs (duplicates or user choice)

-   List of failed songs with error reasons

-   Export log as CSV for user reference

## 8.6 Error Recovery

### Automatic Retry Logic:

-   Retry failed API requests up to 3 times

-   Exponential backoff between retries

-   Skip song after 3 failures, add to failed list

-   Continue with remaining songs

### Manual Retry:

After transfer completes, user can retry individual failed songs. Each
failed song in the transfer log has a \"Retry\" button that attempts to
transfer just that song again.

# 9. API Integration Strategy

## 9.1 Abstraction Layer Design

To support multiple streaming services and enable easy expansion, the
application will use an adapter pattern. Each service implements a
standard interface, allowing the core transfer logic to remain
service-agnostic.

### Standard Interface (Pseudocode):

> interface StreamingServiceAdapter {\
> // Authentication\
> authenticate(): Promise\<AuthResult\>\
> refreshToken(): Promise\<AuthResult\>\
> logout(): void\
> \
> // Library Access\
> getLikedSongs(limit: number, offset: number): Promise\<Song\[\]\>\
> getPlaylists(): Promise\<Playlist\[\]\>\
> getPlaylistTracks(playlistId: string): Promise\<Song\[\]\>\
> \
> // Library Modification\
> addToFavorites(trackIds: string\[\]): Promise\<Result\>\
> createPlaylist(name: string, description?: string):
> Promise\<Playlist\>\
> addToPlaylist(playlistId: string, trackIds: string\[\]):
> Promise\<Result\>\
> deletePlaylist(playlistId: string): Promise\<Result\>\
> removeFromPlaylist(playlistId: string, trackIds: string\[\]):
> Promise\<Result\>\
> \
> // Search & Matching\
> searchTracks(query: string): Promise\<Song\[\]\>\
> getTrackByISRC(isrc: string): Promise\<Song\>\
> }

## 9.2 Spotify API Integration

### Endpoints to Use:

-   GET /v1/me/tracks - Fetch liked songs

-   PUT /v1/me/tracks - Add songs to liked songs

-   GET /v1/me/playlists - Fetch user playlists

-   GET /v1/playlists/{id}/tracks - Fetch playlist contents

-   POST /v1/playlists/{id}/tracks - Add tracks to playlist

-   DELETE /v1/playlists/{id}/tracks - Remove tracks from playlist

-   POST /v1/users/{user_id}/playlists - Create new playlist

-   DELETE /v1/playlists/{id}/followers - Delete playlist

-   GET /v1/search - Search for tracks

-   GET /v1/tracks/{id} - Get track details by ID

### Rate Limits:

Spotify enforces rate limits on API requests. The application will
implement throttling to stay within limits and handle 429 (Too Many
Requests) responses with exponential backoff.

### Data Model:

-   Track ID: Unique Spotify identifier

-   ISRC: International Standard Recording Code

-   Name: Track title

-   Artists: Array of artist objects

-   Album: Album object with name and images

-   Duration: Length in milliseconds

-   URI: Spotify resource identifier

## 9.3 Qobuz API Integration

Qobuz API details will be finalized during development. The adapter will
be implemented to match the standard interface, abstracting any
differences from the core application logic.

### Expected Endpoints:

-   Authentication endpoints

-   User favorites/collection endpoints

-   Playlist management endpoints

-   Track search endpoints

-   Track metadata retrieval

## 9.4 Future Service Integration

The adapter pattern allows straightforward addition of new services. To
add a new streaming service:

1. Create new adapter class implementing StreamingServiceAdapter interface
2. Implement service-specific OAuth flow
3. Map service API responses to standard Song and Playlist models
4. Add service to UI service selector dropdown
5. Update credentials setup guide with service-specific instructions
6. Test adapter with existing transfer logic

### Potential Future Services:

-   Apple Music

-   YouTube Music

-   Tidal

-   Deezer

-   Amazon Music

-   Pandora

# 10. Data Flow

## 10.1 Authentication Flow

1. User clicks "Connect to [Service]" button
2. Application checks localStorage for saved API credentials
3. If credentials exist, initiate OAuth flow with service
4. User redirected to service login page
5. User grants permissions
6. Service redirects back with authorization code
7. Application exchanges code for access token
8. Access token stored in sessionStorage
9. Application fetches user profile to confirm authentication
10. UI updates to show connected status
11. Library loading begins

## 10.2 Library Loading Flow

1. Application calls adapter's getLikedSongs() method
2. Adapter makes paginated API requests (50-100 songs per request)
3. Songs added to UI as they arrive (progressive loading)
4. Application calls adapter's getPlaylists() method
5. Playlists displayed in tree view
6. Playlist contents loaded on-demand when user expands playlist
7. All data cached in React state for fast subsequent access

## 10.3 Transfer Flow

1. User selects songs and clicks \"Transfer Selected\"

2. Transfer dialog displays with destination options

3. User selects destination and duplicate handling preference

4. Transfer engine extracts song metadata (title, artist, ISRC)

5. For each song, attempt to find match on destination service:

    a. Search by ISRC if available

    b. If no match, search by artist + title + album

    c. If no match, search by artist + title (fuzzy)

6. Matched songs added to transfer queue

7. Unmatched songs added to missing tracks list

8. If missing tracks exist, show Missing Tracks Panel for user
resolution

9. User reviews missing tracks, searches for alternatives, or skips

10. Transfer begins with all resolved songs

11. Songs transferred in batches (API-dependent, typically 50-100)

12. Progress bar updates after each batch completes

13. Errors captured and added to failed list

14. Upon completion, show transfer summary with success/skip/fail
counts

15. Refresh destination library to show new content

## 10.4 Error Flow

1. API request fails with error response
2. Application logs error details
3. If error is rate limiting (429), wait and retry with backoff
4. If error is authentication (401), attempt token refresh
5. If token refresh fails, prompt user to re-authenticate
6. If error is server error (5xx), retry up to 3 times
7. If all retries fail, add song to failed list
8. Continue with next song in transfer queue
9. Display error notification to user
10. Allow user to retry failed songs individually

# 11. Error Handling & Edge Cases

## 11.1 Authentication Errors

-   Invalid API credentials: Display clear error message with link to
    easily accessible setup guide (guide should be prominently available
    in the UI without needing to trigger an error)

-   OAuth authorization denied: Explain permissions are required for
    functionality

-   Token expired during transfer: Auto-refresh if possible, else prompt
    re-auth without losing progress

-   Network connectivity loss: Detect and pause transfer, resume when
    connection restored

-   Service API down: Display service status, suggest trying again later

## 11.2 Transfer Edge Cases

### Empty Playlists:

If user selects an empty playlist, display message: \"This playlist
contains no songs to transfer.\"

### Duplicate Entire Playlist:

If all songs in selection already exist in destination, notify user and
offer to skip transfer or keep duplicates.

### Song Not Available in Destination Region:

Handle as missing track with search option for alternative versions or
regional equivalents.

### Playlist Name Collision:

When creating new playlist, if name already exists, notify user that \"
(2)\" will be appended to the name. Give user option to: (1) Accept the
new name with \" (2)\", (2) Enter a different name, or (3) Cancel the
transfer.

### Large Transfers (10,000+ songs):

-   Warn user about time required

-   Break into multiple batches

-   Save progress periodically

-   Allow pause/resume if possible

-   Implement transfer queue to handle in chunks

### Browser Tab Closure During Transfer:

Implement beforeunload event listener to warn user: \"Transfer in
progress. Are you sure you want to leave?\"

## 11.3 API Rate Limiting

-   Monitor API response headers for rate limit info

-   Implement request throttling to stay within limits

-   Use exponential backoff when rate limited (exponential backoff means
    waiting increasingly longer periods between retry attempts - e.g., 1
    second, then 2 seconds, then 4 seconds, then 8 seconds, etc.)

-   Display rate limit status to user

-   Pause transfer when limit reached, resume automatically when reset

## 11.4 Data Integrity

-   Validate all API responses before processing

-   Handle null/undefined values gracefully

-   Sanitize user input (playlist names, search queries)

-   Verify song metadata completeness before matching

-   Log all transfer operations for debugging

## 11.5 User Error Prevention

-   Disable transfer button when no songs selected

-   Confirm before large transfers (1000+ songs)

-   Warn before overwriting playlists

-   Validate playlist names (length, special characters)

-   Show preview of transfer before execution

-   Provide clear error messages with actionable solutions

# 12. Development Phases

## 12.1 Phase 1: UI Foundation (Weeks 1-2)

-   Set up React + Vite project with Tailwind CSS

-   Implement dual-pane layout with resizable divider

-   Create authentication placeholder components (login buttons, status
    indicators)

-   Build song list component with multi-select functionality

-   Implement playlist tree view component

-   Add keyboard shortcuts for selection (including Shift+Arrow for
    expansion)

-   Create transfer dialog with destination options

-   Build progress bar and status components

-   Implement dark mode styling

-   Add responsive breakpoints for tablet support

### Deliverable:

Fully functional UI with mock data. User can interact with all interface
elements.

## 12.2 Phase 2: Authentication & Storage (Week 3)

-   Implement localStorage management for API credentials

-   Create credentials setup flow and guide (make guide easily
    accessible from UI)

-   Implement Spotify OAuth flow

-   Build token management system (storage, refresh)

-   Create authentication state management (Context or Zustand)

-   Add logout functionality with session clearing

-   Implement \"session data not saved\" warning on close

-   Add authentication error handling

-   Test OAuth flow end-to-end

### Deliverable:

Users can authenticate with Spotify, tokens are managed properly,
credentials persist between sessions.

## 12.3 Phase 3: API Integration - Spotify (Week 4)

-   Create Spotify adapter implementing standard interface

-   Implement getLikedSongs with pagination

-   Implement getPlaylists

-   Implement getPlaylistTracks

-   Add API response caching

-   Integrate adapter with UI components

-   Display real Spotify library in left pane

-   Implement lazy loading for playlists

-   Add loading skeletons and error states

-   Test with various library sizes

### Deliverable:

Application displays user\'s actual Spotify library with all songs and
playlists.

## 12.4 Phase 4: API Integration - Qobuz (Week 5)

-   Research Qobuz API documentation

-   Implement Qobuz authentication flow

-   Create Qobuz adapter implementing standard interface

-   Implement all required adapter methods for Qobuz

-   Integrate Qobuz adapter with UI

-   Enable service switching in UI

-   Test with real Qobuz accounts

-   Handle Qobuz-specific edge cases

### Deliverable:

Users can connect to both Spotify and Qobuz simultaneously, view
libraries from both services.

## 12.5 Phase 5: Transfer Engine (Weeks 6-7)

-   Implement song matching algorithm (ISRC, metadata-based, fuzzy)

-   Build transfer queue management system

-   Implement batch transfer logic

-   Add duplicate detection with all handling options (Skip, Replace,
    Keep Both, Review Each)

-   Create missing tracks resolution interface

-   Implement search functionality for missing tracks

-   Add progress tracking with real-time updates

-   Implement cancel transfer functionality

-   Build transfer log with success/skip/fail tracking

-   Add retry logic for failed transfers

-   Implement destination playlist creation

-   Add songs to existing playlists

-   Add songs to favorites/liked songs

-   Implement warning dialog for opposite pane selection

-   Test with various transfer scenarios

### Deliverable:

Complete end-to-end transfer functionality working between Spotify and
Qobuz.

## 12.6 Phase 6: Error Handling & Polish (Week 8)

-   Implement comprehensive error handling for all API calls

-   Add rate limiting protection with exponential backoff

-   Add browser close warning during transfers

-   Create user-friendly error messages

-   Add input validation for all forms

-   Implement confirmation dialogs for destructive actions

-   Polish animations and transitions

-   Optimize performance (virtual scrolling, lazy loading)

-   Add accessibility features (ARIA labels, keyboard navigation)

-   Conduct usability testing and iterate

### Deliverable:

Production-ready application with robust error handling and polished
user experience.

## 12.7 Phase 7: Documentation & Deployment (Week 9)

-   Write user guide for obtaining API credentials

-   Create video tutorial for first-time users

-   Write FAQ document

-   Add help tooltips throughout interface

-   Create README for GitHub repository

-   Set up GitHub Pages deployment

-   Configure custom domain (if desired)

-   Set up GitHub Actions for CI/CD

-   Create release notes

-   Announce public release

### Deliverable:

Live application with complete documentation, ready for public use.

## 12.8 Phase 8: Iteration & Expansion (Ongoing)

-   Gather user feedback

-   Fix reported bugs

-   Optimize performance based on real usage

-   Add additional streaming services

-   Implement feature requests

-   Improve matching algorithms

-   Enhance UI based on user feedback

# 13. Testing Strategy

## 13.1 Unit Testing

### Test Framework: Vitest (fast, Vite-native)

-   API adapters: Test each method in isolation with mocked responses

-   Song matching algorithm: Test various matching scenarios

-   Duplicate detection: Test edge cases (exact matches, fuzzy matches)

-   Authentication logic: Test token storage, refresh, expiration

-   Utility functions: Test data transformations, validations

## 13.2 Integration Testing

-   OAuth flow: Test full authentication cycle with test accounts

-   API pagination: Test loading large libraries

-   Transfer process: Test complete transfer with various configurations

-   Error recovery: Test API failures and retry logic

-   State management: Test data flow between components

## 13.3 End-to-End Testing

### Test Framework: Playwright

-   Complete user journey: Setup credentials → Authenticate → Transfer
    songs

-   Transfer large playlist (1000+ songs)

-   Handle missing tracks scenario

-   Cancel transfer mid-process

-   Duplicate handling in various modes (including Review Each)

-   Session persistence and logout

-   Browser close warning during transfer

-   Opposite pane selection warning behavior

## 13.4 Manual Testing

-   Test with real user accounts across different subscription tiers

-   Verify UI on different browsers (Chrome, Firefox, Safari, Edge)

-   Test responsive layout on various screen sizes

-   Verify accessibility with screen readers

-   Test keyboard navigation (including Shift+Arrow selection expansion)

-   Verify error messages are clear and actionable

-   Test with various network conditions (slow, intermittent)

-   Verify performance with libraries of different sizes

## 13.5 Performance Testing

-   Initial load time: Target \< 2 seconds

-   Library loading: Target \< 3 seconds for 1000 songs

-   Song selection responsiveness: Instant feedback

-   Transfer speed: Maximize within API rate limits

-   Memory usage: Monitor for leaks during long transfers

-   Bundle size: Keep JavaScript bundle \< 500KB

## 13.6 Security Testing

-   Verify credentials are never transmitted to unauthorized endpoints

-   Test that sessionStorage clears properly on logout

-   Verify HTTPS enforcement for all API calls

-   Test CORS configuration

-   Validate input sanitization (playlist names, search queries)

-   Test token refresh flow security

-   Verify no sensitive data in console logs

# 14. Deployment & Hosting

## 14.1 GitHub Pages Setup

### Repository Configuration:

-   Create public GitHub repository

-   Enable GitHub Pages in repository settings

-   Set source to gh-pages branch

-   Configure custom domain (optional)

-   Enable HTTPS (automatic with GitHub Pages)

### Build Configuration:

Update vite.config.js to set base URL for GitHub Pages:

> // vite.config.js\
> export default {\
> base: \'/music-transfer-app/\', // Replace with your repo name\
> build: {\
> outDir: \'dist\',\
> sourcemap: false\
> }\
> }

## 14.2 Continuous Deployment

### GitHub Actions Workflow:

Create .github/workflows/deploy.yml for automatic deployment on push to
main:

> name: Deploy to GitHub Pages\
> \
> on:\
> push:\
> branches: \[ main \]\
> \
> jobs:\
> build-and-deploy:\
> runs-on: ubuntu-latest\
> steps:\
> - uses: actions/checkout@v3\
> \
> - name: Setup Node.js\
> uses: actions/setup-node@v3\
> with:\
> node-version: \'18\'\
> \
> - name: Install dependencies\
> run: npm ci\
> \
> - name: Build\
> run: npm run build\
> \
> - name: Deploy to GitHub Pages\
> uses: peaceiris/actions-gh-pages@v3\
> with:\
> github_token: \${{ secrets.GITHUB_TOKEN }}\
> publish_dir: ./dist

## 14.3 Version Management

-   Use semantic versioning (MAJOR.MINOR.PATCH)

-   Display version number in UI footer

-   Tag releases in GitHub

-   Maintain CHANGELOG.md

-   Notify users of available updates via banner (compare version in UI
    to latest GitHub release)

## 14.4 Monitoring & Analytics (Optional)

Consider adding privacy-respecting analytics to understand usage
patterns and identify issues:

-   Plausible Analytics (privacy-focused, GDPR compliant)

-   Simple Analytics (no cookies, privacy-first)

-   Self-hosted Matomo

-   Error tracking with Sentry (optional, for production debugging)

Important: If analytics are added, include clear privacy policy and
opt-out mechanism.

# 15. Future Enhancements

## 15.1 Short-Term Enhancements (6 months)

-   Additional streaming services (Apple Music, YouTube Music, Tidal)

-   Regular non-transfer account manipulation: create/delete playlists,
    add/remove selected songs from playlists or liked songs within a
    single service

-   Batch transfer scheduling (transfer multiple playlists sequentially)

-   Transfer history with ability to view past transfers

-   Improved fuzzy matching with machine learning

-   Playlist merging (combine multiple playlists)

-   Export library as CSV/JSON

-   Dark/Light theme toggle

-   Customizable keyboard shortcuts

## 15.2 Medium-Term Enhancements (1 year)

-   Mobile app versions (React Native)

-   Bi-directional sync (keep playlists synchronized)

-   Collaborative playlists transfer

-   Smart playlist conversion (algorithm-based recommendations)

-   Audio feature matching (BPM, energy, mood)

-   Playlist organization tools

-   Backup/restore functionality

-   Multi-language support

## 15.3 Advanced Features (Future)

-   Browser extension for one-click transfers

-   Playlist import from files (M3U, CSV)

-   Integration with local music libraries

-   Advanced duplicate detection with audio fingerprinting

-   Scheduled transfers (weekly sync)

-   Community playlist sharing platform

-   API for third-party integrations

-   Desktop application (Electron) for offline capabilities

# 16. User Documentation Requirements

## 16.1 Credentials Setup Guide

Must include step-by-step instructions with screenshots for:

-   Creating Spotify Developer account

-   Registering a new Spotify app

-   Obtaining Client ID and Client Secret

-   Setting up redirect URI

-   Similar instructions for Qobuz

-   Troubleshooting common setup issues

-   Security best practices

-   Guide should be easily accessible from main UI (not just from error
    messages)

## 16.2 User Manual

-   Getting Started: First-time setup walkthrough

-   Authentication: How to connect to services

-   Transferring Songs: Detailed transfer process

-   Handling Missing Tracks: Resolution strategies

-   Managing Duplicates: Options and recommendations (including Review
    Each mode)

-   Keyboard Shortcuts: Complete reference

-   Troubleshooting: Common issues and solutions

-   Privacy & Security: How data is handled

-   FAQ: Frequently asked questions

## 16.3 Video Tutorials

-   Getting Started (5 minutes): Complete first-time setup

-   First Transfer (3 minutes): Simple playlist transfer

-   Advanced Features (7 minutes): Handling missing tracks, duplicates

-   Troubleshooting (4 minutes): Common issues

## 16.4 In-App Help

-   Tooltips on all major UI elements

-   Contextual help buttons opening relevant documentation

-   Onboarding tour for first-time users

-   Quick tips displayed during transfers

-   Error messages with links to relevant help articles

# 17. Appendices

## 17.1 Glossary

-   OAuth: Open Authorization, an open standard for access delegation

-   ISRC: International Standard Recording Code, unique identifier for
    recordings

-   API: Application Programming Interface

-   JWT: JSON Web Token, used for authentication

-   Rate Limiting: Restriction on number of API requests per time period

-   Exponential Backoff: Strategy of waiting increasingly longer periods
    between retry attempts (e.g., 1s, 2s, 4s, 8s)

-   Fuzzy Matching: Approximate string matching algorithm

-   Adapter Pattern: Design pattern for creating compatible interfaces

-   sessionStorage: Browser storage that persists for session duration

-   localStorage: Browser storage that persists indefinitely

-   SPA: Single Page Application

## 17.2 API Documentation References

-   Spotify Web API: https://developer.spotify.com/documentation/web-api

-   Qobuz API: (Add documentation link during development)

-   OAuth 2.0 Specification: https://oauth.net/2/

-   React Documentation: https://react.dev

-   Vite Documentation: https://vitejs.dev

-   Tailwind CSS: https://tailwindcss.com

## 17.3 Development Tools

-   Visual Studio Code (recommended IDE)

-   React Developer Tools (browser extension)

-   Redux DevTools (for state debugging)

-   Postman (API testing)

-   Git (version control)

-   Node.js 18+ (runtime)

-   npm or yarn (package management)

## 17.4 Code Repository Structure

> music-transfer-app/\
> ├── src/\
> │ ├── components/ \# React components\
> │ │ ├── layout/ \# Layout components (panes, dividers)\
> │ │ ├── auth/ \# Authentication components\
> │ │ ├── library/ \# Library display components\
> │ │ ├── transfer/ \# Transfer-related components\
> │ │ └── common/ \# Reusable UI components\
> │ ├── adapters/ \# Service-specific API adapters\
> │ │ ├── spotify.js\
> │ │ ├── qobuz.js\
> │ │ └── base.js \# Base adapter interface\
> │ ├── services/ \# Business logic\
> │ │ ├── auth.js \# Authentication service\
> │ │ ├── transfer.js \# Transfer engine\
> │ │ ├── matching.js \# Song matching logic\
> │ │ └── storage.js \# localStorage/sessionStorage wrapper\
> │ ├── hooks/ \# Custom React hooks\
> │ ├── utils/ \# Utility functions\
> │ ├── styles/ \# Global styles\
> │ ├── App.jsx \# Main application component\
> │ └── main.jsx \# Entry point\
> ├── public/ \# Static assets\
> ├── tests/ \# Test files\
> │ ├── unit/\
> │ ├── integration/\
> │ └── e2e/\
> ├── docs/ \# Documentation\
> │ ├── USER_GUIDE.md\
> │ ├── SETUP_GUIDE.md\
> │ └── CONTRIBUTING.md\
> ├── .github/\
> │ └── workflows/ \# GitHub Actions\
> ├── package.json\
> ├── vite.config.js\
> ├── tailwind.config.js\
> ├── README.md\
> └── LICENSE

## 17.5 Open Source License

Recommended License: MIT License

The MIT License is permissive, allowing commercial use, modification,
distribution, and private use while limiting liability. This encourages
community contributions and adoption.

# Conclusion

This design document provides a comprehensive blueprint for building a
free, open-source music streaming transfer application. The client-side
architecture ensures user privacy and eliminates hosting costs, while
the adapter pattern enables easy expansion to additional streaming
services.

The proposed technology stack (React, Vite, Tailwind CSS) is modern,
well-documented, and provides excellent developer experience. The phased
development approach allows for iterative building and testing, with a
clear path from UI mockup to fully functional application.

By following this design, the application will provide significant value
to users while maintaining transparency, privacy, and accessibility. The
open-source nature of the project encourages community contributions and
ensures long-term sustainability.

## Next Steps:

1. Review and approve this design document
2. Set up development environment
3. Create GitHub repository
4. Begin Phase 1: UI Foundation development
5. Establish regular development milestones and reviews
