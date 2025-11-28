from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/processPacket", methods=["POST"])
def process_packet():
    try:
        packet = request.get_json(force=True) or {}
        print("[Middle Node] Received packet:", packet)

        if packet.get("payload") is None:
            raise ValueError("Packet payload missing")

        packet.setdefault("hops", []).append("middle")
        packet["layer"] = "exit"

        # Forward riskScore, flags, and action
        packet["riskScore"] = packet.get("riskScore", 0)
        packet["flags"] = packet.get("flags", [])
        packet["action"] = packet.get("action", "allow")

        return jsonify(packet)

    except Exception as error:
        print("[Middle Node] Error:", str(error))
        return jsonify({"status": "error", "message": str(error)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9003, use_reloader=False)
