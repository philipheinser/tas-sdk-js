import test from 'blue-tape';
import moment from 'moment';
import Trivago from '../src/';

const opts = {
  access_id: process.env.ACCESS_ID,
  secret_key: process.env.SECRET_KEY,
  language: 'de-DE',
};

const trivago = new Trivago(opts);

test('trivago hotellist', (t) => {
  return trivago.getHotelCollection(
    moment().add(2, 'days').toDate(),
    moment().add(4, 'days').toDate()
  ).then((data) => {
    t.ok(Array.isArray(data.hotels), 'hotels is array');
  })
  .catch((err) => {
    t.error(err);
  });
});

test('trivago locations', (t) => {
  return trivago.getLocations('Berlin').then((data) => {
    t.ok(Array.isArray(data._embedded.locations), 'locations is array');
  })
  .catch((err) => {
    t.error(err);
  });
});

test('trivago hotel details', (t) => {
  return trivago.getHotelDetails('42089').then((data) => {
    t.equal(typeof data.item_id, 'number');
  })
  .catch((err) => {
    t.error(err);
  });
});

// path'46814'
// item'42089'
