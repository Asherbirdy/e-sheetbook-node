import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'
import File from '../../models/File'

export const GetAllSheetController = async (req: Req, res: Res) => {
  // 先查詢所有 files
  const allFiles = await File.find({
    userId: req?.user?.userId
  })

  // 初始化 filesMap，包含所有 files（即使沒有 sheets）
  const filesMap = new Map()
  allFiles.forEach((file) => {
    filesMap.set(file._id.toString(), {
      _id: file._id,
      name: file.name,
      userId: file.userId,
      sheets: []
    })
  })

  // 查詢所有 sheets
  const sheets = await Sheet.find({
    userId: req?.user?.userId
  }).populate('fileId')

  // 將 sheets 加入對應的 file
  sheets.forEach((sheet) => {
    const file = sheet.fileId as any

    // 檢查 file 是否存在（可能被刪除或不存在）
    if (!file || !file._id) {
      return
    }

    const fileId = file._id.toString()

    if (filesMap.has(fileId)) {
      // 移除 fileId 欄位避免重複
      const { fileId: _fileId, ... sheetWithoutFileId } = sheet.toObject()
      filesMap.get(fileId).sheets.push(sheetWithoutFileId)
    }
  })

  // 將 Map 轉換為陣列
  const files = Array.from(filesMap.values())

  res.status(StatusCodes.OK).json({
    msg: 'GetAllSheetController_GET',
    files
  })
}