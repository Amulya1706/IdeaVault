export type Idea = {
id: string; // deterministic ID = sha256(idea_text)
title: string;
text: string;
summary: string;
tags: string[];
hash: string; // hex sha256
timestamp: number; // ms epoch
txHash?: string; // mock or real on-chain tx
};