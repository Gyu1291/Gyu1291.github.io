window.siteData = {
  publications: {
    conference: [
      {
        id: "conf-1",
        cover: "assets/cover-1.svg",
        title: "NebulaFlow",
        subtitle: "A topology-aware accelerator fabric for large-scale transformer inference",
        summary:
          "Introduces a communication-conscious accelerator design that reduces inter-chip latency for mixture-of-experts and transformer inference.",
        venue: "ISCA 2026",
        abstract:
          "NebulaFlow combines workload-aware routing with memory placement policies to sustain high throughput under sparse and dense AI workloads. The architecture targets large-scale model serving with predictable latency and improved utilization.",
        tags: ["Accelerators", "Interconnect", "LLM Inference"],
        links: [
          { label: "Paper", href: "#" },
          { label: "Slides", href: "#" }
        ]
      },
      {
        id: "conf-2",
        cover: "assets/cover-2.svg",
        title: "BlueCache",
        subtitle: "Near-memory cache orchestration for bandwidth-bound AI training",
        summary:
          "Presents a cache management framework that adapts to tensor reuse distance and memory pressure in accelerator clusters.",
        venue: "MICRO 2025",
        abstract:
          "BlueCache coordinates data movement across on-package SRAM, HBM, and remote memory tiers. It increases effective memory bandwidth while limiting software overhead through lightweight compiler hints and online controllers.",
        tags: ["Memory Systems", "HBM", "Training Systems"],
        links: [{ label: "Paper", href: "#" }]
      }
    ],
    journal: [
      {
        id: "jour-1",
        cover: "assets/cover-3.svg",
        title: "Aurora PIM",
        subtitle: "A survey and evaluation framework for processing-in-memory AI systems",
        summary:
          "Systematizes the design space of PIM-based AI acceleration and provides an evaluation stack for cross-platform comparison.",
        venue: "IEEE TC 2025",
        abstract:
          "Aurora PIM categorizes device-level and architecture-level tradeoffs in processing-in-memory systems and proposes a normalized benchmarking methodology for fair comparison across analog and digital approaches.",
        tags: ["PIM", "Benchmarking", "Survey"],
        links: [{ label: "DOI", href: "#" }]
      }
    ]
  },
  projects: [
    {
      id: "proj-1",
      cover: "assets/cover-2.svg",
      title: "AtlasSim",
      subtitle: "Cycle-accurate simulator for AI accelerator memory studies",
      summary:
        "A research simulator for exploring memory hierarchy policies, tensor tiling, and scheduler interaction under modern AI workloads.",
      venue: "Open research infrastructure",
      abstract:
        "AtlasSim models accelerator compute, on-chip networks, and memory tiers with configurable policies. It is designed to shorten iteration time for architecture proposals and to produce publication-quality figures.",
      tags: ["Simulator", "Architecture Research", "Tooling"],
      links: [{ label: "Repository", href: "#" }]
    },
    {
      id: "proj-2",
      cover: "assets/cover-1.svg",
      title: "PIMScope",
      subtitle: "Interactive profiling suite for processing-in-memory kernels",
      summary:
        "Profiles dataflow, utilization, and bottlenecks in experimental PIM software stacks.",
      venue: "Research prototype",
      abstract:
        "PIMScope offers a unified interface for workload inspection, trace collection, and bottleneck visualization, helping researchers compare kernel mappings and memory behaviors across PIM backends.",
      tags: ["Profiling", "PIM", "Visualization"],
      links: [{ label: "Demo", href: "#" }]
    }
  ],
  posts: [
    {
      id: "post-1",
      title: "Designing Memory Systems for the AI Era",
      date: "2026-03-25",
      category: "Architecture Notes",
      description:
        "A sample markdown post showing how long-form technical writing will appear in the site.",
      path: "posts/designing-memory-systems.md"
    }
  ]
};
