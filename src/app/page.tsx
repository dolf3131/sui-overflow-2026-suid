import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { SuIDCard } from "@/components/site/SuIDCard";
import { Parallax } from "@/components/motion/Parallax";
import { ProgressRail } from "@/components/motion/ProgressRail";
import { ProofRotator } from "@/components/motion/ProofRotator";

const heroStats = [
  { k: "Records", v: "15 verified" },
  { k: "Resume PDF", v: "10 USDT" },
  { k: "Evidence", v: "File + badge" },
  { k: "Issuer rail", v: "B2B ready" },
];

const heroProofStates = [
  {
    label: "COLLECTED",
    value: "events + certificates",
    meta: "files, badges, issuer records",
    badge: "01",
    badgeClass: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]",
  },
  {
    label: "REVIEWED",
    value: "SUID-7F3K-2A91",
    meta: "issuer: Sui Korea Community",
    badge: "02",
    badgeClass: "bg-[color:var(--accent)] text-[color:var(--foreground)]",
  },
  {
    label: "STORED",
    value: "walrus://career_7f3k",
    meta: "evidence: file trail ready",
    badge: "03",
    badgeClass: "bg-[color:var(--success)] text-[color:var(--foreground)]",
  },
  {
    label: "ISSUED",
    value: "resume PDF ready",
    meta: "fee: 10 USDT temporary",
    badge: "04",
    badgeClass: "bg-[color:var(--foreground)] text-white",
  },
];

const proofSteps = [
  {
    step: "01",
    title: "Collect career evidence",
    status: "User owned",
    copy: "Events, certificates, PDFs, images, and Open Badges become one organized SuID portfolio.",
    meta: "input: file, badge, issuer",
    color: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]",
  },
  {
    step: "02",
    title: "Review and verify",
    status: "Evidence checked",
    copy: "Uploaded files and imported assertions can be reviewed, signed, and connected to a public proof trail.",
    meta: "review: issuer or SuID",
    color: "bg-[color:var(--accent)] text-[color:var(--foreground)]",
  },
  {
    step: "03",
    title: "Issue institution credentials",
    status: "Partner rail",
    copy: "Organizations can later plug into SuID to issue certificates directly from their own systems.",
    meta: "issuer: portal + API",
    color: "bg-[color:var(--success)] text-[color:var(--foreground)]",
  },
  {
    step: "04",
    title: "Export verified resume PDF",
    status: "10 USDT issue",
    copy: "Users edit a resume view on the site, pay a temporary issue fee, and export a verification-ready PDF.",
    meta: "output: signed PDF",
    color: "bg-[color:var(--foreground)] text-white",
  },
];

const pillars = [
  {
    title: "Evidence-first portfolio",
    text: "SuID is a verified career record, not only an event stamp. The user can organize real participation, certificates, and file evidence in one place.",
    tag: "Career graph",
  },
  {
    title: "Resume PDF revenue path",
    text: "The temporary 10 USDT issue flow creates a clear paid action: edit the resume view, confirm records, and export a PDF for applications.",
    tag: "Paid issue",
  },
  {
    title: "Issuer network upside",
    text: "Schools, bootcamps, events, and certification providers can become issuer partners instead of forcing users to upload every proof manually.",
    tag: "B2B rail",
  },
];

