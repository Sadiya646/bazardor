
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (!session) {
    return <RedirectToSignIn router={router} />;
  }

  return (
    <ProfileForm
      initialName={session.user.name ?? ""}
      email={session.user.email}
    />
  );
}

function RedirectToSignIn({
  router,
}: {
  router: ReturnType<typeof useRouter>;
}) {
  useEffect(() => {
    router.replace("/signin");
  }, [router]);

  return <p className="p-6 text-center">Redirecting to sign in...</p>;
}

function ProfileForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        setMessage(error.message || "Update failed.");
      } else {
        setMessage("Profile updated successfully!");
        setSuccess(true);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto my-10 max-w-xl px-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-emerald-700">
          My Profile
        </h1>

        <form onSubmit={handleUpdate}>
          <label className="mb-2 block font-medium">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="mb-5 w-full rounded-lg border bg-gray-100 p-3"
          />

          <label className="mb-2 block font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-emerald-500"
            required
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-emerald-600 p-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Information"}
          </button>

          {message && (
            <p
              role="status"
              className={`mt-4 text-center text-sm ${
                success ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
