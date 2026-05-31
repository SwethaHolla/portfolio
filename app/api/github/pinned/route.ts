import { graphql } from "@octokit/graphql";
import type { PinnedRepo } from "@/types";

const PINNED_QUERY = `
  query {
    user(login: "SwethaHolla") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage { name color }
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token || token === "ghp_your_token_here") {
    return Response.json(
      { error: "GitHub token not configured. Set GITHUB_TOKEN in .env.local" },
      { status: 401 }
    );
  }

  try {
    const { user } = await graphql<{ user: { pinnedItems: { nodes: PinnedRepo[] } } }>(
      PINNED_QUERY,
      { headers: { authorization: `Bearer ${token}` } }
    );
    return Response.json(user.pinnedItems.nodes);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch pinned repos";
    return Response.json({ error: message }, { status: 500 });
  }
}
