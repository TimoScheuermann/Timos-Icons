export interface Icon {
  name: string;
  version: string;
}

export interface User {
  readonly _id: string;
  readonly googleId?: number;
  readonly givenName: string;
  readonly familyName: string;
  readonly email: string;
  readonly avatar: string;
  readonly token: string;
  readonly date: number;
  readonly group: string;
}

export enum IssueType {
  PROBLEM = 'PROBLEM',
  REQUEST = 'REQUEST'
}

export enum IssueState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  WIP = 'WIP'
}

export enum IssueCommentState {
  VISIBLE = 'VISIBLE',
  DELETED = 'DELETED'
}

export interface IssueModal {
  opened: boolean;
  title?: string;
  type?: string;
  content?: string;
  modalInfo?: string;
  submitting?: boolean;
}

export interface Issue {
  readonly _id: string;
  readonly author: string;
  readonly date: number;
  readonly type: IssueType;
  readonly state: IssueState;
  readonly title: string;
  readonly content: string;
  readonly comments: string[];
  readonly resolvedIn?: string;
  readonly likes: number;
}

export interface IssueComment {
  readonly _id: string;
  readonly author: string;
  readonly content: string;
  readonly state: IssueCommentState;
  readonly date: number;
  readonly comments: string[];
}
