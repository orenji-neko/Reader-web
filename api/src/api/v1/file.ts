/**
 * This is a file server that handles covers
 */

import { Elysia, t } from "elysia";
import { saveImage, getImage } from "../../utils/file";

const app = new Elysia()
    .get("/file/:src", async ({ params }) => {
        return getImage(params.src)
    }, {
        params: t.Object({
            src: t.String()
        })
    })
    .post("/file", async ({ body }) => {
        try {
            const { file } = body;
            
            // Validate file
            if (!file) {
                return new Response(JSON.stringify({
                    status: 400,
                    message: "No file provided"
                }), { status: 400 });
            }
    
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                return new Response(JSON.stringify({
                    status: 422,
                    message: "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."
                }), { status: 422 });
            }
    
            // Validate file size (e.g., 5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                return new Response(JSON.stringify({
                    status: 422,
                    message: "File size too large. Maximum size is 5MB."
                }), { status: 422 });
            }
    
            const fileName = await saveImage(file);
            if (!fileName) {
                throw new Error("Failed to save image");
            }
    
            return new Response(JSON.stringify({
                status: 200,
                message: "File uploaded successfully",
                data: {
                    fileName: fileName
                }
            }), { status: 200 });
    
        } catch (error) {
            console.error('File upload error:', error);
            return new Response(JSON.stringify({
                status: 500,
                message: "Failed to upload file"
            }), { status: 500 });
        }
    }, {
        body: t.Object({
            file: t.File({
                types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            })
        })
    });

export default app;