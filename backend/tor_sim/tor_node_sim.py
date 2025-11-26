import json
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

CONFIG_PATH = "tor_nodes_config.json"
PORT = 8081  # Python process API port

def load_nodes():
    with open(CONFIG_PATH, "r") as f:
        data = json.load(f)
    return data["nodes"]

class NodeAPIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/nodes":
            nodes = load_nodes()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(nodes).encode())
        else:
            self.send_response(404)
            self.end_headers()

def run():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, NodeAPIHandler)
    print(f"[tor_sim] Node API running at http://localhost:{PORT}/nodes")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