const productPaths = [
  {
    title: "Verified portfolio",
    href: "/app",
    action: "View SuID",
    copy: "See verified events, certificates, file evidence, and resume-ready records.",
  },
  {
    title: "Resume PDF issue",
    href: "/app/resume",
    action: "Build PDF",
    copy: "Edit the resume surface, pay the temporary 10 USDT fee, and issue a PDF.",
  },
  {
    title: "Institution issuing",
    href: "/app/issuer",
    action: "Open issuer rail",
    copy: "Show how future organizations can review evidence and issue credentials directly.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-[color:var(--background)]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b-2 border-[color:var(--border)] bg-[color:var(--surface)]">
          <div className="absolute inset-0 nb-dot-grid opacity-60" aria-hidden />
          <Container className="relative py-12 sm:py-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="nb-fade-up flex flex-wrap items-center gap-2">
                  <Badge tone="primary">Sui Overflow MVP</Badge>
                  <Badge>Verified career passport</Badge>
                </div>
                <h1 className="nb-fade-up nb-delay-1 mt-6 max-w-3xl text-balance text-5xl font-black tracking-normal sm:text-7xl">
                  Verified history, resume-ready.
                </h1>
                <p className="nb-fade-up nb-delay-2 mt-6 max-w-2xl text-pretty text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
                  SuID helps users collect verified events, certificates, and
                  file evidence, then issue a resume-ready PDF backed by Sui and
                  Walrus.
                </p>
                <div className="nb-fade-up nb-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href="/app">Open portfolio</ButtonLink>
                  <ButtonLink href="/app/resume" variant="secondary">
                    Build resume PDF
                  </ButtonLink>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {heroStats.map((s) => (
                    <Card key={s.k} className="nb-snap-in">
                      <CardContent className="py-5 text-left">
                        <div className="text-xs font-semibold text-[color:var(--muted)]">
                          {s.k}
                        </div>
                        <div className="mt-1 text-base font-black tracking-normal">
                          {s.v}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Reveal className="h-full" delayMs={80}>
                <div className="relative mx-auto max-w-[620px] lg:mr-0">
                  <div
                    className="pointer-events-none absolute -left-3 top-6 h-14 w-14 rotate-6 border-2 border-[color:var(--border)] bg-[color:var(--accent)] [box-shadow:var(--shadow)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-2 bottom-28 h-16 w-16 -rotate-6 border-2 border-[color:var(--border)] bg-[color:var(--success)] [box-shadow:var(--shadow)]"
                    aria-hidden
                  />
                  <Parallax className="relative nb-float">
                    <SuIDCard className="w-full [box-shadow:var(--shadow-lg)]" />
                  </Parallax>
                  <div className="mt-5">
                    <ProofRotator states={heroProofStates} />
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Marquee
          text="SUID_RECORD resume-ready WALRUS_EVIDENCE career_7f3k VERIFY suid://verify/7f3k PDF_ISSUE 10_USDT ISSUER_PORTAL institution-api"
          items={[
            "SUID_RECORD resume-ready",
            "WALRUS_EVIDENCE career_7f3k",
            "VERIFY suid://verify/7f3k",
            "PDF_ISSUE 10_USDT",
            "ISSUER_PORTAL institution-api",
            "FILE_PROOF portfolio.pdf",
          ]}
        />

        <section
          id="journey"
          className="nb-section border-b-2 border-[color:var(--border)] bg-[color:var(--background)] py-20 nb-grid"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="lg:sticky lg:top-28 lg:h-fit">
                <Reveal>
                  <Badge tone="primary">Business flow</Badge>
                  <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
                    From evidence to paid resume issue.
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-[color:var(--muted)]">
                    The product should make the business model legible: collect
                    evidence, verify it, support issuers, then monetize resume
                    PDF issuance.
                  </p>
                  <div className="mt-7 border-2 border-[color:var(--border)] bg-[color:var(--surface)] p-5 [box-shadow:var(--shadow)]">
                    <div className="text-xs font-black text-[color:var(--muted)]">
                      ACTIVE CAREER TRAIL
                    </div>
                    <div className="mt-3 grid gap-2 font-mono text-xs font-bold">
                      <span>subject: 0x3f...c92a</span>
                      <span>records: events + credentials + files</span>
                      <span>storage: walrus-ready</span>
                      <span>output: resume-pdf</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="grid gap-5">
                {proofSteps.map((s, idx) => (
                  <Card key={s.step} className="nb-scroll-card">
                    <CardHeader className="grid gap-5 p-0 md:grid-cols-[120px_1fr]">
                      <div className={`${s.color} flex min-h-32 items-center justify-center border-b-2 border-[color:var(--border)] p-6 md:border-b-0 md:border-r-2`}>
                        <div className="text-5xl font-black">{s.step}</div>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-2xl font-black tracking-normal">
                              {s.title}
                            </div>
                            <p className="mt-3 max-w-xl text-base leading-7 text-[color:var(--muted)]">
                              {s.copy}
                            </p>
                          </div>
                          <Badge tone={idx === 3 ? "success" : "neutral"}>
                            {s.status}
                          </Badge>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t-2 border-[color:var(--border)] pt-4">
                          <span className="font-mono text-xs font-bold">
                            {s.meta}
                          </span>
                          <span className="h-3 w-3 bg-[color:var(--border)]" />
                          <span className="font-mono text-xs font-bold text-[color:var(--muted)]">
                            suid-ready
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          id="product"
          className="nb-section border-b-2 border-[color:var(--border)] bg-[color:var(--surface)] py-20"
        >
          <Container>
            <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge>Product surface</Badge>
                <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
                  Built for a real credential business.
                </h2>
                <p className="mt-4 text-lg leading-8 text-[color:var(--muted)]">
                  The product now centers on user-owned verified history,
                  resume PDF issuance, and future institution integrations.
                </p>
              </div>
              <ButtonLink href="/app" variant="secondary">
                Open portfolio
              </ButtonLink>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {productPaths.map((path, idx) => (
                <Reveal key={path.title} delayMs={80 + idx * 80} className="h-full">
                  <Card className="flex h-full flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xs font-black text-[color:var(--muted)]">
                          0{idx + 1}
                        </div>
                        <Badge tone={idx === 1 ? "success" : "primary"}>
                          Product
                        </Badge>
                      </div>
                      <div className="mt-5 text-2xl font-black tracking-normal">
                        {path.title}
                      </div>
                      <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                        {path.copy}
                      </p>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <ButtonLink href={path.href} variant={idx === 0 ? "primary" : "secondary"}>
                        {path.action}
                      </ButtonLink>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-2 border-[color:var(--border)] bg-[color:var(--background)] py-20">
          <Container>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <Badge tone="primary">Why it can scale</Badge>
                <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
                  Consumer resume utility, issuer-side distribution.
                </h2>
              </Reveal>
              <div className="grid gap-5">
                {pillars.map((p, idx) => (
                  <Reveal key={p.title} delayMs={idx * 70}>
                    <Card>
                      <CardHeader className="flex items-start justify-between gap-5">
                        <div>
                          <div className="text-2xl font-black tracking-normal">
                            {p.title}
                          </div>
                          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                            {p.text}
                          </p>
                        </div>
                        <Badge>{p.tag}</Badge>
                      </CardHeader>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="faq" className="nb-section bg-[color:var(--surface)] py-20">
          <Container>
            <div className="max-w-2xl">
              <Badge>FAQ</Badge>
              <h2 className="mt-5 text-4xl font-black tracking-normal sm:text-5xl">
                What should be clear?
              </h2>
            </div>
            <div className="mt-12">
              <ProgressRail />
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {[
                  {
                    q: "What is SuID now?",
                    a: "A verified career passport where users collect events, certificates, and file evidence in one portfolio.",
                  },
                  {
                    q: "Where is the revenue action?",
                    a: "Resume-ready PDF issuance is framed as a temporary 10 USDT paid action after the user edits and confirms their record.",
                  },
                  {
                    q: "How does file verification fit?",
                    a: "Users can submit PDFs, images, or JSON assertions for review, then link approved evidence to Sui and Walrus records.",
                  },
                  {
                    q: "Why would institutions use it?",
                    a: "Issuers can reduce manual verification by issuing credentials directly into SuID through a portal or future API.",
                  },
                ].map((f) => (
                  <Card key={f.q}>
                    <CardHeader>
                      <div className="text-lg font-black tracking-normal">
                        {f.q}
                      </div>
                      <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                        {f.a}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
