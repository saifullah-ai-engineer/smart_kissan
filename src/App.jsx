import React, { useState } from "react";

export default function App() {
  const [farmerName, setFarmerName] = useState("");
  const [crop, setCrop] = useState("");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendToWebhook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(
        "http://localhost:5678/webhook-test/e321d96c-a2fe-48c1-96cf-3ceadf97016a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmerName,
            crop,
            query,
          }),
        }
      );

      // webhook may return json or text
      let result;
      try {
        result = await res.json();
      } catch {
        result = await res.text();
      }

      setResponse(result);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          🌱 Farmer Assistant
        </h1>
        <form onSubmit={sendToWebhook} className="space-y-4">
          <div>
            <label className="block font-medium">Farmer Name</label>
            <input
              type="text"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Crop</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Query</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Sending..." : "Send to Assistant"}
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="font-bold">Response from n8n:</h2>
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}