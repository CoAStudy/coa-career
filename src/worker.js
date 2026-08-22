export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/submit" && request.method === "POST") {
      return handleSubmit(request, env);
    }

    // Everything else: serve the static site as usual.
    return env.ASSETS.fetch(request);
  }
};

async function handleSubmit(request, env) {
  try {
    let data;
    try {
      data = await request.json();
    } catch (e) {
      return json({ ok: false, error: "invalid_json" }, 400);
    }

    const name = (data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const phone = (data.phone || "").toString().trim();
    const field = (data.field || "").toString().trim();

    // Server-side validation (defense in depth; the form also validates client-side).
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9-]{9,13}$/;

    if (!name || !emailPattern.test(email) || !phonePattern.test(phone) || !field) {
      return json({ ok: false, error: "validation_failed" }, 400);
    }

    if (!env.SLACK_WEBHOOK_URL) {
      return json({ ok: false, error: "slack_not_configured" }, 500);
    }

    const mention = env.SLACK_MENTION ? String(env.SLACK_MENTION).trim() + "\n" : "";

    const text = [
      mention + "📝 新しいキャリア面談のお申し込みがありました",
      `・お名前: ${name}`,
      `・メールアドレス: ${email}`,
      `・電話番号: ${phone}`,
      `・研究領域: ${field}`
    ].join("\n");

    let slackRes;
    try {
      slackRes = await fetch(String(env.SLACK_WEBHOOK_URL).trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
    } catch (e) {
      return json({ ok: false, error: "slack_fetch_threw", detail: String(e) }, 502);
    }

    if (!slackRes.ok) {
      return json({ ok: false, error: "slack_delivery_failed", status: slackRes.status }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    // Catch-all so a bug here never surfaces as Cloudflare's generic
    // "Worker threw exception" page — the client always gets JSON back.
    return json({ ok: false, error: "unexpected_error", detail: String(err) }, 500);
  }
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
