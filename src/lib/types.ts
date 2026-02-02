export interface ScaleDownRequest {
  context: string;
  prompt: string;
  scaledown: {
    rate: "auto" | string;
  };
}

export interface ScaleDownResponse {
  compressed_prompt: string;
  original_prompt_tokens: number;
  compressed_prompt_tokens: number;
  // Fallback fields sometimes observed
  prompt_tokens?: number;
  completion_tokens?: number;
  successful: boolean;
  latency_ms: number;
  request_metadata: {
    compression_time_ms: number;
    compression_rate: string;
    prompt_length: number;
    compressed_prompt_length: number;
  };
}

export type IssueSeverity = "critical" | "warning" | "info" | "suggestion";

export interface ReviewIssue {
  line?: number;
  message: string;
  severity: IssueSeverity;
  suggestion?: string;
}

export interface CodeReviewRequest {
  code: string;
  language: string;
  depth: "quick" | "standard" | "thorough";
  useCompression: boolean;
}

export interface TokenStats {
  originalTokens: number;
  compressedTokens: number;
  savingsPercentage: number;
  costSavings: number;
}

export interface CodeReviewResponse {
  issues: ReviewIssue[];
  qualityScore: number;
  summary: string;
  refactoredCode?: string;
  stats: TokenStats;
}
