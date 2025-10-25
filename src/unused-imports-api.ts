// Scenario: Imports that are completely unused (no fullApi reference)
import type * as module1 from "./modules/module1.js";
import type * as module2 from "./modules/module2.js";
import type * as module3 from "./modules/module3.js";
import type * as module4 from "./modules/module4.js";
import type * as module5 from "./modules/module5.js";
import type * as module6 from "./modules/module6.js";
import type * as module7 from "./modules/module7.js";
import type * as module8 from "./modules/module8.js";

export type FunctionReference<
  Type extends string,
  Visibility extends string,
  Args,
  Returns,
  Name extends string | undefined = string | undefined
> = {
  _type: Type;
  _visibility: Visibility;
  _args: Args;
  _returns: Returns;
  _name: Name;
};

// The imports exist but are never used anywhere

export type ComponentApi<Name extends string | undefined = string | undefined> =
  {
    agent: {
      apiKeys: {
        destroy: FunctionReference<
          "mutation",
          "internal",
          { apiKey?: string; name?: string },
          | "missing"
          | "deleted"
          | "name mismatch"
          | "must provide either apiKey or name"
        >;
        issue: FunctionReference<
          "mutation",
          "internal",
          { name?: string },
          string
        >;
        validate: FunctionReference<
          "query",
          "internal",
          { apiKey: string },
          boolean
        >;
      };
      files: {
        addFile: FunctionReference<
          "mutation",
          "internal",
          { hash: string; storageId: string },
          { fileId: string; storageIdUnused: boolean }
        >;
        copyFile: FunctionReference<
          "mutation",
          "internal",
          { fileId: string },
          null
        >;
        getFilesToDelete: FunctionReference<
          "query",
          "internal",
          { cursor?: string; limit?: number },
          {
            continueCursor: string;
            files: Array<{
              _creationTime: number;
              _id: string;
              hash: string;
              refcount: number;
              storageId: string;
            }>;
            isDone: boolean;
          }
        >;
        useExistingFile: FunctionReference<
          "mutation",
          "internal",
          { hash: string },
          string | null
        >;
      };
      messages: {
        addMessages: FunctionReference<
          "mutation",
          "internal",
          {
            agentName?: string;
            embeddings?: {
              dimension:
                | 128
                | 256
                | 512
                | 768
                | 1024
                | 1408
                | 1536
                | 2048
                | 3072
                | 4096;
              model: string;
              vectors: Array<Array<number> | null>;
            };
            failPendingSteps?: boolean;
            messages: Array<{
              error?: string;
              files?: Array<{
                data?: ArrayBuffer | string;
                fileId?: string;
                mimeType: string;
                url?: string;
              }>;
              finishReason?:
                | "stop"
                | "length"
                | "content-filter"
                | "tool-calls"
                | "error"
                | "other"
                | "unknown";
              id?: string;
              message:
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              image: string | ArrayBuffer;
                              mimeType?: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "image";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "user";
                  }
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              signature?: string;
                              text: string;
                              type: "reasoning";
                            }
                          | {
                              data: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "redacted-reasoning";
                            }
                          | {
                              args: any;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              toolCallId: string;
                              toolName: string;
                              type: "tool-call";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "assistant";
                  }
                | {
                    content: Array<{
                      args?: any;
                      experimental_content?: Array<
                        | { text: string; type: "text" }
                        | { data: string; mimeType?: string; type: "image" }
                      >;
                      isError?: boolean;
                      providerOptions?: Record<string, Record<string, any>>;
                      result: any;
                      toolCallId: string;
                      toolName: string;
                      type: "tool-result";
                    }>;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "tool";
                  }
                | {
                    content: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "system";
                  };
              model?: string;
              provider?: string;
              providerMetadata?: Record<string, Record<string, any>>;
              reasoning?: string;
              reasoningDetails?: Array<
                | { signature?: string; text: string; type: "text" }
                | { data: string; type: "redacted" }
              >;
              sources?: Array<{
                id: string;
                providerOptions?: Record<string, Record<string, any>>;
                sourceType: "url";
                title?: string;
                url: string;
              }>;
              text?: string;
              usage?: {
                completionTokens: number;
                promptTokens: number;
                totalTokens: number;
              };
              warnings?: Array<
                | {
                    details?: string;
                    setting: string;
                    type: "unsupported-setting";
                  }
                | { details?: string; tool: any; type: "unsupported-tool" }
                | { message: string; type: "other" }
              >;
            }>;
            pending?: boolean;
            promptMessageId?: string;
            stepId?: string;
            threadId: string;
            userId?: string;
          },
          {
            messages: Array<{
              _creationTime: number;
              _id: string;
              agentName?: string;
              embeddingId?: string;
              error?: string;
              files?: Array<{
                data?: ArrayBuffer | string;
                fileId?: string;
                mimeType: string;
                url?: string;
              }>;
              finishReason?:
                | "stop"
                | "length"
                | "content-filter"
                | "tool-calls"
                | "error"
                | "other"
                | "unknown";
              id?: string;
              message?:
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              image: string | ArrayBuffer;
                              mimeType?: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "image";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "user";
                  }
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              signature?: string;
                              text: string;
                              type: "reasoning";
                            }
                          | {
                              data: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "redacted-reasoning";
                            }
                          | {
                              args: any;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              toolCallId: string;
                              toolName: string;
                              type: "tool-call";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "assistant";
                  }
                | {
                    content: Array<{
                      args?: any;
                      experimental_content?: Array<
                        | { text: string; type: "text" }
                        | { data: string; mimeType?: string; type: "image" }
                      >;
                      isError?: boolean;
                      providerOptions?: Record<string, Record<string, any>>;
                      result: any;
                      toolCallId: string;
                      toolName: string;
                      type: "tool-result";
                    }>;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "tool";
                  }
                | {
                    content: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "system";
                  };
              model?: string;
              order: number;
              provider?: string;
              providerMetadata?: Record<string, Record<string, any>>;
              providerOptions?: Record<string, Record<string, any>>;
              reasoning?: string;
              reasoningDetails?: Array<
                | { signature?: string; text: string; type: "text" }
                | { data: string; type: "redacted" }
              >;
              sources?: Array<{
                id: string;
                providerOptions?: Record<string, Record<string, any>>;
                sourceType: "url";
                title?: string;
                url: string;
              }>;
              status: "pending" | "success" | "failed";
              stepOrder: number;
              text?: string;
              threadId: string;
              tool: boolean;
              usage?: {
                completionTokens: number;
                promptTokens: number;
                totalTokens: number;
              };
              userId?: string;
              warnings?: Array<
                | {
                    details?: string;
                    setting: string;
                    type: "unsupported-setting";
                  }
                | { details?: string; tool: any; type: "unsupported-tool" }
                | { message: string; type: "other" }
              >;
            }>;
            pending?: {
              _creationTime: number;
              _id: string;
              agentName?: string;
              embeddingId?: string;
              error?: string;
              files?: Array<{
                data?: ArrayBuffer | string;
                fileId?: string;
                mimeType: string;
                url?: string;
              }>;
              finishReason?:
                | "stop"
                | "length"
                | "content-filter"
                | "tool-calls"
                | "error"
                | "other"
                | "unknown";
              id?: string;
              message?:
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              image: string | ArrayBuffer;
                              mimeType?: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "image";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "user";
                  }
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              signature?: string;
                              text: string;
                              type: "reasoning";
                            }
                          | {
                              data: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "redacted-reasoning";
                            }
                          | {
                              args: any;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              toolCallId: string;
                              toolName: string;
                              type: "tool-call";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "assistant";
                  }
                | {
                    content: Array<{
                      args?: any;
                      experimental_content?: Array<
                        | { text: string; type: "text" }
                        | { data: string; mimeType?: string; type: "image" }
                      >;
                      isError?: boolean;
                      providerOptions?: Record<string, Record<string, any>>;
                      result: any;
                      toolCallId: string;
                      toolName: string;
                      type: "tool-result";
                    }>;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "tool";
                  }
                | {
                    content: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "system";
                  };
              model?: string;
              order: number;
              provider?: string;
              providerMetadata?: Record<string, Record<string, any>>;
              providerOptions?: Record<string, Record<string, any>>;
              reasoning?: string;
              reasoningDetails?: Array<
                | { signature?: string; text: string; type: "text" }
                | { data: string; type: "redacted" }
              >;
              sources?: Array<{
                id: string;
                providerOptions?: Record<string, Record<string, any>>;
                sourceType: "url";
                title?: string;
                url: string;
              }>;
              status: "pending" | "success" | "failed";
              stepOrder: number;
              text?: string;
              threadId: string;
              tool: boolean;
              usage?: {
                completionTokens: number;
                promptTokens: number;
                totalTokens: number;
              };
              userId?: string;
              warnings?: Array<
                | {
                    details?: string;
                    setting: string;
                    type: "unsupported-setting";
                  }
                | { details?: string; tool: any; type: "unsupported-tool" }
                | { message: string; type: "other" }
              >;
            };
          }
        >;
        addStep: FunctionReference<
          "mutation",
          "internal",
          {
            failPendingSteps?: boolean;
            promptMessageId: string;
            step: {
              embeddings?: {
                dimension:
                  | 128
                  | 256
                  | 512
                  | 768
                  | 1024
                  | 1408
                  | 1536
                  | 2048
                  | 3072
                  | 4096;
                model: string;
                vectors: Array<Array<number> | null>;
              };
              messages: Array<{
                error?: string;
                files?: Array<{
                  data?: ArrayBuffer | string;
                  fileId?: string;
                  mimeType: string;
                  url?: string;
                }>;
                finishReason?:
                  | "stop"
                  | "length"
                  | "content-filter"
                  | "tool-calls"
                  | "error"
                  | "other"
                  | "unknown";
                id?: string;
                message:
                  | {
                      content:
                        | string
                        | Array<
                            | {
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                text: string;
                                type: "text";
                              }
                            | {
                                image: string | ArrayBuffer;
                                mimeType?: string;
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                type: "image";
                              }
                            | {
                                data: string | ArrayBuffer;
                                filename?: string;
                                mimeType: string;
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                type: "file";
                              }
                          >;
                      providerOptions?: Record<string, Record<string, any>>;
                      role: "user";
                    }
                  | {
                      content:
                        | string
                        | Array<
                            | {
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                text: string;
                                type: "text";
                              }
                            | {
                                data: string | ArrayBuffer;
                                filename?: string;
                                mimeType: string;
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                type: "file";
                              }
                            | {
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                signature?: string;
                                text: string;
                                type: "reasoning";
                              }
                            | {
                                data: string;
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                type: "redacted-reasoning";
                              }
                            | {
                                args: any;
                                providerOptions?: Record<
                                  string,
                                  Record<string, any>
                                >;
                                toolCallId: string;
                                toolName: string;
                                type: "tool-call";
                              }
                          >;
                      providerOptions?: Record<string, Record<string, any>>;
                      role: "assistant";
                    }
                  | {
                      content: Array<{
                        args?: any;
                        experimental_content?: Array<
                          | { text: string; type: "text" }
                          | { data: string; mimeType?: string; type: "image" }
                        >;
                        isError?: boolean;
                        providerOptions?: Record<string, Record<string, any>>;
                        result: any;
                        toolCallId: string;
                        toolName: string;
                        type: "tool-result";
                      }>;
                      providerOptions?: Record<string, Record<string, any>>;
                      role: "tool";
                    }
                  | {
                      content: string;
                      providerOptions?: Record<string, Record<string, any>>;
                      role: "system";
                    };
                model?: string;
                provider?: string;
                providerMetadata?: Record<string, Record<string, any>>;
                reasoning?: string;
                reasoningDetails?: Array<
                  | { signature?: string; text: string; type: "text" }
                  | { data: string; type: "redacted" }
                >;
                sources?: Array<{
                  id: string;
                  providerOptions?: Record<string, Record<string, any>>;
                  sourceType: "url";
                  title?: string;
                  url: string;
                }>;
                text?: string;
                usage?: {
                  completionTokens: number;
                  promptTokens: number;
                  totalTokens: number;
                };
                warnings?: Array<
                  | {
                      details?: string;
                      setting: string;
                      type: "unsupported-setting";
                    }
                  | { details?: string; tool: any; type: "unsupported-tool" }
                  | { message: string; type: "other" }
                >;
              }>;
              step: {
                experimental_providerMetadata?: Record<
                  string,
                  Record<string, any>
                >;
                files?: Array<any>;
                finishReason:
                  | "stop"
                  | "length"
                  | "content-filter"
                  | "tool-calls"
                  | "error"
                  | "other"
                  | "unknown";
                isContinued: boolean;
                logprobs?: any;
                providerMetadata?: Record<string, Record<string, any>>;
                reasoning?: string;
                reasoningDetails?: Array<
                  | { signature?: string; text: string; type: "text" }
                  | { data: string; type: "redacted" }
                >;
                request?: {
                  body?: any;
                  headers?: Record<string, string>;
                  method?: string;
                  url?: string;
                };
                response?: {
                  body?: any;
                  headers?: Record<string, string>;
                  id: string;
                  messages: Array<{
                    fileId?: string;
                    id?: string;
                    message:
                      | {
                          content:
                            | string
                            | Array<
                                | {
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    text: string;
                                    type: "text";
                                  }
                                | {
                                    image: string | ArrayBuffer;
                                    mimeType?: string;
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    type: "image";
                                  }
                                | {
                                    data: string | ArrayBuffer;
                                    filename?: string;
                                    mimeType: string;
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    type: "file";
                                  }
                              >;
                          providerOptions?: Record<string, Record<string, any>>;
                          role: "user";
                        }
                      | {
                          content:
                            | string
                            | Array<
                                | {
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    text: string;
                                    type: "text";
                                  }
                                | {
                                    data: string | ArrayBuffer;
                                    filename?: string;
                                    mimeType: string;
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    type: "file";
                                  }
                                | {
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    signature?: string;
                                    text: string;
                                    type: "reasoning";
                                  }
                                | {
                                    data: string;
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    type: "redacted-reasoning";
                                  }
                                | {
                                    args: any;
                                    providerOptions?: Record<
                                      string,
                                      Record<string, any>
                                    >;
                                    toolCallId: string;
                                    toolName: string;
                                    type: "tool-call";
                                  }
                              >;
                          providerOptions?: Record<string, Record<string, any>>;
                          role: "assistant";
                        }
                      | {
                          content: Array<{
                            args?: any;
                            experimental_content?: Array<
                              | { text: string; type: "text" }
                              | {
                                  data: string;
                                  mimeType?: string;
                                  type: "image";
                                }
                            >;
                            isError?: boolean;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            result: any;
                            toolCallId: string;
                            toolName: string;
                            type: "tool-result";
                          }>;
                          providerOptions?: Record<string, Record<string, any>>;
                          role: "tool";
                        }
                      | {
                          content: string;
                          providerOptions?: Record<string, Record<string, any>>;
                          role: "system";
                        };
                  }>;
                  modelId: string;
                  timestamp: number;
                };
                sources?: Array<{
                  id: string;
                  providerOptions?: Record<string, Record<string, any>>;
                  sourceType: "url";
                  title?: string;
                  url: string;
                }>;
                stepType: "initial" | "continue" | "tool-result";
                text: string;
                toolCalls: Array<{
                  args: any;
                  providerOptions?: Record<string, Record<string, any>>;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call";
                }>;
                toolResults: Array<{
                  args?: any;
                  experimental_content?: Array<
                    | { text: string; type: "text" }
                    | { data: string; mimeType?: string; type: "image" }
                  >;
                  isError?: boolean;
                  providerOptions?: Record<string, Record<string, any>>;
                  result: any;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-result";
                }>;
                usage?: {
                  completionTokens: number;
                  promptTokens: number;
                  totalTokens: number;
                };
                warnings?: Array<
                  | {
                      details?: string;
                      setting: string;
                      type: "unsupported-setting";
                    }
                  | { details?: string; tool: any; type: "unsupported-tool" }
                  | { message: string; type: "other" }
                >;
              };
            };
            threadId: string;
            userId?: string;
          },
          Array<{
            _creationTime: number;
            _id: string;
            agentName?: string;
            embeddingId?: string;
            error?: string;
            files?: Array<{
              data?: ArrayBuffer | string;
              fileId?: string;
              mimeType: string;
              url?: string;
            }>;
            finishReason?:
              | "stop"
              | "length"
              | "content-filter"
              | "tool-calls"
              | "error"
              | "other"
              | "unknown";
            id?: string;
            message?:
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            image: string | ArrayBuffer;
                            mimeType?: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "image";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "user";
                }
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            signature?: string;
                            text: string;
                            type: "reasoning";
                          }
                        | {
                            data: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "redacted-reasoning";
                          }
                        | {
                            args: any;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            toolCallId: string;
                            toolName: string;
                            type: "tool-call";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "assistant";
                }
              | {
                  content: Array<{
                    args?: any;
                    experimental_content?: Array<
                      | { text: string; type: "text" }
                      | { data: string; mimeType?: string; type: "image" }
                    >;
                    isError?: boolean;
                    providerOptions?: Record<string, Record<string, any>>;
                    result: any;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-result";
                  }>;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "tool";
                }
              | {
                  content: string;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "system";
                };
            model?: string;
            order: number;
            provider?: string;
            providerMetadata?: Record<string, Record<string, any>>;
            providerOptions?: Record<string, Record<string, any>>;
            reasoning?: string;
            reasoningDetails?: Array<
              | { signature?: string; text: string; type: "text" }
              | { data: string; type: "redacted" }
            >;
            sources?: Array<{
              id: string;
              providerOptions?: Record<string, Record<string, any>>;
              sourceType: "url";
              title?: string;
              url: string;
            }>;
            status: "pending" | "success" | "failed";
            stepOrder: number;
            text?: string;
            threadId: string;
            tool: boolean;
            usage?: {
              completionTokens: number;
              promptTokens: number;
              totalTokens: number;
            };
            userId?: string;
            warnings?: Array<
              | {
                  details?: string;
                  setting: string;
                  type: "unsupported-setting";
                }
              | { details?: string; tool: any; type: "unsupported-tool" }
              | { message: string; type: "other" }
            >;
          }>
        >;
        commitMessage: FunctionReference<
          "mutation",
          "internal",
          { messageId: string },
          null
        >;
        getMessagesByIds: FunctionReference<
          "query",
          "internal",
          { messageIds: Array<string> },
          Array<null | {
            _creationTime: number;
            _id: string;
            agentName?: string;
            embeddingId?: string;
            error?: string;
            files?: Array<{
              data?: ArrayBuffer | string;
              fileId?: string;
              mimeType: string;
              url?: string;
            }>;
            finishReason?:
              | "stop"
              | "length"
              | "content-filter"
              | "tool-calls"
              | "error"
              | "other"
              | "unknown";
            id?: string;
            message?:
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            image: string | ArrayBuffer;
                            mimeType?: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "image";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "user";
                }
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            signature?: string;
                            text: string;
                            type: "reasoning";
                          }
                        | {
                            data: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "redacted-reasoning";
                          }
                        | {
                            args: any;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            toolCallId: string;
                            toolName: string;
                            type: "tool-call";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "assistant";
                }
              | {
                  content: Array<{
                    args?: any;
                    experimental_content?: Array<
                      | { text: string; type: "text" }
                      | { data: string; mimeType?: string; type: "image" }
                    >;
                    isError?: boolean;
                    providerOptions?: Record<string, Record<string, any>>;
                    result: any;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-result";
                  }>;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "tool";
                }
              | {
                  content: string;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "system";
                };
            model?: string;
            order: number;
            provider?: string;
            providerMetadata?: Record<string, Record<string, any>>;
            providerOptions?: Record<string, Record<string, any>>;
            reasoning?: string;
            reasoningDetails?: Array<
              | { signature?: string; text: string; type: "text" }
              | { data: string; type: "redacted" }
            >;
            sources?: Array<{
              id: string;
              providerOptions?: Record<string, Record<string, any>>;
              sourceType: "url";
              title?: string;
              url: string;
            }>;
            status: "pending" | "success" | "failed";
            stepOrder: number;
            text?: string;
            threadId: string;
            tool: boolean;
            usage?: {
              completionTokens: number;
              promptTokens: number;
              totalTokens: number;
            };
            userId?: string;
            warnings?: Array<
              | {
                  details?: string;
                  setting: string;
                  type: "unsupported-setting";
                }
              | { details?: string; tool: any; type: "unsupported-tool" }
              | { message: string; type: "other" }
            >;
          }>
        >;
        getThreadMessages: FunctionReference<
          "query",
          "internal",
          { deprecated: "Use listMessagesByThreadId instead" },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: string;
              agentName?: string;
              embeddingId?: string;
              error?: string;
              files?: Array<{
                data?: ArrayBuffer | string;
                fileId?: string;
                mimeType: string;
                url?: string;
              }>;
              finishReason?:
                | "stop"
                | "length"
                | "content-filter"
                | "tool-calls"
                | "error"
                | "other"
                | "unknown";
              id?: string;
              message?:
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              image: string | ArrayBuffer;
                              mimeType?: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "image";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "user";
                  }
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              signature?: string;
                              text: string;
                              type: "reasoning";
                            }
                          | {
                              data: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "redacted-reasoning";
                            }
                          | {
                              args: any;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              toolCallId: string;
                              toolName: string;
                              type: "tool-call";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "assistant";
                  }
                | {
                    content: Array<{
                      args?: any;
                      experimental_content?: Array<
                        | { text: string; type: "text" }
                        | { data: string; mimeType?: string; type: "image" }
                      >;
                      isError?: boolean;
                      providerOptions?: Record<string, Record<string, any>>;
                      result: any;
                      toolCallId: string;
                      toolName: string;
                      type: "tool-result";
                    }>;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "tool";
                  }
                | {
                    content: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "system";
                  };
              model?: string;
              order: number;
              provider?: string;
              providerMetadata?: Record<string, Record<string, any>>;
              providerOptions?: Record<string, Record<string, any>>;
              reasoning?: string;
              reasoningDetails?: Array<
                | { signature?: string; text: string; type: "text" }
                | { data: string; type: "redacted" }
              >;
              sources?: Array<{
                id: string;
                providerOptions?: Record<string, Record<string, any>>;
                sourceType: "url";
                title?: string;
                url: string;
              }>;
              status: "pending" | "success" | "failed";
              stepOrder: number;
              text?: string;
              threadId: string;
              tool: boolean;
              usage?: {
                completionTokens: number;
                promptTokens: number;
                totalTokens: number;
              };
              userId?: string;
              warnings?: Array<
                | {
                    details?: string;
                    setting: string;
                    type: "unsupported-setting";
                  }
                | { details?: string; tool: any; type: "unsupported-tool" }
                | { message: string; type: "other" }
              >;
            }>;
            pageStatus?: "SplitRecommended" | "SplitRequired" | null;
            splitCursor?: string | null;
          }
        >;
        listMessagesByThreadId: FunctionReference<
          "query",
          "internal",
          {
            excludeToolMessages?: boolean;
            isTool?: "use excludeToolMessages instead of this";
            order: "asc" | "desc";
            paginationOpts?: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
            statuses?: Array<"pending" | "success" | "failed">;
            threadId: string;
            upToAndIncludingMessageId?: string;
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: string;
              agentName?: string;
              embeddingId?: string;
              error?: string;
              files?: Array<{
                data?: ArrayBuffer | string;
                fileId?: string;
                mimeType: string;
                url?: string;
              }>;
              finishReason?:
                | "stop"
                | "length"
                | "content-filter"
                | "tool-calls"
                | "error"
                | "other"
                | "unknown";
              id?: string;
              message?:
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              image: string | ArrayBuffer;
                              mimeType?: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "image";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "user";
                  }
                | {
                    content:
                      | string
                      | Array<
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              text: string;
                              type: "text";
                            }
                          | {
                              data: string | ArrayBuffer;
                              filename?: string;
                              mimeType: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "file";
                            }
                          | {
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              signature?: string;
                              text: string;
                              type: "reasoning";
                            }
                          | {
                              data: string;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              type: "redacted-reasoning";
                            }
                          | {
                              args: any;
                              providerOptions?: Record<
                                string,
                                Record<string, any>
                              >;
                              toolCallId: string;
                              toolName: string;
                              type: "tool-call";
                            }
                        >;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "assistant";
                  }
                | {
                    content: Array<{
                      args?: any;
                      experimental_content?: Array<
                        | { text: string; type: "text" }
                        | { data: string; mimeType?: string; type: "image" }
                      >;
                      isError?: boolean;
                      providerOptions?: Record<string, Record<string, any>>;
                      result: any;
                      toolCallId: string;
                      toolName: string;
                      type: "tool-result";
                    }>;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "tool";
                  }
                | {
                    content: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    role: "system";
                  };
              model?: string;
              order: number;
              provider?: string;
              providerMetadata?: Record<string, Record<string, any>>;
              providerOptions?: Record<string, Record<string, any>>;
              reasoning?: string;
              reasoningDetails?: Array<
                | { signature?: string; text: string; type: "text" }
                | { data: string; type: "redacted" }
              >;
              sources?: Array<{
                id: string;
                providerOptions?: Record<string, Record<string, any>>;
                sourceType: "url";
                title?: string;
                url: string;
              }>;
              status: "pending" | "success" | "failed";
              stepOrder: number;
              text?: string;
              threadId: string;
              tool: boolean;
              usage?: {
                completionTokens: number;
                promptTokens: number;
                totalTokens: number;
              };
              userId?: string;
              warnings?: Array<
                | {
                    details?: string;
                    setting: string;
                    type: "unsupported-setting";
                  }
                | { details?: string; tool: any; type: "unsupported-tool" }
                | { message: string; type: "other" }
              >;
            }>;
            pageStatus?: "SplitRecommended" | "SplitRequired" | null;
            splitCursor?: string | null;
          }
        >;
        rollbackMessage: FunctionReference<
          "mutation",
          "internal",
          { error?: string; messageId: string },
          null
        >;
        searchMessages: FunctionReference<
          "action",
          "internal",
          {
            beforeMessageId?: string;
            limit: number;
            messageRange?: { after: number; before: number };
            searchAllMessagesForUserId?: string;
            text?: string;
            threadId?: string;
            vector?: Array<number>;
            vectorModel?: string;
            vectorScoreThreshold?: number;
          },
          Array<{
            _creationTime: number;
            _id: string;
            agentName?: string;
            embeddingId?: string;
            error?: string;
            files?: Array<{
              data?: ArrayBuffer | string;
              fileId?: string;
              mimeType: string;
              url?: string;
            }>;
            finishReason?:
              | "stop"
              | "length"
              | "content-filter"
              | "tool-calls"
              | "error"
              | "other"
              | "unknown";
            id?: string;
            message?:
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            image: string | ArrayBuffer;
                            mimeType?: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "image";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "user";
                }
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            signature?: string;
                            text: string;
                            type: "reasoning";
                          }
                        | {
                            data: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "redacted-reasoning";
                          }
                        | {
                            args: any;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            toolCallId: string;
                            toolName: string;
                            type: "tool-call";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "assistant";
                }
              | {
                  content: Array<{
                    args?: any;
                    experimental_content?: Array<
                      | { text: string; type: "text" }
                      | { data: string; mimeType?: string; type: "image" }
                    >;
                    isError?: boolean;
                    providerOptions?: Record<string, Record<string, any>>;
                    result: any;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-result";
                  }>;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "tool";
                }
              | {
                  content: string;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "system";
                };
            model?: string;
            order: number;
            provider?: string;
            providerMetadata?: Record<string, Record<string, any>>;
            providerOptions?: Record<string, Record<string, any>>;
            reasoning?: string;
            reasoningDetails?: Array<
              | { signature?: string; text: string; type: "text" }
              | { data: string; type: "redacted" }
            >;
            sources?: Array<{
              id: string;
              providerOptions?: Record<string, Record<string, any>>;
              sourceType: "url";
              title?: string;
              url: string;
            }>;
            status: "pending" | "success" | "failed";
            stepOrder: number;
            text?: string;
            threadId: string;
            tool: boolean;
            usage?: {
              completionTokens: number;
              promptTokens: number;
              totalTokens: number;
            };
            userId?: string;
            warnings?: Array<
              | {
                  details?: string;
                  setting: string;
                  type: "unsupported-setting";
                }
              | { details?: string; tool: any; type: "unsupported-tool" }
              | { message: string; type: "other" }
            >;
          }>
        >;
        textSearch: FunctionReference<
          "query",
          "internal",
          {
            beforeMessageId?: string;
            limit: number;
            searchAllMessagesForUserId?: string;
            text: string;
            threadId?: string;
          },
          Array<{
            _creationTime: number;
            _id: string;
            agentName?: string;
            embeddingId?: string;
            error?: string;
            files?: Array<{
              data?: ArrayBuffer | string;
              fileId?: string;
              mimeType: string;
              url?: string;
            }>;
            finishReason?:
              | "stop"
              | "length"
              | "content-filter"
              | "tool-calls"
              | "error"
              | "other"
              | "unknown";
            id?: string;
            message?:
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            image: string | ArrayBuffer;
                            mimeType?: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "image";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "user";
                }
              | {
                  content:
                    | string
                    | Array<
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            text: string;
                            type: "text";
                          }
                        | {
                            data: string | ArrayBuffer;
                            filename?: string;
                            mimeType: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "file";
                          }
                        | {
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            signature?: string;
                            text: string;
                            type: "reasoning";
                          }
                        | {
                            data: string;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            type: "redacted-reasoning";
                          }
                        | {
                            args: any;
                            providerOptions?: Record<
                              string,
                              Record<string, any>
                            >;
                            toolCallId: string;
                            toolName: string;
                            type: "tool-call";
                          }
                      >;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "assistant";
                }
              | {
                  content: Array<{
                    args?: any;
                    experimental_content?: Array<
                      | { text: string; type: "text" }
                      | { data: string; mimeType?: string; type: "image" }
                    >;
                    isError?: boolean;
                    providerOptions?: Record<string, Record<string, any>>;
                    result: any;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-result";
                  }>;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "tool";
                }
              | {
                  content: string;
                  providerOptions?: Record<string, Record<string, any>>;
                  role: "system";
                };
            model?: string;
            order: number;
            provider?: string;
            providerMetadata?: Record<string, Record<string, any>>;
            providerOptions?: Record<string, Record<string, any>>;
            reasoning?: string;
            reasoningDetails?: Array<
              | { signature?: string; text: string; type: "text" }
              | { data: string; type: "redacted" }
            >;
            sources?: Array<{
              id: string;
              providerOptions?: Record<string, Record<string, any>>;
              sourceType: "url";
              title?: string;
              url: string;
            }>;
            status: "pending" | "success" | "failed";
            stepOrder: number;
            text?: string;
            threadId: string;
            tool: boolean;
            usage?: {
              completionTokens: number;
              promptTokens: number;
              totalTokens: number;
            };
            userId?: string;
            warnings?: Array<
              | {
                  details?: string;
                  setting: string;
                  type: "unsupported-setting";
                }
              | { details?: string; tool: any; type: "unsupported-tool" }
              | { message: string; type: "other" }
            >;
          }>
        >;
      };
      streams: {
        addDelta: FunctionReference<
          "mutation",
          "internal",
          {
            end: number;
            parts: Array<
              | { textDelta: string; type: "text-delta" }
              | { textDelta: string; type: "reasoning" }
              | {
                  source: {
                    id: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    sourceType: "url";
                    title?: string;
                    url: string;
                  };
                  type: "source";
                }
              | {
                  args: any;
                  providerOptions?: Record<string, Record<string, any>>;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call";
                }
              | {
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call-streaming-start";
                }
              | {
                  argsTextDelta: string;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call-delta";
                }
              | {
                  args?: any;
                  experimental_content?: Array<
                    | { text: string; type: "text" }
                    | { data: string; mimeType?: string; type: "image" }
                  >;
                  isError?: boolean;
                  providerOptions?: Record<string, Record<string, any>>;
                  result: any;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-result";
                }
            >;
            start: number;
            streamId: string;
          },
          null
        >;
        create: FunctionReference<
          "mutation",
          "internal",
          {
            agentName?: string;
            model?: string;
            order: number;
            provider?: string;
            providerOptions?: Record<string, Record<string, any>>;
            stepOrder: number;
            threadId: string;
            userId?: string;
          },
          string
        >;
        finish: FunctionReference<
          "mutation",
          "internal",
          {
            finalDelta?: {
              end: number;
              parts: Array<
                | { textDelta: string; type: "text-delta" }
                | { textDelta: string; type: "reasoning" }
                | {
                    source: {
                      id: string;
                      providerOptions?: Record<string, Record<string, any>>;
                      sourceType: "url";
                      title?: string;
                      url: string;
                    };
                    type: "source";
                  }
                | {
                    args: any;
                    providerOptions?: Record<string, Record<string, any>>;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-call";
                  }
                | {
                    toolCallId: string;
                    toolName: string;
                    type: "tool-call-streaming-start";
                  }
                | {
                    argsTextDelta: string;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-call-delta";
                  }
                | {
                    args?: any;
                    experimental_content?: Array<
                      | { text: string; type: "text" }
                      | { data: string; mimeType?: string; type: "image" }
                    >;
                    isError?: boolean;
                    providerOptions?: Record<string, Record<string, any>>;
                    result: any;
                    toolCallId: string;
                    toolName: string;
                    type: "tool-result";
                  }
              >;
              start: number;
              streamId: string;
            };
            streamId: string;
          },
          null
        >;
        list: FunctionReference<
          "query",
          "internal",
          { threadId: string },
          Array<{
            agentName?: string;
            model?: string;
            order: number;
            provider?: string;
            providerOptions?: Record<string, Record<string, any>>;
            stepOrder: number;
            streamId: string;
            userId?: string;
          }>
        >;
        listDeltas: FunctionReference<
          "query",
          "internal",
          {
            cursors: Array<{ cursor: number; streamId: string }>;
            threadId: string;
          },
          Array<{
            end: number;
            parts: Array<
              | { textDelta: string; type: "text-delta" }
              | { textDelta: string; type: "reasoning" }
              | {
                  source: {
                    id: string;
                    providerOptions?: Record<string, Record<string, any>>;
                    sourceType: "url";
                    title?: string;
                    url: string;
                  };
                  type: "source";
                }
              | {
                  args: any;
                  providerOptions?: Record<string, Record<string, any>>;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call";
                }
              | {
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call-streaming-start";
                }
              | {
                  argsTextDelta: string;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-call-delta";
                }
              | {
                  args?: any;
                  experimental_content?: Array<
                    | { text: string; type: "text" }
                    | { data: string; mimeType?: string; type: "image" }
                  >;
                  isError?: boolean;
                  providerOptions?: Record<string, Record<string, any>>;
                  result: any;
                  toolCallId: string;
                  toolName: string;
                  type: "tool-result";
                }
            >;
            start: number;
            streamId: string;
          }>
        >;
      };
      threads: {
        createThread: FunctionReference<
          "mutation",
          "internal",
          {
            defaultSystemPrompt?: string;
            parentThreadIds?: Array<string>;
            summary?: string;
            title?: string;
            userId?: string;
          },
          {
            _creationTime: number;
            _id: string;
            status: "active" | "archived";
            summary?: string;
            title?: string;
            userId?: string;
          }
        >;
        deleteAllForThreadIdAsync: FunctionReference<
          "mutation",
          "internal",
          { cursor?: string; limit?: number; threadId: string },
          { cursor: string; isDone: boolean }
        >;
        deleteAllForThreadIdSync: FunctionReference<
          "action",
          "internal",
          { cursor?: string; limit?: number; threadId: string },
          null
        >;
        getThread: FunctionReference<
          "query",
          "internal",
          { threadId: string },
          {
            _creationTime: number;
            _id: string;
            status: "active" | "archived";
            summary?: string;
            title?: string;
            userId?: string;
          } | null
        >;
        listThreadsByUserId: FunctionReference<
          "query",
          "internal",
          {
            order?: "asc" | "desc";
            paginationOpts?: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
            userId?: string;
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<{
              _creationTime: number;
              _id: string;
              status: "active" | "archived";
              summary?: string;
              title?: string;
              userId?: string;
            }>;
            pageStatus?: "SplitRecommended" | "SplitRequired" | null;
            splitCursor?: string | null;
          }
        >;
        updateThread: FunctionReference<
          "mutation",
          "internal",
          {
            patch: {
              status?: "active" | "archived";
              summary?: string;
              title?: string;
            };
            threadId: string;
          },
          {
            _creationTime: number;
            _id: string;
            status: "active" | "archived";
            summary?: string;
            title?: string;
            userId?: string;
          }
        >;
      };
      users: {
        deleteAllForUserId: FunctionReference<
          "action",
          "internal",
          { userId: string },
          null
        >;
        deleteAllForUserIdAsync: FunctionReference<
          "mutation",
          "internal",
          { userId: string },
          boolean
        >;
        listUsersWithThreads: FunctionReference<
          "query",
          "internal",
          {
            paginationOpts: {
              cursor: string | null;
              endCursor?: string | null;
              id?: number;
              maximumBytesRead?: number;
              maximumRowsRead?: number;
              numItems: number;
            };
          },
          {
            continueCursor: string;
            isDone: boolean;
            page: Array<string>;
            pageStatus?: "SplitRecommended" | "SplitRequired" | null;
            splitCursor?: string | null;
          }
        >;
      };
      vector: {
        index: {
          deleteBatch: FunctionReference<
            "mutation",
            "internal",
            {
              ids: Array<
                | string
                | string
                | string
                | string
                | string
                | string
                | string
                | string
                | string
                | string
              >;
            },
            null
          >;
          deleteBatchForThread: FunctionReference<
            "mutation",
            "internal",
            {
              cursor?: string;
              limit: number;
              model: string;
              threadId: string;
              vectorDimension:
                | 128
                | 256
                | 512
                | 768
                | 1024
                | 1408
                | 1536
                | 2048
                | 3072
                | 4096;
            },
            { continueCursor: string; isDone: boolean }
          >;
          insertBatch: FunctionReference<
            "mutation",
            "internal",
            {
              vectorDimension:
                | 128
                | 256
                | 512
                | 768
                | 1024
                | 1408
                | 1536
                | 2048
                | 3072
                | 4096;
              vectors: Array<{
                messageId?: string;
                model: string;
                table: string;
                threadId?: string;
                userId?: string;
                vector: Array<number>;
              }>;
            },
            Array<
              | string
              | string
              | string
              | string
              | string
              | string
              | string
              | string
              | string
              | string
            >
          >;
          paginate: FunctionReference<
            "query",
            "internal",
            {
              cursor?: string;
              limit: number;
              table?: string;
              targetModel: string;
              vectorDimension:
                | 128
                | 256
                | 512
                | 768
                | 1024
                | 1408
                | 1536
                | 2048
                | 3072
                | 4096;
            },
            {
              continueCursor: string;
              ids: Array<
                | string
                | string
                | string
                | string
                | string
                | string
                | string
                | string
                | string
                | string
              >;
              isDone: boolean;
            }
          >;
          updateBatch: FunctionReference<
            "mutation",
            "internal",
            {
              vectors: Array<{
                id:
                  | string
                  | string
                  | string
                  | string
                  | string
                  | string
                  | string
                  | string
                  | string
                  | string;
                model: string;
                vector: Array<number>;
              }>;
            },
            null
          >;
        };
      };
    };
    workflow: {
      journal: {
        load: FunctionReference<
          "query",
          "internal",
          { workflowId: string },
          {
            inProgress: Array<{
              _creationTime: number;
              _id: string;
              step: {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType: "query" | "mutation" | "action";
                handle: string;
                inProgress: boolean;
                name: string;
                runResult?:
                  | { kind: "success"; returnValue: any }
                  | { error: string; kind: "failed" }
                  | { kind: "canceled" };
                startedAt: number;
                workId?: string;
              };
              stepNumber: number;
              workflowId: string;
            }>;
            journalEntries: Array<{
              _creationTime: number;
              _id: string;
              step: {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType: "query" | "mutation" | "action";
                handle: string;
                inProgress: boolean;
                name: string;
                runResult?:
                  | { kind: "success"; returnValue: any }
                  | { error: string; kind: "failed" }
                  | { kind: "canceled" };
                startedAt: number;
                workId?: string;
              };
              stepNumber: number;
              workflowId: string;
            }>;
            logLevel: "DEBUG" | "TRACE" | "INFO" | "REPORT" | "WARN" | "ERROR";
            ok: boolean;
            workflow: {
              _creationTime: number;
              _id: string;
              args: any;
              generationNumber: number;
              logLevel?: any;
              name?: string;
              onComplete?: { context?: any; fnHandle: string };
              runResult?:
                | { kind: "success"; returnValue: any }
                | { error: string; kind: "failed" }
                | { kind: "canceled" };
              startedAt?: any;
              state?: any;
              workflowHandle: string;
            };
          }
        >;
        startStep: FunctionReference<
          "mutation",
          "internal",
          {
            generationNumber: number;
            name: string;
            retry?:
              | boolean
              | { base: number; initialBackoffMs: number; maxAttempts: number };
            schedulerOptions?: { runAt?: number } | { runAfter?: number };
            step: {
              args: any;
              argsSize: number;
              completedAt?: number;
              functionType: "query" | "mutation" | "action";
              handle: string;
              inProgress: boolean;
              name: string;
              runResult?:
                | { kind: "success"; returnValue: any }
                | { error: string; kind: "failed" }
                | { kind: "canceled" };
              startedAt: number;
              workId?: string;
            };
            workflowId: string;
            workpoolOptions?: {
              defaultRetryBehavior?: {
                base: number;
                initialBackoffMs: number;
                maxAttempts: number;
              };
              logLevel?:
                | "DEBUG"
                | "TRACE"
                | "INFO"
                | "REPORT"
                | "WARN"
                | "ERROR";
              maxParallelism?: number;
              retryActionsByDefault?: boolean;
            };
          },
          {
            _creationTime: number;
            _id: string;
            step: {
              args: any;
              argsSize: number;
              completedAt?: number;
              functionType: "query" | "mutation" | "action";
              handle: string;
              inProgress: boolean;
              name: string;
              runResult?:
                | { kind: "success"; returnValue: any }
                | { error: string; kind: "failed" }
                | { kind: "canceled" };
              startedAt: number;
              workId?: string;
            };
            stepNumber: number;
            workflowId: string;
          }
        >;
      };
      workflow: {
        cancel: FunctionReference<
          "mutation",
          "internal",
          { workflowId: string },
          null
        >;
        cleanup: FunctionReference<
          "mutation",
          "internal",
          { workflowId: string },
          boolean
        >;
        complete: FunctionReference<
          "mutation",
          "internal",
          {
            generationNumber: number;
            now: number;
            runResult:
              | { kind: "success"; returnValue: any }
              | { error: string; kind: "failed" }
              | { kind: "canceled" };
            workflowId: string;
          },
          null
        >;
        create: FunctionReference<
          "mutation",
          "internal",
          {
            maxParallelism?: number;
            onComplete?: { context?: any; fnHandle: string };
            workflowArgs: any;
            workflowHandle: string;
            workflowName: string;
          },
          string
        >;
        getStatus: FunctionReference<
          "query",
          "internal",
          { workflowId: string },
          {
            inProgress: Array<{
              _creationTime: number;
              _id: string;
              step: {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType: "query" | "mutation" | "action";
                handle: string;
                inProgress: boolean;
                name: string;
                runResult?:
                  | { kind: "success"; returnValue: any }
                  | { error: string; kind: "failed" }
                  | { kind: "canceled" };
                startedAt: number;
                workId?: string;
              };
              stepNumber: number;
              workflowId: string;
            }>;
            logLevel: "DEBUG" | "TRACE" | "INFO" | "REPORT" | "WARN" | "ERROR";
            workflow: {
              _creationTime: number;
              _id: string;
              args: any;
              generationNumber: number;
              logLevel?: any;
              name?: string;
              onComplete?: { context?: any; fnHandle: string };
              runResult?:
                | { kind: "success"; returnValue: any }
                | { error: string; kind: "failed" }
                | { kind: "canceled" };
              startedAt?: any;
              state?: any;
              workflowHandle: string;
            };
          }
        >;
      };
    };
  };
