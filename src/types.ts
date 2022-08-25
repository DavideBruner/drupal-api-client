export interface Config {
  baseUrl: string
}

export type Filters = Record<string, unknown>

export interface EntityReference<T> {
  uri: string
  id: string
  resource: T
  name?: string
}

export interface FormattedValue<Format> {
  value: string
  format: Format
  summary?: string
}

export interface PaginatedResults<T> {
  self: string
  first: string
  last: string
  next: string
  prev: string
  list: T[]
}

export interface RequestOptions { 
  init?: RequestInit,
  baseUrl?: string,
  query?: Record<string, unknown>
}

export interface Comment {
  cid: string
  url: string
  created: string
  author: EntityReference<'user'>
  node: EntityReference<'node'>
  comment_body: FormattedValue<unknown>
}

export interface CIJob {
  job_id: string
  environment: string
  target_type: string
  ci_url: string
  status: string
  result: string
  message: string
  issue_nid?:	number
  file_id?:	number
  release_nid?: number
  core_branch: string
  commit_id?: number
  build_iteration: boolean
  job_priority?: string
  updated: string
  created: string
  uid: number
  reason: string
  url: string
}

export interface File {
  fid: string
  name: string
  size: string
  url: string
  timestamp: string
}

export interface User {
  uid: string
  url: string
  created: string
  name: string
  field_bio: FormattedValue<unknown>
  field_first_name: string
  field_last_name: string
}

export interface Maintainer {
  name: string
  permissions: Permission
}

export interface Permission {
  "update project":	boolean
  "administer maintainers":	boolean
  "write to vcs": boolean
  "maintain issues": boolean
  "administer releases": boolean
}

export interface Node {
  nid: string
  vid: string
  type: NodeType
  body: FormattedValue<unknown>
  is_new: boolean
  language: string
  title: string
  url: string
  author: EntityReference<'user'>
  book: EntityReference<'node'>
  book_ancestors: EntityReference<'node'>[]
  comments: EntityReference<'comment'>[]
  comment_count: number
  comment_count_new: number
}

export enum NodeType {
  BOOK = 'book',
  BOOK_LISTING = 'book_listing',
  CASESTUDY = 'casestudy',
  FORUM = 'forum',
  CHANGENOTICE = 'changenotice',
  ORGANIZATION = 'organization',
  PAGE = 'page',
  PACKAGING_WHITELIST = 'packaging_whitelist',
  PROJECT_ISSUE = 'project_issue',
  PROJECT_CORE = 'project_core',
  PROJECT_DISTRUBUTION = 'project_distribution',
  PROJECT_DRUPALORG = 'project_drupalorg',
  PROJECT_MODULE = 'project_module',
  PROJECT_RELEASE = 'project_release',
  PROJECT_THEME = 'project_theme',
  PROJECT_THEME_ENGINE = 'project_theme_engine',
  SECURITY_ADVISOR = 'sa',
}