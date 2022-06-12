export const CONFIG_TYPES = {
  KEY_VALUE: 'key-value',
  STRING: 'string',
  JSON: 'json',
};

export const formStyle = {
  display: 'flex',
  alignItems: 'center',
  gridGap: 16,
  backgroundColor: '#ffffff',
  color: '#262626',
  WebkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: 4,
  boxShadow:
    '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  overflow: 'hidden',
  padding: 16,
};

export const AWS_REGIONS = [
  { value: '*', label: 'Common (*)' },
  { value: 'ap-south-1', label: 'Asia Pacific(Mumbai) (ap-south-1)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific(Tokyo) (ap-northeast-1)' },
  { value: 'ap-northeast-2', label: 'Asia Pacific(Seoul) (ap-northeast-2)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific(Singapore) (ap-southeast-1)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific(Sydney) (ap-southeast-2)' },
  { value: 'ca-central-1', label: 'Canada(Central) (ca-central-1)' },
  { value: 'eu-west-1', label: 'EU(Ireland) (eu-west-1)' },
  { value: 'eu-central-1', label: 'EU(Frankfurt) (eu-central-1)' },
  { value: 'eu-west-2', label: 'EU(London) (eu-west-2)' },
  { value: 'sa-east-1', label: 'South America(São Paulo) (sa-east-1)' },
  { value: 'us-east-1', label: 'US East(N. Virginia) (us-east-1)' },
  { value: 'us-east-2', label: 'US East(Ohio) (us-east-2)' },
  { value: 'us-west-1', label: 'US West(N. California) (us-west-1)' },
  { value: 'us-west-2', label: 'US West(Oregon) (us-west-2)' },
];

export const API_BASE_URL = 'https://f817-2401-4900-1c3c-177-9cb-bd8a-7934-6474.in.ngrok.io';
export const ACCESS_BASE_URL = 'https://f006-2409-4051-184-b0e7-69c4-3844-69ab-4876.in.ngrok.io';


export const API_STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
};
