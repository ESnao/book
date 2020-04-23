import moment from 'moment';
import Vue from 'vue';

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

Vue.filter('moment', (value, format = DEFAULT_FORMAT) => {
  if (!value) return '';

  return moment(value).format(format);
});
