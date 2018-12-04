import bot from '../../../bot';
import {
  fakeContext,
  fakeReq,
  fakeRes,
} from '../webtaskMocks';

export default data => Promise.resolve(
  bot(fakeContext, fakeReq(JSON.stringify(data)), fakeRes),
);
