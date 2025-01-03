export interface IFileService {
    uploadFile(filePath: string): Promise<string>
}
