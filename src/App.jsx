import React, { useMemo, useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, X } from "lucide-react";

/* =============================
   STAR MICRONICS CAREER TREE – 完成版
   Stack: React + Tailwind v4 + Framer Motion + Lucide
   ============================= */

// --- i18n dictionary ---
const dict = {
  ja: {
    site: {
      title: "STAR MICRONICS CAREER TREE",
      subtitle: "精密を支える人へ。",
      entry: "入社",
      entryBrief: "ここがあなたのキャリアの出発点。入社後は共通研修を通じて基礎を固め、各職種への道が開かれます。",
      tech: "技術系総合職",
      biz: "事務系総合職",
      core: "共通研修・教育制度",
      details: "詳細",
      close: "閉じる",
      footer: "© Star MICRONICS – Careers",
      coreDetailTitle: "社員一人ひとりの強みを伸ばし、成長し続けられる環境を。",
      coreDetailText: `
役割や等級、適性に応じて必要な知識・スキルを得られるよう、
充実した研修制度を整え、個人のありたい姿の実現に向けた学びを積極的に支援しています。

◇ 階層別研修
新入社員から各階層、役職ごとに応じた集合研修を実施。
ロジカルシンキング、ファシリテーションなど実践的なスキルを習得。

◇ 目的別研修
グロービス・スクラ・Udemyなどを通じた専門・グローバルスキル研修、
越境学習、女性のキャリア形成支援。

◇ 自己啓発支援
通信教育・資格取得支援・技能士資格奨励制度・TOEIC補助など、
自律的な学びを後押しする仕組みを用意。

◇ ４つの行動指針
みずから行動する／学び続ける／技術にこだわる／集団としての価値を重視する。
`,

    },
    roles: {
      tech: {
        mechanicalDesign: "機械設計",
        softwareDev: "ソフトウェア開発",
        eval: "評価開発",
        appEng: "営業技術",
        mfgEng: "生産技術",
        ip: "知的財産",
      },
      biz: {
        procurement: "調達（購買）",
        intlSales: "海外営業（小型プリンター等）",
        finance: "経理・財務",
        it: "情報システム（社内SE）",
        hr: "人事",
      },
    },
    brief: {
      mech: "NC自動旋盤の機構設計・図面化・精度検討",
      sw: "制御・UI・IoT連携の実装と検証",
      eval: "試作評価・信頼性試験・品質改善",
      app: "加工課題の条件提案・立上げ支援",
      mfg: "工程設計・段取り改善・治具/ライン最適化",
      ip: "特許出願・他社調査・権利化支援",
      proc: "部品発注・コスト/納期・サプライヤ交渉",
      sales: "代理店連携・市場開拓・受注管理",
      fin: "決算・原価・予算管理",
      it: "社内システム運用・改善・DX",
      hr: "採用・教育・制度運用・労務",
    },
    details: {
      duty_mech_1: "工作機械の構造設計/解析/図面化",
      duty_mech_2: "高剛性・高精度設計の最適化",
      location_mech: "拠点：本社・菊川",
      career_mech: "例：設計→主任→開発リーダー",

      duty_sw_1: "制御ソフト/操作UI/IoT連携の開発",
      duty_sw_2: "実機検証・品質向上の継続",
      location_sw: "拠点：本社",
      career_sw: "例：実装→設計→アーキテクト",

      duty_eval_1: "性能評価・信頼性試験・不具合解析",
      duty_eval_2: "品質改善と標準化",
      location_eval: "拠点：菊川",
      career_eval: "例：評価→試験主担当→品質企画",

      duty_app_1: "顧客現場の課題把握と条件提案",
      duty_app_2: "据付/立上げ/デモ・展示会対応",
      location_app: "拠点：菊川・海外",
      career_app: "例：技術支援→展示会→教育担当",

      duty_mfg_1: "工程設計・段取り/治具設計",
      duty_mfg_2: "ライン最適化・CT短縮",
      location_mfg: "拠点：菊川",
      career_mfg: "例：工程設計→ライン主担当",

      duty_ip_1: "特許出願・権利化戦略・先行調査",
      duty_ip_2: "研究開発支援・侵害予防",
      location_ip: "拠点：本社",
      career_ip: "例：出願→ポートフォリオ管理",

      duty_proc_1: "購買計画・見積・交渉・ベンダ管理",
      duty_proc_2: "コスト/納期/品質のバランス管理",
      location_proc: "拠点：菊川・本社",
      career_proc: "例：担当→バイヤーリード",

      duty_sales_1: "海外代理店連携・市場開拓・受注",
      duty_sales_2: "展示会/プロモーション",
      location_sales: "拠点：本社・海外",
      career_sales: "例：担当→駐在→営業企画",

      duty_fin_1: "月次/四半期/年次決算・原価計算",
      duty_fin_2: "予算策定・財務分析",
      location_fin: "拠点：本社",
      career_fin: "例：担当→係長→財務企画",

      duty_it_1: "基幹/業務システム運用・改善",
      duty_it_2: "DX推進・セキュリティ維持",
      location_it: "拠点：本社",
      career_it: "例：運用→設計→PM",

      duty_hr_1: "採用・育成・評価制度の運用",
      duty_hr_2: "労務/福利厚生・組織文化づくり",
      location_hr: "拠点：本社",
      career_hr: "例：採用→育成企画→人事企画",
    },
  },
  en: {
    site: {
      title: "STAR MICRONICS CAREER TREE",
      subtitle: "For those who support precision.",
      entry: "Entry",
      entryBrief: "Your career journey begins here. After joining the company, you will strengthen your foundation through shared training before branching into your specialized path.",
      tech: "Technical Track",
      biz: "Business Track",
      core: "Shared Training & Education",
      details: "Details",
      close: "Close",
      footer: "© Star MICRONICS – Careers",
      coreDetailTitle: "An environment where every employee can grow and develop their strengths.",
      coreDetailText: `
We provide extensive training programs to help each employee acquire the skills and knowledge 
needed for their role, rank, and aptitude, supporting self-driven learning and continuous growth.

◇ Hierarchical Training  
Group training programs tailored to each level and position—from new employees to managers—cover practical skills such as logical thinking and facilitation.

◇ Purpose-Based Training  
Specialized and global skill development through Globis, Schoo, and Udemy, including cross-boundary learning and career support for women.

◇ Self-Development Support  
Subsidies and systems for correspondence courses, certification exams, technical skill programs, and TOEIC test assistance.

◇ Four Behavioral Principles  
Take initiative / Keep learning / Pursue excellence in technology / Create collective value.
`,
    },
    roles: {
      tech: {
        mechanicalDesign: "Mechanical Design",
        softwareDev: "Software Development",
        eval: "Evaluation & Testing",
        appEng: "Application Engineering",
        mfgEng: "Manufacturing Engineering",
        ip: "Intellectual Property",
      },
      biz: {
        procurement: "Procurement",
        intlSales: "International Sales (Printers, etc.)",
        finance: "Finance & Accounting",
        it: "Information Systems (Internal SE)",
        hr: "Human Resources",
      },
    },
    brief: {
      mech: "Designing NC automatic lathes, creating drawings, and analyzing precision.",
      sw: "Developing control systems, UI, and IoT connectivity.",
      eval: "Prototype evaluation, reliability testing, and quality improvement.",
      app: "Proposing machining conditions and supporting installations.",
      mfg: "Process design, setup optimization, and jig/line improvement.",
      ip: "Patent filing, prior art search, and IP strategy support.",
      proc: "Parts procurement, cost/delivery management, and supplier negotiation.",
      sales: "Agency coordination, market expansion, and order management.",
      fin: "Accounting, cost management, and budget planning.",
      it: "System operation, internal DX promotion, and cybersecurity.",
      hr: "Recruitment, training, labor management, and HR system operations.",
    },
    details: {
      duty_mech_1: "Design, analysis, and drawing of machine tool structures.",
      duty_mech_2: "Optimization for high rigidity and precision design.",
      location_mech: "Location: HQ & Kikugawa Plant",
      career_mech: "Career path: Designer → Senior Engineer → Development Leader",

      duty_sw_1: "Development of control software, UI, and IoT integration.",
      duty_sw_2: "Ongoing validation and quality improvement.",
      location_sw: "Location: HQ",
      career_sw: "Career path: Implementation → Design → Architect",

      duty_eval_1: "Performance and reliability testing, failure analysis.",
      duty_eval_2: "Standardization and quality enhancement.",
      location_eval: "Location: Kikugawa",
      career_eval: "Career path: Evaluation → Lead Tester → Quality Planning",

      duty_app_1: "Identifying customer challenges and proposing machining conditions.",
      duty_app_2: "Installation, setup, and exhibition demonstrations.",
      location_app: "Location: Kikugawa / Overseas",
      career_app: "Career path: Technical Support → Exhibition → Training Instructor",

      duty_mfg_1: "Process and jig design, setup engineering.",
      duty_mfg_2: "Line optimization and cycle time reduction.",
      location_mfg: "Location: Kikugawa",
      career_mfg: "Career path: Process Design → Line Leader",

      duty_ip_1: "Patent application, IP strategy, prior art search.",
      duty_ip_2: "Supporting R&D and preventing infringement.",
      location_ip: "Location: HQ",
      career_ip: "Career path: Application → Portfolio Management",

      duty_proc_1: "Procurement planning, quotation, negotiation, and vendor control.",
      duty_proc_2: "Balancing cost, delivery, and quality.",
      location_proc: "Location: Kikugawa / HQ",
      career_proc: "Career path: Buyer → Senior Buyer",

      duty_sales_1: "Agency coordination, market development, and order handling.",
      duty_sales_2: "Exhibitions and promotional activities.",
      location_sales: "Location: HQ / Overseas",
      career_sales: "Career path: Staff → Expat → Sales Planner",

      duty_fin_1: "Monthly/annual closing, cost accounting, and analysis.",
      duty_fin_2: "Budgeting and financial planning.",
      location_fin: "Location: HQ",
      career_fin: "Career path: Accountant → Supervisor → Finance Planner",

      duty_it_1: "Core/business system operation and improvement.",
      duty_it_2: "DX promotion and information security.",
      location_it: "Location: HQ",
      career_it: "Career path: Operation → Design → Project Manager",

      duty_hr_1: "Recruitment, development, and HR system operations.",
      duty_hr_2: "Labor management, benefits, and culture building.",
      location_hr: "Location: HQ",
      career_hr: "Career path: Recruitment → Training Planner → HR Strategy",
    },
  },
};

