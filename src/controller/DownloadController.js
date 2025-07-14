import Presentation from "../schema/PresentationSchema.js"

export class DownloadController  {
    static async getTotslDownloads (req,res) {
        const {id} = req.params
        if(!id) res.status(404).send('Parametro Id no recibido!')
      try {
       const files = await DownloadController.getFiles(id)
      if(!files) res.status(200).send({Archivos:0,descargas:0})
      const totalFiles = files.length
      const totalDownloads = files.reduce((acumulador,archivo) => {
        return acumulador + (archivo.downloads || 0)
      }, 0)
      res.status(200).send({Archivos:totalFiles, descargas:totalDownloads})
    } catch (err) {
      res.status(500).send(err.message)
    }
   
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