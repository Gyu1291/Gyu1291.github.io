---
id: post-1
title: "Designing Memory Systems for the AI Era"
date: 2026-03-25
category: "Architecture Notes"
description: "A sample markdown post showing how long-form technical writing will appear in the site."
---

# Designing Memory Systems for the AI Era

Modern AI workloads are increasingly constrained by data movement rather than arithmetic throughput. That changes how we think about architecture research.

## Why memory matters more now

- Model sizes continue to grow faster than on-chip storage budgets.
- Sparse and dense workloads stress the memory hierarchy in very different ways.
- Energy cost is often dominated by moving data across levels of the system.

In practice, this means a strong architecture proposal often begins with a memory question rather than a compute question.

## A useful research framing

When evaluating a new accelerator or system design, I like to separate the problem into three layers:

- **Placement**: where tensors, weights, and activations live over time
- **Movement**: how data travels between compute units and memory tiers
- **Coordination**: which runtime or compiler decisions make the above practical

This framing makes it easier to connect microarchitectural ideas to full-system outcomes.

## Example pseudo-code

```text
for each layer in model:
  fetch weights from preferred memory tier
  schedule tiles based on reuse distance
  overlap communication with compute
```

## Closing thought

The most exciting work in computer architecture often appears where hardware structure, software policy, and workload behavior meet. This blog can be a place to capture those ideas as they evolve.
