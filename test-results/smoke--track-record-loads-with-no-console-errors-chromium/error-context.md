# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> /track-record loads with no console errors
- Location: e2e/smoke.spec.ts:13:3

# Error details

```
Error: console errors on /track-record:
pageerror: Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectBoundary>
      <RedirectErrorBoundary router={{...}}>
        <InnerLayoutRouter url="/track-record" tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
          <SegmentViewNode type="page" pagePath="track-reco...">
            <SegmentTrieNode>
            <TrackRecordPage>
              <PageShell>
                <div className="terminal r...">
                  <div>
                  <div>
                  <EquityThread>
                  <Header>
                  <main className="relative z...">
                    <section>
                    <figure>
                    <figure>
                    <figure className="m-0 mt-12">
                      <PnlCalendar>
                        <div className="overflow-x...">
                          <svg width={742} height={116} role="img" aria-label={"Daily P&..."}>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <text>
                            <rect x={0} y={18} width={11} height={11} rx={2} fill="rgb(var(--...">
                              <title>
+                               2025-07-06
                                ...
                            ...
                      ...
                    ...
                    ...
          ...
        ...


expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 59

- Array []
+ Array [
+   "pageerror: Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:
+
+ - A server/client branch `if (typeof window !== 'undefined')`.
+ - Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
+ - Date formatting in a user's locale which doesn't match the server.
+ - External changing data without sending a snapshot of it along with the HTML.
+ - Invalid HTML tag nesting.
+
+ It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.
+
+ https://react.dev/link/hydration-mismatch
+
+   ...
+     <RedirectBoundary>
+       <RedirectErrorBoundary router={{...}}>
+         <InnerLayoutRouter url=\"/track-record\" tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
+           <SegmentViewNode type=\"page\" pagePath=\"track-reco...\">
+             <SegmentTrieNode>
+             <TrackRecordPage>
+               <PageShell>
+                 <div className=\"terminal r...\">
+                   <div>
+                   <div>
+                   <EquityThread>
+                   <Header>
+                   <main className=\"relative z...\">
+                     <section>
+                     <figure>
+                     <figure>
+                     <figure className=\"m-0 mt-12\">
+                       <PnlCalendar>
+                         <div className=\"overflow-x...\">
+                           <svg width={742} height={116} role=\"img\" aria-label={\"Daily P&...\"}>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <text>
+                             <rect x={0} y={18} width={11} height={11} rx={2} fill=\"rgb(var(--...\">
+                               <title>
+ +                               2025-07-06
+                                 ...
+                             ...
+                       ...
+                     ...
+                     ...
+           ...
+         ...
+ ",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e6] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e7]:
      - img [ref=e8]
    - generic [ref=e11]:
      - button "Open issues overlay" [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: "0"
          - generic [ref=e15]: "1"
        - generic [ref=e16]: Issue
      - button "Collapse issues badge" [ref=e17]:
        - img [ref=e18]
  - generic [ref=e20]:
    - generic:
      - img
    - banner [ref=e21]:
      - generic [ref=e22]:
        - link "Charandeep Kapoor" [ref=e23] [cursor=pointer]:
          - /url: /
        - navigation [ref=e24]:
          - link "Work" [ref=e25] [cursor=pointer]:
            - /url: /work
          - link "Résumé" [ref=e26] [cursor=pointer]:
            - /url: /resume
          - link "Track record" [ref=e27] [cursor=pointer]:
            - /url: /track-record
          - link "Writings" [ref=e28] [cursor=pointer]:
            - /url: /blog
          - link "Delta" [ref=e29] [cursor=pointer]:
            - /url: /delta
          - link "About" [ref=e30] [cursor=pointer]:
            - /url: /#about
    - main [ref=e31]:
      - generic [ref=e32]:
        - paragraph [ref=e33]: Live track record
        - heading "My Dhan account, in the open" [level=1] [ref=e34]
        - paragraph [ref=e35]: Real capital on my Dhan account — aggregate P&L, Sharpe, drawdown and positive-day rate, refreshed daily. Results only; positions are never published.
      - figure "Tab. 1 — account metrics · refreshed daily" [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e40]:
              - generic [ref=e41]: ₹34,016
              - generic [ref=e42]: ₹34,016
            - paragraph [ref=e43]: Net P&L (₹)
          - generic [ref=e44]:
            - generic [ref=e46]:
              - generic [ref=e47]: 17/30
              - generic [ref=e48]: 17/30
            - paragraph [ref=e49]: Sharpe (building)
          - generic [ref=e50]:
            - generic [ref=e52]: —
            - paragraph [ref=e53]: Max drawdown
          - generic [ref=e54]:
            - generic [ref=e56]: —
            - paragraph [ref=e57]: Positive days
          - generic [ref=e58]:
            - generic [ref=e60]:
              - generic [ref=e61]: "17"
              - generic [ref=e62]: "17"
            - paragraph [ref=e63]: Active days
          - generic [ref=e64]:
            - generic [ref=e66]:
              - generic [ref=e67]: 2026-07-10
              - generic [ref=e68]: 2026-07-10
            - paragraph [ref=e69]: As of
        - paragraph [ref=e71]: Tab. 1 — account metrics · refreshed daily
      - figure "Fig. 1 — cumulative P&L · ₹" [ref=e72]:
        - img [ref=e73]
        - paragraph [ref=e76]: Fig. 1 — cumulative P&L · ₹
      - figure "Fig. 2 — daily P&L calendar · green profit / red loss · trailing 52 weeks" [ref=e77]:
        - img "Daily P&L calendar (trailing 52 weeks)" [ref=e79]:
          - generic [ref=e80]: Jul
          - generic [ref=e81]: Aug
          - generic [ref=e82]: Sep
          - generic [ref=e83]: Oct
          - generic [ref=e84]: Nov
          - generic [ref=e85]: Dec
          - generic [ref=e86]: Jan
          - generic [ref=e87]: Feb
          - generic [ref=e88]: Mar
          - generic [ref=e89]: Apr
          - generic [ref=e90]: May
          - generic [ref=e91]: Jun
          - generic [ref=e92]: Jul
          - generic "2025-07-06 · no trades" [ref=e93]
          - generic "2025-07-07 · no trades" [ref=e94]
          - generic "2025-07-08 · no trades" [ref=e95]
          - generic "2025-07-09 · no trades" [ref=e96]
          - generic "2025-07-10 · no trades" [ref=e97]
          - generic "2025-07-11 · no trades" [ref=e98]
          - generic "2025-07-12 · no trades" [ref=e99]
          - generic "2025-07-13 · no trades" [ref=e100]
          - generic "2025-07-14 · no trades" [ref=e101]
          - generic "2025-07-15 · no trades" [ref=e102]
          - generic "2025-07-16 · no trades" [ref=e103]
          - generic "2025-07-17 · no trades" [ref=e104]
          - generic "2025-07-18 · no trades" [ref=e105]
          - generic "2025-07-19 · no trades" [ref=e106]
          - generic "2025-07-20 · no trades" [ref=e107]
          - generic "2025-07-21 · no trades" [ref=e108]
          - generic "2025-07-22 · no trades" [ref=e109]
          - generic "2025-07-23 · no trades" [ref=e110]
          - generic "2025-07-24 · no trades" [ref=e111]
          - generic "2025-07-25 · no trades" [ref=e112]
          - generic "2025-07-26 · no trades" [ref=e113]
          - generic "2025-07-27 · no trades" [ref=e114]
          - generic "2025-07-28 · no trades" [ref=e115]
          - generic "2025-07-29 · no trades" [ref=e116]
          - generic "2025-07-30 · no trades" [ref=e117]
          - generic "2025-07-31 · no trades" [ref=e118]
          - generic "2025-08-01 · no trades" [ref=e119]
          - generic "2025-08-02 · no trades" [ref=e120]
          - generic "2025-08-03 · no trades" [ref=e121]
          - generic "2025-08-04 · no trades" [ref=e122]
          - generic "2025-08-05 · no trades" [ref=e123]
          - generic "2025-08-06 · no trades" [ref=e124]
          - generic "2025-08-07 · no trades" [ref=e125]
          - generic "2025-08-08 · no trades" [ref=e126]
          - generic "2025-08-09 · no trades" [ref=e127]
          - generic "2025-08-10 · no trades" [ref=e128]
          - generic "2025-08-11 · no trades" [ref=e129]
          - generic "2025-08-12 · no trades" [ref=e130]
          - generic "2025-08-13 · no trades" [ref=e131]
          - generic "2025-08-14 · no trades" [ref=e132]
          - generic "2025-08-15 · no trades" [ref=e133]
          - generic "2025-08-16 · no trades" [ref=e134]
          - generic "2025-08-17 · no trades" [ref=e135]
          - generic "2025-08-18 · no trades" [ref=e136]
          - generic "2025-08-19 · no trades" [ref=e137]
          - generic "2025-08-20 · no trades" [ref=e138]
          - generic "2025-08-21 · no trades" [ref=e139]
          - generic "2025-08-22 · no trades" [ref=e140]
          - generic "2025-08-23 · no trades" [ref=e141]
          - generic "2025-08-24 · no trades" [ref=e142]
          - generic "2025-08-25 · no trades" [ref=e143]
          - generic "2025-08-26 · no trades" [ref=e144]
          - generic "2025-08-27 · no trades" [ref=e145]
          - generic "2025-08-28 · no trades" [ref=e146]
          - generic "2025-08-29 · no trades" [ref=e147]
          - generic "2025-08-30 · no trades" [ref=e148]
          - generic "2025-08-31 · no trades" [ref=e149]
          - generic "2025-09-01 · no trades" [ref=e150]
          - generic "2025-09-02 · no trades" [ref=e151]
          - generic "2025-09-03 · no trades" [ref=e152]
          - generic "2025-09-04 · no trades" [ref=e153]
          - generic "2025-09-05 · no trades" [ref=e154]
          - generic "2025-09-06 · no trades" [ref=e155]
          - generic "2025-09-07 · no trades" [ref=e156]
          - generic "2025-09-08 · no trades" [ref=e157]
          - generic "2025-09-09 · no trades" [ref=e158]
          - generic "2025-09-10 · no trades" [ref=e159]
          - generic "2025-09-11 · no trades" [ref=e160]
          - generic "2025-09-12 · no trades" [ref=e161]
          - generic "2025-09-13 · no trades" [ref=e162]
          - generic "2025-09-14 · no trades" [ref=e163]
          - generic "2025-09-15 · no trades" [ref=e164]
          - generic "2025-09-16 · no trades" [ref=e165]
          - generic "2025-09-17 · no trades" [ref=e166]
          - generic "2025-09-18 · no trades" [ref=e167]
          - generic "2025-09-19 · no trades" [ref=e168]
          - generic "2025-09-20 · no trades" [ref=e169]
          - generic "2025-09-21 · no trades" [ref=e170]
          - generic "2025-09-22 · no trades" [ref=e171]
          - generic "2025-09-23 · no trades" [ref=e172]
          - generic "2025-09-24 · no trades" [ref=e173]
          - generic "2025-09-25 · no trades" [ref=e174]
          - generic "2025-09-26 · no trades" [ref=e175]
          - generic "2025-09-27 · no trades" [ref=e176]
          - generic "2025-09-28 · no trades" [ref=e177]
          - generic "2025-09-29 · no trades" [ref=e178]
          - generic "2025-09-30 · no trades" [ref=e179]
          - generic "2025-10-01 · no trades" [ref=e180]
          - generic "2025-10-02 · no trades" [ref=e181]
          - generic "2025-10-03 · no trades" [ref=e182]
          - generic "2025-10-04 · no trades" [ref=e183]
          - generic "2025-10-05 · no trades" [ref=e184]
          - generic "2025-10-06 · no trades" [ref=e185]
          - generic "2025-10-07 · no trades" [ref=e186]
          - generic "2025-10-08 · no trades" [ref=e187]
          - generic "2025-10-09 · no trades" [ref=e188]
          - generic "2025-10-10 · no trades" [ref=e189]
          - generic "2025-10-11 · no trades" [ref=e190]
          - generic "2025-10-12 · no trades" [ref=e191]
          - generic "2025-10-13 · no trades" [ref=e192]
          - generic "2025-10-14 · no trades" [ref=e193]
          - generic "2025-10-15 · no trades" [ref=e194]
          - generic "2025-10-16 · no trades" [ref=e195]
          - generic "2025-10-17 · no trades" [ref=e196]
          - generic "2025-10-18 · no trades" [ref=e197]
          - generic "2025-10-19 · no trades" [ref=e198]
          - generic "2025-10-20 · no trades" [ref=e199]
          - generic "2025-10-21 · no trades" [ref=e200]
          - generic "2025-10-22 · no trades" [ref=e201]
          - generic "2025-10-23 · no trades" [ref=e202]
          - generic "2025-10-24 · no trades" [ref=e203]
          - generic "2025-10-25 · no trades" [ref=e204]
          - generic "2025-10-26 · no trades" [ref=e205]
          - generic "2025-10-27 · no trades" [ref=e206]
          - generic "2025-10-28 · no trades" [ref=e207]
          - generic "2025-10-29 · no trades" [ref=e208]
          - generic "2025-10-30 · no trades" [ref=e209]
          - generic "2025-10-31 · no trades" [ref=e210]
          - generic "2025-11-01 · no trades" [ref=e211]
          - generic "2025-11-02 · no trades" [ref=e212]
          - generic "2025-11-03 · no trades" [ref=e213]
          - generic "2025-11-04 · no trades" [ref=e214]
          - generic "2025-11-05 · no trades" [ref=e215]
          - generic "2025-11-06 · no trades" [ref=e216]
          - generic "2025-11-07 · no trades" [ref=e217]
          - generic "2025-11-08 · no trades" [ref=e218]
          - generic "2025-11-09 · no trades" [ref=e219]
          - generic "2025-11-10 · no trades" [ref=e220]
          - generic "2025-11-11 · no trades" [ref=e221]
          - generic "2025-11-12 · no trades" [ref=e222]
          - generic "2025-11-13 · no trades" [ref=e223]
          - generic "2025-11-14 · no trades" [ref=e224]
          - generic "2025-11-15 · no trades" [ref=e225]
          - generic "2025-11-16 · no trades" [ref=e226]
          - generic "2025-11-17 · no trades" [ref=e227]
          - generic "2025-11-18 · no trades" [ref=e228]
          - generic "2025-11-19 · no trades" [ref=e229]
          - generic "2025-11-20 · no trades" [ref=e230]
          - generic "2025-11-21 · no trades" [ref=e231]
          - generic "2025-11-22 · no trades" [ref=e232]
          - generic "2025-11-23 · no trades" [ref=e233]
          - generic "2025-11-24 · no trades" [ref=e234]
          - generic "2025-11-25 · no trades" [ref=e235]
          - generic "2025-11-26 · no trades" [ref=e236]
          - generic "2025-11-27 · no trades" [ref=e237]
          - generic "2025-11-28 · no trades" [ref=e238]
          - generic "2025-11-29 · no trades" [ref=e239]
          - generic "2025-11-30 · no trades" [ref=e240]
          - generic "2025-12-01 · no trades" [ref=e241]
          - generic "2025-12-02 · no trades" [ref=e242]
          - generic "2025-12-03 · no trades" [ref=e243]
          - generic "2025-12-04 · no trades" [ref=e244]
          - generic "2025-12-05 · no trades" [ref=e245]
          - generic "2025-12-06 · no trades" [ref=e246]
          - generic "2025-12-07 · no trades" [ref=e247]
          - generic "2025-12-08 · no trades" [ref=e248]
          - generic "2025-12-09 · no trades" [ref=e249]
          - generic "2025-12-10 · no trades" [ref=e250]
          - generic "2025-12-11 · no trades" [ref=e251]
          - generic "2025-12-12 · no trades" [ref=e252]
          - generic "2025-12-13 · no trades" [ref=e253]
          - generic "2025-12-14 · no trades" [ref=e254]
          - generic "2025-12-15 · no trades" [ref=e255]
          - generic "2025-12-16 · no trades" [ref=e256]
          - generic "2025-12-17 · no trades" [ref=e257]
          - generic "2025-12-18 · no trades" [ref=e258]
          - generic "2025-12-19 · no trades" [ref=e259]
          - generic "2025-12-20 · no trades" [ref=e260]
          - generic "2025-12-21 · no trades" [ref=e261]
          - generic "2025-12-22 · no trades" [ref=e262]
          - generic "2025-12-23 · no trades" [ref=e263]
          - generic "2025-12-24 · no trades" [ref=e264]
          - generic "2025-12-25 · no trades" [ref=e265]
          - generic "2025-12-26 · no trades" [ref=e266]
          - generic "2025-12-27 · no trades" [ref=e267]
          - generic "2025-12-28 · no trades" [ref=e268]
          - generic "2025-12-29 · no trades" [ref=e269]
          - generic "2025-12-30 · no trades" [ref=e270]
          - generic "2025-12-31 · no trades" [ref=e271]
          - generic "2026-01-01 · no trades" [ref=e272]
          - generic "2026-01-02 · no trades" [ref=e273]
          - generic "2026-01-03 · no trades" [ref=e274]
          - generic "2026-01-04 · no trades" [ref=e275]
          - generic "2026-01-05 · no trades" [ref=e276]
          - generic "2026-01-06 · no trades" [ref=e277]
          - generic "2026-01-07 · no trades" [ref=e278]
          - generic "2026-01-08 · no trades" [ref=e279]
          - generic "2026-01-09 · no trades" [ref=e280]
          - generic "2026-01-10 · no trades" [ref=e281]
          - generic "2026-01-11 · no trades" [ref=e282]
          - generic "2026-01-12 · no trades" [ref=e283]
          - generic "2026-01-13 · no trades" [ref=e284]
          - generic "2026-01-14 · no trades" [ref=e285]
          - generic "2026-01-15 · no trades" [ref=e286]
          - generic "2026-01-16 · no trades" [ref=e287]
          - generic "2026-01-17 · no trades" [ref=e288]
          - generic "2026-01-18 · no trades" [ref=e289]
          - generic "2026-01-19 · no trades" [ref=e290]
          - generic "2026-01-20 · no trades" [ref=e291]
          - generic "2026-01-21 · no trades" [ref=e292]
          - generic "2026-01-22 · no trades" [ref=e293]
          - generic "2026-01-23 · no trades" [ref=e294]
          - generic "2026-01-24 · no trades" [ref=e295]
          - generic "2026-01-25 · no trades" [ref=e296]
          - generic "2026-01-26 · no trades" [ref=e297]
          - generic "2026-01-27 · no trades" [ref=e298]
          - generic "2026-01-28 · no trades" [ref=e299]
          - generic "2026-01-29 · no trades" [ref=e300]
          - generic "2026-01-30 · no trades" [ref=e301]
          - generic "2026-01-31 · no trades" [ref=e302]
          - generic "2026-02-01 · no trades" [ref=e303]
          - generic "2026-02-02 · no trades" [ref=e304]
          - generic "2026-02-03 · no trades" [ref=e305]
          - generic "2026-02-04 · no trades" [ref=e306]
          - generic "2026-02-05 · no trades" [ref=e307]
          - generic "2026-02-06 · no trades" [ref=e308]
          - generic "2026-02-07 · no trades" [ref=e309]
          - generic "2026-02-08 · no trades" [ref=e310]
          - generic "2026-02-09 · no trades" [ref=e311]
          - generic "2026-02-10 · no trades" [ref=e312]
          - generic "2026-02-11 · no trades" [ref=e313]
          - generic "2026-02-12 · no trades" [ref=e314]
          - generic "2026-02-13 · no trades" [ref=e315]
          - generic "2026-02-14 · no trades" [ref=e316]
          - generic "2026-02-15 · no trades" [ref=e317]
          - generic "2026-02-16 · no trades" [ref=e318]
          - generic "2026-02-17 · no trades" [ref=e319]
          - generic "2026-02-18 · no trades" [ref=e320]
          - generic "2026-02-19 · no trades" [ref=e321]
          - generic "2026-02-20 · no trades" [ref=e322]
          - generic "2026-02-21 · no trades" [ref=e323]
          - generic "2026-02-22 · no trades" [ref=e324]
          - generic "2026-02-23 · no trades" [ref=e325]
          - generic "2026-02-24 · no trades" [ref=e326]
          - generic "2026-02-25 · no trades" [ref=e327]
          - generic "2026-02-26 · no trades" [ref=e328]
          - generic "2026-02-27 · no trades" [ref=e329]
          - generic "2026-02-28 · no trades" [ref=e330]
          - generic "2026-03-01 · no trades" [ref=e331]
          - generic "2026-03-02 · no trades" [ref=e332]
          - generic "2026-03-03 · no trades" [ref=e333]
          - generic "2026-03-04 · no trades" [ref=e334]
          - generic "2026-03-05 · no trades" [ref=e335]
          - generic "2026-03-06 · no trades" [ref=e336]
          - generic "2026-03-07 · no trades" [ref=e337]
          - generic "2026-03-08 · no trades" [ref=e338]
          - generic "2026-03-09 · no trades" [ref=e339]
          - generic "2026-03-10 · no trades" [ref=e340]
          - generic "2026-03-11 · no trades" [ref=e341]
          - generic "2026-03-12 · no trades" [ref=e342]
          - generic "2026-03-13 · no trades" [ref=e343]
          - generic "2026-03-14 · no trades" [ref=e344]
          - generic "2026-03-15 · no trades" [ref=e345]
          - generic "2026-03-16 · no trades" [ref=e346]
          - generic "2026-03-17 · no trades" [ref=e347]
          - generic "2026-03-18 · no trades" [ref=e348]
          - generic "2026-03-19 · no trades" [ref=e349]
          - generic "2026-03-20 · no trades" [ref=e350]
          - generic "2026-03-21 · no trades" [ref=e351]
          - generic "2026-03-22 · no trades" [ref=e352]
          - generic "2026-03-23 · no trades" [ref=e353]
          - generic "2026-03-24 · no trades" [ref=e354]
          - generic "2026-03-25 · no trades" [ref=e355]
          - generic "2026-03-26 · no trades" [ref=e356]
          - generic "2026-03-27 · no trades" [ref=e357]
          - generic "2026-03-28 · no trades" [ref=e358]
          - generic "2026-03-29 · no trades" [ref=e359]
          - generic "2026-03-30 · no trades" [ref=e360]
          - generic "2026-03-31 · no trades" [ref=e361]
          - generic "2026-04-01 · no trades" [ref=e362]
          - generic "2026-04-02 · no trades" [ref=e363]
          - generic "2026-04-03 · no trades" [ref=e364]
          - generic "2026-04-04 · no trades" [ref=e365]
          - generic "2026-04-05 · no trades" [ref=e366]
          - generic "2026-04-06 · no trades" [ref=e367]
          - generic "2026-04-07 · no trades" [ref=e368]
          - generic "2026-04-08 · no trades" [ref=e369]
          - generic "2026-04-09 · no trades" [ref=e370]
          - generic "2026-04-10 · no trades" [ref=e371]
          - generic "2026-04-11 · no trades" [ref=e372]
          - generic "2026-04-12 · no trades" [ref=e373]
          - generic "2026-04-13 · no trades" [ref=e374]
          - generic "2026-04-14 · no trades" [ref=e375]
          - generic "2026-04-15 · no trades" [ref=e376]
          - generic "2026-04-16 · no trades" [ref=e377]
          - generic "2026-04-17 · no trades" [ref=e378]
          - generic "2026-04-18 · no trades" [ref=e379]
          - generic "2026-04-19 · no trades" [ref=e380]
          - generic "2026-04-20 · no trades" [ref=e381]
          - generic "2026-04-21 · no trades" [ref=e382]
          - generic "2026-04-22 · no trades" [ref=e383]
          - generic "2026-04-23 · no trades" [ref=e384]
          - generic "2026-04-24 · no trades" [ref=e385]
          - generic "2026-04-25 · no trades" [ref=e386]
          - generic "2026-04-26 · no trades" [ref=e387]
          - generic "2026-04-27 · no trades" [ref=e388]
          - generic "2026-04-28 · no trades" [ref=e389]
          - generic "2026-04-29 · no trades" [ref=e390]
          - generic "2026-04-30 · no trades" [ref=e391]
          - generic "2026-05-01 · no trades" [ref=e392]
          - generic "2026-05-02 · no trades" [ref=e393]
          - generic "2026-05-03 · no trades" [ref=e394]
          - generic "2026-05-04 · no trades" [ref=e395]
          - generic "2026-05-05 · no trades" [ref=e396]
          - generic "2026-05-06 · no trades" [ref=e397]
          - generic "2026-05-07 · no trades" [ref=e398]
          - generic "2026-05-08 · no trades" [ref=e399]
          - generic "2026-05-09 · no trades" [ref=e400]
          - generic "2026-05-10 · no trades" [ref=e401]
          - generic "2026-05-11 · no trades" [ref=e402]
          - generic "2026-05-12 · no trades" [ref=e403]
          - generic "2026-05-13 · no trades" [ref=e404]
          - generic "2026-05-14 · no trades" [ref=e405]
          - generic "2026-05-15 · no trades" [ref=e406]
          - generic "2026-05-16 · no trades" [ref=e407]
          - generic "2026-05-17 · no trades" [ref=e408]
          - generic "2026-05-18 · no trades" [ref=e409]
          - generic "2026-05-19 · no trades" [ref=e410]
          - generic "2026-05-20 · no trades" [ref=e411]
          - generic "2026-05-21 · no trades" [ref=e412]
          - generic "2026-05-22 · no trades" [ref=e413]
          - generic "2026-05-23 · no trades" [ref=e414]
          - generic "2026-05-24 · no trades" [ref=e415]
          - generic "2026-05-25 · no trades" [ref=e416]
          - generic "2026-05-26 · no trades" [ref=e417]
          - generic "2026-05-27 · no trades" [ref=e418]
          - generic "2026-05-28 · no trades" [ref=e419]
          - generic "2026-05-29 · no trades" [ref=e420]
          - generic "2026-05-30 · no trades" [ref=e421]
          - generic "2026-05-31 · no trades" [ref=e422]
          - generic "2026-06-01 · no trades" [ref=e423]
          - generic "2026-06-02 · no trades" [ref=e424]
          - generic "2026-06-03 · no trades" [ref=e425]
          - generic "2026-06-04 · no trades" [ref=e426]
          - generic "2026-06-05 · no trades" [ref=e427]
          - generic "2026-06-06 · no trades" [ref=e428]
          - generic "2026-06-07 · no trades" [ref=e429]
          - generic "2026-06-08 · no trades" [ref=e430]
          - generic "2026-06-09 · no trades" [ref=e431]
          - generic "2026-06-10 · no trades" [ref=e432]
          - generic "2026-06-11 · no trades" [ref=e433]
          - generic "2026-06-12 · no trades" [ref=e434]
          - generic "2026-06-13 · no trades" [ref=e435]
          - generic "2026-06-14 · no trades" [ref=e436]
          - generic "2026-06-15 · no trades" [ref=e437]
          - generic "2026-06-16 · no trades" [ref=e438]
          - generic "2026-06-17 · −₹494" [ref=e439]
          - generic "2026-06-18 · ₹1,687" [ref=e440]
          - generic "2026-06-19 · ₹3,721" [ref=e441]
          - generic "2026-06-20 · no trades" [ref=e442]
          - generic "2026-06-21 · no trades" [ref=e443]
          - generic "2026-06-22 · −₹9,119" [ref=e444]
          - generic "2026-06-23 · ₹12,633" [ref=e445]
          - generic "2026-06-24 · −₹572" [ref=e446]
          - generic "2026-06-25 · ₹9,159" [ref=e447]
          - generic "2026-06-26 · no trades" [ref=e448]
          - generic "2026-06-27 · no trades" [ref=e449]
          - generic "2026-06-28 · no trades" [ref=e450]
          - generic "2026-06-29 · −₹5,846" [ref=e451]
          - generic "2026-06-30 · ₹14,381" [ref=e452]
          - generic "2026-07-01 · ₹3" [ref=e453]
          - generic "2026-07-02 · ₹5,905" [ref=e454]
          - generic "2026-07-03 · ₹8,528" [ref=e455]
          - generic "2026-07-04 · no trades" [ref=e456]
          - generic "2026-07-05 · no trades" [ref=e457]
          - generic "2026-07-06 · −₹3,832" [ref=e458]
          - generic "2026-07-07 · −₹10,432" [ref=e459]
          - generic "2026-07-08 · −₹1,975" [ref=e460]
          - generic "2026-07-09 · ₹9,133" [ref=e461]
          - generic "2026-07-10 · ₹1,138" [ref=e462]
        - paragraph [ref=e464]: Fig. 2 — daily P&L calendar · green profit / red loss · trailing 52 weeks
      - figure "Tab. 2 — risk-adjusted ratios · aggregate, per-active-day" [ref=e465]:
        - generic [ref=e467]: ratios unlock at 30 active days · 17/30
        - paragraph [ref=e469]: Tab. 2 — risk-adjusted ratios · aggregate, per-active-day
      - generic [ref=e472]:
        - generic [ref=e473]:
          - paragraph [ref=e474]: § follow
          - paragraph [ref=e475]: mirror
        - generic [ref=e476]:
          - heading "Want to follow these trades?" [level=2] [ref=e477]
          - paragraph [ref=e478]: I share how I run this book and how you can mirror it on your own account. Book a call and I'll walk you through the setup.
          - link "Book a call on Topmate ↗" [ref=e479] [cursor=pointer]:
            - /url: https://topmate.io/charandeep_kapoor
      - generic [ref=e480]:
        - paragraph [ref=e481]:
          - strong [ref=e482]: Disclaimer.
          - text: An illustrative record of my own personal trading account, shown for transparency and educational purposes only.
          - emphasis [ref=e483]: Not
          - text: investment advice, a research recommendation, or a solicitation to buy, sell or copy any trade. Past performance is not indicative of future results; derivatives carry substantial risk of loss. I am not a SEBI-registered investment adviser.
        - paragraph [ref=e484]: Method — history is FIFO-realized daily P&L reconstructed from the broker trade export (gross of brokerage/STT); the current day is mark-to-market. Stats use settled days only; open-day figures are excluded. Sharpe is per-active-day, annualized ×√252 (no-position days excluded, so not calendar-annualized), risk-free = 0. Drawdown-% is on a declared capital base. Stats display only after ≥30 active days. Single account, single regime, no benchmark.
      - generic [ref=e486]:
        - generic [ref=e487]: Charandeep Kapoor
        - button "Copy @yourasianquant to clipboard" [ref=e488] [cursor=pointer]:
          - generic [ref=e489]: "@yourasianquant"
        - link "LinkedIn" [ref=e491] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/charandeep-kapoor/
        - link "Twitter" [ref=e492] [cursor=pointer]:
          - /url: https://x.com/yourasianquant
        - link "Telegram" [ref=e493] [cursor=pointer]:
          - /url: https://t.me/charandeep_kapoor
        - link "GitHub" [ref=e494] [cursor=pointer]:
          - /url: https://github.com/SirCharan
        - link "Book a call" [ref=e495] [cursor=pointer]:
          - /url: https://calendly.com/charan-kapoor/30min
        - link "RSS" [ref=e496] [cursor=pointer]:
          - /url: /blog/feed.xml
        - generic [ref=e497]: © 2026
  - alert [ref=e498]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | /**
  4  |  * Smoke + console-error regression guard.
  5  |  *
  6  |  * Every core route must respond 2xx/3xx and produce ZERO console errors and
  7  |  * ZERO uncaught page errors. This is the guard against the R3F hero crash
  8  |  * (React 19 + fiber@9 / drei@10) silently regressing.
  9  |  */
  10 | const ROUTES = ["/", "/work", "/work/drishti", "/resume", "/track-record", "/blog"];
  11 | 
  12 | for (const route of ROUTES) {
  13 |   test(`${route} loads with no console errors`, async ({ page }) => {
  14 |     const errors: string[] = [];
  15 |     page.on("console", (msg) => {
  16 |       if (msg.type() !== "error") return;
  17 |       const text = msg.text();
  18 |       // Ignore benign resource 404s: @vercel/analytics + speed-insights scripts
  19 |       // (and any /_vercel/* beacon) only exist on Vercel and 404 in local dev.
  20 |       // The real regression guard is `pageerror` (uncaught JS — the R3F-crash
  21 |       // class) plus any NON-resource app console.error, both kept strict below.
  22 |       if (/Failed to load resource.*status of 404/i.test(text)) return;
  23 |       errors.push(`console.error: ${text}`);
  24 |     });
  25 |     page.on("pageerror", (err) => {
  26 |       errors.push(`pageerror: ${err.message}`);
  27 |     });
  28 | 
  29 |     const res = await page.goto(route, { waitUntil: "networkidle" });
  30 |     expect(res, `no response for ${route}`).not.toBeNull();
  31 |     expect(res!.status(), `status for ${route}`).toBeLessThan(400);
  32 | 
  33 |     // Give async chunks (dynamic R3F import via requestIdleCallback) a beat.
  34 |     await page.waitForTimeout(1500);
  35 | 
> 36 |     expect(errors, `console errors on ${route}:\n${errors.join("\n")}`).toEqual([]);
     |                                                                         ^ Error: console errors on /track-record:
  37 |   });
  38 | }
  39 | 
```