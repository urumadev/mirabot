const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const Discord = require("discord.js")
const figlet = require('figlet');
const axios = require("axios");
const Canvas = require("canvas");
Canvas.registerFont("Fortnite.ttf", { family: "Fortnite" });
const Cooldownh = new Map();
const Cooldowhh =100000;
module.exports = {
    name: "fortnite",
    aliases: ['fort'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var down = Cooldownh.get(message.author.id) || { time: 0 };
        if (down.time + Cooldowhh > Date.now()) return;
        Cooldownh.set(message.author.id , { id: message.author.id, time: Date.now() });
        
                let response = (
                    await axios.get("https://api.fortnitetracker.com/v1/store", {
                        headers: { "TRN-Api-Key": "65076d21-c393-4c44-811a-afdc93caf911" },
                    })
                ).data;
                const colors = {
                    marvel: ["#FF6125", "#f11"],
                    uncommon: ["#8CFF00", "#14C809"],
                    epic: ["#FF00FB", "#8300FF"],
                    rare: ["#00F6FF", "#0078FF"],
                    handmade: ["#8CFF00", "#14C809"],
                    sturdy: ["#00F6FF", "#0078FF"],
                    fine: ["#CBFF00", "#FFA600"],
                    legendary: ["#CBFF00", "#FFA600"],
                    "icon series": ["#00FFC1", "#00FFEA"],
                    "slurp series": ["#00FFBE", "#00FF7E"],
                };
                let bg = await Canvas.loadImage("././bg3.png");
                // let mark = await Canvas.loadImage("./mark.png");
                const canvas = Canvas.createCanvas(
                    bg.width,
                    234 +
                        Math.ceil(
                            response.filter((x) => !x.storeCategory.includes("Daily")).length / 7
                        ) *
                            125 +
                        150
                );
                const ctx = canvas.getContext("2d");
                let bggrad = ctx.createLinearGradient(
                    canvas.width / 2,
                    0,
                    canvas.width / 2,
                    canvas.height
                );
                bggrad.addColorStop(0, "#0192FA");
                bggrad.addColorStop(1, "#035D94");
                ctx.fillStyle = bggrad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
        
                let x;
                let y = 234;
                let coordies = [23, 1001];
                let types = [
                    response.filter((x) => !x.storeCategory.includes("Daily")),
                    response.filter((x) => x.storeCategory.includes("Daily")),
                ];
                let bucks = await Canvas.loadImage(
                    "https://media.discordapp.net/attachments/755027284196327494/865268414250221588/one-v-buck-dpf.png?width=384&height=384"
                );
                ctx.drawImage(bg, 0, 0);
                ctx.fillStyle = "#fff";
                ctx.font = '40px "Fortnite"';
                let date = new Date();
                ctx.fillText(
                    `${
                        String(date.getDate()).length == 1 ? "0" + date.getDate() : date.getDate()
                    }.${
                        String(date.getMonth() + 1).length == 1
                            ? "0" + (date.getMonth() + 1)
                            : date.getMonth() + 1
                    }.${date.getFullYear()}`,
                    890,
                    109
                );
        
                // ctx.drawImage(mark, 20, canvas.height - 120, 100, 100);
        
                for (let n = 0; n <= 1; n++) {
                    y = 234;
                    x = coordies[n];
                    for (let i = 0; i < types[n].length; i++) {
                        item = types[n][i];
                        gradient = ctx.createLinearGradient(x, y, x + 125, y + 125);
                        gradient.addColorStop(
                            0,
                            colors[item.rarity.toLowerCase()]
                                ? colors[item.rarity.toLowerCase()][0]
                                : "#111"
                        );
                        gradient.addColorStop(
                            1,
                            colors[item.rarity.toLowerCase()]
                                ? colors[item.rarity.toLowerCase()][1]
                                : "#aaa"
                        );
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x, y, 125, 125);
        
                        let img = await Canvas.loadImage(item.imageUrl);
                        ctx.drawImage(img, x, y, 125, 125);
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + 125, y);
                        ctx.stroke();
                        ctx.lineTo(x + 125, y + 125);
                        ctx.stroke();
                        ctx.lineTo(x, y + 125);
                        ctx.stroke();
                        ctx.lineTo(x, y);
        
                        ctx.filter = "blur(40px)";
                        ctx.fillStyle = "rgba(0, 0, 0, 0.6  )";
                        ctx.fillRect(x, y + 100, 125, 25);
                        ctx.filter = "";
        
                        ctx.fillStyle = "#fff";
                        ctx.font = ctx.font.replace(/\d+px/, "15px");
                        let measure = ctx.measureText(item.name);
                        if (measure.width > 123) measure.width = 123;
                        ctx.fillText(item.name, x + (125 - measure.width) / 2, y + 113, 123);
        
                        ctx.font = ctx.font.replace(/\d+px/, "10px");
                        measure = ctx.measureText(item.vBucks);
                        if (measure.width > 125) measure.width = 125;
                        ctx.fillText(
                            item.vBucks,
                            x + (125 - (measure.width + 5)) / 2,
                            y + 123,
                            125
                        );
                        ctx.drawImage(
                            bucks,
                            x + (125 - measure.width) / 2 + measure.width,
                            y + 114,
                            10,
                            10
                        );
        
                        x += 125;
                        if (x >= coordies[n] + 875) {
                            x = coordies[n];
                            y += 125;
                        }
                    }
                }
                // const image = new Discord.MessageAttachment(canvas.toBuffer(), "shop.png");
                
                const img = new Discord.MessageAttachment(canvas.toBuffer(), "shop.png");
                message.reply({ files: [img] }).catch(console.log);
                // message.channel.send("Магазин фортнайта", {
                // 	files: [{ name: "shop.png", attachment: canvas.toBuffer() }],
                // 	embeds: [{
                // 		image: { url: "attachment://shop.png" }}]});
    },
}