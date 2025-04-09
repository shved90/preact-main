/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

import type { CodegenConfig } from '@graphql-codegen/cli';

const CONTENTFUL_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.CONTENTFUL_ACCESS_TOKEN

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`]: {
      headers: {
        Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`
      }
    }
  },
  documents: ["src/**/*.{ts, tsx}", "src/*.{ts, tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql'
      },
      // config: {
      //   maybeValue: 'T | undefined',
      //   wrapEntireFieldDefinitions: true,
      //   entireFieldWrapperValue: 'T extends Array<infer U> ? Array<NonNullable<U>> : T',
      //   strictScalars: true,
      //   scalars: {
      //     DateTime: "string",
      //     Dimension: "number",
      //     HexColor: "string",
      //     MimeType: "string",
      //     Quality: "number",
      //     JSON: "Record<string, unknown>",
      //   }
      // }
    }
  }
};

export default config;
