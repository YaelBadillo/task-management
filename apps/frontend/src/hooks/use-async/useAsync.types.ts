export const AsyncStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export type AsyncStatusKeys = (typeof AsyncStatus)[keyof typeof AsyncStatus]
