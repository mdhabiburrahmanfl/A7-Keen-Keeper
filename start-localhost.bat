@echo off
cd /d "C:\projects\milestone 7\A7 Keen Keeper"
start "KeenKeeper Localhost" cmd /k npm.cmd run dev -- --host 127.0.0.1 --port 4173
