@echo off
cd /d "%~dp0backend"
if not exist node_modules npm install
npm start
pause
