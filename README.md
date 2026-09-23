# AI 八荣八耻 · DSH Skill

面向 AI 编码代理的八条工作准则，打包成一个可直接安装的 **Agent Skill**（SKILL.md 格式）。

它不做别的事：在代理动手写代码、调用不熟悉的接口、判断业务规则、重构既有实现、以及准备说"已完成"之前，提供一组**可核对**的判据，用来挡住瞎猜、臆想、越权重构、跳过验证和假装理解；并要求**每次用户提出需求或问题**都在项目根留下简要记录（第 9 条：`执行报告-首次运行.md` 与 `执行报告-变更记录.md`；有改动就记改动，没改任何文件就写明）。

> 八条原文
>
> 以瞎猜接口为耻，以认真查询为荣。以模糊执行为耻，以寻求确认为荣。
> 以臆想业务为耻，以人类确认为荣。以创造接口为耻，以复用现有为荣。
> 以跳过验证为耻，以主动测试为荣。以破坏架构为耻，以遵循规范为荣。
> 以假装理解为耻，以诚实无知为荣。以盲目修改为耻，以备份重构为荣。
>
> 第 9 条（本仓库追加的交付纪律）
>
> 以交付无踪为耻，以留痕成报为荣 —— 报告**固定两个文件**、放在**工作区根**。**工作区根怎么定（优先级从高到低，不可颠倒）**：① 该目录有 `.git`/`package.json` 等项目标记、或已有报告 → 就用它；② 它只是容器而任务明确指向某子目录 → 用那个子目录；③ 判不出来才列**一次**一级目录兜底（不递归）。文件内容：`执行报告-首次运行.md`（**先查找、没有才创建**。**读取优先级：首次运行.md ＞ 变更记录.md ＞ 实际目录结构**。文件在 → 读它当唯一基线、**严禁不必要地全量扫描**；文件不在 → **受限扫描**（跳过 `node_modules`/`.git`/`dist`/`build`/`.vscode` 等）后才建立。顶部必须记 **最后一次核对时间 / 核对文件数量 / 一级目录**；一级目录不符、或核心依赖文件比报告新 → **强制局部刷新并更新报告**）与 `执行报告-变更记录.md`（**用户每次提出需求或问题**都追加一条，把「用户输入」与「做出的更改」成对精简记录；没改动业务文件就写明「除本报告外，本次对话未对任何文件进行修改」——两份报告是**元机制**，不计入业务文件修改）。不刷时间戳文件；**只存本地、不入库**（把 `执行报告-*.md` 加进 `.gitignore`，提交代码时排除这两个文件）。

---

## 1. 安装

五种方式任选其一，**只装其一即可**。**推荐方式 1**：装一次，所有项目都生效；方式 4 供没有 git、或需要 zip 上传的入口使用；方式 5 给「用插件管理器安装/升级」的 DSH 用户。**想让它在每次开工前强制生效**，见本节末尾的「附加」。

### 方式 1 · 用户级（全局生效）

Windows PowerShell：

```powershell
git clone https://github.com/w2310670047-code/ai-eight-honors-eight-shames "$env:USERPROFILE\.dsh\skills\ai-eight-honors-eight-shames"
```

macOS / Linux：

```bash
git clone https://github.com/w2310670047-code/ai-eight-honors-eight-shames ~/.dsh/skills/ai-eight-honors-eight-shames
```

### 方式 2 · 项目级（只在该项目生效，优先级最高）

克隆到项目根目录下（**项目根 = 最近的、包含 `.git` 的祖先目录**；如果没有 `.git`，则取当前工作目录）：

```powershell
git clone https://github.com/w2310670047-code/ai-eight-honors-eight-shames "<项目根>\.dsh\skills\ai-eight-honors-eight-shames"
```

### 方式 3 · 手工复制（不想用 git）

把本仓库的 `SKILL.md` 放到：

```
<skills-root>/ai-eight-honors-eight-shames/SKILL.md
```

`<skills-root>` 见下表。

### 方式 4 · 下载 zip（没有 git，或要上传到要求 zip 的平台）

