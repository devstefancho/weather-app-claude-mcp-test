#!/usr/bin/env python3
"""
Simple HTTP server to serve both weather apps (v1 and v2)
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse

class WeatherAppHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle root path - show index page with links to both apps
        if path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            html_content = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Apps</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: white;
            margin-bottom: 30px;
            font-size: 2.5em;
            font-weight: 300;
        }
        .app-link {
            display: block;
            margin: 20px 0;
            padding: 15px 30px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-size: 1.1em;
            font-weight: 500;
        }
        .app-link:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
        .description {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .version {
            font-size: 0.9em;
            opacity: 0.7;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌤️ Weather Apps</h1>
        <p class="description">두 가지 스타일의 날씨 앱을 선택하여 체험해보세요</p>
        
        <a href="/v1/" class="app-link">
            📱 iOS Style Weather App
            <div class="version">v1 - iOS 네이티브 앱 스타일</div>
        </a>
        
        <a href="/v2/" class="app-link">
            ✨ Animated Weather App
            <div class="version">v2 - 애니메이션 중심의 현대적 디자인</div>
        </a>
    </div>
</body>
</html>
            """
            self.wfile.write(html_content.encode())
            return
            
        # Handle app routes
        elif path.startswith('/v1/'):
            # Serve v1 app files
            if path == '/v1/' or path == '/v1':
                file_path = 'v1/index.html'
            else:
                file_path = path[1:]  # Remove leading slash
        elif path.startswith('/v2/'):
            # Serve v2 app files
            if path == '/v2/' or path == '/v2':
                file_path = 'v2/index.html'
            else:
                file_path = path[1:]  # Remove leading slash
        else:
            # Default handling for other files
            file_path = path[1:]  # Remove leading slash
        
        # Check if file exists and serve it
        if os.path.exists(file_path):
            super().do_GET()
        else:
            self.send_error(404, f"File not found: {path}")

def run_server(port=8000):
    """Run the weather apps server"""
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", port), WeatherAppHandler) as httpd:
        print(f"🌤️  Weather Apps Server")
        print(f"📍 서버 주소: http://localhost:{port}")
        print(f"📱 v1 (iOS Style): http://localhost:{port}/v1/")
        print(f"✨ v2 (Animated): http://localhost:{port}/v2/")
        print(f"🔄 서버를 중지하려면 Ctrl+C를 누르세요")
        print("-" * 50)
        
        # Automatically open the browser
        try:
            webbrowser.open(f'http://localhost:{port}')
            print("🌐 브라우저에서 자동으로 열렸습니다")
        except:
            print("🌐 브라우저를 수동으로 열어주세요")
        
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 서버를 종료합니다")
            httpd.shutdown()

if __name__ == "__main__":
    import sys
    
    # Allow custom port as command line argument
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ 포트 번호가 올바르지 않습니다. 기본값 8000을 사용합니다.")
    
    run_server(port)