
export const getFileTypeFromUrl = (url: string): string => {
  const format = /(\w+)-(.*)\.(\w+)/
  const result = format.exec(url)
  return result !== null? result[1]: 'image'
}