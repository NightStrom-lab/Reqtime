export default async function handler(req, res){
  const url = req.query.url;
  if(!url) return res.status(400).json({status:400, message:"URL required"});

  try{
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 detik timeout
    const start = Date.now();

    const response = await fetch(url, {signal: controller.signal});
    clearTimeout(timeout);

    const responseTime = Date.now() - start;
    res.status(200).json({
      status: response.status,
      statusText: response.statusText,
      responseTime
    });

  } catch(e){
    res.status(500).json({
      status:500,
      message:e.message
    });
  }
}
