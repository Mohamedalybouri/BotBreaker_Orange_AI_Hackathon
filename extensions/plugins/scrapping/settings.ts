import { PluginSetting } from '@/plugins/types';
import { SettingType } from '@/setting/schemas/types';

export default [
  {
    label: 'message',
    group: 'default',
    type: SettingType.text,
    value: 'Hello World!', // Default model
  },
  {
    label: 'url',
    group: 'default',
    type: SettingType.text,
    value: '', // Default value for URL
  },
] as const satisfies PluginSetting[];
