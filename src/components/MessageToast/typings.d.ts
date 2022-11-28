export enum MessageToastType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning'
}
export interface MessageToastProps {
  message: string;
  type: MessageToastType;
}
