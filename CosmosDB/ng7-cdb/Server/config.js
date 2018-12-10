var config = {}

config.host = process.env.HOST || "https://31e09e2a-0ee0-4-231-b9ee.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "u8jv4GVoUxRUt8nOZxe2331EA8kb7fE55360UJTyGTE38sceA4bFTYlsXRNyuW28mMxyWMJWAeLQrcaCagn4ow==";
config.databaseId = "HeroesDB";
config.containerId = "Heroes";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;