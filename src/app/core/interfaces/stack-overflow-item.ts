import {Owner} from './owner';

export interface StackOverflowItem {
  tags: Array<string>;
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: Date;
  creation_date: Date;
  question_id: number;
  link: string;
  title: string;
}
