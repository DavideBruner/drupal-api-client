import 'isomorphic-fetch';
import qs from 'querystringify';

import { Config, RequestOptions, PaginatedResults } from './types';

/**
 * 
 */
export default class DrupalApiRequest {
  readonly baseUrl: string

  constructor(config?: Config) {
    this.baseUrl = config?.baseUrl ? config.baseUrl : 'https://www.drupal.org/api-d7';
  }

  execute<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options);
    return fetch(url, options?.init).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.statusText);
    });
  }

  buildUrl(endpoint: string, options?: RequestOptions) {
    const baseUrl = options?.baseUrl ? options.baseUrl : this.baseUrl;
    const queryString = options?.query ? qs.stringify(options.query, '?') : '';
    const url = `${baseUrl}/${endpoint.replace(/^\/|\/$/g, '')}${queryString}`;
    return url;
  }

  next<T>(result: PaginatedResults<T>) {
    const { next } = result;
    const url = new URL(next);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }

  prev<T>(result: PaginatedResults<T>) {
    const { prev } = result;
    const url = new URL(prev);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }

  first<T>(result: PaginatedResults<T>) {
    const { first } = result;
    const url = new URL(first);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }

  last<T>(result: PaginatedResults<T>) {
    const { last } = result;
    const url = new URL(last);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }
}


