const {Client} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const cloudinary = require("cloudinary").v2
const usermodel = require("./dbconfig/schema.js");
const connecttodb = require("./DB_config/connectdb.js");


connecttodb();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const client = new Client();

client.on('qr',(qr)=>{
    qrcode.generate(qr,{small:true});
});

client.on('ready',()=>{
    console.log("-----Ready Ready Ready------");
});

client.on('message',async(message)=>{
    if(message.hasMedia){
        const media = await message.downloadMedia();
        var uploadStr = 'data:image/jpeg;base64,' + media.data;

        try {
            const resultt = await cloudinary.uploader.upload(uploadStr, { resource_type: 'auto' });

            const usr_data = new usermodel({
                from:message.from,
                only_msg:"It is media",
                media:resultt.secure_url,
            })
            await usr_data.save();

        } catch (error) {
            console.log("Error : ",error);
        }

    }else{
        const usr_data = new usermodel({
            from:message.from,
            only_msg:message.body,
            media:"It is only message",

        })
        await usr_data.save();
    }
})
client.initialize();