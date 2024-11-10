import { Context } from "elysia"
import { unlink } from "node:fs/promises";

export const message = (
	status: 	number, 
	type: 		string, 
	message: 	string, 
	data: 		any 	= undefined,
	code: 		string 	= "", 
) => {
	return {
		status: 	status,
		type:		type,
		message: 	message,
		data:		data,
		code:		code,
	}
}

// get image
export const getImage = async (imgName: string) => {
	const basedir   = "file"
    const fileName  = imgName

    const file = Bun.file(`${basedir}/${fileName}`)
	return file
}

// save image
export const saveImage = async (imgFile: File) => {
	const basedir = "file"
    const fileName = `${crypto.randomUUID()}.jpg`
    const fileDir = `${basedir}/${fileName}`

	try {
        await Bun.write(fileDir, imgFile)
    }
    catch(err) {
        throw err
    }

	return fileName
}

// delete image
export const deleteImage = async (imgName: string) => {
	const basedir   = "file"
    const fileName  = imgName
    const path      = `${basedir}/${fileName}`

	try {
		await unlink(path)
	}
	catch(err) {
		throw err
	}
}
