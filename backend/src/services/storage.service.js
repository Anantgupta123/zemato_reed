const Imagekit = require('imagekit')

const imagekit = new Imagekit({
    publicKey:"public_/ZzcrDb8fHP2/KZccznYz+L1O6U=",
    privateKey:"private_MKXImZ98PgG5ZJ6p/I1w+LVEuwA=",
    urlEndpoint:"https://ik.imagekit.io/ggvt2eqki"
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