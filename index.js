const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("Ваш токен");

bot.on("text", (ctx) => {
  const getPushWeather = async () => {
    try {
      const res = await axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: ctx.message.text,
            appid: "Ваш appid",
            units: "metric",
          },
        })
        .then((response) => {
          ctx.reply(response.data.name + "   " + response.data.main.temp);
          if (
            response.data.weather[0].main === "Clouds" &&
            +response.data.main.temp > 0
          ) {
            ctx.reply("Ожидаются осадки, возможен дождь");
          }
        });
      return res;
    } catch {
      ctx.reply("Введи корректный город");
    }
  };
  getPushWeather();
  setInterval(getPushWeather, 86400000);
});
bot.launch();
