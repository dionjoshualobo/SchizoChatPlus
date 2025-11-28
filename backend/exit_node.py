from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/processPacket", methods=["POST"])
def process_packet():
    try:
        packet = request.get_json(force=True) or {}
        print("[Exit Node] Received packet:", packet)

        if packet.get("payload") is None:
            raise ValueError("Packet payload missing")

        packet.setdefault("hops", []).append("exit")
        packet["layer"] = "delivered"
        packet["delivered"] = True

        return jsonify(packet)

    except Exception as error:
        print("[Exit Node] Error:", str(error))
        return jsonify({"status": "error", "message": str(error)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9006, use_reloader=False)
