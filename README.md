# 小兔鲜电商

1.yarn 或者 npm i

2.运行前需要 修改 本地电脑 host 文件 

- windows 系统

提醒：修改电脑配置，需要先退出 360 或 各种管家 各种 杀毒软件

提醒：如果修改 hosts 文件有弹窗警告，点击信任（因为这是我们自己进行的安全操作）

```
1. 找到 C:\Windows\System32\drivers\etc 下hosts文件
2. 在文件中加入  127.0.0.1       www.corho.com
3. 保存即可
# 如果提示没有权限
1. 将hosts文件移到桌面，然后进行修改，确认保存。
2. 将桌面hosts文件替换c盘文件
```

- mac OS 系统

```
1. 打开命令行窗口
2. 输入：sudo vim /etc/hosts
3. 按下：i 键    						 (进入编辑状态 => 利用光标挪位置)
4. 输入：127.0.0.1       www.corho.com     (改完如何保存? 看下一步)
5. 按下：esc
6. 按下：shift + :
7. 输入：wq 回车即可
```

