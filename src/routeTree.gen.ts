/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PumpDotFunIndexImport } from './routes/pump-dot-fun/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PumpDotFunIndexRoute = PumpDotFunIndexImport.update({
  id: '/pump-dot-fun/',
  path: '/pump-dot-fun/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pump-dot-fun/': {
      id: '/pump-dot-fun/'
      path: '/pump-dot-fun'
      fullPath: '/pump-dot-fun'
      preLoaderRoute: typeof PumpDotFunIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/pump-dot-fun': typeof PumpDotFunIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/pump-dot-fun': typeof PumpDotFunIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/pump-dot-fun/': typeof PumpDotFunIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/pump-dot-fun'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/pump-dot-fun'
  id: '__root__' | '/' | '/pump-dot-fun/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PumpDotFunIndexRoute: typeof PumpDotFunIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PumpDotFunIndexRoute: PumpDotFunIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pump-dot-fun/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/pump-dot-fun/": {
      "filePath": "pump-dot-fun/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
