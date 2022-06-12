// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Operations',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Create Config',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined,
    },
    {
      id: 'version-page',
      title: 'Configuration Versioning',
      type: 'item',
      url: '/version-page',
      icon: icons.ChromeOutlined,
    }
  ],
};

export default support;
