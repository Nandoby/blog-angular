export interface Error {
  statusCode: number;
  message: string|string[]
  error?: {
    message: string
   }
}
