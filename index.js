const { default : makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, WAGroupMetadata, relayWAMessage, MediaPathMap, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, fetchLatestBaileysVersion, MessageRetryMap, extractGroupMetadata, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys')
const fs = require("fs")
const P = require('pino')
const os = require('os')
const axios = require('axios')
const ffmpeg = require("fluent-ffmpeg")
const { exec, spawn, execSync } = require("child_process")
const { Boom } = require('@hapi/boom')
const cfonts = require('cfonts')
const clc = require("cli-color")
const { fetchJson } = require('./database/fetcher')
const moment = require('moment-timezone')
const hora = moment.tz('America/Bogota').format('HH:mm:ss')
const data = moment.tz('America/Bogota').format('DD/MM/YY')
const time = moment().tz('America/Bogota').format('HH:mm:ss')
// 𝙵𝚒𝚐𝚞𝚛𝚒𝚝𝚊𝚜  🗺️
const TelegraPh = require('./database/telegraPh.js')
const {videoToWebp,imageToWebp,writeExifImg,writeExifVid} = require('./database/stickersss.js')
const author = "Slowed"
const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}`
}
// 𝙻𝚒𝚖𝚙𝚒𝚊𝚍𝚘𝚛 𝚍𝚎 𝚀𝚁
const fsPromises = require('fs').promises
const path = require('path')
// 𝙹𝚞𝚎𝚐𝚘𝚜 🎮
const sotoy = JSON.parse(fs.readFileSync('./juegos/sotoy.json'))
// 𝙰𝚗𝚝𝚒𝚕𝚒𝚗𝚔𝚜 🚨
const antiimg = JSON.parse(fs.readFileSync('./archivos/grupos/antis/antiimg.json'))
const antilink = JSON.parse(fs.readFileSync('./archivos/grupos/antis/antilink.json'))
const antipv = JSON.parse(fs.readFileSync('./archivos/grupos/antis/antipv.json'))
const antisticker = JSON.parse(fs.readFileSync('./archivos/grupos/antis/antisticker.json'))
const antivid = JSON.parse(fs.readFileSync('./archivos/grupos/antis/antivideo.json'))
// 𝙱𝚒𝚎𝚗𝚟𝚎𝚗𝚒𝚍𝚊 🌟 𝙳𝚎𝚜𝚙𝚎𝚍𝚒𝚍𝚊
const welkom = JSON.parse(fs.readFileSync('./archivos/grupos/bienvenida/welkom.json'))
//----------------------------------ϟϟ----------------------------------\\
const banner = cfonts.render("Slowed | Bot", {
  font: 'pallet',
  align: 'center',
  gradient: ["green","blue"]
})

const color = (text, color) => !color ? clc.bold(text) : clc.bold(text);

const prefixo = ["#", "/", "?", ".", "!", "$"]
function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}
async function connectToWhatsApp () {
const store = makeInMemoryStore({ logger: P().child({ level: "silent", stream: "store" })})
console.log(banner.string)
console.log(`Los saluda Slowed 2.0\nEsta base fue editada por Jeff\nSuscribete al canal de platzimaker ϟ`)
const { state, saveCreds } = await useMultiFileAuthState('./qr_code')

    const sock = makeWASocket({
        logger : P({ level : "silent" }),
        auth : state,
        browser: ["FireFox (linux)"],
        printQRInTerminal: true
    })
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Error en la conexión ', lastDisconnect.error, ', Reconectando ', shouldReconnect)
  // 𝚛𝚎𝚌𝚘𝚗𝚎𝚌𝚝𝚊𝚛 𝚜𝚒 𝚗𝚘 𝚜𝚎 𝚑𝚊 𝚌𝚎𝚛𝚛𝚊𝚍𝚘 𝚕𝚊 𝚜𝚎𝚜𝚒𝚘𝚗
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('Conexion exitosa')
        }
    })
      
 sock.ev.on ('creds.update', saveCreds)   
 
 store.bind(sock.ev)

sock.ev.on('chats.set', () => {
    console.log('Team chats', store.chats.all())
})

sock.ev.on('contacts.set', () => {
    console.log('Team contactos', Object.values(store.contacts))
})

      // 𝙱𝚒𝚎𝚗𝚟𝚎𝚗𝚒𝚍𝚊 🌟 𝙳𝚎𝚜𝚙𝚎𝚍𝚒𝚍𝚊 \\
      
sock.ev.on("group-participants.update", async (anu) => {
if(!welkom.includes(anu.id)) return 
try {
const datosgp = await sock.groupMetadata(anu.id)

if(anu.action == 'add') {
const numerodep = anu.participants[0]

const fotobienvenida = fs.readFileSync('./archivos/fotos/bienvenida.jpg')

const bienvenida = `

🚀 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿@ *_A_* 🚀

           *@Interstellar followers* 
🚀 : ${numerodep} 
          
🚀- *_Tu Ceo te da le bienvenida al grupo de ingresos_* 

🚀- *Empiezas mañana con tus 3 ingresos* 

🚀𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾𝙽 𝙸𝙼𝙿𝙾𝚁𝚃𝙰𝙽𝚃𝙴 

🧐- *Leer la descripción, ahí está todo bien detallado*
                
  🫶🏻𝙂𝙍𝘼𝘾𝙄𝘼𝙎 𝙋𝙊𝙍 𝙁𝙊𝙍𝙈𝘼𝙍 𝙋𝘼𝙍𝙏𝙀 𝘿𝙀  *_INTERSTELLAR FOLLOWERS_* 🫶🏻

`
sock.sendMessage(anu.id,{image : fotobienvenida, caption : bienvenida})
}

if (anu.action == 'remove') {
const numerodep2 = anu.participants[0]

const fotodespedida = fs.readFileSync('./archivos/fotos/despedida.jpg')


const despedida = `

𝘼𝘿𝙄𝙊𝙎 , 𝙂𝙍𝘼𝘾𝙄𝘼𝙎 𝙋𝙊𝙍 𝙋𝙀𝙍𝙏𝙀𝙉𝙀𝘾𝙀𝙍 𝘼 𝙄𝙉𝙏𝙀𝙍𝙎𝙏𝙀𝙇𝙇𝘼𝙍 

😁👋🏻 : ${numerodep2}

🚀 "𝙇𝙖𝙨 𝙥𝙚𝙤𝙧𝙚𝙨 𝙙𝙚𝙨𝙥𝙚𝙙𝙞𝙙𝙖𝙨 𝙨𝙤𝙣 𝙚𝙨𝙖𝙨 𝙦𝙪𝙚 𝙣𝙤 𝙨𝙚 𝙙𝙞𝙟𝙚𝙧𝙤𝙣."

