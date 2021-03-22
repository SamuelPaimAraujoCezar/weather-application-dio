import { Router } from '@angular/router';

export function createQueryParamsObject(router: Router): Object {
  const url = router.url.split('?');
  const params = url[1].split('&');

  let queryParams = {};

  for (const param of params) {
    const paramsMap = param.split('=');
    const prop = paramsMap[0];
    const value = paramsMap[1];
    queryParams[prop] = value;
  }

  return queryParams;
}