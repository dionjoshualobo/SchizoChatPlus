import { spawn } from "child_process";
import path from "path";

let torProcess = null;

export function startTorSim() {
  if (torProcess) return; // Already started
  const scriptPath = path.resolve("./tor_sim/tor_node_sim.py");
  torProcess = spawn("python3", [scriptPath], {
    cwd: path.dirname(scriptPath),
    stdio: ["ignore", "inherit", "inherit"],
    detached: true,
  });
  torProcess.unref();
  console.log("[tor_sim] Python TOR node simulation started.");
}

export function stopTorSim() {
  if (torProcess) {
    torProcess.kill();
    torProcess = null;
    console.log("[tor_sim] Python TOR node simulation stopped.");
  }
}
