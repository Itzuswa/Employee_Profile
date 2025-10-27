@echo off
echo ========================================
echo Setting up Employee Management Database
echo ========================================
echo.

cd backend

echo Step 1: Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma client
    pause
    exit /b 1
)
echo ✅ Prisma client generated successfully
echo.

echo Step 2: Running database migrations...
call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations
    pause
    exit /b 1
)
echo ✅ Database migrations completed successfully
echo.

echo Step 3: Opening Prisma Studio to verify...
echo (You can close this window after verifying)
start npx prisma studio

echo.
echo ========================================
echo ✅ Database setup completed successfully!
echo ========================================
echo.
echo You can now:
echo 1. Start backend: cd backend && npm run dev
echo 2. Start frontend: cd frontend && npm run dev
echo.
pause