// ---- language context ----
const LangCtx = createContext({ lang: "ja", setLang: () => {} });
const useT = () => {
  const { lang } = useContext(LangCtx);
  return useCallback(
    (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), dict[lang]),
    [lang]
  );
};

const TECH_COLOR = "#00B4FF";
const BIZ_COLOR = "#00D68F";
const CORE_COLOR = "#9CA3AF"; // 入社ノード用（グレー系）
// ---- nodes ----
const nodes = [
  {
    id: "entry",
    track: "core",
    labelKey: "site.entry",
    briefKey: "site.entryBrief",
    details: {
      duties: [],
      location: "",
      career: "",
    },
    x: 50,
    y: 10, // ← 画面の上中央
  },
  { id: "mech", track: "tech", labelKey: "roles.tech.mechanicalDesign", briefKey: "brief.mech", details: { duties: ["details.duty_mech_1", "details.duty_mech_2"], location: "details.location_mech", career: "details.career_mech" }, x: 27, y: 20 },
  { id: "sw", track: "tech", labelKey: "roles.tech.softwareDev", briefKey: "brief.sw", details: { duties: ["details.duty_sw_1", "details.duty_sw_2"], location: "details.location_sw", career: "details.career_sw" }, x: 23, y: 35 },
  { id: "eval", track: "tech", labelKey: "roles.tech.eval", briefKey: "brief.eval", details: { duties: ["details.duty_eval_1", "details.duty_eval_2"], location: "details.location_eval", career: "details.career_eval" }, x: 30, y: 50 },
  { id: "app", track: "tech", labelKey: "roles.tech.appEng", briefKey: "brief.app", details: { duties: ["details.duty_app_1", "details.duty_app_2"], location: "details.location_app", career: "details.career_app" }, x: 18, y: 65 },
  { id: "mfg", track: "tech", labelKey: "roles.tech.mfgEng", briefKey: "brief.mfg", details: { duties: ["details.duty_mfg_1", "details.duty_mfg_2"], location: "details.location_mfg", career: "details.career_mfg" }, x: 27, y: 80 },
  { id: "ip", track: "tech", labelKey: "roles.tech.ip", briefKey: "brief.ip", details: { duties: ["details.duty_ip_1", "details.duty_ip_2"], location: "details.location_ip", career: "details.career_ip" }, x: 22, y: 92 },
  { id: "proc", track: "biz", labelKey: "roles.biz.procurement", briefKey: "brief.proc", details: { duties: ["details.duty_proc_1", "details.duty_proc_2"], location: "details.location_proc", career: "details.career_proc" }, x: 73, y: 25 },
  { id: "sales", track: "biz", labelKey: "roles.biz.intlSales", briefKey: "brief.sales", details: { duties: ["details.duty_sales_1", "details.duty_sales_2"], location: "details.location_sales", career: "details.career_sales" }, x: 82, y: 40 },
  { id: "fin", track: "biz", labelKey: "roles.biz.finance", briefKey: "brief.fin", details: { duties: ["details.duty_fin_1", "details.duty_fin_2"], location: "details.location_fin", career: "details.career_fin" }, x: 70, y: 55 },
  { id: "it", track: "biz", labelKey: "roles.biz.it", briefKey: "brief.it", details: { duties: ["details.duty_it_1", "details.duty_it_2"], location: "details.location_it", career: "details.career_it" }, x: 78, y: 70 },
  { id: "hr", track: "biz", labelKey: "roles.biz.hr", briefKey: "brief.hr", details: { duties: ["details.duty_hr_1", "details.duty_hr_2"], location: "details.location_hr", career: "details.career_hr" }, x: 68, y: 85 },
];

