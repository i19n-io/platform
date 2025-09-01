/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: string; output: string }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: string; output: string }
}

export type Account = {
  __typename?: 'Account'
  avatar?: Maybe<Scalars['URL']['output']>
  created: Scalars['DateTime']['output']
  deleted?: Maybe<Scalars['DateTime']['output']>
  email?: Maybe<Scalars['EmailAddress']['output']>
  githubId?: Maybe<Scalars['String']['output']>
  githubUsername?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  name: Scalars['String']['output']
  updated: Scalars['DateTime']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  projectCreate: Project
  projectUpdate: Project
  tokenKeyCreate: TokenKey
  tokenValueCreate: TokenValue
}

export type MutationProjectCreateArgs = {
  dto: ProjectCreate
}

export type MutationProjectUpdateArgs = {
  dto: ProjectUpdate
  id: Scalars['UUID']['input']
}

export type MutationTokenKeyCreateArgs = {
  dto: TokenKeyCreate
  projectId: Scalars['UUID']['input']
}

export type MutationTokenValueCreateArgs = {
  dto: TokenValueCreate
  keyId: Scalars['UUID']['input']
}

export type Project = {
  __typename?: 'Project'
  author: Account
  authorId: Scalars['UUID']['output']
  created: Scalars['DateTime']['output']
  defaultLang: Scalars['String']['output']
  deleted?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['UUID']['output']
  name: Scalars['String']['output']
  updated: Scalars['DateTime']['output']
}

export type ProjectCreate = {
  authorId: Scalars['UUID']['input']
  defaultLang: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type ProjectUpdate = {
  authorId?: InputMaybe<Scalars['UUID']['input']>
  defaultLang?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  projectById?: Maybe<Project>
  projectList: Array<Project>
  tokenKeyById?: Maybe<TokenKey>
  tokenKeyList: Array<TokenKey>
  tokenValue?: Maybe<TokenValue>
  tokenValueById?: Maybe<TokenValue>
  tokenValueList: Array<TokenValue>
}

export type QueryProjectByIdArgs = {
  id: Scalars['UUID']['input']
}

export type QueryTokenKeyByIdArgs = {
  id: Scalars['UUID']['input']
  projectId: Scalars['UUID']['input']
}

export type QueryTokenKeyListArgs = {
  parentId?: InputMaybe<Scalars['UUID']['input']>
  projectId: Scalars['UUID']['input']
}

export type QueryTokenValueArgs = {
  keyId: Scalars['UUID']['input']
  lang: Scalars['String']['input']
}

export type QueryTokenValueByIdArgs = {
  id: Scalars['UUID']['input']
}

export type QueryTokenValueListArgs = {
  keyId: Scalars['UUID']['input']
  langs?: InputMaybe<Array<Scalars['String']['input']>>
}

export type TokenKey = {
  __typename?: 'TokenKey'
  id: Scalars['UUID']['output']
  key: Scalars['String']['output']
  parentId?: Maybe<Scalars['UUID']['output']>
  projectId: Scalars['UUID']['output']
}

export type TokenKeyCreate = {
  afterId?: InputMaybe<Scalars['UUID']['input']>
  key: Scalars['String']['input']
  parentId?: InputMaybe<Scalars['UUID']['input']>
  position: Scalars['String']['input']
}

export type TokenValue = {
  __typename?: 'TokenValue'
  id: Scalars['UUID']['output']
  keyId: Scalars['UUID']['output']
  lang: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type TokenValueCreate = {
  lang: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type ProjectListQueryVariables = Exact<{ [key: string]: never }>

export type ProjectListQuery = {
  __typename?: 'Query'
  projectList: Array<{
    __typename?: 'Project'
    name: string
    author: { __typename?: 'Account'; name: string }
  }>
}

export const ProjectListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProjectList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectList' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'author' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectListQuery, ProjectListQueryVariables>
