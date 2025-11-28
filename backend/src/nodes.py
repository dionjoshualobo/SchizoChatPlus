from flask import Flask, request, jsonify
import json
from cryptography.fernet import Fernet
import requests

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
        print("[Entry Node] Received packet:", packet)

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = entry_fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        # Forward to middle node
        response = requests.post('http://localhost:5001/middle', json=packet)
        return jsonify(response.json())

    except Exception as e:
        print("[Entry Node] Error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/middle', methods=['POST'])
def middle_node():
    try:
        packet = request.json
        print("[Middle Node] Received packet:", packet)

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = middle_fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        # Forward to exit node
        response = requests.post('http://localhost:5002/exit', json=packet)
        return jsonify(response.json())

    except Exception as e:
        print("[Middle Node] Error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/exit', methods=['POST'])
def exit_node():
    try:
        packet = request.json
        print("[Exit Node] Received packet:", packet)

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = exit_fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        print("[Exit Node] Final payload:", packet['payload'])
        return jsonify({"status": "success", "payload": packet['payload']})

    except Exception as e:
        print("[Exit Node] Error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)