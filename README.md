# tas-sdk-js

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
