import 'isomorphic-fetch';
import qs from 'querystringify';

import { Config, RequestOptions, PaginatedResults } from './types';

/**
 * 
 */
export default class DrupalApiRequest {
  readonly baseUrl: string

  /**
   * 
   * @param config 
   */
  constructor(config?: Config) {
    this.baseUrl = config?.baseUrl ? config.baseUrl : 'https://www.drupal.org/api-d7';
  }

  /**
   * 
   * @param endpoint 
   * @param options 
   * @returns 
   */
  execute<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'drupal-api-client-js',
      ...options?.init?.headers,
    };
    return fetch(url, { ...options?.init, headers }).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.statusText);
    });
  }

  /**
   * 
   * @param endpoint 
   * @param options 
   * @returns 
   */
  buildUrl(endpoint: string, options?: RequestOptions) {
    const baseUrl = options?.baseUrl ? options.baseUrl : this.baseUrl;
    const queryString = options?.query ? qs.stringify(options.query, '?') : '';
    const url = `${baseUrl}/${endpoint.replace(/^\/|\/$/g, '')}${queryString}`;
    return url;
  }

  /**
   * 
   * @param result 
   * @returns 
   */
  next<T>(result: PaginatedResults<T>) {
    const { next } = result;
    const url = new URL(next);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }

  /**
   * 
   * @param result 
   * @returns 
   */
  prev<T>(result: PaginatedResults<T>) {
    const { prev } = result;
    const url = new URL(prev);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }

  /**
   * 
   * @param result 
   * @returns 
   */
  first<T>(result: PaginatedResults<T>) {
    const { first } = result;
    const url = new URL(first);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }

  /**
   * 
   * @param result 
   * @returns 
   */
  last<T>(result: PaginatedResults<T>) {
    const { last } = result;
    const url = new URL(last);
    const endpoint = `${url.pathname}.json${url.search}`;
    return this.execute<PaginatedResults<T>>(endpoint, { baseUrl: url.origin })
  }
}


