export interface ScaleDownRequest {
  context: string;
  prompt: string;
  scaledown: {
    rate: "auto" | string;
  };
}

export interface ScaleDownResponse {
  // Nested results object (actual API response shape)
  results?: {
    success: boolean;
    compressed_prompt: string;
    original_prompt: string;
    original_prompt_tokens: number;
    compressed_prompt_tokens: number;
    compression_ratio: number;
  };
  // Top-level fields
  model_used?: string;
  total_original_tokens?: number;
  total_compressed_tokens?: number;
  num_pairs_processed?: number;
  num_successful?: number;
  num_failed?: number;
  successful: boolean;
  partially_successful?: boolean;
  latency_ms: number;
  request_metadata: {
    compression_time_ms: number;
    compression_rate: string;
    average_compression_ratio?: number;
    prompt_length?: number;
    compressed_prompt_length?: number;
  };
  // Fallback flat fields (older API versions)
  compressed_prompt?: string;
  original_prompt_tokens?: number;
  compressed_prompt_tokens?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
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
