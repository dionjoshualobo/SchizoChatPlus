from flask import Flask, request, jsonify
import json
from cryptography.fernet import Fernet
import requests
import sys

app = Flask(__name__)

# Example encryption keys for nodes
ENTRY_NODE_KEY = Fernet.generate_key()
MIDDLE_NODE_KEY = Fernet.generate_key()
EXIT_NODE_KEY = Fernet.generate_key()

entry_fernet = Fernet(ENTRY_NODE_KEY)
middle_fernet = Fernet(MIDDLE_NODE_KEY)
exit_fernet = Fernet(EXIT_NODE_KEY)

@app.route('/entry', methods=['POST'])
def entry_node():
    try:
        packet = request.json

        # IDS logging before processing
        print("[IDS - Entry Node] Starting IDS checks...")
        print("[IDS - Entry Node] Packet metadata:", {
            "id": packet.get("id"),
            "source": packet.get("source"),
            "destination": packet.get("destination"),
            "layer": packet.get("layer"),
            "timestamp": packet.get("timestamp")
        })
        print()
        sys.stdout.flush()

        print("[Entry Node] Received packet:", packet)
        print()
        sys.stdout.flush()

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = entry_fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        # IDS logging after processing
        print("[IDS - Entry Node] Completed IDS checks. Forwarding packet...")
        print()
        sys.stdout.flush()

        # Forward to middle node
        response = requests.post('http://localhost:5001/middle', json=packet)
        return jsonify(response.json())

    except Exception as e:
        print("[Entry Node] Error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/middle', methods=['POST'])
def middle_node():
    try:
        # IDS logging before processing
        packet = request.json
        print("[IDS - Middle Node] Starting IDS checks...")
        print("[IDS - Middle Node] Packet metadata:", {
            "id": packet.get("id"),
            "source": packet.get("source"),
            "destination": packet.get("destination"),
            "layer": packet.get("layer"),
            "timestamp": packet.get("timestamp")
        })
        print()
        sys.stdout.flush()

        print("[Middle Node] Received packet:", packet)
        print()
        sys.stdout.flush()

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = middle_fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        # IDS logging after processing
        print("[IDS - Middle Node] Completed IDS checks. Forwarding packet...")
        print()
        sys.stdout.flush()

        # Forward to exit node
        response = requests.post('http://localhost:5002/exit', json=packet)
        return jsonify(response.json())

    except Exception as e:
        print("[Middle Node] Error:", str(e))
        sys.stdout.flush()
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/exit', methods=['POST'])
def exit_node():
    try:
        # IDS logging before processing
        packet = request.json
        print("[IDS - Exit Node] Starting IDS checks...")
        print("[IDS - Exit Node] Packet metadata:", {
            "id": packet.get("id"),
            "source": packet.get("source"),
            "destination": packet.get("destination"),
            "layer": packet.get("layer"),
            "timestamp": packet.get("timestamp")
        })
        print()
        sys.stdout.flush()

        print("[Exit Node] Received packet:", packet)
        print()
        sys.stdout.flush()

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = exit_fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        # IDS logging after processing
        print("[IDS - Exit Node] Completed IDS checks. Final payload:", packet['payload'])
        print()
        sys.stdout.flush()

        return jsonify({"status": "success", "payload": packet['payload']})

    except Exception as e:
        print("[Exit Node] Error:", str(e))
        sys.stdout.flush()
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)