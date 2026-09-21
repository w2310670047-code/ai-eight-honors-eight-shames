# AI 八荣八耻 · DSH Skill

面向 AI 编码代理的八条工作准则，打包成一个可直接安装的 **Agent Skill**（SKILL.md 格式）。

它不做别的事：在代理动手写代码、调用不熟悉的接口、判断业务规则、重构既有实现、以及准备说"已完成"之前，提供一组**可核对**的判据，用来挡住瞎猜、臆想、越权重构、跳过验证和假装理解；并在每次有改动的执行结束后，要求留下一份执行报告（第 9 条）。

> 八条原文
>
> 以瞎猜接口为耻，以认真查询为荣。以模糊执行为耻，以寻求确认为荣。
> 以臆想业务为耻，以人类确认为荣。以创造接口为耻，以复用现有为荣。
> 以跳过验证为耻，以主动测试为荣。以破坏架构为耻，以遵循规范为荣。
> 以假装理解为耻，以诚实无知为荣。以盲目修改为耻，以备份重构为荣。
>
> 第 9 条（本仓库追加的交付纪律）
>
> 以交付无踪为耻，以留痕成报为荣 —— 每次有文件改动的执行结束后，在被改动的源文件夹生成 `执行报告-YYYYMMDD-HHmm.md`，写清**修改时间**、**修改内容**、**每个文件的主要内容与作用**。有改动才写；不擅自提交，是否入库由人类决定。

---

## 1. 安装

四种方式任选其一。**推荐方式 1**：装一次，所有项目都生效；方式 4 供没有 git、或需要 zip 上传的入口使用。**想让它在每次开工前强制生效**，见本节末尾的「附加」。

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
有改动就留执行报告。
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

修改内容只需编辑 `SKILL.md`：

- 改**正文**：立即生效，每次加载都重新读文件，无需重启、无需清缓存；
- 改 **frontmatter**：会触发会话 skill 目录刷新。

想加自己的准则，直接在第 9 条后面续写 `## 10. ...` 并同步更新末尾的自检清单即可；如果想让它成为你自己账号下的版本，先 fork 再改。

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

## 8. 许可

[MIT](LICENSE) © 2026 wangcangxing

可自由使用、修改、分发、商用，保留版权与许可声明即可。八条准则的内核来自网络流传的「AI 八荣八耻」说法，MIT 只覆盖本仓库的正文、判据与文档。
