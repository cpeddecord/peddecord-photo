import { IMiddleware } from 'koa-router';

export type Route = [string, IMiddleware];
