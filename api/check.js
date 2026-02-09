export default async function handler(req, res) {
  const urlParam = req.query.url;
  if (!urlParam) return res.status(400).json({ error: "No URL" });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const start = Date.now();
    const response = await fetch(urlParam, { method: "GET", signal: controller.signal });
    clearTimeout(timeout);
    const responseTime = Date.now() - start;

    res.status(200).json({
      status: response.status,
      statusText: response.statusText,
      responseTime
    });

  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
}
