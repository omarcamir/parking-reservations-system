"use client";
import { useEffect, useRef, useState } from "react";

type Status = "CONNECTING" | "OPEN" | "CLOSED";
type UpdateMessage = { type: string; payload: { gateId: string } };

export function useGateWebSocket(gateId: string | undefined) {
  const [status, setStatus] = useState<Status>("CONNECTING");
  const [updates, setUpdates] = useState<UpdateMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

  useEffect(() => {
    if (!gateId || !wsUrl) {
      console.warn("WebSocket not initialized: missing gateId or wsUrl.");
      return;
    }

    // Prevent multiple connections
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    // console.log("Connecting WebSocket to:", wsUrl);

    ws.onopen = () => {
      // console.log("WebSocket connected");
      setStatus("OPEN");
      ws.send(JSON.stringify({ type: "subscribe", payload: { gateId } }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setUpdates(data);
      } catch (error) {
        console.error(
          "Failed to parse WebSocket message:",
          event.data || error
        );
      }
    };

    ws.onclose = () => {
      // console.log("WebSocket closed");
      setStatus("CLOSED");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setStatus("CLOSED");
    };

    return () => {
      // console.log("Cleaning up WebSocket");
      ws.close();
    };
  }, [gateId, wsUrl]);

  return { status, updates };
}