`
sock.sendMessage(anu.id,{image : fotodespedida, caption : despedida})
}
} catch (e) {
console.log('error: %s', color(e, "red"))
}
})
  //----------------------------------ϟϟ----------------------------------\\
 sock.ev.on('messages.upsert', async m => {
 try {
 const info = m.messages[0]
 if (!info.message) return 
 if (info.key && info.key.remoteJid == "status@broadcast") return
 const altpdf = Object.keys(info.message)
 const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
 var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectenviar.selectedRowId : (type == 'templateButtonenviarMessage') ? info.message.templateButtonenviarMessage.selectedId : ''

const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''

// 𝙲𝙾𝙽𝚂𝚃𝙰𝙽𝚃𝙴𝚂 𝙸𝚂 
 const isGroup = info.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? info.key.participant : info.key.remoteJid
const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const nome = info.pushName ? info.pushName : ''
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = args.join(' ')
const q = args.join(' ')
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null 
var command = comando
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? sock.sendMessage(from, {text: teks.trim(), mentions: memberr}) : sock.sendMessage(from, {text: teks.trim(), mentions: memberr})}

       // 𝙲𝚘𝚗𝚜𝚝𝚜 𝙳𝚘𝚗𝚘🌟𝙰𝚍𝚖 𝙴𝚝𝚌 \\
 //--------------------------------------ϟϟ-----------------------------------\\
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).Mimetype || ""
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const pushname = info.pushName ? info.pushName : ''
const isBot = info.key.fromMe ? true : false
const owner = "51968374620"
const senderNumber = sender.split("@")[0]
const isOwner = senderNumber == owner
const nomeBot = "Slowed"
const BotNumber = sock.user.id.split(':')[0]+'@s.whatsapp.net'
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isBotGroupAdmins = groupAdmins.includes(BotNumber) || false
const iswelkom = isGroup ? welkom.includes(from) : false
const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) }
const deviceType = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IPhone' : 'WhatsApp web'
const options = { timeZone: 'America/Lima', hour12: false }
const data = new Date().toLocaleDateString('PE', { ...options, day: '2-digit', month: '2-digit', year: '2-digit' })
const hora = new Date().toLocaleTimeString('PE', options)
 
          // 𝙲𝚘𝚗𝚝𝚜 🌟 𝙰𝚗𝚝𝚒𝚜 \\
  //--------------------------------------ϟϟ-----------------------------------\\
const isAntiImg = isGroup ? 
antiimg.includes(from) : false
const isAntiLink = isGroup ?
 antilink.includes(from) : false
const isAntiPv = (antipv.indexOf('activado') >= 0) ? true : false 
const isAntiSticker = isGroup ?
 antisticker.includes(from) : false
 const isAntiVid = isGroup ?
 antivid.includes(from) : false  

 // 𝙲𝙾𝙽𝚂𝚃𝙰𝙽𝚃𝙴𝚂 𝙽𝚄𝙴𝚅𝙰𝚂
 
 const enviar = (texto) => {
 sock.sendMessage(from,{ text : texto }, {quoted : info})
 }
 
  const enviarimagen = (imagen) => {
 sock.sendMessage(from,{ image : imagen }, {quoted : info})
 }
 
 const enviarimagencap = (imagen,caption) => {
 sock.sendMessage(from,{ image : imagen ,caption : caption}, {quoted : info})
 }
 
const enviarvideos = (videos) => {
 sock.sendMessage(from,{ video : video ,mimetype: 'video/mp4' ,ppt: true, caption : caption}, {quoted : info})
 }
 
 const enviarvideoscap = (videos,caption) => {
 sock.sendMessage(from,{ video : videos ,caption : caption}, {quoted : info})
 }
 
const enviarmusica = (audios) => {
 sock.sendMessage(from,{ audio : musica ,mimetype: 'audio/mp4' ,ppt: true,}, {quoted : info})
 }
 
 const enviarsticker = (sticker) => {
 sock.sendMessage(from,{ sticker : sticker }, {quoted : info})
 }
 
 const enviardocumentos = (documento) => {
 sock.sendMessage(from,{document : documento },{quoted : info})
 }

const reagir = (reassao) => {
sock.sendMessage(from, {react: {text: reassao, key: info.key}})
}
  
 // 𝙲𝙾𝙽𝚂𝚃𝙰𝙽𝚃𝙴𝚂 𝙸𝙵𝙵 
 const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}
 
 // 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰𝚂 𝙰𝚄𝚃𝙾𝙼𝙰𝚃𝙸𝙲𝙰𝚂
 const respuesta = {
 espere : "*_espere un momento._*",
 dono : "*_solo mi dueño puede usar este comando._* 😠",
 premiun: "*_compre la version premiun._*",
 grupos : "*_este comando solo se puede usar en grupos._* 😠",
 privado : "*_este comando solo se puede usar en el pv._* 😠",
 error : "*_error , intente nuevamente..._*",
 }
 
// 𝙼𝙴𝙽𝚂𝙰𝙹𝙴𝚂 𝙴𝙽 𝙲𝙾𝙽𝚂𝙾𝙻𝙰 

const colors = require('colors');

// ...

if (!isGroup && isCmd) {
    console.log(
        '\n  '.white.bold + '╭══════⊷ '.white.bold + '[ ❗️]'.red.bold + ' 𝗠𝗘𝗡𝗦𝗔𝗝𝗘 𝗗𝗘 𝗖𝗛𝗔𝗧 𝗣𝗩 '.red.bold + '[ ❗️]'.red.bold + '━━━━━━━━━━━━➪'.white.bold + '\n'.white.bold +
        ' ➽ 𝐍𝐈𝐂𝐊 :'.yellow.bold + pushname.cyan + '\n' +
        ' ➽ 𝐌𝜮𝐍𝐒𝐆 :'.yellow.bold + budy.cyan + '\n' +
        ' ➽ 𝐇𝚯𝐑𝜟 :'.yellow.bold + hora.cyan + '\n' +
        ' ➽ 𝐃𝜟𝐓𝜟 :'.yellow.bold + data.cyan + '\n' +
        ' ╰━━━━━━━━━━⊷ '.white.bold + '[ ❗️] 𝗦𝗟𝗢𝗪𝗘𝗗 𝟮.𝟬 [ ❗️]'.white.bold + ' ━━━━━━━━━━━━➪'.white.bold
    );
}

// ...

// ❗𝙿𝚅❗
if (!isCmd && !isGroup) {
    console.log(
        '\n  '.white.bold + '╭══════⊷ '.white.bold + '[ ❗️]'.red.bold + ' 𝗖𝗢𝗠𝗔𝗡𝗗𝗢 𝗨𝗦𝗔𝗗𝗢 𝗘𝗡 𝗖𝗛𝗔𝗧 𝗣𝗩 '.red.bold + '[ ❗️]'.red.bold + '━━━━━━━━━━━━➪'.white.bold + '\n'.white.bold +
        ' ➽ 𝐍𝐈𝐂𝐊 :'.yellow.bold + pushname.cyan + '\n' +
        ' ➽ 𝐌𝜮𝐍𝐒𝐆 :'.yellow.bold + budy.cyan + '\n' +
        ' ➽ 𝐇𝚯𝐑𝜟 :'.yellow.bold + hora.cyan + '\n' +
        ' ➽ 𝐃𝜟𝐓𝜟 :'.yellow.bold + data.cyan + '\n' +
        ' ╰━━━━━━━━━━⊷ '.white.bold + '[ ❗️] 𝗦𝗟𝗢𝗪𝗘𝗗 𝟮.𝟬 [ ❗️]'.white.bold + ' ━━━━━━━━━━━━➪'.white.bold
    );
}

// ...

// ❗𝙲𝙾𝙼𝙰𝙽𝙳𝙾  𝙶𝚁𝚄𝙿𝙾❗
if (isCmd && isGroup) {
    console.log(
        '\n  '.white.bold + '╭══════⊷ '.white.bold + '[ ❗️]'.red.bold + ' 𝗖𝗢𝗠𝗔𝗡𝗗𝗢 𝗨𝗦𝗔𝗗𝗢 𝗘𝗡 𝗚𝗥𝗨𝗣𝗢 '.red.bold + '[ ❗️]'.red.bold + '━━━━━━━━━━━━➪'.white.bold + '\n'.white.bold +
        ' ➽ 𝐆𝐑𝐔𝐏𝚯 :'.yellow.bold + groupName.cyan + '\n' +
        ' ➽ 𝐍𝐈𝐂𝐊 :'.yellow.bold + pushname.cyan + '\n' +
        ' ➽ 𝐂𝚯𝐌𝜟𝐍𝐃𝚯 :'.yellow.bold + comando.cyan + '\n' +
        ' ➽ 𝐇𝚯𝐑𝜟 :'.yellow.bold + hora.cyan + '\n' +
        ' ➽ 𝐃𝜟𝐓𝜟 :'.yellow.bold + data.cyan + '\n' +
        ' ╰━━━━━━━━━━⊷ '.white.bold + '[ ❗️] 𝗦𝗟𝗢𝗪𝗘𝗗 𝟮.𝟬 [ ❗️]'.white.bold + ' ━━━━━━━━━━━━➪'.white.bold
    );
}

// ...

// ❗𝙼𝙴𝙽𝚂𝙰 𝙶𝚁𝚄𝙿𝙾❗
if (!isCmd && isGroup) {
    console.log(
        '\n  '.white.bold + '╭══════⊷ '.white.bold + '[ ❗️]'.red.bold + ' 𝗠𝗘𝗡𝗦𝗔𝗝𝗘 𝗗𝗘 𝗚𝗥𝗨𝗣𝗢 '.red.bold + '[ ❗️]'.red.bold + '━━━━━━━━━━━━➪'.white.bold + '\n'.white.bold +
        ' ➽ 𝐆𝐑𝐔𝐏𝚯 :'.yellow.bold + groupName.cyan + '\n' +
        ' ➽ 𝐍𝐈𝐂𝐊 :'.yellow.bold + pushname.cyan + '\n' +
        ' ➽ 𝐌𝜮𝐍𝐒𝐆 :'.yellow.bold + budy.cyan + '\n' +
        ' ➽ 𝐇𝚯𝐑𝜟 :'.yellow.bold + hora.cyan + '\n' +
        ' ➽ 𝐃𝜟𝐓𝜟 :'.yellow.bold + data.cyan + '\n' +
        ' ╰━━━━━━━━━━⊷ '.white.bold + '[ ❗️] 𝗦𝗟𝗢𝗪𝗘𝗗 𝟮.𝟬 [ ❗️]'.red.bold + ' ━━━━━━━━━━━━➪'.white.bold
    );
}


   //----------------------------------ϟϟ----------------------------------\\ 
     //------------------𝙲𝙰𝚂𝙴 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 ------------------\\
    sock.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     }   
const enviarfiguvid = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifVid(buff, options)
} else {
 buffer = await videoToWebp(buff)
}

await sock.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }
 function isDoubleByte(str) {
for (let i = 0, n = str.length; i < n; i++) {
if (str.charCodeAt(i) > 255) {
return true;
}
}
return false;
}

const enviarfiguimg = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifImg(buff, options)
} else {
 buffer = await imageToWebp(buff)
}

await sock.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }
  //----------------------------------ϟϟ----------------------------------\\ 
      //------------------ϟ𝙲𝙰𝚁𝙶𝙰𝙽𝙳𝙾ϟ------------------\\
async function carregamento () {//by resk
var carr = [
" ᴄᴀʀɢᴀɴᴅᴏ\n《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
" ᴄᴀʀɢᴀɴᴅᴏ\n《 ████▒▒▒▒▒▒▒▒》30%",
" ᴄᴀʀɢᴀɴᴅᴏ\n《 ███████▒▒▒▒▒》50%",
" ᴄᴀʀɢᴀɴᴅᴏ\n《 ██████████▒▒》80%",
" ᴄᴀʀɢᴀɴᴅᴏ\n《 ████████████》100%",
"~_*© Jeff*_~\n𝙲𝙰𝚁𝙶𝙰 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰 ..."
]
let { key } = await sock.sendMessage(from, {text: 'ᴄᴀʀɢᴀɴᴅᴏ ...'})//primer mensaje

//aqui es donde esta la magia
for (let i = 0; i < carr.length; i++) {
await sock.sendMessage(from, {text: carr[i], edit: key });//aqui é onde esta magia
}
}
  //----------------------------------ϟϟ----------------------------------\\ 
   //--------------------ϟ𝙻𝙸𝙼𝙿𝙸𝙰𝚁 𝚀𝚁 ϟ---------------------\\
async function limpiarQR() {
  try {
    const dir = 'qr_code';

    const arch = await fsPromises.readdir(dir)

    const delet = arch.filter(arch =>
      /^pre-key|^session|^sender/.test(arch)
    )
    await Promise.all(
      delet.map(arch =>
        fsPromises.unlink(path.join(dir, arch))
      )
    )

    console.log('QR limpio correctamente.')
  } catch (e) {
    console.error('Error al limpiar el QR:', e)
  }
}
  //----------------------------------ϟϟ----------------------------------\\ 
  //--------------------ϟ𝙱𝙾𝚃 𝙳𝙸𝚂𝙿𝙰𝚁𝙰𝙼𝙴ϟ---------------------\\
const usedCommandRecently = new Set()
const isFiltered = (from) => !!usedCommandRecently.has(from)
const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => usedCommandRecently.delete(from), 20000)
}
  //----------------------------------ϟϟ----------------------------------\\ 
      //--------------------𝙰𝙽𝚃𝙸𝙸𝙼𝙶--------------------\\  
if(isAntiImg && isBotGroupAdmins && type == 'imageMessage') {
if (info.key.fromMe) return
if(isGroupAdmins) return sock.sendMessage(from, {text:'*_esto está prohibido, pero como eres admin no serás eliminado_* 🫂'}, {quoted: info})
setTimeout(() => {
sock.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
setTimeout(async function () {
if(!JSON.stringify(groupMembers).includes(sender)) return  
sock.groupParticipantsUpdate(from, [sender], 'remove')
}, 1000)
}
  //----------------------------------ϟϟ----------------------------------\\    //------------------ϟ𝙰𝙽𝚃𝙸 𝙿𝚅------------------\\ 

  //----------------------------------ϟϟ----------------------------------\\    //------------------ϟ𝙰𝙽𝚃𝙸𝚂𝚃𝙸𝙲𝙺𝙴𝚁------------------\\ 
 if(isAntiSticker && isBotGroupAdmins && type == 'stickerMessage') {
if (info.key.fromMe) return
if(isGroupAdmins) return sock.sendMessage(from, {text:'*_esto está prohibido, pero como eres admin no serás eliminado_* 🫂.'}, {quoted: info})
await sock.sendMessage(from, {text: 'Usted desobedeció las reglas y por eso sera baneado'}, {quoted: info})
setTimeout(async function () {
sock.groupParticipantsUpdate(from, [sender], 'remove')
}, 1000)
}
  //----------------------------------ϟϟ----------------------------------\\    //--------------------ϟ𝙰𝙽𝚃𝙸𝚅𝙸𝙳𝙴𝙾ϟ--------------------\\
if(isAntiVid && isBotGroupAdmins && type == 'videoMessage') {
if(isGroupAdmins) return sock.sendMessage(from,{text:'*_esto está prohibido, pero como eres admin no serás eliminado_* 🫂.'}, {quoted: info})
await sock.sendMessage(from, {text: 'Usted desobedeció las reglas y por eso sera baneado'}, {quoted: info})
setTimeout(async function () {
sock.groupParticipantsUpdate(from, [sender], 'remove')
}, 1000)
} 
  //----------------------------------ϟϟ----------------------------------\\ 
   //----------------𝙲𝙾𝙽 𝚈 𝚂𝙸𝙽 𝙿𝚁𝙴𝙵𝙸𝙹𝙾---------------\\
 const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const prefixes = prefixo ? prefixo.map(prefix => prefix.toLowerCase()) : [];

const lowerBudy = budy.toLowerCase();

const hasPrefix = prefixes.some(prefix => lowerBudy.startsWith(prefix));
const commandArgs = hasPrefix ? lowerBudy.slice(prefixes.find(prefix => lowerBudy.startsWith(prefix)).length).trim().split(' ') : lowerBudy.trim().split(' ');

const isCommand = removeAccents(commandArgs[0]);
  //----------------------------------ϟϟ----------------------------------\\ 
// 𝙲𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚜𝚒𝚗 𝚙𝚛𝚎𝚏𝚒𝚓𝚘 
if (body.includes("Jeff")){
reagir(`🌟`)
} 

if (body.includes("bot")){
reagir(`😁`)
} 

if(budy.includes('xd')) {
const gsfsf = {sticker : fs.readFileSync('./archivos/grupos/stickersgp/xd.webp')}
sock.sendMessage(from,gsfsf,{quoted : info })
}


switch(isCommand) {

case 'menu' :
carregamento()
const slowed = fs.readFileSync('./archivos/fotos/menu.jpg')
const menu = `
╔━⊱ *「 𝙎𝙇𝙊𝙒𝙀𝘿 𝘽𝙊𝙏 」* ━✕
│ 🤵🏻 Dueño  : platzimaker ϟ
│ 💬 Prefijo : cualquiera
│ 🤖 Bot : ${nomeBot}
│ 👤 Usuário : ${pushname}
│ 🕑 Hora : ${hora} 
│ 📆 Fecha : ${data}
┗━━━━━━━━━━━━━━✕
「🌟 𝗠𝗲𝗻𝘂 𝗰𝗿𝗲𝗮𝗱𝗼𝗿 🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣creador
│  ⋆⃟ۣۜ᭪➣seradmin
│  ⋆⃟ۣۜ᭪➣sermiembro
│  ⋆⃟ۣۜ᭪➣entrargp
│  ⋆⃟ۣۜ᭪➣salirgp
│  ⋆⃟ۣۜ᭪➣reiniciar
╰────────────
「🌟 𝗠𝗲𝗻𝘂 𝗮𝗱𝗺𝗶𝗻𝘀 🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣bienvenida 1/0
│  ⋆⃟ۣۜ᭪➣add
│  ⋆⃟ۣۜ᭪➣ban
│  ⋆⃟ۣۜ᭪➣promover 
│  ⋆⃟ۣۜ᭪➣degradar
│  ⋆⃟ۣۜ᭪➣abrirgp
│  ⋆⃟ۣۜ᭪➣cerrargp
│  ⋆⃟ۣۜ᭪➣hidetag
│  ⋆⃟ۣۜ᭪➣marcar
╰────────────
「🌟 𝗠𝗲𝗻𝘂 𝗮𝗹𝗲𝗮𝘁𝗼𝗿𝗶𝗼  🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣proximamente
╰────────────
「🌟 𝗠𝗲𝗻𝘂 𝗮𝗻𝘁𝗶𝘀 🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣antiimg 1/0
│  ⋆⃟ۣۜ᭪➣antilink 1/0
│  ⋆⃟ۣۜ᭪➣antipv 1/0 (Creador)
│  ⋆⃟ۣۜ᭪➣antisticker 1/0
│  ⋆⃟ۣۜ᭪➣antivideo 1/0
╰────────────
「🌟 𝗠𝗲𝗻𝘂 𝗳𝗶𝗴𝘂 🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣figu
│  ⋆⃟ۣۜ᭪➣figuimg
│  ⋆⃟ۣۜ᭪➣figuanime 4
│  ⋆⃟ۣۜ᭪➣attp
│  ⋆⃟ۣۜ᭪➣emojimix
╰────────────
「🌟 𝗠𝗲𝗻𝘂 𝗱𝗲𝘀𝗰𝗮𝗿𝗴𝗮𝘀 🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣ytaudio (nombre de la 🎶)
│  ⋆⃟ۣۜ᭪➣ttk (link de tiktok)
│  ⋆⃟ۣۜ᭪➣fb (link de facebook )
│  ⋆⃟ۣۜ᭪➣ig (link de ig)
│  ⋆⃟ۣۜ᭪➣fotocompartida
╰────────────
「🌟 𝗠𝗲𝗻𝘂 𝗷𝘂𝗲𝗴𝗼𝘀  🌟」
╭────────────
│  ⋆⃟ۣۜ᭪➣casino
│  ⋆⃟ۣۜ᭪➣botdisparame 
│  ⋆⃟ۣۜ᭪➣fakechat
│  ⋆⃟ۣۜ᭪➣topgay
│  ⋆⃟ۣۜ᭪➣topcachon
╰────────────
`
sock.sendMessage(from, {image: slowed, caption: menu, contextInfo : {externalAdReply : {title : "(MI IG SIGUEME !!)", body : "", reviewType : "PHOTO", thumbnailUrl : `https://telegra.ph/file/7643eaa3e00f90f6b68ba.jpg`, sourceUrl : `https://instagram.com/jeffbs_xviii?igshid=OGQ5ZDc2ODk2ZA==`, mediaType : 2}}})
sock.sendMessage(from, { audio: { url:'https://cdn.discordapp.com/attachments/1185036747768348693/1188631474698727455/AUD-20231224-WA0176.m4a?ex=659b3a53&is=6588c553&hm=2927d1f04f084787b738232c18b2990a21d83485151f9dd9925dcb3868ef32f8&' }, mimetype: 'audio/mp4', ppt:true}, {quoted:info})
break
       // 𝘾𝙖𝙨𝙚𝙨 𝙙𝙚 𝙢𝙞 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 🧑🏻‍💻\\        
