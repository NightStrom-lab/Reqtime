import fetch from "node-fetch";

export default async function handler(req,res){
  const url = req.query.url;
  if(!url) return res.status(400).json({status:400,message:"URL required"});

  try{
    const start = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 detik

    const response = await fetch(url, {signal: controller.signal});
    clearTimeout(timeout);
    const responseTime = Date.now() - start;

    // Kirim status + response time
    res.status(200).json({
      status: response.status,
      statusText: response.statusText,
      responseTime
    });

  } catch(e) {
    // Semua error backend dikirim full
    res.status(500).json({
      status: 500,
      message: e.message  // <- misal "broken pipe" atau "network timeout"
    });
  }
}
