<div align="center">

  <img width="160" src="https://i.loli.net/2021/10/05/yP5d6Aw19jRNUc7.png" alt="logo">

  <h1>TouchQ</h1>

设计参考 TDesignS

[![GitHub forks](https://img.shields.io/github/forks/TalexDreamSoul/touchq?style=flat-square)](https://github.com/TalexDreamSoul/touchq/network)
[![GitHub stars](https://img.shields.io/github/stars/TalexDreamSoul/touchq?style=flat-square)](https://github.com/TalexDreamSoul/touchq/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/TalexDreamSoul/touchq?style=flat-square)](https://github.com/TalexDreamSoul/touchq/issues)
[![GitHub license](https://img.shields.io/github/license/TalexDreamSoul/touchq?style=flat-square)](https://github.com/TalexDreamSoul/touchq/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/badge/release-3.0.0-Lite--beta-1b7cb9?style=flat-square)](https://github.com/TalexDreamSoul/touchq/releases)

</div>

# 贡献指南

touchq 处于萌芽阶段，个人开发者的力量是微不足道的。作者并没有足够的时间来完善和维护这个项目，因此，我们非常支持并且赞同您的亲自操刀，参与到项目的研发，维护中。



### 我可以添加特性吗

当然可以。我们非常支持这种行为，但是请注意，一切以用户体验为主。您的设计必须参考项目本身的设计，否则这将会是一场灾难。



### 我可以提交新的平台实现吗

非常抱歉。目前 touchq 的首要目标是完成 OneBot 的一系列配置，当然，你可以 fork 本仓库然后实现其他的平台



## Pull Request

#### 前置条件

1. frok 本仓库
2. 检出 **develop** 分支
3. 在 HEAD 处创建自己的分支，比如 my-feature
4. 进行你的开发
5. 创建 pull request 到 develop 分支

#### 补充说明

1. 你交上来的所有文件应该是正确格式的并且能通过 yarn lint (如果你不熟悉 Vue/JavaScript/TypeScript，可以先发 draft PR 并在其中说明缘由)

2. PR 中的 commit message 应当满足适当的规律(参考下一节) 当您的 PR 十分重要但是不满足相应的格式时，我们将采取 squash 措施而非 merge

   这将影响您在本库的贡献的 commit 数量，请您悉知。

#### Commit Message

1. commit message 应当满足 前缀<区域>: 具体更新
2. 合适的 commit message 可以参考如下
   - Fix<xxx>: message
   - Feat<xxx>: message
   - Test<xxx>: message
   - Build<xxx>: message
   - Docs<xxx>: message (说明文档)
   - Add<xxx>: message (新增具体的文件 用来干什么的)
   - Upd<xxx>: message (更新)
   - Change<xxx>: message (变动很多, 包含 Add Fix Upd 等)
3. 上面的 xxx 应该是您更新的区域或模块:
   - 抽象的大范围 Chat
   - 具体的单文件 TalexLightChat
   - 实现的新功能 Telegram (代表这个平台的实现)
4. merge commit 等自动产生的 commit message 不受此限制



## 项目结构

> 这里仅仅列出开发中大概率需要的

talextouchqq

​	└—— ...

​		└—— src

​			└—— main (electron 的主线程)

​			└—— renderer (主窗口的渲染线程)

​				└—— assets (资源文件)

​				└—— components (touchq 实现的一些自用组件)

​				└—— plugins (touchq 的js脚本具体实现)

​				└—— router (touchq 的路由)

​				└—— theme (touchq 的主题管理)

​				└—— views (touchq 的界面 如Login MainChat)

​			└—— index.ejs (touchq 的主页面 [即入口文件])

​		└—— ...

​		└—— talextouchqq (touchq 的数据库存储路径)

└—— ....



## Collaborator 开发指南

如果你收到了来自本仓库的神秘蓝色链接，点击它，你就成为了一名光荣的 TouchQ Collaborator！你将可以：

- 在 Issues 中有一个帅气的 collaborator 标识
- 直接推送到主仓库（你可以把之前的 fork 删掉啦）
- 审核其他人的 pull request

### [贡献指南参考](https://github.com/koishijs/koishi/blob/master/.github/contributing.md)
