# How to Run the Development Server

## Quick Start

### Starting the Server
1. Double-click `start-dev.bat`
2. A command window will open and the server will start
3. Your browser will show the app at http://localhost:5173 (or another port if that's in use)
4. Keep this window open while you're working

### Stopping the Server

**Option 1: Close the window**
- Simply close the command window that opened when you started the server
- Or press `Ctrl+C` in the window and type `Y` when asked

**Option 2: Use the stop script**
- Double-click `stop-dev.bat`
- This will forcefully stop all Node.js processes

## Troubleshooting

### Port Already in Use
If you see an error about the port being in use:
1. Run `stop-dev.bat` to kill any existing servers
2. Try `start-dev.bat` again

### Node.js Not Found
If you get an error that node is not found:
1. Make sure Node.js is installed
2. Restart your computer to refresh environment variables
3. Try again

## Development Workflow

1. Double-click `start-dev.bat` to start
2. Edit your code - changes will automatically refresh in the browser
3. When done, close the window or run `stop-dev.bat`