case 'dueño':
case 'creador':
   await enviar(`*_hola ${pushname} estoy enviando el numero de mi creador ..._*`)
   await delay(1000)
     sock.sendMessage(from, {
       displayName: "meu-dono",
       contacts: {
         contacts: [{
           vcard: "BEGIN:VCARD\n" +
                  "VERSION:3.0\n" +
                  "FN:Jeff 👤\n" +
                  "ORG:Reder Corporation\n" +
                  "TEL;waid=573152547721:+57 315 254-7721\n" +
                  "END:VCARD"                  
         }]
       }
     })    
    break

case 'limpiarqr':
    if (!isOwner) {
      enviar('*_solo mi dueño puede usar este comando_* 😠')
    } else {
      carregamento()
      limpiarQR()
      await sleep(3000)  
      enviar('*_listo , QR limpio (si no se envían mensajes reinicie bot)_*')
    }
    break
    
case 'seradmin':
if (!isOwner) return enviar("*_solo mi dueño puede usar este comando_* 😠")
mentions(`@${sender.split("@")[0]} *_petición aceptada mi creador fue promovido a admin_*`, [sender], true)
sock.groupParticipantsUpdate(from, [sender], "promote")
break

case 'sermiembro':
if (!isOwner) return enviar("*_solo mi dueño puede usar este comando_* 😠")
mentions(`@${sender.split("@")[0]} *_petición aceptada cuando quieras volver a ser admin pídelo_*`, [sender], true)
sock.groupParticipantsUpdate(from, [sender], "demote")
break

