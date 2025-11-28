from flask import Flask, request, jsonify
import json
from cryptography.fernet import Fernet

app = Flask(__name__)

# Example encryption key for the entry node
ENTRY_NODE_KEY = Fernet.generate_key()
fernet = Fernet(ENTRY_NODE_KEY)

@app.route('/route', methods=['POST'])
def route_packet():
    try:
        # Receive the packet
        packet = request.json
        print("Received packet:", packet)

        # Decrypt the outermost layer
        encrypted_payload = packet.get('payload')
        decrypted_payload = fernet.decrypt(encrypted_payload.encode()).decode()
        packet['payload'] = json.loads(decrypted_payload)

        # Forward the packet to the next node (mocked for now)
        print("Decrypted packet:", packet)
        return jsonify({"status": "success", "packet": packet})

    except Exception as e:
        print("Error in route_packet:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)