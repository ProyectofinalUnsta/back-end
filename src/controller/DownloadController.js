import Presentation from "../schema/PresentationSchema.js"

export class DownloadController  {
    static async getTotslDownloads (req,res) {
        const {id} = req.params
      const files = await DownloadController.getFiles(id)
      const totalFiles = files.length
      const totalDownloads = files.reduce((acumulador,archivo) => {
        return acumulador + (archivo.downloads || 0)
      }, 0)
      res.send({Archivos:totalFiles, descargas:totalDownloads})
    }
    static async getFiles (id) {
        if(!id) return 
       try {
        const files = await Presentation.find({event:id}).populate("event")
        if(!files) return 'No hay Archivos'
        return files
       } catch (err) {
        return err
       }
    }
}