case 'entrargp':
if (!isOwner) return enviar("*_solo mi dueño puede usar este comando_* 😠")
if (!q) return enviar("*_Coloque el link_*")
try {
let result = args[0].split('chat.whatsapp.com/')[1]
await sock.groupAcceptInvite(result)
enviar("*_listo orden cumplida_* 💂")
} catch(erro) {
if(String(erro).includes("resource-limit")) {
enviar("*_slowed no puede entrar al grupo porque esta lleno🚷_*")
} else if(String(erro).includes("not-authorized")) {
enviar("*_slowed no puede entrar al grupo porque ya fue eliminado antes_* 😔")
} else if(String(erro).includes("gone")){
enviar("*_slowed no puede entrar al grupo porque el link fue restablecido_* 😔")
} else if(String(erro).includes("not-acceptable")) {
enviar("*_ese grupo no existe ksksks🤡_*")
} else {
enviar("*_Hmm no consegui entrar al grupo_* 😔")
}
}
break

case 'salirgp':
if (!isOwner) return enviar("*_solo mi dueño puede usar este comando_* 😠")
enviar("*_mi dueño Jeff me mando a salirme.... bye bye 😫🖐_*")
await delay(1000)
try {
sock.groupLeave(from)
} catch(e) {
console.log(e)
enviar("*_error_*")
}
break

