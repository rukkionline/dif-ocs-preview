# QA Issue Log

| ID | Severity | Status | Finding | Evidence / Decision |
|---|---|---|---|---|
| QA-001 | Medium | Accepted risk | Red `[ о мероприятии ]` micro-label has 3.79:1 contrast | Inherited from original; modifying brand color would reduce pixel fidelity |
| QA-002 | Medium | Accepted risk | Cookie notice body has 2.43:1 contrast | Inherited from original; popup remains readable and policy link is high-contrast |
| QA-003 | Low | Accepted risk | Preview depends on public Tilda/Google CDN resources | Required for exact CSS/animation parity; documented in handoff |
| QA-004 | Low | Accepted risk | Tilda runtime creates layout shifts during initial animation/lazy loading | Present in original; reduced-motion override added |

Open Critical: 0. Open High: 0.
