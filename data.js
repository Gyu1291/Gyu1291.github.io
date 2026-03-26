window.siteData = {
  "publications": {
    "conference": [
      {
        "id": "conf-3",
        "cover": "assets/dac2026.png",
        "title": "CoX-MoE: Coalesced Expert Execution for High-Throughput MoE Inference with AMX-Enabled CPU-GPU Co-Execution",
        "authors": [
          {
            "name": "Muyoung Son*"
          },
          {
            "name": "Yi Chen*"
          },
          {
            "name": "Seungjae Yoo"
          },
          {
            "name": "Soongyu Choi",
            "highlight": true
          },
          {
            "name": "Joo-Young Kim"
          }
        ],
        "authorsNote": "*Co-first author",
        "summary": "CPU-GPU Co-processing for MoE inference.",
        "venue": "DAC 2026",
        "abstract": "Will be updated later.",
        "tags": [
          "Intel AMX",
          "LLM Inference",
          "MoE"
        ],
        "links": [
          {
            "label": "Paper",
            "href": "#"
          }
        ]
      },
      {
        "id": "conf-2",
        "cover": "assets/ISCA2025.png",
        "title": "LightNobel: Improving Sequence Length Limitation in Protein Structure Prediction Model via Adaptive Activation Quantization",
        "authors": [
          {
            "name": "Seunghee Han*"
          },
          {
            "name": "Soongyu Choi*",
            "highlight": true
          },
          {
            "name": "Joo-Young Kim"
          }
        ],
        "authorsNote": "*Co-first author",
        "summary": "Activation-only quantization and dedicated accelerator for protein structure prediction model(e.g. AlphaFold).",
        "venue": "ISCA 2025",
        "abstract": "We present LightNobel, the first hardware-software co-designed accelerator developed to overcome scalability limitations on the sequence length in PPM. At the software level, we propose Token-wise Adaptive Activation Quantization (AAQ), which leverages unique token-wise characteristics, such as distogram patterns in PPM activations, to enable fine-grained quantization techniques without compromising accuracy. At the hardware level, LightNobel integrates the multi-precision reconfigurable matrix processing unit (RMPU) and versatile vector processing unit (VVPU) to enable the efficient execution of AAQ. Through these innovations, LightNobel achieves up to 8.44x, 8.41x speedup and 37.29x, 43.35x higher power efficiency over the latest NVIDIA A100 and H100 GPUs, respectively, while maintaining negligible accuracy loss. It also reduces the peak memory requirement up to 120.05x in PPM, enabling scalable processing for proteins with long sequences.",
        "tags": [
          "Domain Specific Accelerator",
          "Alphafold",
          "Quantization"
        ],
        "links": [
          {
            "label": "Paper",
            "href": "https://dl.acm.org/doi/10.1145/3695053.3731006"
          }
        ]
      },
      {
        "id": "conf-1",
        "cover": "assets/ISCA2025.png",
        "title": "Oaken: Fast and Efficient LLM Serving with Online-Offline Hybrid KV Cache Quantization",
        "authors": [
          {
            "name": "Minsu Kim*"
          },
          {
            "name": "Seongmin Hong*"
          },
          {
            "name": "RyeoWook Ko"
          },
          {
            "name": "Soongyu Choi",
            "highlight": true
          },
          {
            "name": "Hunjong Lee"
          },
          {
            "name": "Junsoo Kim"
          },
          {
            "name": "Joo-Young Kim"
          },
          {
            "name": "Jongse Park"
          }
        ],
        "authorsNote": "*Co-first author",
        "summary": "Online-Offline Hybrid KV Cache Quantization.",
        "venue": "ISCA 2025",
        "abstract": "We propose Oaken, an acceleration solution that achieves high accuracy and high performance simultaneously through co-designing algorithm and hardware. To effectively find a sweet spot in the accuracy-performance trade-off space of KV cache quantization, Oaken employs an online-offline hybrid approach, setting outlier thresholds offline, which are then used to determine the quantization scale online. To translate the proposed algorithmic technique into tangible performance gains, Oaken also comes with custom quantization engines and memory management units that can be integrated with any LLM accelerators. We built an Oaken accelerator on top of an LLM accelerator, LPU, and conducted a comprehensive evaluation. Our experiments show that for a batch size of 256, Oaken achieves up to 1.58x throughput improvement over NVIDIA A100 GPU, incurring a minimal accuracy loss of only 0.54% on average, compared to state-of-the-art KV cache quantization techniques.",
        "tags": [
          "LLM",
          "KV Cache",
          "Quantization",
          "HW/SW Co-design"
        ],
        "links": [
          {
            "label": "Paper",
            "href": "https://dl.acm.org/doi/10.1145/3695053.3731019"
          }
        ]
      }
    ],
    "journal": [
      {
        "id": "jour-1",
        "cover": "assets/IEEEMicro.png",
        "title": "A latency processing unit: A latency-optimized and highly scalable processor for large language model inference",
        "authors": [
          {
            "name": "Seungjae Moon"
          },
          {
            "name": "Jung-Hoon Kim"
          },
          {
            "name": "Junsoo Kim"
          },
          {
            "name": "Seongmin Hong"
          },
          {
            "name": "Junseo Cha"
          },
          {
            "name": "Minsu Kim"
          },
          {
            "name": "Sukbin Lim"
          },
          {
            "name": "Gyubin Choi"
          },
          {
            "name": "Dongjin Seo"
          },
          {
            "name": "Jongho Kim"
          },
          {
            "name": "Hunjong Lee"
          },
          {
            "name": "Hyunjun Park"
          },
          {
            "name": "Ryeowook Ko"
          },
          {
            "name": "Soongyu Choi",
            "highlight": true
          },
          {
            "name": "Jongse Park"
          },
          {
            "name": "Jinwon Lee"
          },
          {
            "name": "Joo-Young Kim"
          }
        ],
        "summary": "Memory bandwidth optimized NPU for LLM inference.",
        "venue": "IEEE MICRO 2024",
        "abstract": "The explosive arrival of OpenAI's ChatGPT has fueled the globalization of large language model (LLM), which consists of billions of pretrained parameters that embodies the aspects of syntax and semantics. HyperAccel introduces latency processing unit (LPU), a latency-optimized and highly scalable processor architecture for the acceleration of LLM inference. LPU perfectly balances the memory bandwidth and compute logic with streamlined dataflow to maximize performance and efficiency. LPU is equipped with expandable synchronization link (ESL) that hides data synchronization latency between multiple LPUs. HyperDex complements LPU as an intuitive software framework to run LLM applications. LPU achieves 1.25 ms/token and 20.9 ms/token for 1.3B and 66B model, respectively, which is 2.09x and 1.37x faster than the GPU. LPU, synthesized using Samsung 4nm process, has total area of 0.824 mm2 and power consumption of 284.31 mW. LPU-based servers achieve 1.33x and 1.32x energy efficiency over NVIDIA H100 and L4 servers, respectively.",
        "tags": [
          "LLM",
          "Accelerator",
          "FPGA"
        ],
        "links": [
          {
            "label": "Paper",
            "href": "https://arxiv.org/abs/2408.07326"
          }
        ]
      }
    ]
  },
  "projects": [],
  "posts": [
    {
      "id": "post-1",
      "title": "Designing Memory Systems for the AI Era",
      "date": "2026-03-25",
      "category": "Architecture Notes",
      "description": "A sample markdown post showing how long-form technical writing will appear in the site.",
      "path": "posts/designing-memory-systems.md",
      "content": "# Designing Memory Systems for the AI Era\n\nModern AI workloads are increasingly constrained by data movement rather than arithmetic throughput. That changes how we think about architecture research.\n\n## Why memory matters more now\n\n- Model sizes continue to grow faster than on-chip storage budgets.\n- Sparse and dense workloads stress the memory hierarchy in very different ways.\n- Energy cost is often dominated by moving data across levels of the system.\n\nIn practice, this means a strong architecture proposal often begins with a memory question rather than a compute question.\n\n## A useful research framing\n\nWhen evaluating a new accelerator or system design, I like to separate the problem into three layers:\n\n- **Placement**: where tensors, weights, and activations live over time\n- **Movement**: how data travels between compute units and memory tiers\n- **Coordination**: which runtime or compiler decisions make the above practical\n\nThis framing makes it easier to connect microarchitectural ideas to full-system outcomes.\n\n## Example pseudo-code\n\n```text\nfor each layer in model:\n  fetch weights from preferred memory tier\n  schedule tiles based on reuse distance\n  overlap communication with compute\n```\n\n## Closing thought\n\nThe most exciting work in computer architecture often appears where hardware structure, software policy, and workload behavior meet. This blog can be a place to capture those ideas as they evolve."
    }
  ]
};
