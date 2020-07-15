export interface TMessage {
    type: 'success' | 'error'
    message: string,
    details?: string
}