case 'reiniciar':
if (!isOwner ) return enviar("*_solo mi dueño puede usar este comando_* 😠")
setTimeout(async () => {
enviar("*_Reiniciando..._*")
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
break    
         // 𝘾𝙖𝙨𝙚𝙨 𝙙𝙚 𝙖𝙙𝙢𝙞𝙣𝙨  🧑🏻‍⚖️\\
case 'welcome' : 
case 'bienvenida' : 
if(args.length<1) return enviar ("*_1 para ativar, 0 para desativar_* ❕")
if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
if(!isGroupAdmins) return enviar ("*_solo los admins pueden usar este comando_* 😠")
if (!isBotGroupAdmins) return enviar("*_el bot necesita ser admin para  usar este comando_* 😩")
if(Number(args[0])===1) {
if(iswelkom) return enviar("la bienvenida ya esta activa en este grupo")
welkom.push(from)
fs.writeFileSync('./archivos/grupos/bienvenida/welkom.json',JSON.stringify(welkom))
enviar("*_activado exitosamente_*")
} else if (Number(args[0])===0) {
if (!iswelkom) return enviar("*_la bienvenida no está activada_*")
const comandante1 = from
 processo = welkom.indexOf(comandante1)
while(processo>=0) {
welkom.splice(processo, 1)
 processo = welkom.indexOf(comandante1)
}
fs.writeFileSync('./archivos/grupos/bienvenida/welkom.json',JSON.stringify(welkom))
enviar("*_desactivado exitosamente_*")
} else {
enviar("*_1 para ativar, 0 para desativar_* ❕")
}
break

case 'add' :
case 'agregar' :
if(args.length===0) return enviar ("*_agrega el número de la persona que deseas agregar_*\n*_ejp: /add +57xxxxxxxxxx_*")
if(!isGroupAdmins) return enviar ("*_solo los admins pueden usar este comando_* 😠")
if (!isBotGroupAdmins) return enviar("*_el bot necesita ser admin para  usar este comando_* 😩")
let nuevomiembro  = info.quoted ? info.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sock.groupParticipantsUpdate(from, [nuevomiembro ] , "add")
break

case 'hakai':
case 'ban':
case 'kick':
{
if (!isGroup) return enviar("*_este comando solo es pada grupos_* 😠")
if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para  usar este comando_* 😩")
if (info.message.extendedTextMessage === undefined || info.message.extendedTextMessage === null) return enviar("*_responda al mensaje o marque a la persona que quiere eliminar._*")
if(info.message.extendedTextMessage.contextInfo.participant !== null && info.message.extendedTextMessage.contextInfo.participant != undefined && info.message.extendedTextMessage.contextInfo.participant !== "") {
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid[0] ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : info.message.extendedTextMessage.contextInfo.participant
if(sender.includes(mentioned)) return enviar("😑")
if(BotNumber.includes(mentioned)) return enviar("*_no soy tan tonto para eliminarme , estoy decepcionado de ti._*")
if(owner.includes(mentioned)) return enviar("*_no puedo eliminar a mi dueño 🤗_*")
let responseb = await sock.groupParticipantsUpdate(from, [mentioned], 'remove')
if (responseb[0].status === "200") sock.sendMessage(from, {text: "*_fue eliminado del grupo con éxito.️_*", mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responseb[0].status === "406") sock.sendMessage(from, {text: "*_creo este grupo no puede ser eliminad@ del grupo_*", mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responseb[0].status === "404") sock.sendMessage(from, {text: "*_ya fue eliminad@ o salió del grupo_*", mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else sock.sendMessage(from, {text: "*_Jumm , parece que dio error_*", mentions: [sender], contextInfo:{forwardingScore:999, isForwarded:true}})
} else if (info.message.extendedTextMessage.contextInfo.mentionedJid != null && info.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid
if(mentioned.includes(sender)) return enviar("😑")
if(mentioned.includes(owner)) return enviar("*_no puedo eliminar a mi dueño 🤗_*")
if(mentioned.includes(BotNumber)) return enviar("😑")
if(mentioned.length > 1) {
if(mentioned.length > groupMembers.length || mentioned.length === groupMembers.length || mentioned.length > groupMembers.length - 3) return enviar("*_¿vas a eliminar a todos?_*")
sock.sendMessage(from, {text: "*_participantes eliminados del grupo_*", mentions: [sender], contextInfo:{forwardingScore:999, isForwarded:true}})
} else {
let responseb3 = await sock.groupParticipantsUpdate(from, [mentioned[0]], 'remove')
if (responseb3[0].status === "200") sock.sendMessage(from, {text: "*_fue eliminado del grupo con éxito.️_*", mentions: [mentioned[0], sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responseb3[0].status === "406") sock.sendMessage(from, {text: "creo este grupo no puede ser eliminad@ del grupo_*", mentions: [mentioned[0], sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responseb3[0].status === "404") sock.sendMessage(from, {text: "*_ya fue eliminad@ o salió del grupo_*", mentions: [mentioned[0], sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else sock.sendMessage(from, {text: "*_Jumm , parece que dio error_*", mentions: [sender], contextInfo:{forwardingScore:999, isForwarded:true}})
}
}
}
break

case 'promover': {
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠")
  let users = info.mentionedJid && info.mentionedJid[0] ? info.mentionedJid[0] : info.quoted ? info.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  
  if (users) {
    await sock.groupParticipantsUpdate(from, [users], 'promote')
    enviar("*_usuario promovido exitosamente a administrador_*")
  }
}
break

case 'degradar': {
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠") 
  let users = info.mentionedJid && info.mentionedJid[0] ? info.mentionedJid[0] : info.quoted ? info.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'  
  if (users) {
    await sock.groupParticipantsUpdate(from, [users], 'demote')
    enviar("*_usuario degradado exitosamente a miembro_*")
  }
}
break

case 'abrir':
case 'abrirgp':
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠")
sock.groupSettingUpdate(from, 'not_announcement')
break

case 'cerrar':
case 'cerrargp':
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠")
await sock.groupSettingUpdate(from, 'announcement')
break

case 'hidetag' :
case 'Hidetag' :
case 'HIDETAG' :
case 'mensaje' :
case 'Mensaje' :
case 'MENSAJE' :
if(!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠")
			var group = await sock.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map(async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var optionshidetag = {
			text: q,
			contextInfo: { mentionedJid: mem },
			quoted: m
			}
			sock.sendMessage(from, optionshidetag, text)
			break

case 'gptt':
case 'marcar': {
if(!isGroupAdmins) return enviar ("*_solo los admins pueden usar este comando_* 😠")
if (!isBotGroupAdmins) return enviar("*_el bot necesita ser admin para  usar este comando_* 😩")
if (!isGroup) return enviar("*_este comando solo es para grupos_*")
let metadata = await sock.groupMetadata(from);
let participants = metadata.participants || [];
let teks = args.join(" ");
for (let mem of participants) {
    teks += `┃❖ @${mem.id.split('@')[0]}\n`;
  }
  sock.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: info })
}
break

            // 𝘾𝙖𝙨𝙚𝙨 𝙖𝙡𝙚𝙖𝙩𝙤𝙧𝙞𝙤𝙨 \\
            
           // 𝘾𝙖𝙨𝙚𝙨 𝙙𝙚 𝙖𝙣𝙩𝙞𝙡𝙞𝙣𝙠𝙨  🚨\\
case 'antiimg':
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠") 
if (args.length < 1) return enviar("Hmmmm")
if (Number(args[0]) === 1) {
if (isAntiImg) return enviar("Ya Esta activo")
antiimg.push(from)
fs.writeFileSync('./archivos/grupos/antis/antiimg.json', JSON.stringify(antiimg))
enviar("🔐𝐀𝐍𝐓𝐈 𝐈𝐌𝐀𝐆𝐄𝐍 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎 𝐓𝐄𝐍𝐆𝐀𝐍 𝐂𝐔𝐈𝐃𝐀𝐃𝐎 𝐂𝐎𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐈𝐌𝐀𝐆𝐄𝐍𝐄𝐒, 𝐒𝐄 𝐋𝐄𝐒 𝐁𝐀𝐍𝐄𝐀𝐑𝐀  𝐃𝐄 𝐌𝐀𝐍𝐄𝐑𝐀 𝐔𝐓𝐎𝐌𝐀́𝐓𝐈𝐂𝐀𝐌𝐄𝐍𝐓𝐄🔐")
} else if (Number(args[0]) === 0) {
if (!isAntiImg) return enviar("*_ya esta desactivado_*")
antiimg.splice(from, 1)
fs.writeFileSync('./archivos/grupos/antis/antiimg.json', JSON.stringify(antiimg))
enviar('🔓𝐀𝐍𝐓𝐈 𝐈𝐌𝐀𝐆𝐄𝐍 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐏𝐔𝐄𝐃𝐄𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐈𝐌𝐀𝐆𝐄𝐍𝐄𝐒 𝐒𝐈𝐍 𝐍𝐈𝐍𝐆𝐔𝐍 𝐏𝐑𝐎𝐁𝐋𝐄𝐌𝐀🔓')
} else {
enviar("*_1 para activar, 0 para desactivar_* ❕")
}
break

case 'antilink':
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠") 
if (args.length < 1) return enviar(`*_1 para activar, 0 para desactivar_* ❕`)
if (Number(args[0]) === 1) {
if (isAntiLink) return enviar("𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺 𝚈𝙰 𝙴𝚂𝚃𝙰 𝙰𝙲𝚃𝙸𝚅𝙾")
antilink.push(from)
fs.writeFileSync('./archivos/grupos/antis/antilink.json', JSON.stringify(antilink))
enviar("🔐𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐓𝐄𝐍𝐆𝐀𝐍 𝐂𝐔𝐈𝐃𝐀𝐃𝐎 𝐂𝐎𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐋𝐈𝐍𝐊, 𝐒𝐄 𝐋𝐄𝐒 𝐁𝐀𝐍𝐄𝐀𝐑𝐀 𝐃𝐄 𝐌𝐀𝐍𝐄𝐑𝐀 𝐀𝐔𝐓𝐎𝐌𝐀𝐓𝐈𝐂𝐀🔐️")
} else if (Number(args[0]) === 0) {
antilink.splice(from, 1)
fs.writeFileSync('./archivos/grupos/antis/antilink.json', JSON.stringify(antilink))
enviar("🔓𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐏𝐔𝐄𝐃𝐄𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐋𝐈𝐍𝐊 𝐒𝐈𝐍 𝐍𝐈𝐍𝐆𝐔𝐍 𝐏𝐑𝐎𝐁𝐋𝐄𝐌𝐀🔓")
} else {
enviar(`*_1 para activar, 0 para desactivar_* ❕`)
}
break

case 'antipv':
if (!isOwner) return enviar("*_solo mi dueño puede usar este comando_* 😠")
            if (args.length < 1) return enviar("*_1 para activar, 0 para desactivar_* ❕")
            if (Number(args[0]) === 1) {
              if (isAntiPv) return enviar("*_ya esta activo_* 😁")
              antipv.push('activado')
              fs.writeFileSync('./archivos/grupos/antis/antipv.json', JSON.stringify(antipv))
              enviar("🔐𝐀𝐍𝐓𝐈 𝐏𝐕 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐓𝐄𝐍𝐆𝐀𝐍 𝐂𝐔𝐈𝐃𝐀𝐃𝐎 𝐂𝐎𝐍 𝐄𝐒𝐂𝐑𝐈𝐁𝐈𝐑, 𝐒𝐄 𝐋𝐄𝐒 𝐁𝐀𝐍𝐄𝐀𝐑𝐀 𝐃𝐄 𝐌𝐀𝐍𝐄𝐑𝐀 𝐀𝐔𝐓𝐎𝐌𝐀𝐓𝐈𝐂𝐀🔐️")
            } else if (Number(args[0]) === 0) {
              if (!isAntiPv) return enviar("*_ya esta desactivado_* 😁")
              processo = antipv.indexOf(from)
              while (processo >= 0) {
                antipv.splice(processo, 1)
                processo = antipv.indexOf(pesquisar)
              }
              fs.writeFileSync('./archivos/grupos/antis/antipv.json', JSON.stringify(welkom))
              enviar("🔓𝐀𝐍𝐓𝐈 𝐏𝐕 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐏𝐔𝐄𝐃𝐄𝐍 𝐄𝐒𝐂𝐑𝐈𝐁𝐈𝐑 𝐒𝐈𝐍 𝐍𝐈𝐍𝐆𝐔𝐍 𝐏𝐑𝐎𝐁𝐋𝐄𝐌𝐀🔓")
            } else {
              enviar("*_1 para activar, 0 para desactivar_* ❕")
            }
            break

case 'antisticker':
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠") 
if (Number(args[0]) === 1) {
if (isAntiSticker) return enviar("*_ya esta activo_* 😁")
antisticker.push(from)
fs.writeFileSync('./archivos/grupos/antis/antisticker.json', JSON.stringify(antisticker))
enviar("🔐𝐀𝐍𝐓𝐈 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐓𝐄𝐍𝐆𝐀𝐍 𝐂𝐔𝐈𝐃𝐀𝐃𝐎 𝐂𝐎𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒, 𝐒𝐄 𝐋𝐄𝐒 𝐁𝐀𝐍𝐄𝐀𝐑𝐀 𝐃𝐄 𝐌𝐀𝐍𝐄𝐑𝐀 𝐀𝐔𝐓𝐎𝐌𝐀𝐓𝐈𝐂𝐀🔐️")
} else if (Number(args[0]) === 0) {
if (!isAntiSticker) return enviar("*_ya esta desactivado_* 😁")
antisticker.splice(from, 1)
fs.writeFileSync('./archivos/grupos/antis/antisticker.json', JSON.stringify(antisticker))
enviar("🔓𝐀𝐍𝐓𝐈 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐏𝐔𝐄𝐃𝐄𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒 𝐒𝐈𝐍 𝐍𝐈𝐍𝐆𝐔𝐍 𝐏𝐑𝐎𝐁𝐋𝐄𝐌𝐀🔓")
} else {
enviar("*_1 para activar, 0 para desactivar_* ❕")
}
break

case 'antivideo':
  if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
  if (!isBotGroupAdmins) return enviar("*_slowed necesita ser admin para usar este comando_* 😩")
  if (!isGroupAdmins) return enviar("*_solo los admins pueden usar este comando_* 😠") 
if (Number(args[0]) === 1) {
if (isAntiVid) return enviar("*_ya esta activo_* 😁")
antivid.push(from)
fs.writeFileSync('./archivos/grupos/antis/antivideo.json', JSON.stringify(antivid))
enviar('🔐𝐀𝐍𝐓𝐈𝐕𝐈𝐃𝐄𝐎 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐓𝐄𝐍𝐆𝐀𝐍 𝐂𝐔𝐈𝐃𝐀𝐃𝐎 𝐂𝐎𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐕𝐈𝐃𝐄𝐎𝐒 𝐒𝐄 𝐋𝐄𝐒 𝐁𝐀𝐍𝐄𝐀𝐑𝐀 𝐃𝐄 𝐌𝐀𝐍𝐄𝐑𝐀 𝐀𝐔𝐓𝐎𝐌𝐀𝐓𝐈𝐂𝐀🔐️')
} else if (Number(args[0]) === 0) {
if (!isAntiVid) return enviar("*_ya esta desactivado_* 😁")
antivid.splice(from, 1)
fs.writeFileSync('./archivos/grupos/antis/antivideo.json', JSON.stringify(antivid))
enviar("🔓𝐀𝐍𝐓𝐈𝐕𝐈𝐃𝐄𝐎 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎, 𝐏𝐔𝐄𝐃𝐄𝐍 𝐌𝐀𝐍𝐃𝐀𝐑 𝐕𝐈𝐃𝐄𝐎𝐒 𝐒𝐈𝐍 𝐍𝐈𝐍𝐆𝐔𝐍 𝐏𝐑𝐎𝐁𝐋𝐄𝐌𝐀🔓")
} else {
enviar("*_1 para activar, 0 para desactivar_* ❕")
}
break           
         // 𝘾𝙖𝙨𝙚𝙨 𝙙𝙚 𝙛𝙞𝙜𝙪𝙧𝙞𝙩𝙖𝙨  🗺️ \\
case 'figu':
case "figu2":
case "stickergif":
case "stickergif2":
case "s":
case "f":
case "fig":
case "sticker":
if ((isMedia && !info.message.videoMessage || isQuotedImage)) {
enviar(respuesta.espere)
 try {             
streammmmm = await downloadContentFromMessage(info.message.imageMessage || info.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
    var buffer = Buffer.from([])
    for await(const chunk of streammmmm) {
     buffer = Buffer.concat([buffer, chunk])
    }
    let ran = 'stickers.webp'
    fs.writeFileSync(`./${ran}`, buffer)
     ffmpeg(`./${ran}`)
     .on("error", console.error)
     .on("end", () => {
      exec(`webpmux -set exif ./database/${ran} -o ./${ran}`, async (error) => {
       await enviarfiguimg(from, fs.readFileSync(`./${ran}`), info, {
 packname: `${pushname}`, author: `${author}`
})
        fs.unlinkSync(`./${ran}`)
			       
       })
      })
	 .addOutputOptions([
       "-vcodec", 
 	   "libwebp", 
 	   "-vf", 
	"scale=512:512:force_original_aspect_ratio=decrease,fps=15, pad=512:512:(ow-iw)/2:(oh-ih)/2:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
	  ])
	 .toFormat('webp')
	 .save(`${ran}`)	 
    } catch(e) {
console.log(e)
enviar("*_remarque una imagen para crear su sticker_*")
}} else if ((isMedia && info.message.videoMessage.seconds < 11 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
enviar(respuesta.espere)
try {

const encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage: info.message.videoMessage
rane = getRandom('.'+ await getExtension(encmedia.mimetype))
imgbuff = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, imgbuff)
const media = rane
ran = getRandom('.'+media.split('.')[1])
const upload = await TelegraPh(media)
await enviarfiguvid(from, util.format(upload), info, {
 packname: `${pushname}`, author: `${author}`
}) 
} catch(e) {
console.log(e)
enviar("*_remarque una imagen para crear su sticker_*")
}}
          break 

case 'figuimg':
if (!isQuotedSticker) return enviar("*_marque una figura para convertirla en imagen_*")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
try {
sock.sendMessage(from, {image: buff}, {quoted: info})
} catch(e) {
console.log(e)
enviar("*_error_*")
}
break
          
case 'figanime':
case 'fig-anime':
case 'figuanime':
  enviar(`*_puedes pedir max 4 , si deseas mas digite el mismo comando 😁_*`)
  
const memez = `${Math.floor(Math.random() * 177)}`
const memeu = `${Math.floor(Math.random() * 177)}`
const memep = `${Math.floor(Math.random() * 177)}`
const memei = `${Math.floor(Math.random() * 177)}`

 popopoc = fs.readFileSync(`./archivos/figuritas/${memez}.webp`)
sock.sendMessage(from, { sticker: popopoc })

popopoc = fs.readFileSync(`./archivos/figuritas/${memeu}.webp`)
sock.sendMessage(from, { sticker: popopoc })

popopoc = fs.readFileSync(`./archivos/figuritas/${memep}.webp`)
sock.sendMessage(from, { sticker: popopoc })

popopoc = fs.readFileSync(`./archivos/figuritas/${memei}.webp`)
sock.sendMessage(from, { sticker: popopoc })
await sock.sendMessage(from, {react: {text: `🖼️`, key: info.key}}) 
break

case "attp":
enviar('enviando ▰▰▰▰▱▱')
if(args.length == 0 ) return enviar("*_digite un texto para convertir en sticker_*\n*_ejp : attp jeff_*")
sock.sendMessage(from, {
sticker: {
url: `https://api-duda.onrender.com/api/attp?texto=${q}&apikey=@alizindev`
}},{quoted : info})
break

case 'emoji+' : 
  case 'emojimix': {
  enviar('enviando ▰▰▰▰▱▱')
  if (!q) return enviar("*_ejemplo : emojimix ☺️+🧐_*")
            try {
            let [emoji1, emoji2] = q.split`+`
            var em = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
            for (let res of em.results) {
              templateMassage = {
                image: {
                  url: `${res.url}`,
                  quoted: info 
                }
              }
              sock.sendMessage(from, templateMassage, { quoted: info })
            }
          } catch (err) {
  enviar("*_error_*")
        console.log(err)
        }
        }
                break
         // 𝘾𝙖𝙨𝙚𝙨 𝙙𝙚 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 📥 \\

case 'ytaudio':
 enviar('enviando ▰▰▰▰▱▱')
  if (!q) return enviar("*_nombre de la música ¿?_*");
  try {
    const text = args.join(' ');
    const data = await fetchJson(`http://sabapi.tech:8090/api/ytsrc/videos?q=${text}&apikey=MrRootsFree`);
    if (!data || !data.resultado || data.resultado.length === 0) {
      return enviar("*_no se encontraron resultados de esa música_*");
    }
    const result = data.resultado[0]
    const ytbrt = `━「 *_AUDIO DE YT_* 」
                   ♪    
🌟 TÍTULO : ${result.title}
🌟 DURACIÓN : ${result.timestamp}
🌟 DESCRIPCIÓN : ${result.description}`;
    const audioMessage = {
      audio: { url: `http://sabapi.tech:8090/api/dl/ytaudio?url=${result.url}&apikey=MrRootsFree` },
      mimetype: "audio/mpeg"
    }
sock.sendMessage(from, { image: { url: result.image }, caption: ytbrt }, { quoted: info })
    sock.sendMessage(from, audioMessage, { quoted: info })
  } catch (e) {
    console.error("error")
    return enviar("*_error_*")
  }
  break
         
case 'ttk':
            const responsettk = await fetch(`${q}`)
            console.log(responsettk.url)
          const headers = new Headers();
headers.append('User-Agent', 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet');
const headersWm = new Headers();
headersWm.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36');
          const getIdVideo = (url) => {
            const matching = url.includes("/video/");
          const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
          return (idVideo.length > 19) ? idVideo.substring(0, idVideo.indexOf("?")) : idVideo;
      }
      
            
            const getVideoNoWM = async (url) => {
              const idVideo = await getIdVideo(url)
              const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
              const request = await fetch(API_URL, {
                  method: "GET",
                  headers : headers
              });
              const body3 = await request.text();
                          try {
                           var res = JSON.parse(body3);
                          } catch (err) {
                              console.error("Error:", err);
                              console.error("Response body:", body3);
                          }
                          const urlMedia = res.aweme_list[0].video.play_addr.url_list[0]
                          const data2 = {
                              url: urlMedia,
                              id: idVideo
                          }
                          return data2
          }
                    const videottk = await getVideoNoWM(responsettk.url)

          console.log(videottk)
          enviar("*_enviando ▰▰▰▰▱▱_*")
          await delay(800)
          await sock.sendMessage(from,{ video: { url: videottk.url }, caption:"*_aqui está su vídeo_*"}, {quoted:info})
          break

case 'fb' :
case 'facebook':
  enviar("enviando ▰▰▰▰▱▱");
  if (!q) return enviar("*_enlace del video ¿?_*");
  try {
    const text = args.join(' ');
    const data = await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=gataDios&url=${q}`);
if(!data.result[0]) {
      return enviar("*no se encontraron resultados de ese video*");
    }
    const result = data.result[0];
    const videoMessage = {
      video: { url: result },
      mimetype: "video/mp4"
    };
    sock.sendMessage(from, videoMessage, { quoted: info });
  } catch (e) {
    console.error("error");
    return enviar("*_error_*");
  }
  break

case 'instagram':
case 'insta':
case 'ig':
if (!q) return enviar("*_ejp : ig (el link de ig que quieras descargar)_*");
enviar("*_enviando ▰▰▰▰▱▱_*")
  try {
    await sock.sendMessage(from, { react: { text: '📥', key: info.key } });
    const instaUrl = args[0];
    const response = await fetchJson(`http://sabapi.tech:8090/api/v2/instagram?url=${instaUrl}&apikey=MrRootsFree`);

    if (response && response.resultado && response.resultado.length > 0) {
      for (const result of response.resultado) {
        if (result.type === 'video') {
          await sock.sendMessage(from, {
            video: { url: result.url },
            mimetype: 'video/mp4',
            caption: "*_aqui está su vídeo_*"
          }, { quoted: info });
        } else if (result.type === 'image') {
          await sock.sendMessage(from, {
            image: { url: result.url, mimetype: 'image/jpeg' },
            caption: "*_aqui está su vídeo_*"
          }, { quoted: info });
        }
      }
      await sock.sendMessage(from, { react: { text: '✅', key: info.key } });
    }
  } catch (e) {
    console.error(e)
  }
  break          
                            
case 'fotocompartida': {
sock.sendMessage(from, { react: { text: `💕`, key: info.key }})
let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
let random = anu[Math.floor(Math.random() * anu.length)]
sock.sendMessage(from, { image: { url: random.male }, caption: `*_Foto masculina:_*` }, { quoted: info })
sock.sendMessage(from, { image: { url: random.female }, caption: `*_Foto feminina:_*` }, { quoted: info })
}
break    
          // 𝘾𝙖𝙨𝙚𝙨 𝙙𝙚 𝙟𝙪𝙚𝙜𝙤𝙨  🎮 \\
case 'casino':
const soto = [
'🍊 : 🍒 : 🍐',
'🍒 : 🔔 : 🍊',
'🍇 : 🍇 : 🍇',
'🍊 : 🍋 : 🔔',
'🔔 : 🍒 : 🍐',
'🔔 : 🍒 : 🍊',
'🍊 : 🍋 : ??',		
'🍐 : 🍒 : 🍋',
'🍐 : 🍐 : 🍐',
'🍊 : 🍒 : 🍒',
'🔔 : 🔔 : 🍇',
'🍌 : 🍒 : 🔔',
'🍐 : 🔔 : 🔔',
'🍊 : 🍋 : 🍒',
'🍋 : 🍋 : 🍌',
'🔔 : 🔔 : 🍇',
'🔔 : 🍐 : 🍇',
'🔔 : 🔔 : 🔔',
'🍒 : 🍒 : 🍒',
'🍌 : 🍌 : 🍌'
]		
const mining = Math.ceil(Math.random() * 200) +1
const somtoy2 = sotoy[Math.floor(Math.random() * sotoy.length)]
if ((somtoy2 == '🥑 : 🥑 : 🥑') ||(somtoy2 == '🍉 : 🍉 : 🍉') ||(somtoy2 == '🍓 : 🍓 : 🍓') ||(somtoy2 == '🍎 : 🍎 : 🍎') ||(somtoy2 == '🍍 : 🍍 : 🍍') ||(somtoy2 == '🥝 : 🥝 : 🥝') ||(somtoy2 == '🍑 : 🍑 : 🍑') ||(somtoy2 == '🥥 : 🥥 : 🥥') ||(somtoy2 == '🍋 : 🍋 : 🍋') ||(somtoy2 == '🍐 : ?? : 🍐') ||(somtoy2 == '🍌 : 🍌 : 🍌') ||(somtoy2 == '🍒 : 🍒 : 🍒') ||(somtoy2 == '🔔 : 🔔 : 🔔') ||(somtoy2 == '🍊 : 🍊 : 🍊') ||(somtoy2 == '🍇 : 🍇 : 🍇')) {
var Victoria = "𝗚𝗲𝗻𝗶𝗮𝗹, 𝗵𝗮𝘀 𝗴𝗮𝗻𝗮𝗱𝗼"
} else {
var Victoria = "𝗤𝘂𝗲 𝗺𝗮𝗹, 𝗵𝗮𝘀 𝗽𝗲𝗿𝗱𝗶𝗱𝗼"
}
const cassino = `
	*𝘚𝘭𝘰𝘸𝘦𝘥𝘉𝘰𝘵*
╔═════🎰═════╗
┣►  ${somtoy2}  ◄┛
╚═════︎🎰═════╝

*${Victoria}*`
enviar(cassino)
if (Victoria == "𝙂𝙧𝙖𝙣𝙙𝙞𝙤𝙨𝙤, 𝙪𝙨𝙩𝙚𝙙 𝙜𝙖𝙣𝙤!") {
enviar('¡𝙁𝙚𝙡𝙞𝙘𝙞𝙙𝙖𝙙𝙚𝙨!')
}
break

case 'botdisparame':
if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
if (!isBotGroupAdmins) return enviar(`*_Slowed necesita ser administrador para llevar el juego a otro nivel 🔥_*`)
addFilter(from);
const tiro = ["vacio",
"vacio",
"vacio",
"vacio",
"vacio",
"vacio",
"vacio",
"vacio",
"pum!!",
"pum!!"]
const figr = ["pattta1",
"pattta2",
"pattta3"]
tpa = tiro[Math.floor(Math.random() * (tiro.length))]
tpb = figr[Math.floor(Math.random() * (figr.length))]
if (tpa == "vacio") {
var muerte = "*_el tambor del arma estaba vacío, tu suerte acabara pronto._*"
} else if (tpa == "pum!!") {
var muerte = "*_tu suerte acaba de terminar pum pum 🔫_*"
}
if(muerte == "*_tu suerte acaba de terminar pum pum 🔫_*") {
setTimeout(() => {
sock.sendMessage(from, {sticker: fs.readFileSync('./juegos/botdisparame/'+tpb+'.webp')})
}, 2100)
setTimeout(() => {
sock.sendMessage(from, {text: muerte}, {quoted: info})}, 2100)
var kik = `${sender.split("@")[0]}@s.whatsapp.net`
setTimeout(() => {
sock.groupParticipantsUpdate(from, [kik], "remove")}, 10000);
} else {
setTimeout(() => {
sock.sendMessage(from, {text: muerte}, {quoted: info})}, 2100)
}
break
 
case 'fakechat':
case 'fakemsg':
    var gh = body.slice(11);
    var mentioned = info.message.extendedTextMessage && info.message.extendedTextMessage.contextInfo && info.message.extendedTextMessage.contextInfo.mentionedJid ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : null
    var replace = gh.split("|")[0]
    var target = gh.split("|")[1]
    var bot = gh.split("|")[2]
    if (mentioned && target && bot) {
      var quotedMessage = {
        key: {
          fromMe: false,
          participant: mentioned
        },
        message: {
          conversation: target
        }
      }
      var sendMessageOptions = {
        text: `${bot}`,
        quoted: quotedMessage
      }
      sock.sendMessage(from, sendMessageOptions, { quoted: quotedMessage });
    } else {
      sock.sendMessage(from, { text: "*_ejp: /fakechat @la persona|mensaje de la víctima|(tu respuesta)_*" });
    }
    break    

          case 'rankgay':
          case 'topgay':
if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
            membr = []
            var porcentagem = `${Math.floor(Math.random() * 105)}`
            const gay1 = groupMembers
            const gay2 = groupMembers
            const gay3 = groupMembers
            const gay4 = groupMembers
            const gay5 = groupMembers
            var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            const gays1 = gay1[Math.floor(Math.random() * gay1.length)]
            const gays2 = gay2[Math.floor(Math.random() * gay2.length)]
            const gays3 = gay3[Math.floor(Math.random() * gay3.length)]
            const gays4 = gay4[Math.floor(Math.random() * gay4.length)]
            const gays5 = gay5[Math.floor(Math.random() * gay5.length)]
            rankzingay = `
  *_🏳️‍🌈 TOP GAYS DEL GRUPO 🏳️‍🌈:_*
  *╭────────────*
  *│* 🏳️‍🌈 @${gays1.id.split('@')[0]}
  *│➽ ${porcent} Gay de nacimiento*
  *│* 🏳️‍🌈 @${gays2.id.split('@')[0]}
  *│➽${porcent2} Gay*
  *│* 🏳️‍🌈 @${gays3.id.split('@')[0]}
  *│➽ ${porcent3} le gusta hacer gogogo*
  *│* 🏳️‍🌈 @${gays4.id.split('@')[0]}
  *│➽ ${porcent4} Le facina el pipi*
  *│* 🏳️‍🌈 @${gays5.id.split('@')[0]}
  *│➽ ${porcent5} Medio Gay*
  *╰────────────*`
            membr.push(gays1.id)
            membr.push(gays2.id)
            membr.push(gays3.id)
            membr.push(gays4.id)
            membr.push(gays5.id)
            sock.sendMessage(from, { text: rankzingay, mentions: membr }, { quoted: info })
            break
            
          case 'topcachudo':
          case 'topcachon':
if (!isGroup) return enviar("*_este comando solo es para grupos_* 😠")
            var porcentagem = `${Math.floor(Math.random() * 105)}`
            membr = []
            const corno1 = groupMembers
            const corno2 = groupMembers
            const corno3 = groupMembers
            const corno4 = groupMembers
            const corno5 = groupMembers
            var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
            const cornos1 = corno1[Math.floor(Math.random() * corno1.length)]
            const cornos2 = corno2[Math.floor(Math.random() * corno2.length)]
            const cornos3 = corno3[Math.floor(Math.random() * corno3.length)]
            const cornos4 = corno4[Math.floor(Math.random() * corno4.length)]
            const cornos5 = corno5[Math.floor(Math.random() * corno5.length)]
            rankzincorno = `
  *_🐂😹 CACHONES DEL GRUPO 😿🐂:_*
  *╭────────────*
  *│* 🦌 @${cornos1.id.split('@')[0]}
  *│➽ ${porcent} Cacho contento*
  *│* 🦌 @${cornos2.id.split('@')[0]}
  *│➽ ${porcent2} Cacho contento*
  *│* 🦌 @${cornos3.id.split('@')[0]}
  *│➽ ${porcent3} Cacho contento*
  *│* 🦌 @${cornos4.id.split('@')[0]}
  *│➽ ${porcent4} Cacho contento*
  *│* 🦌 @${cornos5.id.split('@')[0]}
  *│➽ ${porcent5} Cacho contento*
  *╰────────────*`
            membr.push(cornos1.id)
            membr.push(cornos2.id)
            membr.push(cornos3.id)
            membr.push(cornos4.id)
            membr.push(cornos5.id)
            sock.sendMessage(from, { text: rankzincorno, mentions: membr }, { quoted: info })
            break            
// COMANDOS SIN PREFIJO
default:
// if (isOwner) {
  if (body.startsWith('>')) {
      try {
        enviar(`${JSON.stringify(eval(q))}`);
        
      } catch (e) {
        enviar(`${String(e)}`);
      }
  }
// }
   //---------------------------------ϟϟ---------------------------------\\
         // 🗺️ 𝚊𝚗𝚝𝚒𝚜𝚝𝚒𝚌𝚔𝚎𝚛 🗺️ \\
if (budy.includes(".com")){
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
await sock.groupParticipantsUpdate(from, [Kick], 'remove')
}
if (budy.includes("http://")){
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
await conn.groupParticipantsUpdate(from, [Kick], 'remove')
}
   //---------------------------------ϟϟ---------------------------------\\
       //❗𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚒𝚗𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘𝚜❗\\
if(isCmd && comando && prefixes) {
enviar("*_este comandó no existe_*")
}
}
    //---------------------------------ϟϟ---------------------------------\\
       // 📡 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚘 𝚊𝚞𝚝𝚘𝚖𝚊𝚝𝚒𝚌𝚘 📡 \\
       


fs.watchFile('./index.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log(color("LA INDEX FUE EDITADA , ESTOY REINICIANDO", "yellow"));
process.exit()
}
})
 //---------------------------------ϟϟ---------------------------------\\

 } catch (e) {
 e = String(e)
if (!e.includes("this.isZero") && !e.includes("Could not find MIME for Buffer <null>") && !e.includes("Cannot read property 'conversation' of null") && !e.includes("Cannot read property 'contextInfo' of undefined") && !e.includes("Cannot set property 'mtype' of undefined") && !e.includes("jid is not defined")) {
console.log('Error : %s', color(e, 'yellow'))
} 
 }       
    })
}
// 𝙴𝚓𝚎𝚌𝚞𝚝𝚊𝚛 𝚎𝚗 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚙𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕
connectToWhatsApp()