// === helper ===
function makeBranchPath(width, height, node) {
  const trunkX = width / 2;
  const trunkY = height * 0.18;
  const endX = (node.x / 100) * width;
  const endY = (node.y / 100) * height;
  const midX = node.track === "tech" ? trunkX - width * 0.18 : trunkX + width * 0.18;
  const control1X = trunkX + (node.track === "tech" ? -width * 0.08 : width * 0.08);
  const control1Y = trunkY + height * 0.12;
  const control2X = midX + (node.track === "tech" ? -width * 0.06 : width * 0.06);
  const control2Y = (trunkY + endY) / 2;
  return `M ${trunkX},${trunkY} C ${control1X},${control1Y} ${control2X},${control2Y} ${endX},${endY}`;
}

function useSize(ref) {
  const [size, set] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const ent of entries) {
        const cr = ent.contentRect;
        set({ w: cr.width, h: cr.height });
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function usePanel() {
  const [openId, setOpenId] = useState(null);
  const open = (id) => setOpenId(id);
  const close = () => setOpenId(null);
  const getNode = (id) => nodes.find((n) => n.id === id) || null;
  return { openId, open, close, getNode };
}

// =============================
// COMPONENT
// =============================
export default function StarMICRONICSCareerTree() {
  // --- 言語状態管理 ---
  const [lang, setLang] = useState("ja");

  // 🌐 ① ブラウザ言語を自動検出（初回のみ）
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) setLang("en");
    else if (browserLang.startsWith("ja")) setLang("ja");
  }, []);

  const tProvider = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LangCtx.Provider value={tProvider}>
      {/* 💫 ② 言語切替時にフェードアニメーション */}
      <AnimatePresence mode="wait">
        <motion.div
          key={lang} // ← 言語が変わるたび再描画
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-screen w-full bg-cover bg-center text-[#E6EDF3] selection:bg-cyan-500/30 relative overflow-hidden"
          style={{ backgroundImage: "url('/background.png')" }}
        >
          {/* floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] bg-white/10 rounded-full"
                initial={{ opacity: 0, y: Math.random() * 600 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [Math.random() * 600, -100],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
                style={{ left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>

          <Header />
          <MainArea />
          <CareerStories />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </LangCtx.Provider>
  );
}

function Header() {
  const { lang, setLang } = useContext(LangCtx);
  const t = useT();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F14]/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-cyan-400 rounded-sm" />
          <div className="text-sm tracking-wide text-[#9FB2C8]">{t("site.title")}</div>
        </div>
        <button
          onClick={() => setLang(lang === "ja" ? "en" : "ja")}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 text-sm"
          aria-label="Toggle language"
        >
          <Languages className="w-4 h-4" />
          <span>{lang === "ja" ? "EN" : "日本語"}</span>
        </button>
      </div>
    </header>
  );
}

function MainArea() {
  const t = useT();
  const wrapRef = useRef(null);
  const { w, h } = useSize(wrapRef);
  const panel = usePanel();
  const [showCore, setShowCore] = useState(false);


  const drawPaths = useMemo(() => {
    if (!w || !h) return [];
    return nodes.map((n) => ({
      id: n.id,
      d: makeBranchPath(w, h, n),
      color: n.track === "tech" ? TECH_COLOR : BIZ_COLOR,
    }));
  }, [w, h]);

  return (
    <main className="relative max-w-7xl mx-auto px-4">
      {/* Hero */}
      <motion.section
        className="pt-12 pb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h1 className="text-2xl md:text-4xl font-semibold">{t("site.subtitle")}</motion.h1>
        <div className="mt-3 text-[#9FB2C8] text-sm">{t("site.title")}</div>
      </motion.section>

      {/* Tree canvas */}
      <section className="relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01] overflow-hidden">
        <div className="absolute top-4 left-6 text-xs md:text-sm font-medium text-cyan-300/90 select-none">
          {t("site.tech")}
        </div>
        <div className="absolute top-4 right-6 text-xs md:text-sm font-medium text-emerald-300/90 select-none">
          {t("site.biz")}
        </div>

        <div className="relative h-[640px] md:h-[720px]" ref={wrapRef}>
          {/* vertical trunk */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            transition={{ duration: 0.7 }}
            className="absolute left-1/2 -translate-x-1/2 w-px bg-white/10"
            aria-hidden
          />

<CorePill openCore={() => setShowCore(true)} />


          {/* SVG paths */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7DF9FF" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad-biz" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D68F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#9AFFD3" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow-tech" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00B4FF" floodOpacity="0.25" />
              </filter>
              <filter id="glow-biz" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00D68F" floodOpacity="0.25" />
              </filter>
            </defs>

            {drawPaths.map(({ id, d, color }, i) => (
              <motion.path
                key={id}
                d={d}
                fill="none"
                stroke={`url(#${color === TECH_COLOR ? "grad-tech" : "grad-biz"})`}
                strokeWidth={1.8}
                style={{ filter: `url(#${color === TECH_COLOR ? "glow-tech" : "glow-biz"})` }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((n, i) => (
            <TreeNode key={n.id} n={n} open={() => panel.open(n.id)} delay={i * 0.15} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {panel.openId && <SidePanel openId={panel.openId} close={panel.close} />}
        {showCore && <CorePanel close={() => setShowCore(false)} />}
      </AnimatePresence>
      <div className="h-10" />
    </main>
  );
}

function CorePill({ openCore }) {
  const t = useT();
  return (
    <motion.div
      onClick={openCore}
      whileHover={{ scale: 1.05 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50"
    >
      <motion.div
        className="px-3 py-1.5 max-w-[160px] text-center whitespace-normal break-words rounded-full border border-white/10 bg-gradient-to-b from-[#0f172a]/70 to-[#1e293b]/70 backdrop-blur-md text-[10px] sm:text-xs md:text-sm text-[#E0F2FE] font-medium relative overflow-hidden shadow-[0_0_24px_rgba(0,255,255,0.15)] ring-1 ring-cyan-400/20"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 12px rgba(0,255,255,0.15)",
            "0 0 36px rgba(0,255,255,0.3)",
            "0 0 12px rgba(0,255,255,0.15)",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
      >
        {/* グラデーションの光が横に流れる演出 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        />
        {/* テキスト */}
        <span className="relative z-10 drop-shadow-[0_0_4px_rgba(0,255,255,0.4)]">
          {t("site.core")}
        </span>
      </motion.div>
    </motion.div>
  );
}



function TreeNode({ n, open, delay = 0 }) {
  const t = useT();
  const label = t(n.labelKey);

  // --- 色設定（tech / biz / core） ---
  let color, ring, glow;
  if (n.track === "tech") {
    color = TECH_COLOR;
    ring = "ring-cyan-400/40";
    glow = "shadow-[0_0_24px_rgba(0,180,255,.35)]";
  } else if (n.track === "biz") {
    color = BIZ_COLOR;
    ring = "ring-emerald-400/40";
    glow = "shadow-[0_0_24px_rgba(0,214,143,.35)]";
  } else if (n.track === "core") {
    color = CORE_COLOR;
    ring = "ring-white/20";
    glow = "shadow-[0_0_24px_rgba(255,255,255,.25)]";
  }

  return (
    <motion.button
      onClick={open}
      aria-label={label}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full ring-1 ${ring} 
      bg-[radial-gradient(circle_at_30%_30%,_#ffffff0a,_#00000040)] 
      hover:scale-110 transition-all duration-300 ${glow} backdrop-blur-[1px]`}
      style={{ left: `${n.x}%`, top: `${n.y}%` }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      {/* ノードラベル */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[72px] whitespace-nowrap text-[10px] md:text-xs text-[#9FB2C8]">
        {label}
      </div>

      {/* 外枠 */}
      <span
        aria-hidden
        className="absolute inset-[6px] rounded-full"
        style={{ boxShadow: `inset 0 0 0 1px ${color}40` }}
      />

      {/* タップ時の波紋エフェクト */}
      <motion.span
        className="absolute inset-0 rounded-full border border-current opacity-0"
        style={{ color }}
        whileTap={{ scale: [1, 2], opacity: [0.4, 0] }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
}

function SidePanel({ openId, close }) {
  const t = useT();
  const node = nodes.find((n) => n.id === openId);
  if (!node) return null;
  const side = node.track === "tech" ? "left" : "right";
  const color = node.track === "tech" ? "#00B4FF" : "#00D68F";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <motion.aside
      role="dialog"
      aria-modal="true"
      aria-label="Role details"
      initial={{ x: side === "right" ? 420 : -420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: side === "right" ? 420 : -420, opacity: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
      className={`fixed top-0 ${
        side === "right" ? "right-0 border-l border-white/10" : "left-0 border-r border-white/10"
      } h-full w-[90vw] max-w-[420px] bg-gradient-to-b from-[#0D131C]/95 to-[#090C11]/95 backdrop-blur-md text-sm z-50 shadow-[0_0_24px_rgba(0,255,255,0.08)]`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div className="font-semibold text-base" style={{ color }}>
            {t(node.labelKey)}
          </div>
          <button
            onClick={close}
            aria-label={t("site.close")}
            className="p-2 rounded-full hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <motion.div
          className="flex-1 px-5 py-6 space-y-5 overflow-y-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-[#9FB2C8] leading-relaxed">{t(node.briefKey)}</p>
          </div>

          {/* Duties */}
          <motion.div
            className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl border border-white/5 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div
              className="text-xs uppercase tracking-wide mb-2"
              style={{ color }}
            >
              {t("site.details")}
            </div>
            <ul className="space-y-2 text-[#C8D2E0] text-sm list-disc list-inside">
              {node.details.duties.map((k) => (
                <li key={k}>{t(k)}</li>
              ))}
            </ul>
          </motion.div>

          {/* Location & Career */}
          <motion.div
            className="grid grid-cols-1 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-xs text-[#9FB2C8]">拠点 / Location</div>
              <div className="text-white mt-1">{t(node.details.location)}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-xs text-[#9FB2C8]">キャリア例 / Example Path</div>
              <div className="text-white mt-1">{t(node.details.career)}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.aside>
  );
}

function CorePanel({ close }) {
  const t = useT();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <motion.aside
      initial={{ x: -420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -420, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="fixed top-0 left-0 border-r border-white/10 h-full w-[90vw] max-w-[440px] bg-gradient-to-b from-[#0C121A]/95 to-[#080A0E]/95 text-sm z-[999] shadow-[0_0_32px_rgba(0,255,255,0.08)] backdrop-blur-md"
    >
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="font-semibold text-cyan-400 text-base">
          {t("site.core")}
        </div>
        <button
          onClick={close}
          aria-label={t("site.close")}
          className="p-2 rounded-full hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        className="px-6 py-5 space-y-6 text-[#C8D2E0] leading-relaxed overflow-y-auto h-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-white">
          {t("site.coreDetailTitle")}
        </h2>
        <div className="border-l-2 border-cyan-400/60 pl-4 text-sm whitespace-pre-line">
          {t("site.coreDetailText")}
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-[#9FB2C8]">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-semibold text-white text-sm mb-1">階層別研修</div>
            新入社員〜管理職まで段階的な集合研修
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-semibold text-white text-sm mb-1">目的別研修</div>
            グローバル・専門スキル・女性キャリア支援など
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-semibold text-white text-sm mb-1">自己啓発支援</div>
            通信教育・資格取得・TOEIC補助 など
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="font-semibold text-white text-sm mb-1">行動指針</div>
            自主性／継続学習／技術探究／集団価値の創造
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}


function CareerStories() {
  const t = useT(); // ← 言語切り替え用
  const { lang } = useContext(LangCtx);

  const stories = [
    {
      id: 1,
      title_ja: "機械設計 → 営業技術へ",
      title_en: "From Mechanical Design → Application Engineering",
      desc_ja:
        "精密構造の設計からキャリアをスタートし、製品知識を活かして顧客対応の技術営業へ。現在はグローバルで据付プロジェクトをリードしています。",
      desc_en:
        "Started in mechanical design, mastering precision structures, then moved to customer-facing technical support. Now leads global installation projects.",
      color: "#00B4FF",
    },
    {
      id: 2,
      title_ja: "評価開発 → 品質企画へ",
      title_en: "From Evaluation → Quality Planning",
      desc_ja:
        "信頼性試験からキャリアを始め、他部署との連携を学び、現在は全社的な品質基準を策定する品質企画担当として活躍しています。",
      desc_en:
        "Began with reliability testing, learned cross-departmental collaboration, and now defines company-wide quality standards as a quality planner.",
      color: "#00D68F",
    },
    {
      id: 3,
      title_ja: "ソフトウェア開発 → 商品企画へ",
      title_en: "From Software Development → Product Planning",
      desc_ja:
        "組込みソフトの開発経験を経て、ユーザーの声を直接製品仕様に反映する企画職へ転身。製品開発の橋渡し役として活躍しています。",
      desc_en:
        "After years in embedded software, transitioned into planning to connect user feedback directly with new product specifications.",
      color: "#7DF9FF",
    },
  ];

  return (
    <section
      id="career-stories"
      className="relative py-24 text-center bg-[radial-gradient(ellipse_at_center,_#0b0f14_0%,_#06080c_100%)] overflow-hidden"
    >
      {/* 背景粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/10 rounded-full"
            initial={{ opacity: 0, y: Math.random() * 800 }}
            animate={{ opacity: [0, 1, 0], y: [Math.random() * 800, -100] }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* 見出し */}
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {lang === "ja" ? "キャリアストーリー" : "Career Stories"}
      </motion.h2>

      <p className="text-[#9FB2C8] text-sm mb-12">
        {lang === "ja"
          ? "社員たちがどのように成長してきたか、その道のりを紹介します。"
          : "Real growth paths of engineers and professionals at Star MICRONICS."}
      </p>

      {/* ストーリーカード */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 relative z-10">
        {stories.map((s) => (
          <StoryCard
            key={s.id}
            title={lang === "ja" ? s.title_ja : s.title_en}
            desc={lang === "ja" ? s.desc_ja : s.desc_en}
            color={s.color}
          />
        ))}
      </div>
    </section>
  );
}

function StoryCard({ title, desc, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-left backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
    >
      <h3 className="text-lg font-semibold mb-3" style={{ color }}>
        {title}
      </h3>
      <p className="text-[#9FB2C8] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="py-10 text-center text-xs text-[#9FB2C8]">
      <div>{t("site.footer")}</div>
    </footer>
  );
}