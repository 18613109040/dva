import {get} from '../utils/request';
import {host, staticHost} from "../utils/hostConf";

export function getCity(data) {
  return get(`${host.cplus}cgi-bin/mix/querycity`,data);
}
