const fakeContext = {};

fakeContext.secrets = {
  SLACK_TOKEN: 'xoxb-XXXXXXXXXXXX-OOOOOOOOOOOO-XXXXXXXXXXXXBBBBBBBBBBBB',
};

const fakeData = new WeakMap();
class FakeStorage {
  get(fn) {
    return fn(null, fakeData.get(this));
  }
  set(data, errHandler = () => {}) {
    try {
      fakeData.set(this, data);
    } catch (e) {
      errHandler(e);
    }
  }
}

fakeContext.storage = new FakeStorage();

const fakeReqData = new WeakMap();
class FakeReq {
  constructor(data) {
    fakeReqData.set(this, data);
  }
  on(event, fn) {
    if (event === 'data')
      fn(fakeReqData.get(this));
    if (event === 'end')
      fn();
  }
}

const fakeReq = data => new FakeReq(data);

const fakeRes = {end: () => {}};

export {
  fakeContext,
  fakeReq,
  fakeRes,
};
