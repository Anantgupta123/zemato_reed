const Imagekit = require('imagekit')

const imagekit = new Imagekit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})


async function uploadFile(file,fileName){

    const result = await imagekit.upload({
        file:file,
        fileName:fileName
    })

    return result
}


module.exports = {
    uploadFile
}