#!/bin/bash

# Weather Apps 서버 시작 스크립트

echo "🌤️  Weather Apps Server 시작"
echo "================================"

# Python 버전 확인
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python이 설치되어 있지 않습니다."
    echo "   Python 3.6 이상을 설치해주세요."
    exit 1
fi

echo "🐍 사용할 Python: $PYTHON_CMD"

# 서버 실행
echo "🚀 서버 시작 중..."
echo ""

$PYTHON_CMD server.py $1