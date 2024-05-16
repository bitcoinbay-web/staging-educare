import { default as axios } from 'axios';
import { URLSearchParams } from 'url';

// const encodedParams = new URLSearchParams();
// encodedParams.set('grant_type', 'client_credentials');

// const authtokenOptions = {
//   method: 'POST',
//   url: 'https://api.securedocex.com/tokens',
//   headers: {
//     'transaction-id': '',
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Accept: 'application/json',
//     Authorization: 'Basic YWE1YTdiNWQtOWJhZC00MjQyLWE1NDctZmM0ZjkxODllZjc1OnI5MWFZQ2p2TDd1b2VHUk4='
//   },
//   data: encodedParams,
// };

// try {
//   const { data } = await axios.request(authtokenOptions);
//   console.log(data);
// } catch (error) {
//   console.error(error);
// }
const sendFaxData = {
  destinations: [
    {
      to_name: 'Joe Bloggs',
      to_company: 'Acme Widgets Inc.',
      fax_number: '18665559999'
    },
    {
      to_name: 'Amy Winehouse',
      to_company: 'Acme Widgets Inc.',
      fax_number: '18555444333'
    }
  ],
  fax_options: {
    image_resolution: 'STANDARD',
    include_cover_page: true,
    cover_page_options: {
      from_name: 'Mary Adams',
      subject: 'Endorsement',
      message: 'Excepteur sint occaecat cupidatat non proident'
    },
    retry_options: {non_billable: 2, billable: 3, human_answer: 1}
  },
  client_data: {
    client_code: 'aliquip sit proident',
    client_id: 'occaecat tempor',
    client_matter: 'ut occaecat qui est aliquip',
    client_name: 'nisi consectetur',
    client_reference_id: 'minim ex in',
    billing_code: 'eu occaecat aliquip in'
  },
  documents: [
    {document_type: 'TXT', document_content: 'VGhpcyBpcyBhIHRlc3QuIFRlc3QgMS4='},
    {document_type: 'TXT', document_content: 'VGhpcyBpcyBhIHRlc3QuIFRlc3QgMi4='}
  ]
}

/*
  {
    fax_id: 'ea7382cf-8483-4bc5-954e-d3bc7074246a',
    destination_fax_number: '8665559999'
  },
  {
    fax_id: '057be5c6-c358-4b37-bd46-c2a5c33b9f89',
    destination_fax_number: '8555444333'
  }
*/

const sendFaxOptions = {
  method: 'POST',
  url: 'https://stoplight.io/mocks/consensus/fax-services/33545480/faxes',
  headers: {
    'user-id': 'aa5a7b5d-9bad-4242-a547-fc4f9189ef75',
    Authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRfaWQiOiIzYjVkNjc0Yy0wY2E3LTQ1MmQtYjUzNi05MGNkYWE3ODliNGEiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNzE1NzA2MzE5LCJyZWdpb24iOiJDQSIsImFwcF9pZCI6ImFhNWE3YjVkLTliYWQtNDI0Mi1hNTQ3LWZjNGY5MTg5ZWY3NSIsImF1dGhvcml0aWVzIjpbIlJPTEVfRlNUT1IiXSwianRpIjoiOEpIcWhIbUoxMDB2OENoTW9WZmFaX3ZYNm5jIiwiY2xpZW50X2lkIjoiYWE1YTdiNWQtOWJhZC00MjQyLWE1NDctZmM0ZjkxODllZjc1In0.E_m_yZaquekNU803tpTvJIdew9IMTzwBh-eBboKeQ-_wRCgX4DoT6rsmkzDOtzQNk2ny-EaRYkdCslddudEHRxPJnlhEk2n-AnJo7Mpy0fxBcyiBARhRIzqZNzQO_lP355rPc_UZ9P99wFV6XiFYzuWP33ZRpyUVWATrNMjenHmFHC17ni4AUB0E4AYcJHU4XOzocMXDqmC-YNsMVc7OuLA9lUl8-DNARW6yQcqQCeWpEc-9F9NXBHBrkYqo7RLitn50Owi-MW273TJtukGW-wHKT8GyY78-sOhdMoNFS-gtVb4VMiuZL1sQrTv__LYXUB06Pvo4OsFP9lF0kJjOcQ',
    'transaction-id': '1',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: sendFaxData
};

try {
  const { data } = await axios.request(sendFaxOptions);
  console.log(data);
} catch (error) {
  console.error(error);
}