到 [Releases](https://github.com/w2310670047-code/ai-eight-honors-eight-shames/releases/latest) 下载，**两种结构都给了**，按你的入口要求挑一个：

| 资产（`<版本>` 即 Release 版本号，如 `v1.0.1`） | zip 内部结构 | 适用场景 |
|---|---|---|
| `ai-eight-honors-eight-shames-<版本>.zip` | `ai-eight-honors-eight-shames/SKILL.md` | 解压到 skills 根即可用；也是"上传一个技能文件夹"这类入口的常见约定 |
| `ai-eight-honors-eight-shames-<版本>-flat.zip` | `SKILL.md` 位于 zip 根目录 | 给要求 `SKILL.md` 直接落在 zip 根的入口 |

第一种直接解压到 skills 根；第二种先建目录再解压：

```
<skills-root>/ai-eight-honors-eight-shames/     <- 先建这个目录
  SKILL.md                                       <- 把 flat zip 解压进去
```

> **一层原则**：`SKILL.md` 与 skills 根之间只能隔一层目录。套成 `<root>/a/<name>/SKILL.md` 就不会被发现。
>
> **为什么给两种**：各平台对 zip 内部结构的要求并不统一，而我没能核到官方原文（`docs.claude.com` 已跳转迁移）。两种都给，避免你在某个上传入口前才卡住——如果你的平台只认其中一种，删掉另一个即可。

### 方式 5 · DSH 插件（`dsh plugin add`）

本仓库同时是一个**可安装的 DSH 插件**：`package.json` 声明 `dsh.bundle`，`cordis.patch.yml` 插入一行，由 `lib/index.js` 把本仓库的 `SKILL.md` 注册进 `ctx.skills`。装进某个 profile 后，**该 profile 的每个会话**都能看到它：

```bash
dsh plugin --profile <profile> add github:w2310670047-code/ai-eight-honors-eight-shames
```

- **正文只有一份**：插件直接读仓库根目录的 `SKILL.md`，不复制第二份内容，所以「改正文即时生效」在插件方式下同样成立。
- **与方式 1–4 的关系**：同名 skill 只显示一个，胜出顺序见第 2 节的 rank 表（插件注册为 250，高于用户级 400/500，低于项目根 100/200）；两处正文本来就相同，装重了不会出现两个条目。
- **什么时候值得用**：你希望用插件管理器统一安装、升级与卸载，或你的入口只接受插件包形态。

### 附加 · 让它「开工前必读」（AGENTS.md 路线）

**skill 是按需加载的**：模型在会话目录里看到摘要，自己决定要不要加载。也就是说，只装 skill，它仍然可能"没被想起来"。

如果你希望这些准则**每次开工前都必须已经在上下文里**，办法不是改 skill，而是把它写进 **DSH 的指令文件**——这类文件由 `@deepseek-ai/dsh-agent-instructions` 在**每个会话的第一个请求**注入为持久基线，早于任何工具调用、早于 skill 目录刷新，模型无从"忘记加载"。本部署里这个插件已随 `dsh-base` 与 `cordis` preset 挂载，`maxBytes: 65536`。

| 作用范围 | 文件 | 说明 |
|---|---|---|
| **全局（所有项目）** | `$DSH_HOME/AGENTS.md`（默认 `~/.dsh/AGENTS.md`） | 用户级基线 |
| 单个项目 | `<项目根>/AGENTS.md`（或 `CLAUDE.md`） | 项目根 = 最近的含 `.git` 的祖先；更具体者优先 |
| 本地覆盖 | `<项目根>/AGENTS.local.md`、`CLAUDE.local.md` | 通常不提交的本地补充 |

写法建议：**不要把 `SKILL.md` 全文复制进去**——两处内容会各自漂移，改一处忘了另一处。正确做法是写**九条的约束核心 + 一句强制加载指令**：

```markdown
## 开工前必读
在写或改任何文件、调用不熟悉的接口、重构、或声明「完成」之前，先用 `skill` 工具加载
`ai-eight-honors-eight-shames`，按其全文执行。核心底线：先查证再调用、有歧义先问、
业务只认事实、先复用再新造、结论必须带证据、按约定写、区分事实与推断、可回滚再改、
工作区根怎么定：① 有 `.git`/`package.json` 等标记或已有报告 → 用它；② 只是容器而任务指向某子目录 → 用子目录；③ 判不出来才列一次一级目录兜底。首次任务启动先查找 `执行报告-首次运行.md`：有就以它加变更记录为唯一基线、不再全量扫描；没有才受限扫描（跳过 node_modules/.git/dist/build/.vscode 等）后建立。每次有新需求或提问都留一条简要记录；有改动就记改动，没改动业务文件就写明「除本报告外，本次对话未对任何文件进行修改」（两份报告是元机制，不计入业务文件修改）。报告顶部记核对时间与文件数，过期就局部刷新。
```

两点成本说明：

- 基线**每个会话注入一次**并留在历史里直到压缩，不是每个请求都重发；
- 总量受 `maxBytes` 限制，超预算时**先丢更宽的整份文件**，最后才截断最具体的那份。

> 权威级别：AGENTS.md 属于**工作区指导**（guidance），不覆盖系统、开发者与用户的直接指令。它比"等模型自己想起某个 skill"强得多，但不是内核级强制。

---

## 2. 安装位置与优先级

harness 会扫描若干 skills 根目录，**rank 数字小者胜出**（同名 skill 由更靠前的根覆盖）：

| rank | 来源 | 路径 | 说明 |
|---|---|---|---|
| 100 | `project-dsh` | `<项目根>/.dsh/skills` | 项目私有 |
| 200 | `project-agents` | `<项目根>/.agents/skills` | 项目内跨 agent 共享 |
| 250 | `runtime` | 插件注册（`dsh plugin add`，见方式 5） | 由插件把包内 `SKILL.md` 注册进 `ctx.skills`；无目录，正文读的是包内文件 |
| 300 | `custom` | `customSkillDirs` 配置项 | 自定义根，需在组合里配置 |
| 400 | `user-dsh` | `<DSH_HOME>/skills`（默认 `~/.dsh/skills`） | **用户级，全局生效** |
| 500 | `user-agents` | `<agentsHome>/skills`（默认 `~/.agents/skills`） | 跨 agent 共享 |
| 600 | `bundled` | `bundledSkillDir` 配置项 | 随发行版打包的 skill |

两个细节：

- `user-dsh` 根会**跳过**它的 `.system` 子目录。
- 想把 skill 只提供给某一个 agent preset，可以配置 `bundledSkillDir` 指向本仓库。

这些根目录里的 skill 由 `@deepseek-ai/dsh-skill-filesystem` 发现，它同时监听这些目录：新增、改名、删除 skill（或改 frontmatter）会自动刷新会话里的 skill 目录，**不需要重启**。

---

## 3. 目录结构要求（最容易踩的坑）

发现逻辑**只扫一层**，只认这两种形态：

```
<skills-root>/ai-eight-honors-eight-shames/SKILL.md   ✅ 目录包
<skills-root>/ai-eight-honors-eight-shames.md         ✅ 平铺单文件
<skills-root>/foo/ai-eight-honors-eight-shames/SKILL.md  ❌ 嵌套，不会被发现
```

所以本仓库的**根目录就是 skill 包目录**：`SKILL.md` 放在仓库根，clone 到 `<skills-root>/<skill 名>/` 正好落在被扫描的位置。仓库里的 `.git`、`README.md` 等都不会被当作 skill 读取，放在一起是安全的。

---

## 4. frontmatter 契约（改内容前必读）

`SKILL.md` 必须以 YAML frontmatter 开头：

```markdown
---
name: ai-eight-honors-eight-shames
description: 一句话说明这个 skill 干什么、什么时候该用，模型靠它决定要不要加载。
whenToUse: 可选，补充触发时机。
---

正文……
```

| 字段 | 必填 | 规则 |
|---|---|---|
| `name` | ✅ | 必须匹配 `^[a-z0-9]+(?:-[a-z0-9]+)*$`（小写 kebab-case，不能有大写、下划线、空格） |
| `description` | ✅ | 会话目录里最多渲染 **500 字符**，超出会被截断，所以把"什么时候用"写在前面 |
| `whenToUse` | ✕ | 可选，字符串 |
| `metadata` | ✕ | 可选，对象 |
| `disable-model-invocation` | ✕ | 可选，布尔。为 `true` 时模型看不到它 |
| `user-invocable` | ✕ | 可选，布尔。为 `false` 时人类命令里不出现 |

调 surfaces 的四种组合：

| `disable-model-invocation` | `user-invocable` | 模型可用 | 人类可用 |
|---|---|---|---|
| 省略 | 省略 | ✅ | ✅ |
| `true` | `false` | ❌ | ❌ |
| `true` | 省略 | ❌ | ✅ |
| 省略 | `false` | ✅ | ❌ |

布尔值支持 YAML 布尔，以及大小写不敏感的 `true/false`、`yes/no`、`on/off`、`1/0`。**拼错或写成非布尔值，整个 skill 会被丢弃**（不只是该字段失效）。

三条硬性失败条件，踩中任何一条该文件都会被**静默跳过**（只在 harness 日志里 warn，会话目录里表现为"这个 skill 不存在"）：

1. 文件带 UTF-8 BOM —— 首行就不再等于 `---`；
2. 文件第一行不是 `---`，或缺少结束的 `---`；
3. 缺 `name` / `description`，或 `name` 不满足上面的正则。

---

## 5. 验证是否生效（装完请做这一步）

1. **看会话目录**：新的用户消息里会出现 skill 目录，其中应包含 `ai-eight-honors-eight-shames`。
2. **直接加载**：让代理调用 `skill` 工具，参数 `name = "ai-eight-honors-eight-shames"`。加载成功会返回完整正文；失败会报 `skill "..." is unknown or no longer available`。

不生效时的排查顺序：

| 现象 | 先查这里 |
|---|---|
| 目录里没有它 | 路径层级是否多了一层（第 3 节）；`<skills-root>` 是否写对 |
| 目录里有、加载报错 | `name` 是否与调用时完全一致（含连字符） |
| 到处都没有 | frontmatter 是否带 BOM / 首行不是 `---` / `name` 不合正则 |
| 模型看不到它 | 是否被 `disable-model-invocation: true` 关掉了 |
| 描述被截断 | `description` 是否超过 500 字符 |

---

## 6. 更新与卸载

```bash
# 更新到最新
git -C "<skills-root>/ai-eight-honors-eight-shames" pull

# 卸载：删掉整个目录即可
```

用**方式 5（插件）**装的，则按插件方式管理：

```bash
# 更新
dsh plugin --profile <profile> add github:w2310670047-code/ai-eight-honors-eight-shames

# 卸载
dsh plugin --profile <profile> remove ai-eight-honors-eight-shames
```

修改内容只需编辑 `SKILL.md`：

- 改**正文**：立即生效，每次加载都重新读文件，无需重启、无需清缓存；
- 改 **frontmatter**：会触发会话 skill 目录刷新。

想加自己的准则，直接在第 9 条后面续写 `## 10. ...` 并同步更新末尾的自检清单即可；如果想让它成为你自己账号下的版本，先 fork 再改。

### 别删：仓库里的赛博纪念碑

`执行报告-20260921-1305.md` 是本仓库**唯一有意保留在仓库里的执行报告**，立为**赛博纪念碑**：

- 它是**第 9 条第一次被执行**时的原始留痕——第 9 条由那次执行写下，报告也由它产出，等于这份准则的出生证明；
- 自 2026-09-23 起，另两份报告（`执行报告-首次运行.md`、`执行报告-变更记录.md`）改为**只存本地、不入库**；本文件是**有意的例外**，`.gitignore` 用 `!执行报告-20260921-1305.md` 专门把它排除在忽略规则之外；
- 所以它**不是漏删、不是「规则缺口」**：**请勿删除、勿 `git rm --cached`**。真要拿它做别的事，属人类决策；
- 它**不随发布 zip 分发**（`.gitattributes` 的 `export-ignore`）——**碑立在仓库里，不在发行物里**；若想让它随包分发，删掉 `.gitattributes` 里那一行 `export-ignore` 即可；
- 碑下原文**一字未改**，只在顶部另加了一段铭文；原始字节由 git 历史保存。

---

## 7. 同类项目（不声称首创）

「八荣八耻」在 AI 编码代理圈子里已被多个仓库实现过，本仓库**不声称首创**这条准则本身。本仓库的差异只有一个：它是 **DSH 原生**的——安装位置、优先级、frontmatter 契约都按本 harness 的实际发现逻辑（`@deepseek-ai/dsh-skill-filesystem`）逐条核验过，而不是照搬别的工具的约定。

如果你用的不是 DSH，下面这些项目可能更合适：

| 项目 | 定位 |
|---|---|
| [claude-code-eight-principles](https://github.com/oyj123321/claude-code-eight-principles) | Claude Code 向，中英双语，带 eval |
| [code-honor-skill](https://github.com/xxxily/code-honor-skill) | skills 目录 + 测试提示词 |
| [cc-eight-honors-and-shames](https://github.com/white-sand-grand/cc-eight-honors-and-shames) | Claude Code 插件形态 |
| [agent-rongchi](https://github.com/CercaTrovato/agent-rongchi) | 跨 Codex/Claude 的多语言实现 |
| [coding-standard-skill](https://github.com/455625072/coding-standard-skill) | 八荣八耻 + 多编辑器适配 + Git 规范 |

---

## 8. 与配套 skill 并用：优先级与裁决

本准则**不谈「该写多少代码」**——那件事交给配套 skill。推荐 [Ponytail](https://github.com/DietrichGebert/ponytail)（MIT，14 万★ 量级）：它用一条**七级阶梯**回答「能不能不做 / 能不能一行」。

### 两段式顺序（先用哪个）

1. **先用本 skill 问「这事该不该做」** —— 第 1 条要查证依据、第 2/3 条要事实与人类确认、第 4 条要「先搜复用」。**它决定要不要做、凭什么做。**
2. **再用 Ponytail 问「能不能一行做完」** —— 它决定**做多小**：① 该不该存在 ② 代码库里已有 ③ 标准库 ④ 平台原生特性 ⑤ 已装依赖 ⑥ 一行 ⑦ 最小实现。

**顺序不能反**：先按 Ponytail 想「怎么最省」，容易把一个**还没搞懂的问题**草草做小；先按本 skill 把事实与边界弄清，再谈做多小，才安全。（Ponytail 自己也写了这条：「对理解问题绝不偷懒，阶梯只缩短方案，不缩短阅读」。）

### 冲突裁决（两边都想管同一件事时）

| 冲突点 | 谁赢 | 依据 |
|---|---|---|
| Ponytail「代码优先、解释 ≤3 行」 vs 本 skill 第 9 条要求执行报告 | **本 skill** | Ponytail 自己写明：用户明确要求的解释（报告、走查、分阶段笔记）**不算债务**，应完整给出 |
| Ponytail `ultra`「先 ship 再质疑」「别停在你能默认的答案上」 vs 本 skill 第 2/3 条「有歧义先问、不臆想业务」 | **本 skill** | 需求与业务口径属于「影响结果的分歧」，必须先确认；建议 Ponytail 停在 `lite`/`full` |
| 非编码任务 | **本 skill**（Ponytail 不覆盖） | Ponytail 明写「非 coding 请求不要用」 |
| 能否省掉校验／错误处理／安全／可访问性 | **都不能** | 两边一致：Ponytail 明写这些永不简化；本 skill 第 5/6 条要求验证与合规 |

### 安装 Ponytail（DSH 环境）

```powershell
# 1) 克隆留档（便于更新与溯源）
git clone https://github.com/DietrichGebert/ponytail "$env:USERPROFILE\.dsh\third-party\ponytail"

# 2) 把 6 个 skill 装进 DSH 的 skills 根
Copy-Item "$env:USERPROFILE\.dsh\third-party\ponytail\skills\*" "$env:USERPROFILE\.dsh\skills\" -Recurse -Force
```

装完多出 6 个 skill：`ponytail`、`ponytail-review`、`ponytail-audit`、`ponytail-debt`、`ponytail-gain`、`ponytail-help`。

> ⚠️ **一处必须做的改动**：Ponytail 主 skill 的 `description` 原文 **826 字符**，超过 DSH 会话目录的 **500 字符**上限，会被截断并丢掉后半段触发词（`yagni`、`do less`、过度工程等）。安装时需把该字段压到 500 以内（本机用的是 **444 字符**版本；其余 frontmatter 字段与正文与上游**逐字节一致**）。`git pull` 更新上游后**需要重做这一步**。

---

## 9. 致谢

**特别感谢 [DietrichGebert/ponytail](https://github.com/dietrichgebert/ponytail) 项目对本项目给予的灵感。**

这份准则原本只关心「怎么把事实弄准、怎么把改动留痕」，对「**该不该写、该写多小**」没有立场。是 Ponytail 把「屋里最懒的资深工程师」这个视角摆到台面上——**最好的代码是你从没写过的代码**——并把它做成一条可执行的**七级阶梯**（该不该存在 → 库里已有 → 标准库 → 平台原生 → 已装依赖 → 一行 → 最小实现）。

它直接影响了本项目的三处：

| 影响 | 落在哪里 |
|---|---|
| 「**先问该不该存在**」（YAGNI）成为第 4 条的第一级 | `SKILL.md` 第 4 条 |
| 「**刻意的简化要留痕**」：写明上限与升级触发条件（借鉴 `ponytail: <上限>, <升级条件>` 标记） | `SKILL.md` 第 9 条「借力」 |
| 「**两段式顺序**」与冲突裁决：先用本准则定「该不该做」，再用 Ponytail 定「能不能一行」 | 本 README 第 8 节 |

同样值得学的是它对**自身数据的诚实**：README 主动推翻了自己早期「80–94% 更少代码」的宣传，注明那是单发基准下的**每任务上限**而非平均值，并引用了批评它的 issue #126。这与本准则第 7 条（以假装理解为耻，以诚实无知为荣）同源。

Ponytail 为 MIT 许可（© 2026 DietrichGebert），与本项目许可兼容。**本项目是独立实现，未包含也未派生 Ponytail 的代码与文本**——这里引用的是它公开文档所描述的机制，属致谢与出处说明。

---

## 10. 许可

[MIT](LICENSE) © 2026 wangcangxing

可自由使用、修改、分发、商用，保留版权与许可声明即可。八条准则的内核来自网络流传的「AI 八荣八耻」说法，MIT 只覆盖本仓库的正文、判据与文档。
