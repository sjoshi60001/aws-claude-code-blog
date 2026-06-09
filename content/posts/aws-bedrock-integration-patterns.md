---
title: "AWS Bedrock Integration Patterns with Claude Code"
date: "2025-10-18"
author: "Maria Rodriguez"
excerpt: "Discover proven patterns for integrating AWS Bedrock with your applications using Claude Code. Includes code examples, security considerations, and performance tips."
category: "AWS"
tags: ["AWS", "Bedrock", "Integration", "Patterns", "Best Practices"]
published: true
---

# AWS Bedrock Integration Patterns with Claude Code

As organizations adopt AI-powered development workflows, understanding how to properly integrate AWS Bedrock with Claude Code becomes crucial. This guide presents battle-tested patterns for building robust, scalable, and secure integrations.

## Pattern 1: Request-Response

The simplest pattern for Claude Code integration is the synchronous request-response model.

### When to Use

- Interactive applications requiring immediate responses
- Single-turn conversations
- Quick code analysis or generation tasks

### Implementation

```python
import boto3
import json

class BedrockClient:
    def __init__(self, region='us-east-1'):
        self.client = boto3.client('bedrock-runtime', region_name=region)
        self.model_id = 'anthropic.claude-3-sonnet-20240229-v1:0'
    
    def invoke(self, prompt, max_tokens=2048):
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "messages": [{"role": "user", "content": prompt}]
        })
        
        response = self.client.invoke_model(
            modelId=self.model_id,
            body=body
        )
        
        result = json.loads(response['body'].read())
        return result['content'][0]['text']

# Usage
client = BedrockClient()
response = client.invoke("Review this code for security issues")
```

### Pros and Cons

**Pros:**
- Simple to implement
- Easy to debug
- Predictable latency

**Cons:**
- Blocks until response completes
- No progress updates for long-running tasks
- Higher perceived latency for users

## Pattern 2: Streaming Responses

For better user experience, especially with longer responses, use streaming:

```python
def invoke_streaming(self, prompt):
    body = json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 4096,
        "messages": [{"role": "user", "content": prompt}]
    })
    
    response = self.client.invoke_model_with_response_stream(
        modelId=self.model_id,
        body=body
    )
    
    for event in response['body']:
        chunk = json.loads(event['chunk']['bytes'])
        if chunk['type'] == 'content_block_delta':
            yield chunk['delta']['text']
```

### Benefits

- Immediate feedback to users
- Appears faster even with same total time
- Can cancel mid-stream if needed
- Better for long-form content generation

## Pattern 3: Conversation History Management

Maintain context across multiple interactions:

```python
class ConversationManager:
    def __init__(self, client):
        self.client = client
        self.history = []
    
    def send_message(self, user_message):
        # Add user message to history
        self.history.append({
            "role": "user",
            "content": user_message
        })
        
        # Call Bedrock with full history
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2048,
            "messages": self.history
        })
        
        response = self.client.invoke_model(
            modelId=self.model_id,
            body=body
        )
        
        result = json.loads(response['body'].read())
        assistant_message = result['content'][0]['text']
        
        # Add assistant response to history
        self.history.append({
            "role": "assistant",
            "content": assistant_message
        })
        
        return assistant_message
    
    def clear_history(self):
        self.history = []
```

### Use Cases

- Multi-turn debugging sessions
- Iterative code refinement
- Context-aware code reviews
- Documentation generation with follow-ups

## Pattern 4: Caching with DynamoDB

Reduce costs and improve performance by caching responses:

```python
import hashlib

class CachedBedrockClient:
    def __init__(self, bedrock_client, dynamodb_table):
        self.bedrock = bedrock_client
        self.cache = dynamodb_table
    
    def _cache_key(self, prompt, model_id):
        content = f"{model_id}:{prompt}"
        return hashlib.sha256(content.encode()).hexdigest()
    
    def invoke_with_cache(self, prompt, ttl=3600):
        cache_key = self._cache_key(prompt, self.bedrock.model_id)
        
        # Try cache first
        response = self.cache.get_item(Key={'id': cache_key})
        if 'Item' in response:
            return response['Item']['response']
        
        # Cache miss - call Bedrock
        result = self.bedrock.invoke(prompt)
        
        # Store in cache
        self.cache.put_item(Item={
            'id': cache_key,
            'response': result,
            'ttl': int(time.time()) + ttl
        })
        
        return result
```

### Cache Strategy Guidelines

- Cache common queries (e.g., "explain this error")
- Set appropriate TTLs based on content stability
- Use cache warming for predictable queries
- Monitor cache hit rates

## Pattern 5: Error Handling and Retries

Implement robust error handling with exponential backoff:

```python
import time
from botocore.exceptions import ClientError

class ResilientBedrockClient:
    def invoke_with_retry(self, prompt, max_retries=3):
        for attempt in range(max_retries):
            try:
                return self.invoke(prompt)
            except ClientError as e:
                error_code = e.response['Error']['Code']
                
                # Don't retry validation errors
                if error_code == 'ValidationException':
                    raise
                
                # Exponential backoff
                if attempt < max_retries - 1:
                    wait_time = (2 ** attempt) + (random.random())
                    time.sleep(wait_time)
                else:
                    raise
```

## Security Best Practices

### 1. Least Privilege IAM Policies

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-3-sonnet-*"
      ]
    }
  ]
}
```

### 2. Input Validation

Always validate and sanitize inputs before sending to Bedrock:

```python
def validate_prompt(prompt):
    # Length check
    if len(prompt) > 100000:
        raise ValueError("Prompt too long")
    
    # Content filtering
    if contains_sensitive_data(prompt):
        raise ValueError("Prompt contains sensitive data")
    
    return prompt
```

### 3. Output Filtering

Filter responses before showing to users:

```python
def filter_response(response):
    # Remove any leaked credentials
    response = remove_credentials(response)
    
    # Sanitize code blocks
    response = sanitize_code(response)
    
    return response
```

## Cost Optimization

### Monitor Token Usage

```python
def track_usage(prompt, response):
    input_tokens = count_tokens(prompt)
    output_tokens = count_tokens(response)
    
    cloudwatch.put_metric_data(
        Namespace='BedrockUsage',
        MetricData=[
            {
                'MetricName': 'InputTokens',
                'Value': input_tokens,
                'Unit': 'Count'
            },
            {
                'MetricName': 'OutputTokens',
                'Value': output_tokens,
                'Unit': 'Count'
            }
        ]
    )
```

### Use Appropriate Models

- **Haiku**: Fast, cheap, simple tasks
- **Sonnet**: Balanced for most use cases
- **Opus**: Complex reasoning, critical tasks

## Conclusion

These patterns provide a solid foundation for integrating AWS Bedrock with Claude Code. Start with simple request-response, then layer in streaming, caching, and robust error handling as your needs grow.

Remember: measure everything, optimize based on data, and always prioritize security. With these patterns, you're well-equipped to build production-grade AI-powered applications on AWS.
