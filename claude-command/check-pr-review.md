---
title: PR Review (MCP)
description: weather-app-claude-mcp-test PR의 코드리뷰 내용을 체크한다. (args: pr_number)
---

<mcp>

Full name: mcp__github__get_pull_request

Description:
PR의 기본 정보를 가져온다.

Parameters:
   • pullNumber (required): number - $ARGUMENTS
   • owner : string - devstefancho
   • repo : string - weather-app-claude-mcp-test

</mcp>

<mcp>

Full name: mcp__github__get_issue_comments

Description:
PR의 일반 댓글을 가져온다.

Parameters:
   • issue_number (required): number - Issue number (PR number와 동일)
   • owner : string - devstefancho
   • repo : string - weather-app-claude-mcp-test

</mcp>

<mcp>

Full name: mcp__github__get_pull_request_comments

Description:
PR의 코드 리뷰 댓글을 가져온다.

Parameters:
   • pullNumber (required): number - Pull request number
   • owner : string - devstefancho
   • repo : string - weather-app-claude-mcp-test

</mcp>



<instruction>

Comment는 분석시
1. Copilot 제안 (user.login이 "Copilot"인 댓글)
2. 개발자 수정요청 (user.login이 사람인 댓글)

을 구분하여 요약한다.

순서:
1. PR 기본 정보 확인
2. 일반 댓글 확인
3. 리뷰 댓글 확인
4. Copilot vs 개발자 구분하여 요약

</instruction>


