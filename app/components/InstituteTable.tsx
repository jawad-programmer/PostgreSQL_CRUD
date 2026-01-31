"use client";

import { useEffect, useState } from "react";

type Institute = {
  id: number;
  name: string;
  location: string;
  establishedYear: number;
  type: string;
};

export default function InstituteTable() {
  const [data, setData] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Institute | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/institutes")
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    const h = () => fetchData();
    window.addEventListener("institutes:changed", h as EventListener);
    return () => window.removeEventListener("institutes:changed", h as EventListener);
  }, []);

  const handleDelete = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this institute?");
    if (!ok) return;
    try {
      const res = await fetch(`/api/institutes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const txt = await res.text();
        console.error("Delete failed:", txt);
        alert("Delete failed: " + txt);
        return;
      }
    } catch (err) {
      console.error(err);
      alert("Delete request failed, see console.");
      return;
    }
    fetchData();
  };

  const startEdit = (inst: Institute) => setEditing(inst);

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") || ""),
      location: String(fd.get("location") || ""),
      establishedYear: Number(fd.get("establishedYear") || 0),
      type: String(fd.get("type") || ""),
    };
    const res = await fetch(`/api/institutes/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error("Update failed:", txt);
      alert("Update failed: " + txt);
      return;
    }
    setEditing(null);
    fetchData();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border">
      <h3 className="text-xl font-semibold mb-4">Institutes</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="p-3">{d.id}</td>
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.location}</td>
                  <td className="p-3">{d.establishedYear}</td>
                  <td className="p-3">{d.type}</td>
                  <td className="p-3">
                    <button
                      onClick={() => startEdit(d)}
                      className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-96">
            <h4 className="text-lg font-bold mb-3">Update Institute</h4>
            <form onSubmit={submitEdit} className="space-y-3">
              <div>
                <label className="block text-sm">Name</label>
                <input name="name" defaultValue={editing.name} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm">Location</label>
                <input name="location" defaultValue={editing.location} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm">Established Year</label>
                <input name="establishedYear" type="number" defaultValue={editing.establishedYear} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm">Type</label>
                <select name="type" defaultValue={editing.type} className="w-full p-2 border rounded">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
