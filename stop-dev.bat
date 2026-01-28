@echo off
echo ========================================
echo  Music Streaming Transfer App
echo  Stopping Development Server...
echo ========================================
echo.

echo Stopping all Node.js processes...
taskkill /F /IM node.exe 2>nul

if %errorlevel% equ 0 (
    echo.
    echo ✓ Development server stopped successfully!
) else (
    echo.
    echo No Node.js processes found running.
)

echo.
pause
