// @flow

class WrappedPromise {
  _promise: Object;

  constructor(promise): void {
    this._promise = promise;
  }

  promise(): Object {
    return this._promise;
  }
}

class MockDb {
  _db: Object;
  _error: ?string;

  constructor(): void {
    this._db = new Map();
    this._error = null;
  }

  setError(error: string): void {
    this._error = error;
  }

  clearError(): void {
    this._error = null;
  }

  getError(): ?string {
    return this._error;
  }

  get(params: Object = {}): WrappedPromise {
    const message = this._db.get(params.Key.messageId);
    const item = {
      messageId: params.Key.messageId,
      message: message
    };
    const promise = new Promise((resolve, reject) => {
      if (this.getError()) {
        reject(new Error(this.getError()));
      } else if (!message) {
        resolve({});
      } else {
        resolve({
          Item: item
        });
      }
    });
    return new WrappedPromise(promise);


    // const message = this._db.get(params.Key.messageId);
    // const item = {
    //   messageId: params.Key.messageId,
    //   message: message
    // };
    // if (this.getError()) {
    //   callback(this.getError(), null);
    // } else if (!message) {
    //   callback(null, {});
    // } else {
    //   callback(null, {
    //     Item: item
    //   });
    // }
  }

  put(params: Object = {}): WrappedPromise {
    this._db.set(params.Item.messageId, params.Item.message);
    const promise = new Promise((resolve, reject) => {
      if (this.getError()) {
        reject(new Error(this.getError()));
      } else {
        resolve({});
      }
    });
    return new WrappedPromise(promise);

    // if (this.getError()) {
    //   callback(this.getError(), null);
    // } else {
    //   callback(null, {});
    // }
  }
}

export default MockDb;