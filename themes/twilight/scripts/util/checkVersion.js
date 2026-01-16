const https = require("node:https");
const { version } = require("../../package.json");

hexo.on("generateBefore", () => {
  hexo.log.info(String.raw`
  _______       _ _ _       _     _   
 |__   __|     (_) (_)     | |   | |  
    | |_      ___| |_  __ _| |__ | |_ 
    | \ \ /\ / / | | |/ _' | '_ \| __|
    | |\ V  V /| | | | (_| | | | | |_ 
    |_| \_/\_/ |_|_|_|\__, |_| |_|\__|
                       __/ |          
                      |___/           
  `);
});

// Private theme, version check disabled
hexo.on("generateAfter", () => {
  // No-op
});
