declare module '*.ts'
declare global {
  interface Window {
    [key: string]: any
  }
}
export = global

declare module 'web-worker:./worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}
