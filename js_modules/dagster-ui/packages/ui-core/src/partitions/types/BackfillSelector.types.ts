// Generated GraphQL types, do not edit manually.

import * as Types from '../../graphql/types';

export type BackfillSelectorQueryVariables = Types.Exact<{
  pipelineSelector: Types.PipelineSelector;
}>;

export type BackfillSelectorQuery = {
  __typename: 'Query';
  pipelineSnapshotOrError:
    | {__typename: 'PipelineNotFoundError'}
    | {
        __typename: 'PipelineSnapshot';
        id: string;
        name: string;
        solidHandles: Array<{
          __typename: 'SolidHandle';
          handleID: string;
          solid: {
            __typename: 'Solid';
            name: string;
            isDynamicMapped: boolean;
            definition:
              | {
                  __typename: 'CompositeSolidDefinition';
                  name: string;
                  id: string;
                  description: string | null;
                  inputMappings: Array<{
                    __typename: 'InputMapping';
                    definition: {__typename: 'InputDefinition'; name: string};
                    mappedInput: {
                      __typename: 'Input';
                      definition: {__typename: 'InputDefinition'; name: string};
                      solid: {__typename: 'Solid'; name: string};
                    };
                  }>;
                  outputMappings: Array<{
                    __typename: 'OutputMapping';
                    definition: {__typename: 'OutputDefinition'; name: string};
                    mappedOutput: {
                      __typename: 'Output';
                      definition: {__typename: 'OutputDefinition'; name: string};
                      solid: {__typename: 'Solid'; name: string};
                    };
                  }>;
                  metadata: Array<{
                    __typename: 'MetadataItemDefinition';
                    key: string;
                    value: string;
                  }>;
                  assetNodes: Array<{
                    __typename: 'AssetNode';
                    id: string;
                    assetKey: {__typename: 'AssetKey'; path: Array<string>};
                  }>;
                  inputDefinitions: Array<{
                    __typename: 'InputDefinition';
                    name: string;
                    type:
                      | {__typename: 'ListDagsterType'; displayName: string}
                      | {__typename: 'NullableDagsterType'; displayName: string}
                      | {__typename: 'RegularDagsterType'; displayName: string};
                  }>;
                  outputDefinitions: Array<{
                    __typename: 'OutputDefinition';
                    name: string;
                    isDynamic: boolean | null;
                    type:
                      | {__typename: 'ListDagsterType'; displayName: string}
                      | {__typename: 'NullableDagsterType'; displayName: string}
                      | {__typename: 'RegularDagsterType'; displayName: string};
                  }>;
                }
              | {
                  __typename: 'SolidDefinition';
                  name: string;
                  description: string | null;
                  configField: {
                    __typename: 'ConfigTypeField';
                    configType:
                      | {__typename: 'ArrayConfigType'; key: string; description: string | null}
                      | {__typename: 'CompositeConfigType'; key: string; description: string | null}
                      | {__typename: 'EnumConfigType'; key: string; description: string | null}
                      | {__typename: 'MapConfigType'; key: string; description: string | null}
                      | {__typename: 'NullableConfigType'; key: string; description: string | null}
                      | {__typename: 'RegularConfigType'; key: string; description: string | null}
                      | {
                          __typename: 'ScalarUnionConfigType';
                          key: string;
                          description: string | null;
                        };
                  } | null;
                  metadata: Array<{
                    __typename: 'MetadataItemDefinition';
                    key: string;
                    value: string;
                  }>;
                  assetNodes: Array<{
                    __typename: 'AssetNode';
                    id: string;
                    assetKey: {__typename: 'AssetKey'; path: Array<string>};
                  }>;
                  inputDefinitions: Array<{
                    __typename: 'InputDefinition';
                    name: string;
                    type:
                      | {__typename: 'ListDagsterType'; displayName: string}
                      | {__typename: 'NullableDagsterType'; displayName: string}
                      | {__typename: 'RegularDagsterType'; displayName: string};
                  }>;
                  outputDefinitions: Array<{
                    __typename: 'OutputDefinition';
                    name: string;
                    isDynamic: boolean | null;
                    type:
                      | {__typename: 'ListDagsterType'; displayName: string}
                      | {__typename: 'NullableDagsterType'; displayName: string}
                      | {__typename: 'RegularDagsterType'; displayName: string};
                  }>;
                };
            inputs: Array<{
              __typename: 'Input';
              isDynamicCollect: boolean;
              dependsOn: Array<{
                __typename: 'Output';
                solid: {__typename: 'Solid'; name: string};
                definition: {
                  __typename: 'OutputDefinition';
                  name: string;
                  type:
                    | {__typename: 'ListDagsterType'; displayName: string}
                    | {__typename: 'NullableDagsterType'; displayName: string}
                    | {__typename: 'RegularDagsterType'; displayName: string};
                };
              }>;
              definition: {__typename: 'InputDefinition'; name: string};
            }>;
            outputs: Array<{
              __typename: 'Output';
              dependedBy: Array<{
                __typename: 'Input';
                solid: {__typename: 'Solid'; name: string};
                definition: {
                  __typename: 'InputDefinition';
                  name: string;
                  type:
                    | {__typename: 'ListDagsterType'; displayName: string}
                    | {__typename: 'NullableDagsterType'; displayName: string}
                    | {__typename: 'RegularDagsterType'; displayName: string};
                };
              }>;
              definition: {__typename: 'OutputDefinition'; name: string};
            }>;
          };
        }>;
      }
    | {__typename: 'PipelineSnapshotNotFoundError'}
    | {__typename: 'PythonError'};
  instance: {
    __typename: 'Instance';
    id: string;
    runQueuingSupported: boolean;
    runLauncher: {__typename: 'RunLauncher'; name: string} | null;
    daemonHealth: {
      __typename: 'DaemonHealth';
      id: string;
      daemonStatus: {__typename: 'DaemonStatus'; id: string; healthy: boolean | null};
    };
  };
};

export const BackfillSelectorQueryVersion = '715413ccaeb3a6d4b6d9b6ff9aa6cb98ab40e2d4ee1469a9883182f9d3f540b6';
