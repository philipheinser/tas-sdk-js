# tas-sdk-js

## Usage

```
import Trivago from 'tas-sdk-js';

let opts = {
  access_id: '1234',
  secret_key: '1234',
};

let trivago = Trivago(opts);

trivago.getHotelDetails('itemid').then((data)=>{
  console.log(data)
});
```

## Tests

```
ACCESS_ID=1234 SECRET_KEY=1234 npm test
```
