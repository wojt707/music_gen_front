class BackendError extends Error {
  constructor(text: string, status: number) {
    super(text)

    Object.setPrototypeOf(this, BackendError.prototype)
    this.status = status
  }

  status: number
}

export { BackendError }
