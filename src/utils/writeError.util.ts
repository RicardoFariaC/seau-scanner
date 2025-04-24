import path from "path";
import fs from "fs"

export const writeError = (err: Error) => {
    const timestamp = new Date().toISOString();
    fs.writeFile(path.resolve(__dirname, "../..", `errors/error.${timestamp}.log`), JSON.stringify({
        name: err.name,
        message: err.message,
    }), { flag: 'w' }, (error) => {
        if(error) {
            fs.writeFileSync(path.resolve(__dirname, "../..", `errors/error.critical.${timestamp}.log`), JSON.stringify({
                status: false,
                message: error
            }), { flag: 'w' });
        } 
    });
}